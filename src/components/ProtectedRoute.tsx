import { Navigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
interface childProp {
      children:React.ReactNode
    }
export const ProtectedRoute = ({children}:childProp) =>{
    const {currentUser, ready} = useAuthContext()
  if(!currentUser && ready){ 
    return <Navigate to={'/login'}/>
}else{
    return <div>{children}</div>

}

 
}