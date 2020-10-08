const { ObjectID } = require('mongodb');
const createMongoClient = require('../shared/mongoClient');


module.exports = async function (context, req) {
  const { id } = req.params;
  const produto = req.body || {};
  
  if (!id || !produto) {
    context.res = {
      status: 400,
      body: 'Não foi possível atualizar o produto devido ao parametros fornecido',
    };
    return;
  }

  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  const Produtos = MongoClient.collection('products');
 
  try {
    const produtos = await Produtos.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: produto },
    );
    closeConnectionFn();
    context.res = { status: 200, body: produtos };
  } catch (error) {
    context.res = {
      status: 500,
      body: 'Erro ao atualizar produto',
    }; 
  }
}