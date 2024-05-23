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
  // log body to ensure in proper format
  let parsedBody = JSON.parse(event.body);
  console.log(parsedBody);
  
  // initialize response
  const response = {
      statusCode: null,
      body: null,
  };
  
  // create new person and add to db, catch error
  try {
    let newPerson = await personModel.create(parsedBody);
    response.body = JSON.stringify(newPerson);
    response.statusCode = 200;
  } catch (e) {
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }
  
  return response;
};