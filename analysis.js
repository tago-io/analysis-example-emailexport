'use strict';
const Analysis = require('tago/analysis');
const Utils    = require('tago/utils');
const Device   = require('tago/device');
const Service  = require('tago/services');
const co       = require('co');

function init(context) {
  // Use tago library to convert the environment variables to json
  // and check if the variables are correct
  const env_var = Utils.env_to_obj(context.environment);
  if (!env_var.device_token) return context.log("Missing device_token environment variable");
  else if (!env_var.email) return context.log("Missing email environment variable");
  
  // Create the device object to be used later
  const device = new Device(env_var.device_token);
  
  context.log('Starting CSV export to EMAIL');
  co(function*() {
    // Get 5 last records of fuel_level in the device bucket.
    const fuel_list = yield device.find({variable: 'fuel_level', qty: 5});

    // Create the text of the CSV, being Fuel Level the header
    let csv = `Fuel Level`;

    // For each record in the fuel_list, it will put the value in the csv text.
    // Use \n to break a line.
    fuel_list.forEach((fuel_item) => {
      csv = `${csv},\n${fuel_item.value}`;
    });

    // Print the csv text to the tago analysis console, as a preview of what is to be sended.
    context.log(csv);

    // Start the email service
    const email = new Service(context.token).email;

    // Pass to .send function the email addres, subject, body_msg, from and attachment.
    // See the docs to know what is optional.
    const email_address = env_var.email;
    const subject       = 'Exported File from Tago';
    const body_msg      = 'This is an example of a body message in the email';
    const from          = 'tago@tago.io';
    const attachment    = {
      archive: csv,
      filename: 'exportedfile.csv'
    };

    // Send the email. Use yield so any error or exception will be send to .catch at line 45
    // to be handled.
    yield email.send(email_address, subject, body_msg, from, attachment).then(context.log);
  }).catch(context.log);
  
}

module.exports = new Analysis(init, 'MY-ANALYSIS-TOKEN-HERE');