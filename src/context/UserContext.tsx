import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { initialState, UserAction, userReducer, User } from '../reducer/UserReducer';

// interface UserContextProps {
//   state: User;
//   dispatch: React.Dispatch<UserAction>;
// }

// export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserContext = createContext<{
  user: User;
  dispatch: Dispatch<UserAction>;
}>({
  user: initialState,
  dispatch: () => {},
});
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};


export default UserContext;
