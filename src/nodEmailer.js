import nodemailer from 'nodemailer';
import config from './config.js';
export const transport = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:config.user_google,
        pass:config.password_email
    }
})
transport.verify().then(()=>{
    console.log("listo para mandar el email")
}).catch((err)=>{
    console.log(err)
})