import {useState} from 'react'
const Message = () => {
    const [user, setUser] = useState(false)
    
  return (
    <div className="p-2 flex gap-2">
        <div>
            <img className="w-10 h-10 rounded-full" src="https://cdn.pixabay.com/photo/2016/03/26/22/13/man-1281562_640.jpg" alt="/" />
            <span className="text-xs">just now</span>
        </div>
        <div className="max-w-sm bg-slate-900 bg-opacity-50 backdrop-blur backdrop-filter rounded-tr-2xl rounded-b-2xl">
            <p className="text-sm text-slate-200 px-4 py-1.5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam nihil voluptatum velit ratione. Doloremque provident reiciendis facere ducimus, voluptatum animi.</p>
        </div>
    </div>
  )
}

export default Message