import React, { createContext, useState } from "react";

// track signed-in user ID across the app
type UserContextType = {
  userId: number | null;
  setUserId: (id: number | null) => void;
};

export const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};