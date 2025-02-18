const tokenHeaders = (requiredRole = null) =>{
    const token  = localStorage.getItem("token")
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null
    const role  = user?.role 

      // Check if a role is required and if it matches the user's role
  if (requiredRole && role !== requiredRole) {
    return {}; // Role mismatch, no headers
  }

    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    return {};
}

export default tokenHeaders