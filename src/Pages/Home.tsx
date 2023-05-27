import Chatbar from '../components/Chatbar'
import Chats from '../components/Chats'
import Input from '../components/Input'
import Message from '../components/Message'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
const Home = () => {
  return (
    <div className='absolutePosition w-[95vw]  md:w-[80vw] flex  overflow-hidden bg-slate-100 h-[80vh]'>
        <div className='relative bg-slate-300 md:flex-1  '>
            {/* sidebar */}
            <div className=''>
                <Navbar/>
                <SearchBar/>

            </div>
            <div className=' overflow-auto h-full'>
                    <Chats/>
            </div>
        </div>
        <div className=' relative  md:flex-[2] '>
            {/* chat area */}
           <Chatbar/>
           <div className='max-h-[63vh] md:max-h-[65vh] lg:max-h-[60vh]  overflow-y-auto '>
            <Message/>
           </div>
           <Input/>
        </div>
    </div>
  )
}

export default Home