/**
* Auth0 Post-Registration Action
* This runs automatically when a new user registers via Auth0
* Add this in Auth0 Dashboard > Actions > Library > Create Action
*/

const { Client } = require('pg');

exports.onExecutePostUserRegistration = async (event, api) => {
  // Only create user_access for email/password signups
  if (event.connection.strategy !== 'auth0') {
    return;
  }

  const userEmail = event.user.email;
  const userName = event.user.name || event.user.email;

  // Database connection (add these as Auth0 Action secrets)
  const client = new Client({
    connectionString: event.secrets.DATABASE_URL
  });

  try {
    await client.connect();

    // Check if user already exists
    const existingUser = await client.query(
      'SELECT id FROM user_access WHERE user_email = $1',
      [userEmail]
    );

    if (existingUser.rows.length === 0) {
      // Create new user access record with default Staff role
      await client.query(`
        INSERT INTO user_access (user_email, role, accessible_modules)
        VALUES ($1, $2, $3)
      `, [
        userEmail,
        'Staff', // Default role for new users
        ['Fleet Health', 'Bookings'] // Default modules
      ]);

      console.log(`Created user_access record for: ${userEmail}`);
    }

  } catch (error) {
    console.error('Error creating user_access record:', error);
    // Don't fail the registration, just log the error
  } finally {
    await client.end();
  }
};