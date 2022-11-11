import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { useCookies } from 'react-cookie'
import { Chat, Channel, } from 'stream-chat-react'
import Auth from './components/Auth'
import MessagingContainer from './components/MessagingContainer'
import Video from './components/Video'
import 'stream-chat-react/dist/css/index.css';
import './index.css'
import {customStyles} from "./customStyles"


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
      const channel = await client.channel('gaming', 'gaming-demo', {
        name: 'Gaming Demo ',

      })
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
        <Channel channel={channel}>
          <h1>Tweetch Chat</h1>
          <Video />
          <MessagingContainer users={users} />
        </Channel>
         </Chat>}
    </div>
  )
}

export default App;
