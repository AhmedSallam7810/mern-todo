const login = (token, data) => {
    return {
      type: "LOGIN",
      payload: { token, data },
    };
  };
  
  const logout = () => {
    return {
      type: "LOGOUT",
      payload: null,
    };
  };
  
  module.exports = {
    login,
    logout,
  };