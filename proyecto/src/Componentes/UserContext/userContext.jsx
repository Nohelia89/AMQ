import { createContext, useContext, useState} from "react";

const UserContext = createContext([])

export const useUserContext =  () => useContext(UserContext)

function UserContextProvider({children}) {

    const [userToken, setUserToken ] = useState();
    const [userType, setUserType ] = useState();
    const [userId, setUserId ] = useState("");
    const [userName, setUserName ] = useState("");
    const [compraID, setCompraId ] = useState();
    const [aloj, setAloj ] = useState([]);

    const setearCompraId = (com) => {
        setCompraId(com)
           
    }

    const setearToken = (token) => {
        setUserToken(token)
           
    }

    const setearAloj = (aloj1) => {
        setAloj(aloj1)
      
    }

    const setearTipoUsuario = (tipo) => {
        setUserType(tipo)
      
        
    }

    const setearIdUsuario = (id) => {
        setUserId(id)
      
        
    }
    const cerrarSesion = () => {
        setUserId("")
      
        
    }

    const setearNombreUsuario = (id) => {
        setUserName(id)
      
        
    }

    return (
        <UserContext.Provider value={{userToken, userType, aloj,userId, userName, setearNombreUsuario,setearIdUsuario, setearAloj, setearToken, setearTipoUsuario, setearCompraId, cerrarSesion}}>

        {children}

        </UserContext.Provider>
    )
}

export default UserContextProvider