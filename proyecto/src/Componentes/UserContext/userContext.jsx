import { createContext, useContext, useState} from "react";

const UserContext = createContext([])

export const useUserContext =  () => useContext(UserContext)

function UserContextProvider({children}) {

    const [userToken, setUserToken ] = useState([]);
  





    const setear = (token) => {
        setUserToken(token)
        console.log("ENTRE AL TOKEN " + userToken )
    }



    return (
        <UserContext.Provider value={{userToken, setear}}>

        {children}

        </UserContext.Provider>
    )
}

export default UserContextProvider