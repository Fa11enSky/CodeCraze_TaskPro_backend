const sendgrid = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, EMAIL_HELP } = process.env; // Из файла .env

sendgrid.setApiKey(SENDGRID_API_KEY);

const sendHelpMeEmail = async (data) => {
    const email = {
      to:EMAIL_HELP,  
      ...data,
     from: "sergiibort@gmail.com",
    };
    
  await sendgrid.send(email)
    .then(() => console.log("Email send SUCCESS"))
    .catch((error) => console.log(error.message));
};

module.exports =  sendHelpMeEmail ;