// Railway PostgreSQL client that proxies through Express server
console.log('🔧 Railway Database Configuration:');
console.log('Using server-side database proxy for Railway PostgreSQL');

// Create Supabase-compatible client that routes through our Express API
const createRailwayClient = () => {
  return {
    from: (table) => ({
      select: async (columns = '*') => {
        try {
          const response = await fetch(`/api/db/${table}?select=${columns}`);
          const result = await response.json();
          return result;
        } catch (error) {
          return { data: null, error: error.message };
        }
      },

      insert: async (data) => {
        try {
          const response = await fetch(`/api/db/${table}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          const result = await response.json();
          return result;
        } catch (error) {
          return { data: null, error: error.message };
        }
      },

      update: async (data) => ({
        eq: async (column, value) => {
          try {
            const response = await fetch(`/api/db/${table}/${value}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            const result = await response.json();
            return result;
          } catch (error) {
            return { data: null, error: error.message };
          }
        }
      }),

      delete: () => ({
        eq: async (column, value) => {
          try {
            const response = await fetch(`/api/db/${table}/${value}`, {
              method: 'DELETE'
            });
            const result = await response.json();
            return result;
          } catch (error) {
            return { data: null, error: error.message };
          }
        }
      }),

      eq: function(column, value) {
        const originalSelect = this.select;
        this.select = async (columns = '*') => {
          try {
            const filter = encodeURIComponent(JSON.stringify({ [column]: value }));
            const response = await fetch(`/api/db/${table}?select=${columns}&filter=${filter}`);
            const result = await response.json();
            return result;
          } catch (error) {
            return { data: null, error: error.message };
          }
        };
        return this;
      },

      single: function() {
        const originalSelect = this.select;
        this.select = async (columns = '*') => {
          const result = await originalSelect(columns);
          if (result.data && Array.isArray(result.data)) {
            return { ...result, data: result.data[0] || null };
          }
          return result;
        };
        return this;
      }
    }),

    rpc: async (functionName, params = {}) => {
      try {
        const response = await fetch(`/api/rpc/${functionName}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params)
        });
        const result = await response.json();
        return result;
      } catch (error) {
        return { data: null, error: error.message };
      }
    }
  };
};

export const supabase = createRailwayClient();