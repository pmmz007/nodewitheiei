const getBank = (db) => {
    return (call, callback) => {
        const { id } = call.request;
        callback(null, db.banks.get(id));
    }
}

const getAllBanks = (db) => {
    return (call, callback) => {
        callback(null, { listBank: db.banks.list() });
    };
}

const createBank = (db) => {
    return (call, callback) => {
        const { request } = call;
        try {
            const result = db.banks.create(request);
            callback(null, { id: result });
        }
        catch(err) {
            throw new Error('ERROR: GRPC: ' + err.message);
        }
    }
};

const updateBank = (db) => {
    return (call, callback) => {
        const { request } = call;
        const { id } = request;
        const { banks } = db;

        try {
            const bank = banks.get(id);

            Object.keys(request).forEach((key) => {
                bank[`${key}`] = request[`${key}`] || bank[`${key}`];
            });

            banks.update(bank);

            callback (null, { message: "SUCCESS" });
        }
        catch(err) {
            throw new Error('ERROR: GRPC: ' + err.message);
        }
    }
};

const deleteBank = (db) => {
    return (call, callback) => {
        const { request } = call;
        const { id } = request;
        const { banks } = db;

        try {
            banks.delete(id);
            callback (null, { message: "SUCCESS" });
        }
        catch(err) {
            throw new Error('ERROR: GRPC: ' + err.message);
        }
    }
}

const createBanksHandler = (db) => {
    return {
        getBank: getBank(db),
        getAllBanks: getAllBanks(db),
        createBank: createBank(db),
        updateBank: updateBank(db),
        deleteBank: deleteBank(db)
    }
}

module.exports =  createBanksHandler;


