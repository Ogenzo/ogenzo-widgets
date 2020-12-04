import { rejects } from "assert";
import axios from "axios";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { resolve } from "path";
var AfricasTalking = require('africastalking');


export class OgenzoSMS {
    username: string;
    apiKey: string;
    constructor(username: string, apiKey: string) {
        this.username = username;
        this.apiKey = apiKey;
    }


    sendSMS(number: string, msg: string): Promise<any> {
        return new Promise((resolve,reject)=>{

      
        var africasTalking = new AfricasTalking({
            username: this.username,
            apiKey: this.apiKey
        });
        var sms = africasTalking.SMS;
        var message = `${msg}`
        let phone = parsePhoneNumberFromString(number, 'UG');
        // console.log('phone', phone.number);
        // console.log('isValid', phone.isValid());

        if (phone) {
            if (phone.isValid()) {
              return sms.send({
                    //to: `0${phone.nationalNumber}`,
                    to: phone.number,
                    message: message,
                })
                    .then((response: any) => {
                        //  console.log('response', JSON.stringify(response));
                       // console.log('response', response.SMSMessageData.Recipients);
                        resolve(response.SMSMessageData.Recipients);
                    })
                    .catch((error: any) => {
                        console.log('error', error);
                        return error;
                    });
            } else {
                resolve(`Wrong Number Format`);
            }
        } else {
            resolve('No number');
        }
    });
    }


}



