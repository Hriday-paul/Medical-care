const reservationStore = require('../model/reservations');
const testStore = require('../model/tests');


//  add reservation
const addOrUpdateReservation = async (req, res) => {
    try {
        const query = { testId: req.body.testId, name: req.body.name, email: req.body.email };
        const options = { upsert: true };
        const finalData = {
            $set: { ...req.body, testId: req.body.testId, report: 'pending' }
        };
        const result = await reservationStore.updateOne(query, finalData, options);
        if (result.upsertedCount >= 1) {
            await testStore.updateOne(
                { _id: req.body.testId },
                { $inc: { slot: -1 } }
            )
        }
        res.send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

// get all reservation
const getReservations = async (req, res) => {
    try {
        let result = []
        if (req.query.type == 'all') {

            result = await reservationStore.aggregate(
                [
                    {
                        $lookup: {
                            from: 'tests',
                            localField: 'testId',
                            foreignField: '_id',
                            as: 'testDetails'
                        }
                    }
                ])
        }
        else if (req.query.type == 'pending') {
            result = await reservationStore.aggregate(
                [
                    { $match: { report: 'pending' } },
                    {
                        $lookup: {
                            from: 'tests',
                            localField: 'testId',
                            foreignField: '_id',
                            as: 'testDetails'
                        }
                    }
                ])
        }
        else if (req.query.type == 'complete') {
            result = await reservationStore.aggregate(
                [
                    { $match: { report: 'complete' } },
                    {
                        $lookup: {
                            from: 'tests',
                            localField: 'testId',
                            foreignField: '_id',
                            as: 'testDetails'
                        }
                    }
                ])
        }
        else if (req.query.type == 'cencel') {
            result = await reservationStore.aggregate(
                [
                    { $match: { report: 'cencel' } },
                    {
                        $lookup: {
                            from: 'tests',
                            localField: 'testId',
                            foreignField: '_id',
                            as: 'testDetails'
                        }
                    }
                ])
        }
        else {
            result = [];
        }
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const updateResurvation = async (req, res) => {
    try {
        const updatedData = req.body;
        const query = { _id: updatedData.patientId }
        delete updatedData.patientId;
        const finalData = {
            $set: updatedData
        }
        const result = await reservationStore.updateOne(query, finalData)
        res.send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const getTestByUser = async (req, res) => {
    try {
        let result = []
        if (req.query.type == 'all') {

            result = await reservationStore.aggregate(
                [
                    { $match: { email: req.params.email } },
                    {
                        $lookup: {
                            from: 'tests',
                            localField: 'testId',
                            foreignField: '_id',
                            as: 'testDetails'
                        }
                    }
                ])
        }
        else if (req.query.type == 'pending') {
            result = await reservationStore.aggregate(
                [
                    { $match: { email: req.params.email, report: 'pending' } },
                    {
                        $lookup: {
                            from: 'tests',
                            localField: 'testId',
                            foreignField: '_id',
                            as: 'testDetails'
                        }
                    }
                ])
        }
        else if (req.query.type == 'complete') {
            result = await reservationStore.aggregate(
                [
                    { $match: { email: req.params.email, report: 'complete' } },
                    {
                        $lookup: {
                            from: 'tests',
                            localField: 'testId',
                            foreignField: '_id',
                            as: 'testDetails'
                        }
                    }
                ])
        }
        else if (req.query.type == 'cencel') {
            result = await reservationStore.aggregate(
                [
                    { $match: { email: req.params.email, report: 'cencel' } },
                    {
                        $lookup: {
                            from: 'tests',
                            localField: 'testId',
                            foreignField: '_id',
                            as: 'testDetails'
                        }
                    }
                ])
        }
        else {
            result = [];
        }
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

// delete a appoinments or resurvation
const deleteAppoinment = async (req, res) => {
    try {
        const result = await reservationStore.deleteOne({ _id: req.params.id });
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

// most sell resurvation
const mostSellResurvation = async (req, res) => {
    try {
        const result = await reservationStore.aggregate([
            {
                $group: {
                    _id: { testId: "$testId" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 4
            }
        ]);

        const idList = result.map((list) => {
            return list._id.testId
        })

        const resultCollection = await testStore.find({ "_id": { $in: idList } });

        res.send(resultCollection)
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const getUserDashBoardCount = async (req, res) => {
    try {
        const reserveResult = await reservationStore.countDocuments({ email: req.params.email, report: 'complete' })
        const totalAppoinments = await reservationStore.countDocuments({ email: req.params.email })
        res.send({ reserveResult, totalAppoinments })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}

module.exports = {
    addOrUpdateReservation,
    getReservations,
    updateResurvation,
    getTestByUser,
    deleteAppoinment,
    mostSellResurvation,
    getUserDashBoardCount
}