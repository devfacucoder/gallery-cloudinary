import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()
export const transport = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.USEREMAELGOOGLE,
        pass:process.env.PASSGOOGLEEMAIL
    }
})
transport.verify().then(()=>{
    console.log("listo para mandar el email")
}).catch((err)=>{
    console.log(err)
})
/**await transport.sendMail({
      from: 'Cloudinary app ', // sender address
      to: newUserDBSave.email, // list of receivers
      subject: "verificando email", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>verifica tu email</b>", // html body
    }); */