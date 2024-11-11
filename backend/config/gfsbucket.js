const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.URL 
const conn = mongoose.createConnection(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true });

let gfsBucket;

conn.once('open', () => {
  gfsBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
  console.log('GridFSBucket initialized');
});

// Export a function that returns the initialized gfsBucket
const getGfsBucket = () => {
  if (!gfsBucket) {
    throw new Error('gfsBucket is not initialized yet');
    console.log('gfsBucket:', gfsBucket);
  }
  return gfsBucket;
};

module.exports = { getGfsBucket,conn };
