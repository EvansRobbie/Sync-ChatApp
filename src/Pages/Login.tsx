import {useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from '../firebase';
import { toast } from 'react-hot-toast/headless';
// import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  // const {} = useAuthContext()
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  // const [err, setErr] =useState<boolean>(false)

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      try{
        await signInWithEmailAndPassword(Auth, email, password)
         navigate('/')
         toast.success('Logged in successfully')
      }
        catch(error) {
        //  setErr(true)
         toast.error(`Login Failed!`)
        };
  }
  return (
    <div className="absolutePosition group flex flex-col items-center  w-[70vw] md:w-[25vw] bg-slate-100 min-h-[70vh] ">
        <h2 className="py-4 mt-4 text-2xl font-bold">Sync Chat</h2>
        <div className="border border-gray-400 transitions p-2 rounded-full group-hover:bg-purple-950 group-hover:text-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>

        </div>
        <h3 className="text-xl font-semibold pt-2 md:pt-4">Login</h3>
        <form onSubmit={onSubmit} className="flex flex-col w-full px-4 mt-1 md:mt-3 py-3 gap-1">
            <label className="font-semibold" htmlFor="email">Email</label>
            <input className=" outline-none py-1 px-4 rounded-md" required value={email} onChange={e=>setEmail(e.target.value)} type="email" id='email' placeholder='Enter Your Email' />
            <label className="font-semibold" htmlFor="password">Password</label>
            <input className=" outline-none py-1 px-4 rounded-md" required value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="password" />
            <button className="bg-purple-950 mt-4 py-1.5 rounded-xl hover: text-slate-200 font-medium text-sm uppercase active:scale-105 hover:shadow-md shadow-slate-950">Login</button>
        </form>
        <p className="text-gray-500 text-sm mt-1 p-1">Don't have an Account? <Link className="text-purple-500 hover:underline font-bold underline-offset-2" to='/register'>Register</Link></p>
    </div>
  )
}

export default Login