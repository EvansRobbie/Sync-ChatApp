import { User, onAuthStateChanged } from 'firebase/auth'
import {useState, useEffect, createContext, useContext} from 'react'
import { Auth } from '../firebase'

interface childProp{
    children:React.ReactNode
}
interface userProp{
    currentUser:User | null
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}
const AuthContext = createContext({} as userProp)
const AuthContextProvider = ({children}:childProp) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useEffect (() =>{
        onAuthStateChanged(Auth, (user) => {
           setCurrentUser(user)
              })
    }, [])
    console.log(currentUser)
  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
        {children}
    </AuthContext.Provider>
  )
}
 export const useAuthContext =  () =>{
    return useContext(AuthContext)
 }

export default AuthContextProvider