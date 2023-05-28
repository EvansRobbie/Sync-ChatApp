import { useEffect, useState } from "react";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import { useChatContext } from "../context/ChatContext";
const Chats = () => {
  const { currentUser } = useAuthContext();
  const { dispatch } = useChatContext();
  const [chats, setChats] = useState<DocumentData | []>([]);

  useEffect(() => {
    const getChat = () => {
      if (currentUser?.uid) {
        const unsub = onSnapshot(
          doc(db, "userChats", currentUser?.uid),
          (doc) => {
            // console.log("Current data: ", doc.data());
            setChats(doc.data() || []);
          }
        );

        return () => {
          unsub();
        };
      } else {
        console.log("Invalid User:", currentUser?.uid);
      }
    };
    currentUser?.uid && getChat();
  }, [currentUser?.uid]);
  // console.log(Object.entries(chats))

  const handleSelect = (u: any) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    // setChats([])
  };
  return (
    <>
      {/* use Object.entries() to convert the object to an array */}
      {Object.entries(chats)
        ?.sort((a, b) => b[1]?.date - a[1]?.date)
        .map((chat) => {
          const username = chat[1].userInfo?.displayName;
          const splitName = username?.split(" ");
          let firstName;
          if (splitName?.length >= 2) {
            firstName = splitName[0];
          } else {
            firstName = username;
          }
          //  console.log(firstName)
          //  console.log(firstName)
          // console.log(chat[1].userInfo?.photoURL)
          return (
            <div
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
              className="flex gap-2 items-center hover:bg-slate-200 px-4 py-1.5 border-b  border-slate-500/30 hover:border-none "
            >
              <img
                className="w-11 h-11 drop-shadow-xl rounded-full"
                src={chat[1].userInfo?.photoURL ?? ""}
                alt={`/${firstName}`}
              />
              <div className="w-full">
                <h2 className="text-base font-medium">{firstName}</h2>
                <p className="text-sm truncate max-w-sm">
                  {chat[1].lastMessage?.text}
                </p>
              </div>
              <p className="md:flex justify-end w-full text-xs hidden ">
                16:07
              </p>
            </div>
          );
        })}
    </>
  );
};

export default Chats;
