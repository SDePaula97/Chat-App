import {ChannelHeader, MessageInput, MessageList, Thread, Window} from "stream-chat-react"
import {useState} from "react"
//import {useCookies} from "react-cookie"
//import UserList from './UserList'
//import { FaUsers, FaArrowAltCircleLeft} from 'react-icons/fa'


const MessagingContainer = () => {
    return (
        <div className='messaging-container'>
            <Window>
                <ChannelHeader/>,
                <MessageList/>,
                <MessageInput/>,

            </Window>,
            <Thread/>,
        </div>
    )
}

export default MessagingContainer;