// Add this to your server.js - API endpoint for user registration
// POST /api/users/register

app.post('/api/users/register', async (req, res) => {
  try {
    const { email, name, role = 'Staff', modules = ['Fleet Health', 'Bookings'] } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('user_access')
      .select('id')
      .eq('user_email', email)
      .single();

    if (existingUser) {
      return res.json({ message: 'User already exists', user: existingUser });
    }

    // Create new user_access record
    const { data: newUser, error } = await supabase
      .from('user_access')
      .insert({
        user_email: email,
        role: role,
        accessible_modules: modules
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({ message: 'User created successfully', user: newUser });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});