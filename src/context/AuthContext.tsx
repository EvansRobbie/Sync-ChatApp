import { User, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, createContext, useContext } from "react";
import { signOut } from "firebase/auth";
import { Auth } from "../firebase";

interface childProp {
  children: React.ReactNode;
}
interface userProp {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  ready: boolean;
  logOut: () => void;
}
const AuthContext = createContext({} as userProp);
const AuthContextProvider = ({ children }: childProp) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      setCurrentUser(user);
      setReady(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const logOut = () => {
    signOut(Auth);
    setCurrentUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, ready, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
