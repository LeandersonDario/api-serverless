const { ObjectID } = require('mongodb');
const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {
  const { id } = req.params;

  if (!id) {
    context.res = {
      status: 400,
      body: 'Não foi possível encontrar o produto',
    };

    return;
    }
  
    const { client: MongoClient, closeConnectionFn } = await createMongoClient();
    const Produtos = MongoClient.collection('products');
    const body = await Produtos.findOne({ _id: ObjectID(id) });
  
    closeConnectionFn();
    context.res = { status: 200, body };
}