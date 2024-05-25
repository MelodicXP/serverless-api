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
  
  try {
    let results = null;
    let pathId = event.pathParameters;
    let requestBody = JSON.parse(event.body); 
    console.log('This is event.body for put: ', requestBody);
    
    // if event has a path id, execute 'update'on id
    if (pathId.id) {
      // update id from table with info sent in request body
      results = await personModel.update(pathId, requestBody);
    } else {
      console.log('No id present in path paramter');
    }
    
    console.log('results from update: ', results);
    
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