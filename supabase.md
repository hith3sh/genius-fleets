## Direct connection string
Database name= GeniusFleets
YOUR-PASSWORDd=0y8dU98YLaCBCUb8

postgresql://postgres:[YOUR-PASSWORD]@db.xvozdbgsvzgfnrqgngfe.supabase.co:5432/postgres


# After getting data
# conenct to railway postgres
psql postgresql://postgres:SCyTeTNpfRevQwjxyCemlDSRNGDRtoNL@centerbeam.proxy.rlwy.net:17018/railway

or railway connect postgres

# Get your Railway database URL
railway variables

# Import to Railway
psql $DATABASE_URL < supabase_backup.sql

psql postgresql://postgres:SCyTeTNpfRevQwjxyCemlDSRNGDRtoNL@centerbeam.proxy.rlwy.net:17018/railway < supabase_data_full.sql
