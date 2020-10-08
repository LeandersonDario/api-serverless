const { ObjectID } = require('mongodb');
const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {
  const { id } = req.params;

  if (!id) {
    context.res = {
      status: 400,
      body: 'Não foi possível excluir o produto devido ao parametro passado',
    };
    return;
  }

  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  const Produtos = MongoClient.collection('products');
  
  try {
    await Produtos.findOneAndDelete({ _id: ObjectID(id) });
    closeConnectionFn();
    context.res = {
      status: 200,
      body: 'Produto deletado com sucesso!',
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: 'Erro ao excluir produto ' + id,
    };
  }
}