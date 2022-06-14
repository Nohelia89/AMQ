import { createContext, useContext, useState} from "react";

const UserContext = createContext([])

export const useUserContext =  () => useContext(UserContext)

function UserContextProvider({children}) {

    const [userToken, setUserToken ] = useState();
    const [userType, setUserType ] = useState();
    const [userId, setUserId ] = useState();
    const [aloj, setAloj ] = useState([]);
    const [url, setURL ] = useState([]);
    const setearToken = (token) => {
        setUserToken(token)
          
     
        
  
       
    }

    const setearAloj = (aloj1) => {
        setAloj(aloj1)
      
    }

    const setImagenes = (img) => {
        setURL(img)
      
    }

    const setearTipoUsuario = (tipo) => {
        setUserType(tipo)
      
        
    }

    const setearIdUsuario = (id) => {
        setUserId(id)
      
        
    }

    return (
        <UserContext.Provider value={{url,userToken, userType, aloj,userId,setearIdUsuario, setImagenes, setearAloj, setearToken, setearTipoUsuario}}>

        {children}

        </UserContext.Provider>
    )
}

export default UserContextProvider