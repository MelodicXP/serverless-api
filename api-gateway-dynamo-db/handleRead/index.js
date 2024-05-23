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

exports.handler = async(event) => {
  console.log('event body: ', event.body );
  
  // initialize response
  const response = {statusCode: null, body: null};
  
  try {
    // request all data from database
    let results = await personModel.scan().exec();
    console.log('results from database: ', results);
    // send back response with results and success 200
    response.body = JSON.stringify(results);
    response.statusCode = 200;
  } catch (e) {
    // send back response with error message and status code 500
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }
    
  return response;
};