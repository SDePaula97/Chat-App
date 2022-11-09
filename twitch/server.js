const PORT = 8000
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const {v1: uuidv1} = require('uuid')
const { connect } = require('getstream')
const cors = require('cors')
app.use(cors())
app.use(express.json())

const API_KEY = '65ewc4vver4w'
const API_SECRET ='6yqrhm7nvcycf58ct4xjk3b22tz82qhn7adfppdafpy6f3wy5a9j3gykz6suzuk4'
const APP_ID = '1218720'

// Sign up
app.post('/signup', async(req,res) => {
    try {
        console.log(req)
        const { username, password } = req.body

        const userId = uuidv1()
        const hashedPassword = await bcrypt.hash(password, 10)
        const client = connect(API_KEY, API_SECRET, APP_ID)
        const token = client.createUserToken(userId)

        res.status(200).json({username, userId, hashedPassword, token})

    
        console.log(username, password)
    
} catch (err) {
    console.log(err)

    res.status(500).json({message:err})

}
})










app.listen(PORT, () => console.log('Server running on PORT ' + PORT))