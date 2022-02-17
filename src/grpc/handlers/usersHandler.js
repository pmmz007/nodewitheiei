const getUser = (db) => {
    return (call, callback) => {
        const { id } = call.request;
        callback(null, db.users.get(id));
    }
}

const getAllUsers = (db) => {
    return (call, callback) => {
        callback(null, { listUser: db.users.list() });
    };
}

const createUser = (db) => {
    return (call, callback) => {
        const { request } = call;
        try {
            const result = db.users.create(request);
            callback(null, { id: result });
        }
        catch(err) {
            throw new Error('ERROR: GRPC: ' + err.message);
        }
    }
};

const updateUser = (db) => {
    return (call, callback) => {
        const { request } = call;
        const { id } = request;
        const { users } = db;

        try {
            const user = users.get(id);

            Object.keys(request).forEach((key) => {
                user[`${key}`] = request[`${key}`] || user[`${key}`];
            });

            users.update(user);

            callback (null, { message: "SUCCESS" });
        }
        catch(err) {
            throw new Error('ERROR: GRPC: ' + err.message);
        }
    }
};

const deleteUser = (db) => {
    return (call, callback) => {
        const { request } = call;
        const { id } = request;
        const { users } = db;

        try {
            users.delete(id);
            callback (null, { message: "SUCCESS" });
        }
        catch(err) {
            throw new Error('ERROR: GRPC: ' + err.message);
        }
    }
}

const createUsersHandler = (db) => {
    return {
        getUser: getUser(db),
        getAllUsers: getAllUsers(db),
        createUser: createUser(db),
        updateUser: updateUser(db),
        deleteUser: deleteUser(db)
    }
}

module.exports =  createUsersHandler;


