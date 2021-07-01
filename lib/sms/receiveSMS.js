
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const sendSms = require('./sendSMS');
const restaurantDb = require('../database/restaurant_queries');
const customerDb = require('../database/customer_queries');

function isNumeric(str) {

  // Check if input is string
  if (typeof str != "string")
    return false

  // Use type coercion to parse the _entirety_ of the string
  // (`parseFloat` alone does not do this).
  // Also ensure that the strings whitespaces fail
  return !isNaN(str) &&
    !isNaN(parseFloat(str))
}

const handleSMSReceived = function(req, res) {
  const orderStatus = ['accepted', 'ready', 'completed', 'rejected']
  const messageReceived = req.body.Body;
  const fromNumber = req.body.From;
  const splitMessage = messageReceived.split(": ");
  //Check input message validity
  if ((splitMessage.length < 2) || !isNumeric(splitMessage[0]) || !orderStatus.includes(splitMessage[1].toLowerCase()) || (splitMessage[1].toLowerCase() === 'accepted' && !isNumeric(splitMessage[2])) || (['ready', 'completed'].includes(splitMessage[1].toLowerCase()) && splitMessage.length !== 2) || (['rejected', 'accepted'].includes(splitMessage[1].toLowerCase()) && splitMessage.length !== 3)) {
    //Respond with error message to restaurant
    const twiml = new MessagingResponse();
    twiml.message(`Please check the message format :
    <Order#>: accepted: <time_expected_minutes>
        or
        <Order#>: ready
        or
        <Order#>: completed
        or
        <Order#>: rejected: <reason>
        to update status`);

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
    return;
  }
  const newOrderStatus = splitMessage[1].toLowerCase();
  const orderId = parseInt(splitMessage[0]);
  //retreive restaurant using phonenumber
  //check restaurant id with the one linked to order
  const promiseArr = [];
  promiseArr.push(restaurantDb.getRestaurantAndOrderWithPhonenumberAndOrderID(fromNumber, orderId));
  promiseArr.push(customerDb.getOrderAndCustomerFromOrderId(orderId));
  Promise.all(promiseArr)
    .then(data => {
      //update status in DB
      const orderRelation = data[0];
      const customerOrder = data[1];
      let promise1;
      let message;
      if (newOrderStatus === 'rejected') {
        promise1 = restaurantDb.deleteRejectedOrderWithId(orderRelation.order_id);
        message = `Your order #${orderRelation.order_id} has been rejected. Reason : ${splitMessage[2]}`;
      } else {
        promise1 = restaurantDb.updateOrderStatus(orderRelation.order_id, newOrderStatus);
        message = `The status of your order #${orderRelation.order_id} is ${newOrderStatus}. `;
        if (newOrderStatus === 'accepted') {
          message += `Your expected wait time is ${splitMessage[2]} minutes`;
        }
      }
      const promise2 = sendSms.sendSMS(customerOrder.phone_number, message);
      return Promise.all([promise1, promise2]);
    })
    .then(data => {
      const twiml = new MessagingResponse();
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
    })
    .catch(e => {
      console.log(e);
    });
};
exports.handleSMSReceived = handleSMSReceived;
