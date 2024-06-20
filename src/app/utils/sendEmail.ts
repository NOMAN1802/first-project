import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async(to: string, html: string) =>{

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.NODE_ENV === "production",
        auth: {
          user: "mustakimalnoman@gmail.com",
          pass: "svtc rmou nfrt qsih",
        },
      });

       await transporter.sendMail({
        from: 'mustakimalnoman@gmail.com', // sender address
        to, // list of receivers
        subject: "Reset Your password within 10 mins ✔", // Subject line
        text: "", // plain text body
        html, // html body
      });
    
}
  