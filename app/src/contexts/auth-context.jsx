import { createContext, useState } from 'react';

const KEY = 'myapp_user_data';

const defaultUserData = {
  userId: undefined,
  userName: undefined,
};

const defaultContext = {
  userData: defaultUserData,
  onSignin: () => { },
  onSignout: async () => { },
};

export const AuthContext = createContext(defaultContext);

export const useAuthContext = () => {
  const [value, setValue] = useState(getLocalStorage());
  const onSignin = (user) => {
    console.log(user);
    setValue(user);
    setLocalStorage(user);
  };
  const onSignout = async () => {
    // ユーザーの情報を削除
    setValue({
      userId: undefined,
      userName: undefined,
    });
    localStorage.removeItem(KEY);
  };
  const contextValue = {
    userData: value,
    onSignin,
    onSignout,
  };
  return contextValue;
};

const getLocalStorage = () => {
  try {
    const userDataString = localStorage.getItem(KEY);
    if (!userDataString) {
      return {
        userId: undefined,
        userName: undefined,
      };
    }
    return JSON.parse(userDataString);
  } catch (error) {
    console.error('Error parsing user data from local storage:', error);
    return {
      userId: undefined,
      userName: undefined,
    };
  }
};

const setLocalStorage = (user) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
};

export const AuthProvider = ({ children }) => {
  const ctx = useAuthContext(AuthContext);
  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};
