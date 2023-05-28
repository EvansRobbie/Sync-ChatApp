import { DocumentData, Timestamp, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { useChatContext } from "../context/ChatContext";
import { useAuthContext } from "../context/AuthContext";
import { formatDistanceToNow } from "date-fns";
interface messageProp {
  id: string;
  date: Timestamp;
  text: string;
  image?: string;
  senderId: string;
}
const Message = () => {
  const [messages, setMessages] = useState<DocumentData | messageProp[]>([]);
  const { state } = useChatContext();
  const { currentUser } = useAuthContext();
  const scroll = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // const getMessage = () =>{
    if (state.chatId) {
      const unsub = onSnapshot(doc(db, "chats", state?.chatId), (doc) => {
        // console.log("Current data: ", doc.data());
        doc.exists() && setMessages(doc.data().messages || []);
      });

      return () => {
        unsub();
      };
    }
    // }

    // state.chatId && getMessage()
  }, [state.chatId]);
  // console.log(messages)
  useEffect(() => {
    // show the lates message onpage load
    if (scroll.current && messages.length > 0) {
      scroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);
  return (
    <>
      {messages.length > 0 &&
        messages.map((message: messageProp, index: number) => {
          const formattedDate = formatDistanceToNow(message.date.toDate(), {
            addSuffix: true,
          });
          const removeAbout = formattedDate.split(" ");
          const returnOthers = removeAbout.slice(1).join(" ");
          const style = {
            message: `max-w-sm absolute bg-red-500 top-10 left-20   `,
            sent: `${message.image ? "" : ""} flex-row-reverse `,
            recieved: "  text-black flex flex-row  ",
          };
          const messageClass =
            message.senderId === currentUser?.uid
              ? `${style.sent}`
              : `${style.recieved}`;
          return (
            <div
              ref={index === messages.length - 1 ? scroll : null}
              className={`${messageClass} relative  p-2 flex gap-2  items-center`}
              key={message.id}
            >
              <div className="relative">
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    message.senderId === currentUser?.uid
                      ? currentUser?.photoURL || ""
                      : state.user?.photoURL || ""
                  }
                  alt="/"
                />
                <span className="text-xs">{returnOthers}</span>
              </div>
              <div
                className={`${
                  message.senderId === currentUser?.uid
                    ? ` bg-red-500  right-32 rounded-tl-2xl`
                    : " bg-slate-700 left-20 rounded-tr-2xl"
                } rounded-b-2xl p-1  max-w-sm   top-10  backdrop-blur backdrop-filter`}
              >
                {message.image && (
                  <img
                    src={message?.image}
                    className="w-[50vw] rounded-2xl h-[18vh] md:h-[30vh] object-fit "
                  />
                )}
                <p className="text-sm  text-slate-200 px-4 py-1.5">
                  {message?.text}
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Message;
