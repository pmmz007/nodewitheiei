const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/protos/transactions.proto';
const server = {
  host: 'localhost',
  port: '50051'
};

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const transactionsProto = grpc.loadPackageDefinition(packageDefinition).transactions;

const main = () => {
    const { host, port } = server;
    const target = `${host}:${port}`;

    const client = new transactionsProto.Transactions(target,
        grpc.credentials.createInsecure());

    client.getAllTransactions({}, (err, response) => {
      console.log(response);
    });

    client.getTransaction({ id: 'BJjCqvc9D' }, (err, response) => {
       console.log(err || response);
    });

    client.createTransaction({
        "amount": "33947",
        "senderId": "HyvWtCyfu",
        "recipientId": "ryZQcPqcv",
        "status": "SUCCESS",
        "transactionDate": "2021-03-10T11:56:45Z"
    }, (err, response) => {
        console.log(response);
    });

    client.updateTransaction({
        "id": "r11QnPcqv",
        "status": "PENDING"
    }, (err, response) => {
        console.log(response);
    });

    client.deleteTransaction({ id: 'ryk-Aik3D'}, (err, response) => {
        console.log(response);
    })
}

main();
