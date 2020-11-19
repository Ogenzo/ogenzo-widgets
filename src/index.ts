import { OgenzoPayment } from './payments'

export class OgenzoWidgets {
  email: string;
  password: string;
  airtelWallet: string;
  mtnWallet: string;
  payments: OgenzoPayment;
  constructor(widgetsConfig: { paymentConfig: { email: string, password: string, airtelWallet: string, mtnWallet: string } }) {
    this.email = widgetsConfig.paymentConfig.email;
    this.password = widgetsConfig.paymentConfig.password;
    this.airtelWallet = widgetsConfig.paymentConfig.airtelWallet;
    this.mtnWallet = widgetsConfig.paymentConfig.mtnWallet;
    this.payments = new OgenzoPayment(widgetsConfig.paymentConfig.email, widgetsConfig.paymentConfig.password, widgetsConfig.paymentConfig.airtelWallet, widgetsConfig.paymentConfig.mtnWallet)
  }

}




