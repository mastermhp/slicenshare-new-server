const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const xss = require('xss-clean');
const path = require('path');
const connectmongoDB = require('./config/mongodbConfig.js');

const homepageRoutes = require('./v1/routes/homepage');
const productRoutes = require('./v1/routes/product');
const streamerRoutes = require('./v1/routes/streamer');
const cartRoutes = require('./v1/routes/cart');

dotenv.config();
const app = express();
connectmongoDB();

// Define CORS options
const corsOptions = {
  origin: [
    `http://localhost:${process.env.PORT}`,
    'https://slicenshare.vercel.app',
    `https://slicenshare-new-server.vercel.app`
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browsers
};
app.use(xss());
app.use(express.json());
// Apply CORS middleware globally
app.use(cors(corsOptions));
// Handle preflight requests with CORS
app.options('*', cors(corsOptions));
// Serve static files with correct MIME types
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.ico')) {
      res.setHeader('Content-Type', 'image/x-icon');
    }
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  },
}));
app.get(['/api/v1', '/api/v1/'], (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API v1 Response</title>
      <link rel="icon" type="image/x-icon" href="/public/favicon.ico">
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f4;
          margin: 0;
        }
        .container {
          text-align: center;
          padding: 20px;
          border-radius: 8px;
          background-color: #ffffff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
        }
        p {
          color: #555;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to SliceNShare API v1</h1>
        <p>This is the HTML response for the <i>/api/v1</i> endpoint.</p>
      </div>
    </body>
    </html>
  `);
});

app.use('/api/v1/homepage', homepageRoutes);

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/streamers', streamerRoutes);

app.use('/api/v1/cart', cartRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log(`Server running on port ${process.env.BASE_URL}`);
});