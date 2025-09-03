# AlJis RCars

A car rental management system built with React and Supabase.

## Features

- Complete car rental management system
- Customer management
- Vehicle fleet management
- Booking and reservation system
- HR and employee management
- Financial management
- Document management
- Reporting and analytics

## Technology Stack

- **Frontend**: React, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL database, Authentication, Storage)
- **Routing**: React Router
- **Forms**: React Hook Form
- **Charts**: Recharts

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm
- Supabase account

### Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Run the SQL schema from `supabase_schema.sql` in the Supabase SQL Editor
3. Set up authentication providers in the Supabase dashboard
4. Get your Supabase URL and anon key from the API settings

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Data Import

To import your existing data into Supabase:

1. Run the SQL schema from `supabase_schema.sql` to create all tables
2. Modify constraints if needed:
   ```sql
   ALTER TABLE customer ALTER COLUMN phone DROP NOT NULL;
   ALTER TABLE vehicle ALTER COLUMN daily_rate DROP NOT NULL;
   ALTER TABLE vehicle ALTER COLUMN monthly_rate DROP NOT NULL;
   ```
3. Run the import script from `import_all_data.sql`

## User Authentication

The application uses Supabase Authentication with the following flows:

- Email/Password authentication
- Password reset
- Role-based access control
- Protected routes

## Project Structure

```
src/
├── api/               # API integration layer
│   ├── entities/      # Data models
├── components/        # UI components
│   ├── auth/          # Authentication components
│   ├── booking/       # Booking-related components
│   ├── fleet/         # Fleet management components
│   └── ui/            # UI components (shadcn/ui)
├── contexts/          # React contexts
├── hooks/             # Custom hooks
├── lib/               # Utilities and libraries
├── pages/             # Page components
└── utils/             # Helper functions
```

## License

This project is proprietary and confidential.

For more information and support, please contact AlJis RCars support.