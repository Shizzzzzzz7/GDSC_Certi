const express= require("express");
const mongoose= require("mongoose");
const bodyParser= require("body-parser");

mongoose.connect("mongodb://localhost:27017/userDB")
.then(()=>{console.log("Successfully Connected");})
.catch((err)=>{console.log(err);});

const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique: true
    },
    name:String,
    position:Number
});

const User= new mongoose.model("User", userSchema);

const port= process.env.PORT || 3000;
const app= express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res)=>{

    //This the home route for home React page
});

app.get("/certificate", async(req,res)=>{

    try{
        
        const result= await User.find({userName:req.body.uname});
        res.status(200).send(result);//Saquib data fetch kr lena isse(agar json chahiye toh yaha .json kr lena)

    }catch(err){
        console.log(err);
        res.status(500).send("Some Error Occured");

    }
});


app.post("/route", async (req,res)=>{
//This route is for form submission data fetch(samjha saquib)
    try{

        const userDet= new User({
            name: req.body.name,
            position: req.body.position
        });

        const savedData= await userData.save();
        res.status(200).render("/");//Get back to the home page(yeh home page pe leke jaayega wapas)
    }catch (err){

        console.log(err);
        res.status(500).send("Some Error Occured");//Server Error hoga tb
    }


});

app.listen(port,()=>{

    console.log("Connected to port "+ port);
});