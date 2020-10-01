import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const login = (user) => setUser(user);
  const logout = () => setUser(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
