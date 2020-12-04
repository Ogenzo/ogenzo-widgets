const sgMail = require('@sendgrid/mail');


export class OgenzoMail {
    apiKey: string;
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    sendEmail(email: string, from: string, subject: string, code: string, msg: string) {
        sgMail.setApiKey(this.apiKey);

        let config = {
            to: email,
            from: from,
            subject: subject,
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>Amount has succefully been recieved</strong>',
        };
        sgMail.send({ ...config, html: `${msg} <strong>${code}</strong>` });
    }


}



