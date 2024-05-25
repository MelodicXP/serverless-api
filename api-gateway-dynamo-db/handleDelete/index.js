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

// main execution
exports.handler = async(event) => {
  console.log('the path parameter: ', event.pathParameters);
  
  // initialize response
  const response = {statusCode: null, body: null};
  let pathId = event.pathParameters.id;
  
  if (pathId) {
    try {
      // delete id from table
      await personModel.delete(pathId);
      response.body = "Successfully deleted person";
      response.statusCode = 200;
    } catch (error) {
      // send back response with error message and status code 500
      response.body = JSON.stringify(error.message);
      response.statusCode = 500;
    }
  } else {
    // send back response with error message and status code 500
    response.body = "No id present in path paramter";
    response.statusCode = 500;
  }
  
  return response;
};