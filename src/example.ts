import { OgenzoWidgets } from './index';

let pay = new OgenzoWidgets({
    paymentConfig: {
        email: "payments@veriftit.com",
        password: "veriftit",
        airtelWallet: "airtel-std-ac1",
        mtnWallet: "mtn-mm-bi2"
    }
});

let payments = pay.payments;

payments.deposit({
    "msg": "jkOiiO",
    "phone": "0758574612",
    "amount": 1500,
    "ref": "BOR0-918"
}).then(result => {
    console.log('result', result);
})

// payments.getDepositStatus({
//     "phone": "0758574612",
//     "ref": "BOR0-912"
//     }).then(result => {
//     console.log('DepositStatus', result);
// })


// payments.getTransacionStatus({
//     "phone": "0787434275",
//     "ref": "BOR0-917"
//     }).then(result => {
//     console.log('TransactionStatus', result);
// })


// Withdraw

// payments.withdraw({
//     "msg": "jkOiiO",
//     "phone": "0758574612",
//     "amount": 500,
//     "ref": "BOR0-912"
// }).then(result => {
//     console.log('result', result);
// })

// payments.getWithdrawStatus({
//     "phone": "0758574612",
//     "ref": "BOR0-912"
//     }).then(result => {
//     console.log('WithdrawStatus', result);
// })