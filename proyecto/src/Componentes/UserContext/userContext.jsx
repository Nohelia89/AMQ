import { createContext, useContext, useState} from "react";

const UserContext = createContext([])

export const useUserContext =  () => useContext(UserContext)

function UserContextProvider({children}) {

    const [userToken, setUserToken ] = useState();
    const [userType, setUserType ] = useState();

    const setearToken = (token) => {
        setUserToken(token)
          
        console.log("ENTRE AL TOKEN usercontext" + userToken )
        
  
       
    }

    const setearTipoUsuario = (tipo) => {
        setUserType(tipo)
      
        console.log("GUARDE EL TIPO DE USUARIO usercontext: " + userType )  
    }


    return (
        <UserContext.Provider value={{userToken, userType, setearToken, setearTipoUsuario}}>

        {children}

        </UserContext.Provider>
    )
}

export default UserContextProvider