import Chats from '../components/Chats'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
const Home = () => {
  return (
    <div className='absolutePosition w-[80vw] flex  overflow-hidden bg-slate-100 h-[80vh]'>
        <div className='relative bg-slate-300 flex-1 '>
            {/* sidebar */}
            <div className=''>
                <Navbar/>
                <SearchBar/>

            </div>
            <div className=' overflow-auto h-full'>
            <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
                <Chats/>
            </div>
        </div>
        <div className=' flex-[2] '>
            {/* chat area */}
           Chat
        </div>
    </div>
  )
}

export default Home