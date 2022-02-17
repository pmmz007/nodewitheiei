const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const db = require('../db');
const {
  createUsersHandler,
  createBanksHandler,
  createTransactionsHandler
} = require('./handlers');

const host = '0.0.0.0';
const port = '50051';

const loadSyncOptions = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
};

const USER_PROTO_PATH = __dirname + '/protos/users.proto';
const userPackageDefinition = protoLoader.loadSync(USER_PROTO_PATH, loadSyncOptions);
const usersProto = grpc.loadPackageDefinition(userPackageDefinition).users;

const BANK_PROTO_PATH = __dirname + '/protos/banks.proto';
const bankPackageDefinition = protoLoader.loadSync(BANK_PROTO_PATH, loadSyncOptions);
const banksProto = grpc.loadPackageDefinition(bankPackageDefinition).banks;

const TRANSACTION_PROTO_PATH = __dirname + '/protos/transactions.proto';
const transactionPackageDefinition = protoLoader.loadSync(TRANSACTION_PROTO_PATH, loadSyncOptions);
const transactionsProto = grpc.loadPackageDefinition(transactionPackageDefinition).transactions;

/**
 * Starts an RPC server
 */
const main = () => {
    const server = new grpc.Server();

    server.addService(usersProto.Users.service, createUsersHandler(db));
    server.addService(banksProto.Banks.service, createBanksHandler(db));
    server.addService(transactionsProto.Transactions.service, createTransactionsHandler(db));

    console.log(`Starting grpc-server at ${host}:${port} ...`);

    server.bindAsync(`${host}:${port}`, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log(`Server started!`);
    });
}

main();
