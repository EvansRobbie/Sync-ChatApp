import {useReducer,  createContext, useContext} from 'react'
import { useAuthContext } from './AuthContext';

interface childProp{
    children:React.ReactNode
}
interface userProp{
    chatId:string | null
    user: {
        uid: string;
        photoURL:string
        displayName:string
      } | null;
}
type ActionType = {
    type: string;
    payload: any;
  };
  const initialState={
    chatId:null,
    user: {} as any,
}
  const ChatContext = createContext<{ state: userProp; dispatch: React.Dispatch<ActionType> }>({
    state: initialState,
    dispatch: () => {}
  });



  const ChatContextProvider = ({children}:childProp) => {
    const {currentUser} = useAuthContext()
    const chatReducer = (state:userProp, action:ActionType) =>{
        // const {currentUser} = useAuthContext() hooks caan only be used only within React components or in other hooks
        switch (action.type) {
            case "CHANGE_USER":
                const uid = currentUser?.uid || ""
                return{
                    ...state,
                    user:action.payload,
                    chatId: uid && uid > action.payload.uid ? uid + action.payload.uid : action.payload.uid + state.user?.uid
                }
                
        
            default:
                return state
        }
    }

   
   const [state, dispatch] = useReducer(chatReducer, initialState)

//    useEffect(() => {
//     dispatch({ type: 'CHANGE_USER', payload: currentUser });
//   }, [currentUser]);
  return (
    <ChatContext.Provider value={{state, dispatch}}>
        {children}
    </ChatContext.Provider>
  )
}
 export const useChatContext =  () =>{
    return useContext(ChatContext)
 }

export default ChatContextProvider