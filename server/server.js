import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';
import 'dotenv/config';
const { SMTP_MAIL, SMTP_PASSWORD} = process.env;

const PORT = process.env.PORT;
// var cors = require('cors')


const app = express()
app.use(express.json());
app.use(cookieParser());

// app.use(cors(
//     {
//         origin:["http://localhost:3000"],
//         methods:["POST","GET"],
//         credetials:true
//     }
// ))

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const db = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DB_PORT
    
})

const verifyUser = (req,res,next) =>{
    const token = req.cookies.token;
    if(!token)
    {
        return res.json({Message:"Please log in to generate token"});
    }else{
        jwt.verify(token,"our-jsonwebtoken-secret-key",(err,decoded)=>{
            if(err){
                return res.json({Message:"Authentication Error"});
            }else{
                req.name = decoded.name;
                next();
            }
        })
    }
}

app.get('/',verifyUser,(req,res)=>{
    return res.json({Status:"Success",name:req.name});
})

app.post('/login',(req,res)=>{
    const sql = "SELECT * FROM login where email=? AND password=?"
    
    db.query(sql,[req.body.email,req.body.password], (err,data) =>{
        if(err)  return res.json({Message:"Serverside Error"})
        if(data.length > 0){
            const name = data[0].name;
            const token = jwt.sign({name},"our-jsonwebtoken-secret-key",{expiresIn:'1d'});
            res.cookie('token',token);
            return res.json({Status:"Success"});
        }else{
            return res.json({Message:"No record found"});
        }
    })
})

app.post('/signup',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    db.query("INSERT INTO login(name,email,password) values (?,?,?)",[name,email,password],
        (err,result) =>{
            if(result)
            {
                return res.json({Status:"Success"});
            }else{
                res.send({Message:"Enter Correct Asked Details!"});
            }
        }
    )
})


app.post('/adminlogin',(req,res)=>{
    const sql = "SELECT * FROM adminlogin where email=? AND password=?"
    db.query(sql,[req.body.email,req.body.password], (err,data) =>{
        if(err)  return res.json({Message:"Serverside Error"})
        if(data.length > 0){
            const name = data[0].name;
            const token = jwt.sign({name},"our-jsonwebtoken-secret-key",{expiresIn:'1d'});
            res.cookie('token',token);
            return res.json({Status:"Success"});
        }else{
            return res.json({Message:"No record found"});
        }
    })
})

app.post('/send_mail',cors(),async(req,res)=>{
    let {name} = req.body;
    const sql =  "SELECT email FROM login where name=?"
    db.query(sql,[{name}],(err,data) =>{
        if(err) return res.json("Serverside error")
        if(data.length > 0){
            const to_mail = data[0].email;
        }
        else{
            console.log(to_mail);
    }
    })
        
    console.log("Here is email");
    console.log(name);
    // console.log(to_mail);
    const transport = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:SMTP_MAIL,
            pass:SMTP_PASSWORD,
        }
    })
    await transport.sendMail({
        from:SMTP_MAIL,
        to:SMTP_MAIL,
        subject:"test mail",
        html: `<div className="email" style="
                border: 1px solid black;
                padding: 20px;
                font-family: sans-serif;
                line-height: 2;
                font-size: 20px;
                ">
                <h2>Here is your email!</h2>
                <p>${name}</p>
                <p>APPOINTMENT BOOKED</p>
                </div>
                `
    })
})




app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"});
})


app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Server running on port ${PORT}`);
})