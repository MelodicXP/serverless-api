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
  console.log('the path parameter: ', event.pathParameters.id);
  
  // initialize response
  const response = {statusCode: null, body: null};
  
  try {
    let results = null;
    let pathId = event.pathParameters.id;
    
    // if event has a path id, execute 'get one'from database
    if (pathId) {
      // scan all items and filter all items where the key `id` contains `event.pathParameters.id`
      results = await personModel.scan("id").contains(pathId).exec();
    } else {
      // request all data from database
      results = await personModel.scan().exec();
    }
    
    console.log('results from database (people): ', results);
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