const Chats = () => {
  return (
    <div className="flex gap-2 items-center hover:bg-slate-200 px-4 py-1.5 border-b  border-slate-500/30 hover:border-none ">
    <img className="w-10 h-10 rounded-full" src="https://cdn.pixabay.com/photo/2016/03/26/22/13/man-1281562_640.jpg" alt="/" />
    <div className="w-full">
        <h2 className="text-base font-medium">Evans</h2>
        <p className="text-sm">Last Text</p>

    </div>
    <p className="flex justify-end w-full text-xs">16:07</p>
</div>
  )
}

export default Chats