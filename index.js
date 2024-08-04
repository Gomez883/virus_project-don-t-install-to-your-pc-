const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');

const app = express();
const accountSid = 'ACe96a60cfc0a52803f80386ad3fb28e02'; // Replace with your Twilio account SID
const authToken = 'd3d0a165ee4fb59ee1a6b20afac0c6dc'; // Replace with your Twilio Auth Token

const client = new twilio(accountSid, authToken);

app.use(bodyParser.json());

app.post('/send-code', (req, res) => {
  const { phoneNumber, code } = req.body;
  
  client.messages
    .create({
      body: `Your verification code is: ${code}`,
      from: '07515171795', // Replace with your Twilio number
      to: phoneNumber
    })
    .then(message => res.status(200).send(`Message sent: ${message.sid}`))
    .catch(error => res.status(500).send(error));
});

app.post('/verify-code', (req, res) => {
  const { phoneNumber, code } = req.body;

  // Logic to verify code here, e.g., fetch from database and compare
  // Assume you have some function verifyCodeFromDatabase(phoneNumber, code)
  const isValid = verifyCodeFromDatabase(phoneNumber, code);

  if (isValid) {
    res.status(200).send('Code verified, access granted.');
  } else {
    res.status(401).send('Wrong credentials.');
  }
});

function verifyCodeFromDatabase(phoneNumber, code) {
  // Implement the verification logic based on your database setup
  // Return true if code is correct, false otherwise
  return true; // Example return value
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
