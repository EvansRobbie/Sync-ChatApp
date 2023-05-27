import { useChatContext } from "../context/ChatContext"

const Chatbar = () => {
    const {state} = useChatContext()
  return (
    <div className='flex justify-between items-center px-4 h-16  bg-blue-500'>
    {/* <h4 className='text-slate-100 font-medium'>SyncChat</h4> */}
    <div className="flex items-center gap-2">
        <img className='w-10 h-10 rounded-full object-cover' src={state.user?.photoURL} alt="/" />
        <h4 className="text-slate-200 text-sm">{state.user?.displayName}</h4>
    </div>
    <div className='text-slate-100 flex gap-4 cursor-pointer'>
        <div className=" hidden md:flex">
            {/* search */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
            </svg>
        </div>
        <div>
            {/* video */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
            </svg>
        </div>
        <div>
            {/* options */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
            </svg>
        </div>

    </div>
</div>
  )
}

export default Chatbar