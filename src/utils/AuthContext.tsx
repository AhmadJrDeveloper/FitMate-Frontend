import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

// Define the type for your context value
type AuthContextType = {
  auth: boolean | null;
  setAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
  id: string | undefined;
  setId: React.Dispatch<React.SetStateAction<string | undefined>>;
  type: string | null;
  setType: React.Dispatch<React.SetStateAction<string | null>>;
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
};


// Create the context with initial value null
const AuthContext = React.createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [type, setType] = useState<string | null>(null);
  const [auth, setAuth] = useState<boolean | null>(null);
  const [id, setId] = useState<string | undefined>();
  const [name, setName] = useState<string | null>(null); // Update the initial state for name


  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const decodedId: any = jwtDecode(storedToken);
          console.log(decodedId);
          setId(decodedId.id);
          console.log(decodedId.id);
          setAuth(true);
          setType(decodedId.type);
          setName(decodedId.firstName+" "+decodedId.lastName);
        } catch (error) {
          console.error('Error decoding token:', error);
          // Handle invalid or expired token
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
  }, [id, auth, type,name]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, id, setId, type, setType,name,setName }}>
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
