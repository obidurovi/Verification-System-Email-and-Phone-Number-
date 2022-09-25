const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Create Transport 
const transport = nodemailer.createTransport({
    host : process.env.EMAIL_HOST,
    port : process.env.EMAIL_PORT,
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }

});

// Create Mail
const verifyAccount = async (to, sub, data = {  }) => {
    
    await transport.sendMail({
        from : `"Account Verified" <${ process.env.EMAIL_USER }>`,
        to : to,
        subject : sub,
        html : `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0px;
            padding: 0px;
            font-family: serif;
        }

        ul {
            margin: 0px;
            padding: 0px;
        }

        li {
            list-style: none;
        }
        .main-wraper {
            height: 100vh;
            width: 100%;
            background-color: gray;
            overflow: hidden;
        }

        .wraper{
            background-color: #fff;
            width: 500px;
            padding: 30px;
            margin: 200px auto;
        }

        .message-body {
            padding: 20px 0;
        }

        .message-body h2{
            font-size: 16px;
            margin-bottom: 10px;
        }

        .message-body p{
            font-size: 14px;
            margin-bottom: 10px;
        }

        .message-body a{
            font-size: 14px;
            margin-bottom: 10px;
            background-color: #FA4800;
            display: inline-block;
            padding: 15px 40px;
            text-decoration: none;
            color: #fff;
            text-transform: uppercase;
        }

        .footer span{
            display: block;
            padding-bottom: 30px;
        }

        .footer .social ul{
            display: flex;
            gap: 10px;
        }
    </style>
</head>
<body>
    <div class="main-wraper">
        <div class="wraper">
            <div class="header">
                <a href=""><img src="https://ci4.googleusercontent.com/proxy/w_M9vu0lAfENq7dpybhGWDCFxvFzYzWenAsa3aO2ZtEhYLRxAc_URJiVipM_kmgebwTXsoMpUPa8MdFs1xT2eOfdXLExqkBUROLnH3xym9P380VQx3sQq8Jh1LNuhQ=s0-d-e1-ft#https://pubs.payoneer.com/EmailSender/Payoneer/img/Default/partner-logo.png" alt=""></a>
            </div>
            <hr>
            <div class="message-body">
                <h2>Dear ${ data.name }</h2>
                <p>You are welcome to Payoneer. Now you have to verify your account by clicking the button.</p>
                <a href="http://localhost:5050/students/verify/${ data.token }">Verify Now</a>
            </div>
            <div class="footer">
                <span>Your account cell: ${ data.cell }</span>
                <div class="social">
                    <ul>
                        <li><a href="#"><img src="https://ci5.googleusercontent.com/proxy/Hp1tHwpZJplBQHTr-WRQujyXVO54yAQdUwALRHoIu3TW_4YDZ6B6Ls74s-w-3MEDpMW9F5Bc8V4B2IT49EMXsm4X1qqiK8IjzmNO4S_OfAs-tByTjpOe2-uS3s3hY3HTf5w=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/fb.jpg" alt=""></a></li>
                        <li><a href="#"><img src="https://ci6.googleusercontent.com/proxy/IrEOgUYJAxNOXCfkCzRhp3Pr5plttxi_SK_vo7HZtMFa9MnD5KZqMxD0PxnsIjARnAifRp7OuUYYY20Bx98L__qgfC-G266Bqx7WcwKAYkekf1hLO0pZhaVmV4UfPbaFNGY=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/tw.jpg" alt=""></a></li>
                        <li><a href="#"><img src="https://ci6.googleusercontent.com/proxy/KSBDtD0zHbN5XeL5qH34sW3-l80xoG-w0BBfwWJAKOpm5TzMSQdySc4IybYGoQHKjT_Wo3UDUSeCtTIWDxoIky3CVQs4NQ208Te17XQNfgN2coi-_NX4ppd5lt40uL9B-LE=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/li.jpg" alt=""></a></li>
                        <li><a href="#"><img src="https://ci4.googleusercontent.com/proxy/cqBt0SYqEkz5P5RlEVBOgBiEsYGuAGdvEGnMKJY7Pny4E4Fc4Wh2XESh_BSxyR0kc6MwhSZ90frj3Z0X3li2uWsh2aqA78SPkhL0ypAuvU4H_SC5HzvlUoN3eE5687knUrE=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/yt.jpg" alt=""></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

        `
    })
}


// Export 
module.exports = {
    
    verifyAccount

}