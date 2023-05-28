import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Auth, storage, db } from "../firebase";
import { toast } from "react-hot-toast";
// import { useAuthContext } from '../context/AuthContext';
const Register = () => {
  // const {currentUser, setCurrentUser} = useAuthContext()
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<FileList | null>(null);
  const [password, setPassword] = useState("");
  // const [err, setErr] = useState(false)

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    setFile(file);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(
        Auth,
        email,
        password
      );
      const storageRef = ref(storage, username);
      if (file !== null && file?.length > 0) {
        // const fileBlob = new Blob([file[0]]);
        const uploadTask = uploadBytesResumable(storageRef, file[0]);
        uploadTask.on(
          "state_changed",
          () => {
            // Handle upload progress or state changes if needed
            // You can access the snapshot for progress, state, etc.
          },
          (error) => {
            // Handle unsuccessful uploads
            console.log(error);
            toast.error("Error on uploading image");
            // setErr(true)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                // console.log('File available at', downloadURL);
                await updateProfile(response.user, {
                  displayName: username,
                  photoURL: downloadURL,
                });
                await setDoc(doc(db, "users", response.user.uid), {
                  uid: response.user.uid,
                  displayName: username,
                  email,
                  photoURL: downloadURL,
                });
                await setDoc(doc(db, "userChats", response.user.uid), {});
                navigate("/login");
                toast.success("Account Registered. Please Login!");
              }
            );
          }
        );
      }
    } catch (error) {
      // const errorCode = error.code;
      // setErr(true)
      toast.error(`Account Registration Failed!`);
    }
  };
  // const {FileList} = file
  // console.log(file)
  // console.log(currentUser)
  return (
    <div className="absolutePosition group  flex flex-col items-center w-[70vw] md:w-[25vw]  bg-slate-200 min-h-[70vh]">
      <h2 className="py-2 md:py-4 mt-4 text-2xl font-bold">Sync Chat</h2>
      <div className="border border-gray-400 transitions p-2 rounded-full group-hover:bg-purple-950 group-hover:text-slate-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold pt-2 md:pt-4">Register</h3>
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-full px-4 mt-2 py-2 gap-1"
      >
        <label className="font-semibold" htmlFor="name">
          Username
        </label>
        <input
          required
          className=" outline-none py-1 px-4 rounded-md"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="name"
          placeholder="Enter Your Email"
        />
        <label className="font-semibold" htmlFor="email">
          Email
        </label>
        <input
          required
          className=" outline-none py-1 px-4 rounded-md"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          placeholder="Enter Your Email"
        />
        <div className="py-1">
          <label htmlFor="file" className="flex gap-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 01-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0113.5 1.5H15a3 3 0 012.663 1.618zM12 4.5A1.5 1.5 0 0113.5 3H15a1.5 1.5 0 011.5 1.5H12z"
                clipRule="evenodd"
              />
              <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 019 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0116.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625v-12z" />
              <path d="M10.5 10.5a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963 5.23 5.23 0 00-3.434-1.279h-1.875a.375.375 0 01-.375-.375V10.5z" />
            </svg>
            <span className="font-medium">Profile Pic</span>
          </label>
          <input
            required
            className="hidden"
            onChange={handleFile}
            type="file"
            id="file"
          />
        </div>
        <label className="font-semibold" htmlFor="password">
          Password
        </label>
        <input
          required
          className=" outline-none py-1 px-4 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button className="bg-purple-950 mt-4 py-1.5 rounded-xl hover: text-slate-200 font-medium text-sm uppercase active:scale-105 hover:shadow-md shadow-slate-950">
          Register
        </button>
      </form>
      <p className="text-gray-500 text-sm my-1 py-2 ">
        Already have an Account?{" "}
        <Link
          className="text-purple-500 hover:underline font-bold underline-offset-2"
          to="/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
