import {FaHorseHead, FaSmile} from 'react-icons/fa'

const UserList = ({users}) => {
    //console.log(users)
return (
    <div className="user-list-container">
        {users && users?.map(user => (
        <li key={user.id}>
            {user.role === 'user' ? <FaHorseHead/> : <FaSmile/>}
            <p>{user.name}</p>
        </li>))}

    </div>
)
}









export default UserList;