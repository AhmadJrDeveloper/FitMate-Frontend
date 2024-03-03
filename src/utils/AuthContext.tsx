import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

type AuthContextType = {
  auth: boolean | null;
  setAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
  userAuth: boolean | null;
  setUserAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
  id: string | undefined;
  setId: React.Dispatch<React.SetStateAction<string | undefined>>;
  type: string | null;
  setType: React.Dispatch<React.SetStateAction<string | null>>;
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
};


const AuthContext = React.createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [type, setType] = useState<string | null>(null);
  const [auth, setAuth] = useState<boolean | null>(null);
  const [id, setId] = useState<string | undefined>();
  const [name, setName] = useState<string | null>(null); 
  const [userAuth, setUserAuth] = useState<boolean | null>(null);


  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const decodedId: any = jwtDecode(storedToken);
          console.log(decodedId);
          setId(decodedId.id);
          console.log(decodedId.id);
          if (decodedId.type === 'admin' || decodedId.type === 'trainer') {
            setAuth(true);
            setUserAuth(false);
          } else {
            setAuth(false);
            setUserAuth(true);
          }
          setType(decodedId.type);
          setName(decodedId.firstName + " " + decodedId.lastName);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };
  
    fetchUserInfo();
  }, []);
  

  console.log(id);

  useEffect(() => {
    console.log('the updated id in the context', id);
    console.log('the updated auth in the context', auth);
    console.log('the updated role in the context', type);
    console.log('firstName', name);
    console.log('userAUth',userAuth)
  }, [id, auth, type,name,userAuth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, id, setId, type, setType,name,setName,userAuth,setUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useInfo = (): AuthContextType | null => {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error('useInfo must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext, AuthProvider, useInfo };
