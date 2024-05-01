const userStore = require('../model/users')

const checkIsAdmin = async (req, res) => {
    try {
        const user = await userStore.findOne({ email: req.params.email });
        let admin = false;
        if (user) {
            admin = user?.role === 'admin';
        }
        res.send({ admin });
    } catch (err) {
        res.status(402).send({ err : err.message })
    }
}

// add or update user
const addOrUpdateUser = async (req, res) => {
    try {
        const filter = { email: req.body.email }
        const options = { upsert: true };
        const updateDoc = {
            $set: { ...req.body, role: 'user' }
        }
        const result = await userStore.updateOne(filter, updateDoc, options);
        res.send(result);
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}

// get all users
const allUsers = async (req, res) => {
    try {
        const result = await userStore.find({ role: { $ne: 'admin' } },
            {
                password: 0,
            }
        );
        res.send(result);
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}

module.exports = {
    checkIsAdmin,
    addOrUpdateUser,
    allUsers
}