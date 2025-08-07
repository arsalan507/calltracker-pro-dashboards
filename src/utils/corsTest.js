/**
 * CORS Test Utility for CallTracker Pro Backend
 * Tests actual API requests to verify CORS is working
 */

// Test login endpoint with x-organization-id header
export const testBackendCORS = async () => {
  console.log('🔍 Testing backend CORS with actual requests...');
  
  try {
    const response = await fetch('https://calltrackerpro-backend.vercel.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-organization-id': 'test-org-id',
      },
      body: JSON.stringify({
        email: 'adminpro@ctp.com',
        password: 'Admin@123'
      })
    });

    const result = await response.json();
    console.log('✅ CORS Test Result:', result);

    if (result.success) {
      console.log('🎉 Login successful! CORS is working!');
      return result.token;
    } else {
      console.log('ℹ️ CORS is working (got response), login failed:', result.message);
      return null;
    }

  } catch (error) {
    if (error.message.includes('CORS')) {
      console.log('❌ CORS still blocked:', error);
      console.log('💡 This may be due to OPTIONS preflight caching. Try the demo request test instead.');
    } else {
      console.log('✅ CORS working, other error:', error);
    }
    return null;
  }
};

// Test demo requests endpoint (should work without auth)
export const testDemoRequestsCORS = async () => {
  console.log('🔍 Testing demo requests endpoint...');
  
  try {
    const response = await fetch('https://calltrackerpro-backend.vercel.app/api/demo-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "CORS Test User",
        email: "cors.test@example.com",
        company: "Test Company",
        phone: "1234567890",
        urgency: "urgent",
        currentPain: "testing-cors",
        budget: "5k-10k",
        timeline: "this-week",
        message: "Testing CORS functionality"
      })
    });

    const result = await response.json();
    console.log('✅ Demo Request Test Result:', result);

    if (result.success) {
      console.log('🎉 Demo request successful! CORS is working!');
      return true;
    } else {
      console.log('ℹ️ CORS working, demo request response:', result.message);
      return false;
    }

  } catch (error) {
    if (error.message.includes('CORS')) {
      console.log('❌ CORS still blocked for demo requests:', error);
    } else {
      console.log('✅ CORS working for demo requests, other error:', error);
    }
    return false;
  }
};

// Run comprehensive CORS tests
export const runCORSTests = async () => {
  console.log('🚀 Starting CORS Tests...');
  console.log('='.repeat(50));
  
  // Test demo requests first (no auth required)
  const demoTest = await testDemoRequestsCORS();
  console.log('');
  
  // Test login with organization header
  const loginTest = await testBackendCORS();
  console.log('');
  
  console.log('='.repeat(50));
  if (demoTest || loginTest) {
    console.log('🎉 CORS Tests: SUCCESS! Backend is accessible');
    console.log('✅ You can now use the real API endpoints');
  } else {
    console.log('⚠️ CORS Tests: May need to wait for OPTIONS cache to clear (up to 24 hours)');
    console.log('💡 Try refreshing the page or using an incognito window');
  }
  
  return { demoTest, loginTest };
};

// Export for use in dev console
if (typeof window !== 'undefined') {
  window.testCORS = runCORSTests;
  window.testLogin = testBackendCORS;
  window.testDemo = testDemoRequestsCORS;
}