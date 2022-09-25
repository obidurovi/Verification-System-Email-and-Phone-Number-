const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const sendSMS = async(to, msg) => {

    await axios.get(`https://bulksmsbd.net/api/smsapi?api_key=${ process.env.API }&type=text&number=${ to }&senderid=${ process.env.SENDER_ID }&message=${ msg }`);

}


// Exports
module.exports = sendSMS;