const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const outgoingPhoneNumber = process.env.TWILIO_OUTGOING_PHONENUMBER;
const client = require('twilio')(accountSid, authToken);

const sendSMS = function() {
  return client.messages
    .create({
       body: 'TWILIO PLUGIN SUCCESSFUL!',
       from: outgoingPhoneNumber,
       to: '+18198560945'
     });
}
exports.sendSMS = sendSMS;
