import { useEffect, useState } from "react"
import { DocumentData, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import { useChatContext } from "../context/ChatContext";
const Chats = () => {
  const {currentUser} = useAuthContext()
  const {dispatch} = useChatContext()
  const [chats, setChats] = useState<DocumentData| []>([])

  useEffect(()=>{
    const getChat = () =>{
      const unsub = onSnapshot(doc(collection(db, "userCharts"), currentUser?.uid), (doc) => {
        // console.log("Current data: ", doc.data());
        setChats(doc.data() || [])
    });

    return () =>{
      unsub()
    }
  }
  currentUser?.uid && getChat()
  }, [currentUser?.uid])
  // console.log(Object.entries(chat))
  const handleClick = (user:string[]) =>{
      dispatch({type:'CHANGE_USER', payload:user})
  }
  return (
    <>
    {/* use Object.entries() to convert the object to an array */}
    {Object.entries(chats).map((chat) =>{
      const username = chat[1].userInfo.displayName
       const splitName = username.split(' ')
       const firstName = splitName[0]
      //  console.log(firstName)
      return(

        <div key={chat[0]} onClick={()=>handleClick(chat[1].userInfo)} className="flex gap-2 items-center hover:bg-slate-200 px-4 py-1.5 border-b  border-slate-500/30 hover:border-none ">
          <img className="w-11 h-11 drop-shadow-xl rounded-full" src={chat[1].userInfo.photoURL} alt="/" />
          <div className="w-full">
              <h2 className="text-base font-medium">{firstName}</h2>
              <p className="text-sm">{chat[1].userInfo.lastMessage?.text}</p>

          </div>
          <p className="flex justify-end w-full text-xs">16:07</p>
      </div>
      )
    })}
    </>
  )
}

export default Chats