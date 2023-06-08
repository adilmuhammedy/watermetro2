const express = require('express');
const app = express();
const cors = require('cors');
const qrcode = require('qrcode');
//hey
// Enable CORS
app.use(cors());
// Parse JSON request bodies
app.use(express.json());
// Define an API endpoint to handle the form submission
app.post('/bookticket', async (req, res) => {
  const { from, to, ticketType, passengerCount } = req.body;
  // Process the data and perform necessary operations
  // ...
  if (from === "SELECT" || to === "SELECT" || ticketType === "" || passengerCount === "") {
    res.status(400).json({ message: 'Please fill all the fields' });
    return;
  }
  console.log('Form submitted:', { from, to, ticketType, passengerCount });
  try {
    // Generate the QR code
    const qrCode = await qrcode.toDataURL(JSON.stringify({ from, to, ticketType, passengerCount }));
    // Return the QR code data URL
    res.json({ message: 'Form submitted successfully', qrCode });
    console.log("raondom qr code");
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Start the server
app.listen(4000, () => {
  console.log('Backend server is running on port 4000');
});
