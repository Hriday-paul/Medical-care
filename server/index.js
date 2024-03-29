const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const cors = require("cors")

app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin: ['http://localhost:5173',],
//     credentials: true
// }));

app.get('/', (req, res) => {
    res.send({ message: 'Your ser is live !!!!!  ):' })
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fzz1qah.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const previesDate = (dateCount, nowYear, nowMonth, nowDate) => {
    let newMonth = 0;
    let newDate = 0;
    if ((nowYear % 4 == 0 && nowYear % 100 != 0) || nowYear % 400 == 0) {
        // if current year is leap year and current month is march and preview month is february
        if (nowMonth == 3 && nowDate - dateCount < 1) {
            newMonth = nowMonth - 1;
            newDate = 29 + (nowDate - dateCount); // because, this nowDate-5 is negetive value
        }
        // যদি এখনকার মাস থেকে ৫ বাদ দিলে মান ঋনাত্মক হয়, তাহলে আমাকে পূর্বের মাসে যেতে হবে 
        else if (nowDate - dateCount < 1) {
            // যদি পূর্বের মাস ৩০ দিনে হয় 
            if (nowMonth - 1 % 2 == 0) {
                newMonth = nowMonth - 1;
                newDate = 30 + (nowDate - dateCount); // because, this nowDate-5 is negetive value
            }
            // যদি পূর্বের মাস ৩১ দিনে হয় 
            else if (nowMonth - 1 % 2 != 0) {
                newMonth = nowMonth - 1;
                newDate = 31 + (nowDate - dateCount);
            }
        }
        else {
            newMonth = nowMonth;
            newDate = nowDate - dateCount;
        }
    }
    else {
        if (nowMonth == 3 && nowDate - dateCount < 1) {
            newMonth = nowMonth - 1;
            newDate = 28 + (nowDate - dateCount); // because, this nowDate-5 is negetive value
        }
        // যদি এখনকার মাস থেকে ৫ বাদ দিলে মান ঋনাত্মক হয়, তাহলে আমাকে পূর্বের মাসে যেতে হবে 
        else if (nowDate - dateCount < 1) {
            // যদি পূর্বের মাস ৩০ দিনে হয় 
            if (nowMonth - 1 % 2 == 0) {
                newMonth = nowMonth - 1;
                newDate = 30 + (nowDate - dateCount); // because, this nowDate-5 is negetive value
            }
            // যদি পূর্বের মাস ৩১ দিনে হয় 
            else if (nowMonth - 1 % 2 != 0) {
                newMonth = nowMonth - 1;
                newDate = 31 + (nowDate - dateCount);
            }
        }
        else {
            newMonth = nowMonth;
            newDate = nowDate - dateCount;
        }
    }

    return (`${nowYear}-${newMonth}-${newDate}`)
}

const prevDateList = (req, res, next) => {
    const currentDay = new Date().getDate();
    const currentMonth = (new Date().getMonth()) + 1;
    const currentYear = new Date().getFullYear();
    const dateList = []

    for (let i = 0; i < parseInt(req.params.prevDays); i++) {
        const date = previesDate(i, currentYear, currentMonth, currentDay);
        dateList.unshift(date);
    }
    // return dateList
    req.dateList = dateList
    next();
}


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const dataBase = client.db("medicare");
        const userList = dataBase.collection("users");
        const testList = dataBase.collection("tests");
        const reservationList = dataBase.collection("reservations");

        //get admin
        app.get("/isAdmin/:email", async (req, res) => {
            try {
                const user = await userList.findOne({ email: req.params.email });
                let admin = false;
                if (user) {
                    admin = user?.role === 'admin';
                }
                res.send({ admin });
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        // update & creat user
        app.put('/user', async (req, res) => {
            try {
                const filter = { email: req.body.email }
                const options = { upsert: true };
                const updateDoc = {
                    $set: { ...req.body, role: 'user' }
                }
                const result = await userList.updateOne(filter, updateDoc, options);
                res.send(result);
            } catch (err) {
                res.status(400).send({ message: err.message })
            }
        })

        // get all users
        app.get('/users', async (req, res) => {
            try {
                const result = await userList.find({ email: { $ne: 'admin@gmail.com' } },
                    {
                        password: 0,
                    }
                ).toArray();
                res.send(result);
            } catch (err) {
                res.status(400).send({ message: err.message })
            }
        })

        // add new test
        app.post('/addTest', async (req, res) => {
            try {
                const testData = req.body;
                const result = await testList.insertOne(testData);
                res.send(result);
            } catch (err) {
                res.status(400).send({ message: err.message })
            }
        })

        // get all test
        app.get('/allTest', async (req, res) => {
            try {
                let result = [];
                if (req.query.type == 'valid') {
                    result = await testList.find({ testDate: { $gte: Date.now() } }).toArray();
                }
                else if (req.query.type == 'invalid') {
                    result = await testList.find({ testDate: { $lte: Date.now() } }).toArray();
                } else {
                    result = await testList.find().toArray();
                }
                res.send(result);
            } catch (err) {
                console.log(err);
                res.status(400).send({ message: err.message });
            }
        })

        // update test
        app.put('/updateTest', async (req, res) => {
            try {
                const updatedData = req.body;
                const query = { _id: new ObjectId(updatedData.id) }
                delete updatedData.id;
                const finalData = {
                    $set: updatedData
                }
                const result = await testList.updateOne(query, finalData)
                res.send(result);
            } catch (err) {
                res.status(400).send({ message: err.message });
            }
        })

        // get specifiq test details
        app.get('/test/:id', async (req, res) => {
            try {
                const params = { _id: new ObjectId(req.params.id) };
                const result = await testList.findOne(params);
                res.status(200).send(result);
            } catch (err) {
                res.status(400).send({ message: err.message });
            }
        })

        //delete a test
        app.delete('/deleteTest/:id', async (req, res) => {
            try {
                const query = { _id: new ObjectId(req.params.id) };
                const result = await testList.deleteOne(query)
                res.send(result);
            } catch (err) {
                res.status(400).send({ message: err.message });
            }
        })

        // add resurvation
        app.put('/addReservation', async (req, res) => {
            try {
                const query = { testId: new ObjectId(req.body.testId), name: req.body.name, email: req.body.email };
                const options = { upsert: true };
                const finalData = {
                    $set: { ...req.body, testId: new ObjectId(req.body.testId), report: 'pending' }
                };
                const result = await reservationList.updateOne(query, finalData, options);
                if (result.upsertedCount >= 1) {
                    await testList.updateOne(
                        { _id: new ObjectId(req.body.testId) },
                        { $inc: { slot: -1 } }
                    )
                }
                res.send(result);
            } catch (err) {
                res.status(400).send({ message: err.message });
            }
        })

        //get all Reservation
        app.get('/reservation', async (req, res) => {
            try {
                let result = []
                if (req.query.type == 'all') {

                    result = await reservationList.aggregate(
                        [
                            {
                                $lookup: {
                                    from: 'tests',
                                    localField: 'testId',
                                    foreignField: '_id',
                                    as: 'testDetails'
                                }
                            }
                        ]).toArray();
                }
                else if (req.query.type == 'pending') {
                    result = await reservationList.aggregate(
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
                        ]).toArray();
                }
                else if (req.query.type == 'complete') {
                    result = await reservationList.aggregate(
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
                        ]).toArray();
                }
                else if (req.query.type == 'cencel') {
                    result = await reservationList.aggregate(
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
                        ]).toArray();
                }
                else {
                    result = [];
                }
                res.status(200).send(result);
            } catch (err) {
                res.status(400).send({ message: err.message });
            }
        })

        //update specifiq reservation
        app.put('/updateReservation', async (req, res) => {
            try {
                const updatedData = req.body;
                const query = { _id: new ObjectId(updatedData.patientId) }
                delete updatedData.patientId;
                const finalData = {
                    $set: updatedData
                }
                const result = await reservationList.updateOne(query, finalData)
                res.send(result);
            } catch (err) {
                res.status(400).send({ message: err.message });
            }
        })

        // get user wise appoinments
        app.get('/appoinments/:email', async (req, res) => {
            try {
                let result = []
                if (req.query.type == 'all') {

                    result = await reservationList.aggregate(
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
                        ]).toArray();
                }
                else if (req.query.type == 'pending') {
                    result = await reservationList.aggregate(
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
                        ]).toArray();
                }
                else if (req.query.type == 'complete') {
                    result = await reservationList.aggregate(
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
                        ]).toArray();
                }
                else if (req.query.type == 'cencel') {
                    result = await reservationList.aggregate(
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
                        ]).toArray();
                }
                else {
                    result = [];
                }
                res.status(200).send(result);
            } catch (err) {
                res.status(400).send({ message: err.message });
            }
        })

        // delete a appoinment
        app.delete('/delAppoinment/:id', async (req, res) => {
            try {
                const result = await reservationList.deleteOne({ _id: new ObjectId(req.params.id) });
                res.status(200).send(result);
            } catch (err) {
                res.status(400).send({ message: err.message });
            }
        })

        // get most frequent collection
        app.get('/mostFrequent', async (req, res) => {
            try {
                const result = await reservationList.aggregate([
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
                ]).toArray();

                const idList = result.map((list) => {
                    return new ObjectId(list._id.testId)
                })

                const resultCollection = await testList.find({ "_id": { $in: idList } }).toArray();

                res.send(resultCollection)
            } catch (err) {
                res.status(400).send({ message: err.message });
            }
        })

        // get usr dashboard collection
        app.get('/userDash/:email', async (req, res) => {
            try {
                const reserveResult = await reservationList.countDocuments({ email: req.params.email, report: 'complete' })
                const totalAppoinments = await reservationList.countDocuments({ email: req.params.email });
                res.send({ reserveResult, totalAppoinments })
            } catch (err) {
                res.status(400).send({ message: err.message });
            }
        })


        app.get('/adminDash/:prevDays', prevDateList, async (req, res) => {
            try {
                const counts = {};
                const result = await reservationList.aggregate([
                    { $match: { bookedDate: { $in: req.dateList } } },
                    { $group: { _id: '$bookedDate', count: { $sum: 1 } } }
                ]).toArray();
                

                // Include all dates from the dates array in the response
                req.dateList.forEach((date)=>{
                    result.forEach((resObj)=>{
                        if(resObj._id==date){
                            counts[date] = resObj.count
                        }
                    })
                    if(!(date in counts)){
                        counts[date] = 0
                    }
                })

                const totalUsers = await userList.countDocuments();
                const totalAppoinments = await reservationList.countDocuments();
                const totalTest = await testList.countDocuments();
                res.send({ totalUsers, totalAppoinments, totalTest, chart: counts })
            }
            catch (err) {
                res.status(400).send({ message: err.message });
            }

        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`your server running on => http://localhost:${port}`);
})