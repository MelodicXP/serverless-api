// third party library
const dynamoose = require('dynamoose');

// create schema
const schema = new dynamoose.Schema({
  "id": String,
  "name": String,
  "phone": String,
});

// create model to use in 'people' database
const personModel = dynamoose.model('people', schema)

// main execution when event comes in
exports.handler = async(event) => {
  let parsedBody = JSON.parse(event.body);
  console.log(parsedBody);
  
  // TODO implement
  const response = {
      statusCode: 200,
      body: JSON.stringify(''),
  };
  return response;
};