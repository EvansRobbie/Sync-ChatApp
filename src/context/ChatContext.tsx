import { useReducer, createContext, useContext } from "react";
import { useAuthContext } from "./AuthContext";

interface childProp {
  children: React.ReactNode;
}
interface userProp {
  chatId: string | null;
  user: {
    uid: string;
    photoURL: string;
    displayName: string;
  } | null;
}
type ActionType = {
  type: string;
  payload: any;
};
const initialState = {
  chatId: null,
  user: {} as any,
};
const ChatContext = createContext<{
  state: userProp;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => {},
});

const ChatContextProvider = ({ children }: childProp) => {
  const { currentUser } = useAuthContext();
  // const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state: userProp, action: ActionType) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser && currentUser?.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser?.uid,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
export const useChatContext = () => {
  return useContext(ChatContext);
};

export default ChatContextProvider;
