import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { useCookies } from 'react-cookie'
import { Chat, Channel, ChannelList } from 'stream-chat-react'
import Auth from './components/Auth'
import MessagingContainer from './components/MessagingContainer'
import Video from './components/Video'
import 'stream-chat-react/dist/css/index.css';
import './index.css'
import {customStyles} from "./customStyles"
//import NavBar from './components/NavBar'


const client = StreamChat.getInstance('65ewc4vver4w')

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [channel, setChannel] = useState(false)
  const [users, setUsers] = useState(null)

  const authToken = cookies.AuthToken
  console.log(authToken)

  useEffect( () => {
    const fetchUsers = async () => {
      if (authToken) {
        const { users } = await client.queryUsers({ role: 'user' })
        setUsers(users)
      }
    }
    fetchUsers()
  }, [authToken])

  const setupClient = async () => {
    try {
      await client.connectUser(
        {
          id: cookies.UserId,
          name: cookies.Name,
          hashedPassword: cookies.HashedPassword,
        },
        authToken
      )
      const channel = await client.channel('gaming', 'Gaming Demo', {
        name: 'Gaming Demo',

      })

      // const filters = { type:'gaming', members: { $in: [user.id]}}
      // const sort = {last_message_at: -1}

      await channel.watch()
      
      setChannel(channel)
    } catch (err) {
      console.log(err);
    }
  }

  if (authToken) setupClient();

 

  return (
    <div>
      {!authToken && <Auth />}
      {authToken && <Chat client={client} customStyles={customStyles}>
        <ChannelList
        // filters={filters}
        // sort={sort}
        />
         <Channel channel={channel}>
           <Video />
          <MessagingContainer users={users} />
         </Channel>
         </Chat>}
    </div>
  )
}

export default App;
