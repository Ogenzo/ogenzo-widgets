import axios from "axios";
import { parsePhoneNumberFromString } from 'libphonenumber-js';

interface MOMOPayload {
  note?: string;
  slug?: string;
  phone?: string;
  amount?: number;
  msg?: string;
  ref: string;
}

interface StatusPayload {
  phone?: string;
  ref: string;
}

interface configObj {
  email: string,
  password: string,
  airtelWallet: string,
  mtnWallet: string
}

export class OgenzoPayment {
  email: string;
  password: string;
  airtelWallet: string;
  mtnWallet: string;
  constructor(email: string, password: string, airtelWallet: string, mtnWallet: string) {
    this.email = email;
    this.password = password;
    this.airtelWallet = airtelWallet;
    this.mtnWallet = mtnWallet;
  }

  async login() {
    try {
      const response = await axios.post(
        " https://payments.ogenzo.ml/api/v1/login",
        {
          email: this.email,
          password: this.password
        }
      );
      if (response.data.hasOwnProperty("error")) {
        return response.data.error;
      }
 
      if (response.data.hasOwnProperty("data")) {        
        return response.data.data.token;
      }
      
    } catch (error) {
      return error.errno
    }
  }

  formatPhoneNumber(phone: any) {
    let phoneNumber = parsePhoneNumberFromString(phone, 'UG');
    if (phoneNumber) {
      if (phoneNumber.isValid()) {
        return `0${phoneNumber.nationalNumber}`;
      } else {
        return `Wrong Number Format`;
      }
    } else {
      return 'No number';
    }
  }

  determineNetwork(phone: string) {

    if (/(075)[0-9]{7}/.test(phone) || /(070)[0-9]{7}/.test(phone)) {
      return 'Airtel'

    } else if (/(077)[0-9]{7}/.test(phone) || /(078)[0-9]{7}/.test(phone) || /(039)[0-9]{7}/.test(phone)) {
      return 'MTN'
    } else {
      return 'None'
    }

  }

  async determineRequestPayload(requestObj: MOMOPayload) {

    let formatPhoneNumber = this.formatPhoneNumber(requestObj.phone);
    if (formatPhoneNumber === 'Wrong Number Format' || formatPhoneNumber === 'No number') {
      return formatPhoneNumber
    }

    if (this.determineNetwork(formatPhoneNumber) === 'MTN') {
      requestObj.slug = this.mtnWallet;
    } else if (this.determineNetwork(formatPhoneNumber) === 'Airtel') {
      requestObj.slug = this.airtelWallet;
    } else {
      return `${formatPhoneNumber} Network is Not yet Supported`
    }
    return requestObj
  }

  async getDepositStatus(payload: StatusPayload) {
    try {
      let token: any = await this.login();
      if (token === 'ENOTFOUND' || token[0] ==='invalid_credentials') {
        return token;
      }
      let payloadObj = await this.determineRequestPayload(payload);
      const checkStatus = await axios.post("https://payments.ogenzo.ml/api/v1/user/wallet/deposit/status",
      payloadObj,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (checkStatus.data.hasOwnProperty("error")) {
        return checkStatus.data.error;
      }
 
      if (checkStatus.data.hasOwnProperty("data")) {        
        return { status: checkStatus.status, data: checkStatus.data.data };
      }
    } catch (error) {
      return error;
    }
  }
 
  async getTransacionStatus(payload: StatusPayload) {
    try {
      let token: any = await this.login();  
      if (token === 'ENOTFOUND' || token[0] ==='invalid_credentials') {
        return token;
      }
      let payloadObj = await this.determineRequestPayload(payload);
      const checkStatus = await axios.post("https://payments.ogenzo.ml/api/v1/user/wallet/deposit/status",
      payloadObj,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (checkStatus.data.hasOwnProperty("error")) {
        return checkStatus.data.error;
      }
 
      if (checkStatus.data.hasOwnProperty("data")) {        
        return { status: checkStatus.status, data: checkStatus.data.data };
      }
    } catch (error) {
      return error;
    }
  }


  async getWithdrawStatus(payload: StatusPayload) {
    try {
      let token: any = await this.login();
      if (token === 'ENOTFOUND' || token[0] ==='invalid_credentials') {
        return token;
      }
      let payloadObj = await this.determineRequestPayload(payload);
      const checkStatus = await axios.post(
        "https://payments.ogenzo.ml/api/v1/user/wallet/withdraw/status",
        payloadObj,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      ); 
      if (checkStatus.data.hasOwnProperty("error")) {
        return checkStatus.data.error;
      }
 
      if (checkStatus.data.hasOwnProperty("data")) {        
        return { status: checkStatus.status, data: checkStatus.data.data };
      }
    } catch (error) {
      return error;
    }
  }

  async deposit(deposit: MOMOPayload) {
    try {
      let token = await this.login();
      if (token === 'ENOTFOUND' || token[0] ==='invalid_credentials') {
        return token;
      }
      let depositObj = await this.determineRequestPayload({ ...deposit, note: deposit.msg });
      const response = await axios.post(
        "https://payments.ogenzo.ml/api/v1/user/wallet/deposit",
        depositObj,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      if (response.data.hasOwnProperty("error")) {
        return response.data.error;
      }
 
      if (response.data.hasOwnProperty("data")) {
        const checkStatus = await axios.post(
          "https://payments.ogenzo.ml/api/v1/user/wallet/deposit/status",
          depositObj,
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );
        return { status: checkStatus.status, data: checkStatus.data };
      }
    } catch (error) {
      return error.errno
    }
  };

  async withdraw(withdraw: MOMOPayload) {
    try {
      let token: any = await this.login();
      if (token === 'ENOTFOUND' || token[0] ==='invalid_credentials') {
        return token;
      }
      let withdrawObj = await this.determineRequestPayload({ ...withdraw, note: withdraw.msg });
      const response = await axios.post(
        "https://payments.ogenzo.ml/api/v1/user/wallet/withdraw",
        withdrawObj,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (response.data.hasOwnProperty("error")) {
        return response.data.error;
      }

      if (response.data.hasOwnProperty("data")) {
        const checkStatus = await axios.post(
          "https://payments.ogenzo.ml/api/v1/user/wallet/withdraw/status",
          withdrawObj,
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );
        return { status: checkStatus.status, data: checkStatus.data };
      }
    } catch (error) {
      return error;
    }
  }

}




