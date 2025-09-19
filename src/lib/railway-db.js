// Railway PostgreSQL client that proxies through Express server
import { smartTransform } from './dataTransformer.js';

console.log('🔧 Railway Database Configuration:');
console.log('Using server-side database proxy for Railway PostgreSQL with data transformation');

// Create Supabase-compatible client that routes through our Express API
const createRailwayClient = () => {
  return {
    from: (table) => {
      const fromChain = {
        select: (columns = '*') => {
          const selectChain = {
            _filters: {},
            eq: function(column, value) {
              // Store current filters
              const currentFilters = this._filters || {};
              const newFilters = { ...currentFilters, [column]: value };

              const executeWithFilter = async () => {
                try {
                  const filter = encodeURIComponent(JSON.stringify(newFilters));
                  const response = await fetch(`/api/db/${table}?select=${columns}&filter=${filter}`);
                  const result = await response.json();
                  return result;
                } catch (error) {
                  return { data: null, error: error.message };
                }
              };

              // Return a chainable object that can be awaited or chained further
              const chainableEq = {
                _filters: newFilters,
                eq: this.eq.bind({ _filters: newFilters }),
                then: (onResolve, onReject) => executeWithFilter().then(onResolve, onReject),
                catch: (onReject) => executeWithFilter().catch(onReject)
              };

              return chainableEq;
            },

            single: function() {
              const executeForSingle = async () => {
                try {
                  const response = await fetch(`/api/db/${table}?select=${columns}`);
                  const result = await response.json();
                  if (result.data && Array.isArray(result.data)) {
                    const transformedFirst = result.data[0] ? smartTransform(result.data[0]) : null;
                    return { ...result, data: transformedFirst };
                  }
                  return result;
                } catch (error) {
                  return { data: null, error: error.message };
                }
              };

              return {
                then: (onResolve, onReject) => executeForSingle().then(onResolve, onReject),
                catch: (onReject) => executeForSingle().catch(onReject)
              };
            }
          };

          // Make select() directly awaitable (for queries without filters)
          selectChain.then = (onResolve, onReject) => {
            const execute = async () => {
              try {
                const response = await fetch(`/api/db/${table}?select=${columns}`);
                const result = await response.json();
                return result;
              } catch (error) {
                return { data: null, error: error.message };
              }
            };
            return execute().then(onResolve, onReject);
          };

          selectChain.catch = (onReject) => {
            return selectChain.then(undefined, onReject);
          };

          return selectChain;
        },

      insert: (data) => ({
        select: (columns = '*') => ({
          single: async () => {
            try {
              const response = await fetch(`/api/db/${table}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              const result = await response.json();
              if (result.data && Array.isArray(result.data)) {
                const transformedFirst = result.data[0] ? smartTransform(result.data[0]) : null;
                return { ...result, data: transformedFirst };
              }
              return result;
            } catch (error) {
              return { data: null, error: error.message };
            }
          }
        })
      }),

      update: (data) => ({
        eq: (column, value) => ({
          select: (columns = '*') => ({
            single: async () => {
              try {
                const response = await fetch(`/api/db/${table}/${value}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data)
                });
                const result = await response.json();
                if (result.data && Array.isArray(result.data)) {
                  const transformedFirst = result.data[0] ? smartTransform(result.data[0]) : null;
                  return { ...result, data: transformedFirst };
                }
                return result;
              } catch (error) {
                return { data: null, error: error.message };
              }
            }
          })
        })
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
            const transformedFirst = result.data[0] ? smartTransform(result.data[0]) : null;
            return { ...result, data: transformedFirst };
          }
          return result;
        };
        return this;
      }
      };
      return fromChain;
    },

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