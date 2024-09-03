const https = require('https');
const crypto = require('crypto');
require('dotenv').config();

// API configuration
const API_CONFIG = {
  API_KEY: process.env.OKX_API_KEY,
  SECRET_KEY: process.env.OKX_SECRET_KEY,
  PASSPHRASE: process.env.OKX_PASSPHRASE,
  PROJECT: process.env.OKX_PROJECT
};

const BASE_URL = 'https://www.okx.com';
const ENDPOINT = '/api/v5/mktplace/nft/ordinals/listings';

function createSignature(timestamp, method, requestPath, body) {
  const message = timestamp + method + requestPath + (body || '');
  return crypto.createHmac('sha256', API_CONFIG.SECRET_KEY)
    .update(message)
    .digest('base64');
}

async function fetchBitmapListings() {
  const timestamp = new Date().toISOString();
  const method = 'POST';
  const requestPath = ENDPOINT;
  const body = JSON.stringify({
    slug: 'bitmap',
    limit: '100',
    isBrc20: 'false'
  });

  const signature = createSignature(timestamp, method, requestPath, body);

  const options = {
    hostname: 'www.okx.com',
    port: 443,
    path: requestPath,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'OK-ACCESS-KEY': API_CONFIG.API_KEY,
      'OK-ACCESS-SIGN': signature,
      'OK-ACCESS-TIMESTAMP': timestamp,
      'OK-ACCESS-PASSPHRASE': API_CONFIG.PASSPHRASE,
      'OK-ACCESS-PROJECT': API_CONFIG.PROJECT
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const responseData = JSON.parse(data);
        resolve(responseData.data.data);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(body);
    req.end();
  });
}

module.exports = { fetchBitmapListings };