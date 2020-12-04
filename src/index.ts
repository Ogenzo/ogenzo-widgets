import { OgenzoPayment } from './payments'
import { OgenzoSMS } from './sms';
import { OgenzoMail } from './email';
export class OgenzoWidgets {
  email?: string;
  password?: string;
  airtelWallet?: string;
  mtnWallet?: string;
  payments?: OgenzoPayment;
  username?: string;
  smsApiKey?: string;
  sms?: OgenzoSMS;
  emailApiKey?: string;
  mail?: OgenzoMail;
  constructor(widgetsConfig: {
    paymentConfig?: { email: string, password: string, airtelWallet: string, mtnWallet: string },
    smsConfig?: { username: string, apiKey: string },
    emailConfig?: { apiKey: string }
  }) {

    if (widgetsConfig.paymentConfig) {
      this.email = widgetsConfig.paymentConfig.email;
      this.password = widgetsConfig.paymentConfig.password;
      this.airtelWallet = widgetsConfig.paymentConfig.airtelWallet;
      this.mtnWallet = widgetsConfig.paymentConfig.mtnWallet;
      this.payments = new OgenzoPayment(widgetsConfig.paymentConfig.email, widgetsConfig.paymentConfig.password, widgetsConfig.paymentConfig.airtelWallet, widgetsConfig.paymentConfig.mtnWallet)

    }

    if (widgetsConfig.smsConfig) {
      this.username = widgetsConfig.smsConfig.username;
      this.smsApiKey = widgetsConfig.smsConfig.apiKey;
      this.sms = new OgenzoSMS(widgetsConfig.smsConfig.username, widgetsConfig.smsConfig.apiKey);
    }

    if (widgetsConfig.emailConfig) {
      this.emailApiKey = widgetsConfig.emailConfig.apiKey;
      this.mail = new OgenzoMail(this.emailApiKey);
    }


  }

}




