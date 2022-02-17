const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/protos/banks.proto';
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
const banksProto = grpc.loadPackageDefinition(packageDefinition).banks;

const main = () => {
    const { host, port } = server;
    const target = `${host}:${port}`;

    const client = new banksProto.Banks(target,
        grpc.credentials.createInsecure());

    client.getAllBanks({}, (err, response) => {
      console.log(response);
    });

    client.getBank({ id: 'BJxBKwccP' }, (err, response) => {
       console.log(err || response);
    });

    client.createBank({
        "name": "Bank E"
    }, (err, response) => {
        console.log(response);
    });

    client.updateBank({
        "id": "SJJDvoJ2w",
        "name": "Bank F"
    }, (err, response) => {
        console.log(response);
    });

    client.deleteBank({ id: 'SJJDvoJ2w'}, (err, response) => {
        console.log(response);
    })
}

main();
