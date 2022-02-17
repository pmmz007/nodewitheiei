const getTransaction = (db) => {
    return (call, callback) => {
        const { id } = call.request;
        callback(null, db.transactions.get(id));
    }
}

const getAllTransactions = (db) => {
    return (call, callback) => {
        callback(null, { listTransaction: db.transactions.list() });
    };
}

const createTransaction = (db) => {
    return (call, callback) => {
        const { request } = call;
        try {
            const result = db.transactions.create(request);
            callback(null, { id: result });
        }
        catch(err) {
            throw new Error('ERROR: GRPC: ' + err.message);
        }
    }
};

const updateTransaction = (db) => {
    return (call, callback) => {
        const { request } = call;
        const { id } = request;
        const { transactions } = db;

        try {
            const transaction = transactions.get(id);

            Object.keys(request).forEach((key) => {
                transaction[`${key}`] = request[`${key}`] || transaction[`${key}`];
            });

            transactions.update(transaction);

            callback (null, { message: "SUCCESS" });
        }
        catch(err) {
            throw new Error('ERROR: GRPC: ' + err.message);
        }
    }
};

const deleteTransaction = (db) => {
    return (call, callback) => {
        const { request } = call;
        const { id } = request;
        const { transactions } = db;

        try {
            transactions.delete(id);
            callback (null, { message: "SUCCESS" });
        }
        catch(err) {
            throw new Error('ERROR: GRPC: ' + err.message);
        }
    }
}

const createTransactionsHandler = (db) => {
    return {
        getTransaction: getTransaction(db),
        getAllTransactions: getAllTransactions(db),
        createTransaction: createTransaction(db),
        updateTransaction: updateTransaction(db),
        deleteTransaction: deleteTransaction(db)
    }
}

module.exports =  createTransactionsHandler;


