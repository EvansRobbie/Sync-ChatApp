
const Navbar = () => {
  return (
    <div className='flex justify-between items-center px-4 h-16  bg-slate-500'>
    {/* <h4 className='text-slate-100 font-medium'>SyncChat</h4> */}
    <img className='w-10 h-10 rounded-full object-cover' src="https://cdn.pixabay.com/photo/2021/06/25/13/22/girl-6363743_640.jpg" alt="/" />
    <div className='text-slate-100 flex gap-1 cursor-pointer'>
        <span>Logout</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clipRule="evenodd" />
        </svg>
    </div>
</div>
  )
}

export default Navbar