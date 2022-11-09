import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { StreamChat } from 'stream-chat'
import {
  Chat,
  Channel,
  
} from 'stream-chat-react';
import Auth from './components/Auth'
import MessagingContainer from './components/MessagingContainer'
import Video from './components/Video'
import 'stream-chat-react/dist/css/v2/index.css';
//import {customStyles} from "./styles/customStyles"


const client = StreamChat.getInstance('65ewc4vver4w')

const App = () => {
const [ cookies, setCookie, removeCookie] = useCookies(['user']) 
const [channel, setChannel] = useState(true)

const authToken = cookies.AuthToken

// useEffect(() => {
    
// }, [])
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
    const channel = await client.channel('gaming', {
      name: 'Gaming',
    })
    setChannel(channel)
} catch (err) {
    console.log(err);
  }
}
if (authToken) setupClient();

const customStyle = {
  '--primary-color': 'green',
  '--md-font': '1.2rem',
  '--xs-m': '1.2rem',
  '--xs-p': '1.2rem',
};

return (
  <div>
  
  {!authToken && <Auth/>}
  {authToken && <Chat client={client} customStyles={customStyle}>
     <Channel channel={channel}>
       <Video/>
       <MessagingContainer/>
     </Channel>
</Chat>}
</div>
)
}

export default App;
