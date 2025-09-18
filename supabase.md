## Direct connection string
Database name= GeniusFleets
YOUR-PASSWORDd=0y8dU98YLaCBCUb8

postgresql://postgres:[YOUR-PASSWORD]@db.xvozdbgsvzgfnrqgngfe.supabase.co:5432/postgres


How to do pg_dump?


# After dumping data
# conenct to railway postgres
railway connect postgres

# Get your Railway database URL
railway variables

# Import to Railway
psql $DATABASE_URL < supabase_backup.sql