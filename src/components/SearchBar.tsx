import { useState } from "react";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast/headless";
const SearchBar = () => {
  const { currentUser } = useAuthContext();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<null | DocumentData>(null);
  // const [err, setErr] = useState(false)
  const handleSearch = async () => {
    // console.log('working')
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data() || null);
      });
    } catch (e) {
      // setErr(true)
      toast.error("Error on searching data");
      console.log(e);
    }
    // setUsername('')
  };
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && handleSearch();

    // console.log('working')
  };

  const handleClick = async () => {
    // check if chat conversation exists in the firestore database, if not create

    const combinedId =
      currentUser && currentUser?.uid > user?.uid
        ? currentUser.uid + user?.uid
        : user?.uid + currentUser?.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        if (currentUser?.uid) {
          await updateDoc(doc(db, "userChats", currentUser?.uid), {
            [combinedId + ".userInfo"]: {
              uid: user?.uid,
              displayName: user?.displayName,
              photoURL: user?.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        } else {
          console.log("Invalid chatId:", currentUser?.uid);
        }
        await updateDoc(doc(db, "userChats", user?.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (e) {
      // setErr(true)
      toast.error("User not found!");
    }
    setUser(null);
    setUsername("");
  };

  return (
    <div className="w-full px-2 py-1 border-b flex flex-col gap-2  border-slate-500/30">
      <input
        type="text"
        value={username}
        onKeyDown={handleKey}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full py-1 rounded-md px-4 text-sm outline-none bg-slate-200"
        placeholder="Find Chat"
      />
      {/* {err && <span>User not found!</span>} */}
      {user && (
        <div
          onClick={handleClick}
          className="flex gap-2 items-center hover:bg-slate-200 px-4 py-1.5 "
        >
          <img
            className="w-10 h-10 rounded-full"
            src={user?.photoURL}
            alt="/"
          />
          <div className="w-full">
            <h2 className="text-base font-medium">{user?.displayName}</h2>
            {/* <p className="text-sm">{user?.lastMessage}</p> */}
          </div>
          <p className="flex justify-end w-full text-xs">16:07</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
