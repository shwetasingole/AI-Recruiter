// context/UserDetailContext.js
"use client";
import { createContext, useContext } from "react";

const UserDetailContext = createContext({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserDetailContext);

export default UserDetailContext;
