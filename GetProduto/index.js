const mongoClient = require('../shared/mongoClient');
const createMongoClient = require('../shared/mongoClient')

module.exports = async function (context, req) {
  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  const Produtos  = MongoClient.collection('products');
  const res = await Produtos.find({});
  const body = await res.toArray();
    
  closeConnectionFn();
  
  context.res = { 
    status: 200, 
    body 
  };
}


// module.exports = async function (context, req) {
//     context.log('JavaScript HTTP trigger function processed a request.');

//     const name = (req.query.name || (req.body && req.body.name));
//     const responseMessage = name
//         ? "Hello, " + name + ". This HTTP triggered function executed successfully."
//         : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//     context.res = {
//         // status: 200, /* Defaults to 200 */
//         body: responseMessage
//     };
// }