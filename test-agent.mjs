async function createTestAgent() {
  try {
    console.log('Creating test agent...');
    
    const response = await fetch('http://localhost:5001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Agent',
        firstName: 'Test',
        lastName: 'Agent',
        email: 'agent@test.com',
        password: 'password123',
        userType: 'agent',
        phone: '+1234567890'
      })
    });

    const result = await response.json();
    console.log('Register response:', result);

    if (result.success) {
      console.log('\n✅ Agent created successfully!');
      console.log('Login credentials:');
      console.log('Email: agent@test.com');
      console.log('Password: password123');
      console.log('User Type: agent');
      
      // Now test login
      console.log('\nTesting login...');
      const loginResponse = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'agent@test.com',
          password: 'password123',
          userType: 'agent'
        })
      });

      const loginResult = await loginResponse.json();
      console.log('Login response:', loginResult);
      
      if (loginResult.success) {
        console.log('✅ Agent login successful!');
      } else {
        console.log('❌ Agent login failed:', loginResult.message);
      }
    } else {
      console.log('❌ Failed to create agent:', result.message);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

createTestAgent();
