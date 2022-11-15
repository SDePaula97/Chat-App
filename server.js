const PORT = process.env.PORT || 8000
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const {v1: uuidv1} = require('uuid')
const { connect } = require('getstream')
const StreamChat = require('stream-chat').StreamChat
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
require('./database');

// Sign up
app.post('/signup', async (req,res) => {
    try {
        console.log(req.body)
        const { username, password } = req.body

        const userId = uuidv1()
        const hashedPassword = await bcrypt.hash(password, 10)
        const client = connect(process.env.API_KEY,process.env.API_SECRET, process.env.APP_ID)
        const token = client.createUserToken(userId)

        res.status(200).json({username, userId, hashedPassword, token})

    
        console.log(username, password)
    
} catch (err) {
    console.log(err.message)

    res.status(500).json({message:err})

}
})

// login

app.post('/login', async(req,res) => {
    try {
        const { username, password } = req.body
        const client = connect(process.env.API_KEY, process.env.API_SECRET, process.env.APP_ID)
        const chatClient = StreamChat.getInstance(process.env.API_KEY, process.env.API_SECRET, process.env.APP_ID)
        const {users} = await chatClient.queryUsers({name:username})
     console.log(users)

    
       
        if (!users.length) return res.json(400).json({message: "User does not exist"})
        
        // const success = await bcrypt.compare(password, users[0].hashedPassword)
        const success = true
        console.log(success)
        const token = client.createUserToken(users[0].id)
        const confirmedName = users[0].name
        const userId = users[0].id
        const updateResponse = await chatClient.upsertUser({ 
            id: userId, 
            role: 'admin', 
         });
        
        if (success) {
            
           return res.status(200).json({token, username: confirmedName, userId})
        }else {
           return res.status(500).json({message: 'Login failed'})
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({message:err})
    }
})

app.listen(PORT, () => console.log('Server running on PORT ' + PORT))