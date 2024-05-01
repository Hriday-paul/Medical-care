const testStore = require('../model/tests');

const addNewTest = async (req, res) => {
    try {
        const testData = req.body;
        const result = await testStore.collection.insertOne(testData);
        res.send(result);
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}

const allTests = async (req, res) => {
    try {
        let result = [];
        if (req.query.type == 'valid') {
            result = await testStore.find({ testDate: { $gte: Date.now() } });
        }
        else if (req.query.type == 'invalid') {
            result = await testStore.find({ testDate: { $lte: Date.now() } })
        } else {
            result = await testStore.find()
        }
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    }
}

const updateTest = async (req, res) => {
    try {
        const updatedData = req.body;
        const query = { _id: updatedData.id }
        delete updatedData.id;
        const finalData = {
            $set: updatedData
        }
        const result = await testStore.updateOne(query, finalData)
        res.send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

// get test details
const testDetails = async (req, res) => {
    try {
        const params = { _id: req.params.id };
        const result = await testStore.findOne(params);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

// delete a test
const deleteTest = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const result = await testStore.deleteOne(query)
        res.send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}


module.exports = {
    addNewTest,
    allTests,
    updateTest,
    testDetails,
    deleteTest
}