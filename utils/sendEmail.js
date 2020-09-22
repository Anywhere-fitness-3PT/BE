const aws = require("aws-sdk")

// use AWS global variables
aws.config.AWS_ACCESS_KEY_ID
aws.config.AWS_SECRET_ACCESS_KEY
aws.config.AWS_DEFAULT_REGION

// create an Email function
function Email(to, sub, content) {
    let ses = new.aws.SES();

    let from = "tashingsworth@gmail.com"

    // Amazon SES email format

    ses.sendEmail(
        {
            Source: from,
            Destination: { ToAdresses: to },
            Message: {
                Subject: {
                    Data: sub
                },
                Body: {
                    Html: {
                        Data: content
                    }
                }
            }
        },
        function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log("Email sent: " + data);
            }
        }
    );
}

module.exports = {
    Email
};