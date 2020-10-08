const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {
  const produto = req.body || {};
  
  if (produto) {
    context.res = {
      status: 400,
      body: 'Não foi possivel criar o produto',
    };
  }

  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  const Produtos = MongoClient.collection('products');
  
  try {
    const produtos = await Produtos.insert(produto);
    closeConnectionFn();
    context.res = { status: 201, body: produtos.ops[0] };
  } catch (error) {
    context.res = {
      status: 500,
      body: 'Erro ao inserir produto',
    }; 
  }
}