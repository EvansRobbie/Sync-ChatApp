import {useState} from 'react'
import { useAuthContext } from "../context/AuthContext"
import { useChatContext } from "../context/ChatContext"
import { Timestamp, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
const Input = () => {
  const {currentUser} = useAuthContext()
  const {state} = useChatContext()
  const [text, setText] = useState('')
  const [image, setImage] = useState<FileList | null>(null)
  const [err, setErr] = useState(false)
  const handleSubmit = async () =>{
      if(image){
        const storageRef = ref(storage, uuid());
        if ( image !== null && image?.length > 0){
            // const fileBlob = new Blob([file[0]]);
            const uploadTask = uploadBytesResumable(storageRef, image[0]);
            uploadTask.on( 
              "state_changed",
              () => {
                // Handle upload progress or state changes if needed
                // You can access the snapshot for progress, state, etc.
              },
          (error) => {
              // Handle unsuccessful uploads
              console.log(error)   
              setErr(true)
          }, 
          () => {
              getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
              // console.log('File available at', downloadURL);
              if (state.chatId !== null && state.chatId !== undefined) {
               await updateDoc(doc(db, 'chats', state.chatId), {
                messages: arrayUnion({
                  id:uuid(),
                  text,
                  senderId:currentUser?.uid,
                  date:Timestamp.now(),
                  image:downloadURL
                })
              })
            }
              });

          }
          );
        }
      }else{
        if (state.chatId !== null && state.chatId !== undefined) {
          const documentPath = `chats/${state.chatId}`;
          console.log('Document Path:', documentPath);
        await updateDoc(doc(db, documentPath), {
          messages: arrayUnion({
            id:uuid(),
            text,
            senderId:currentUser?.uid,
            date:Timestamp.now()
          })
        })
        } else {
          console.log('Invalid chatId:', state.chatId);
        }
    }
      const inputRef = doc(collection(db, 'userCharts'), currentUser?.uid);
      await updateDoc(inputRef, {
        [state.chatId+".lastMessage"]:{
          text
        },
        [state.chatId+'.date']: serverTimestamp()
    })
    const otherRef = doc(collection(db, 'userCharts'), state.user?.uid);
      await updateDoc(otherRef, {
        [currentUser?.uid+".lastMessage"]:{
          text
        },
        [currentUser?.uid+'.date']: serverTimestamp()
    })
      setImage(null)
      setText('')
  }

  const handleKey = (e:React.KeyboardEvent<HTMLInputElement>) =>{
      e.code === 'Enter' && handleSubmit()
  }
  return (
    <div className='h-16 absolute bottom-0 right-0 w-full flex bg-slate-300 py-4 px-4 gap-1 items-center'>
        <input type="text" placeholder='Type A Message...' onKeyDown={handleKey} value={text} onChange={(e)=>setText(e.target.value)} className='w-full py-1 outline-none rounded-lg px-4' />
        <div className="cursor-pointer hover:bg-slate-200 rounded-full p-1 transitions">
            {/* emoji */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
        </div>
        <label htmlFor='file' className="cursor-pointer hover:bg-slate-200 rounded-full p-1 transitions">
            {/* files */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
        </label>
        <input type="file" id='file' className='hidden' onChange={(e) => setImage(e.target.files)} />
        <div onClick={handleSubmit} className="cursor-pointer hover:bg-slate-200 w-16 rounded-lg flex justify-center text-slate-200 hover:text-slate-900 p-1 transitions bg-purple-900">
            {/* send */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
       </div>
    </div>
  )
}

export default Input