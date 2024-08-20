import { MongoClient } from "mongodb";

const uri = "mongodb://admin:admin@localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("tcc-comparation");

    const clientesCollection = database.collection("Clientes");
    const produtosCollection = database.collection("Produtos");
    const pedidosCollection = database.collection("Pedidos");
    const estoqueCollection = database.collection("Estoque");

    await clientesCollection.insertOne({
      nome: "João",
      email: "joao@example.com",
    });
    await produtosCollection.insertOne({
      nome: "Produto A",
      descricao: "Descrição A",
      preco: 100.0,
    });

    console.log("Collections and initial data created successfully!");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

console.log("is working...");
