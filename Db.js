const express=require('express');
const app=express();
const port=1300;
const cors= require('cors');
const { mongo, default: mongoose } = require('mongoose');
const userModel = require('./user');
app.use(express.json());
// app.use(cors());

//database connoection
mongoose.connect('mongodb://localhost:27017/Firstproject')
.then(()=>{
    console.log("mongodb connected succesfully")
})
.catch((err)=>{
    console.error("mongodb connection error",err);
});

app.post('/userpost', async(req,res)=> {
    try{
        const da = req.body;
        const newUser =await userModel.create(da); 
        res.status(201).json({
            data:newUser
        }); 
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Get request handler

app.get('/userget', async (req, res) =>{
    try{
        const users = await userModel.find();
        res.json({
            data:users
        });
    }catch (error){
        res.status(500).json({ error:error.message});
    }
});


app.listen(port,()=>{
    console.log(`Server running on port ${port} `)
});

