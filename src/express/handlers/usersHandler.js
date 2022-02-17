
const get = (req, res) => {
    const { db: { users } } = req;
    res.send(users.list());
};

const getOne = (req, res) => {
    const { db: { users } } = req;
    res.send(users.get(req.params.id));
}

const post = (req, res) => {
    const { db: { users } } = req;
    try {
        const result = users.create(req.body);
        res.send(result);
    }
    catch(err) {
        res.send('ERROR: ' + err.message);
    }
};

const patch = (req, res) => {
    const { db: { users } } = req;
    try {
        const user = users.get(req.params.id);
        Object.keys(req.body).forEach((key) => {
            user[`${key}`] = req.body[`${key}`];
        });
        const result = users.update(user);
        res.send('SUCCESS');
    }
    catch(err) {
        res.send('ERROR: ' + err.message);
    }
};

const remove = (req, res) => {
    const { db: { users } } = req;
    try {
        const result = users.delete(req.params.id);
        res.send('SUCCESS');
    }
    catch(err) {
        res.send('ERROR: ' + err.message);
    }
};

module.exports = {
    get,
    getOne,
    post,
    patch,
    remove
}
