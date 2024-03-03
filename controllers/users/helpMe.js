const { sendHelpMeEmail, ctrlWrapper } = require("../../helpers");

const sendHelpMe = ctrlWrapper(async (req, res, next) => {

    const { email, comment } = req.body;

    await sendHelpMeEmail({
      subject: "Help Me - TaskPro",
      html: `<h1>Help Me!</h1> <p>Hello! ${comment}</p><p>Send answer to e-mail: ${email}</p>`
    });

    res.status(201).json({
        user: {
            email,
            comment,
        },
    });

});

module.exports =  sendHelpMe ;
