const sendgrid = require("@sendgrid/mail");

require("dotenv").config();

const { SG_TOKEN, EMAIL_HELP } = process.env; // Из файла .env

sendgrid.setApiKey(SG_TOKEN);

const sendHelpMeEmail = async (data) => {
  const email = {
    to: EMAIL_HELP,
    ...data,
    from: "sergiibort@gmail.com",
  };

  await sendgrid
    .send(email)
    .then(() => {
      console.log("Email send SUCCESS");
    })
    .catch((error) => {
      throw HttpError(400, error.message);
    });
};

module.exports = sendHelpMeEmail;
