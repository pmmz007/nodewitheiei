
const get = (req, res) => {
    const { db: { transactions } } = req;
    res.send(transactions.list());
};

const getOne = (req, res) => {
    const { db: { transactions } } = req;
    res.send(transactions.get(req.params.id));
}

const post = (req, res) => {
    const { db: { transactions } } = req;
    try {
        const result = transactions.create({
            ...req.body,
            status: 'PENDING',
            transactionDate: new Date()
        });
        res.send(result);
    }
    catch(err) {
        res.send('ERROR: ' + err.message);
    }
};

const patch = (req, res) => {
    const { db: { transactions } } = req;
    try {
        const transaction = transactions.get(req.params.id);
        Object.keys(req.body).forEach((key) => {
            transaction[`${key}`] = req.body[`${key}`];
        });
        const result = transactions.update(transaction);
        res.send('SUCCESS');
    }
    catch(err) {
        res.send('ERROR: ' + err.message);
    }
};

const remove = (req, res) => {
    const { db: { transactions } } = req;
    try {
        const result = transactions.delete(req.params.id);
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
