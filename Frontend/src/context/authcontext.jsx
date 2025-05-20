//==================Authcontext deal with for global states==================
import { createContext,useState} from "react";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [state,setstate]=useState('Global-State')
return (
    <AuthContext.Provider value={state} >
      {children}
    </AuthContext.Provider>
  );
};
 export {AuthContext , AuthProvider }
