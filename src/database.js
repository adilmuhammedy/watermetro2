const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
// Enable CORS
app.use(cors());
// Parse JSON request bodies
app.use(express.json());
// Define the '/bookticket' route handler
app.post('/bookticket', async (req, res) => {
  const { from, to, ticketType, nopass } = req.body;
  console.log("Form Data:", req.body);
  try {
    // Connect to the MongoDB server
    const client = await MongoClient.connect(url, options);
    console.log('Connected to MongoDB server');
    // Select the database and collection
    const collection = client.db('watermetro').collection('ticketfare');
    // Create a query object with the "from" and "to" values
    const query = { from: from, to: to };
    // Find the document that matches the query in the collection
    const foundDocument = await collection.findOne(query);
    // Retrieve the fare value from the document
    if (foundDocument) {
      let fare = foundDocument.fare;
      if (ticketType === '2') {
        fare = fare * 2;
      }
      if (nopass > 1) {
        fare = fare * nopass;
      }
    } else {
      console.log('Fare not found for the given "from" and "to" stations.');
      res.status(404).json({ message: 'Fare not found' });
    }
    // Close the MongoDB connection
    client.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error retrieving document:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/confirmation', async (req, res) => {
  const { from, to, ticketType, nopass } = req.body;
  console.log("Form Data:", req.body);
  try {
    // Connect to the MongoDB server
    const client = await MongoClient.connect(url, options);
    console.log('Connected to MongoDB server');
    // Select the database and collection
    const collection = client.db('watermetro').collection('ticketfare');
    // Create a query object with the "from" and "to" values
    const query = { from: from, to: to };
    // Find the document that matches the query in the collection
    const foundDocument = await collection.findOne(query);
    // Retrieve the fare value from the document
    if (foundDocument) {
      let fare = foundDocument.fare;
      if (ticketType === 'Two-way') {
        fare = fare * 2;
      }
      if (nopass > 1) {
        fare = fare * nopass;
      }
      res.json({ fare });
      console.log('fare:', fare, 'ruppees');
    } else {
      console.log('Fare not found for the given "from" and "to" stations.');
      res.status(404).json({ message: 'Fare not found' });
    }
    // Close the MongoDB connection
    client.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error retrieving document:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Start the server
app.listen(4000, () => {
  console.log('Backend server is running on port 4000');
});