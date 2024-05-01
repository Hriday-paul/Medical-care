const resurvationStore = require('../model/reservations');
const userStore = require('../model/users');
const testStore = require('../model/tests');


// get admin dashhboard Collection
const getAdminDash = async (req, res) => {
    try {
        const counts = {};
        const result = await resurvationStore.aggregate([
            { $match: { bookedDate: { $in: req.dateList } } },
            { $group: { _id: '$bookedDate', count: { $sum: 1 } } }
        ]);


        // Include all dates from the dates array in the response
        req.dateList.forEach((date) => {
            result.forEach((resObj) => {
                if (resObj._id == date) {
                    counts[date] = resObj.count
                }
            })
            if (!(date in counts)) {
                counts[date] = 0
            }
        })

        const totalUsers = await userStore.countDocuments();
        const totalAppoinments = await resurvationStore.countDocuments();
        const totalTest = await testStore.countDocuments();
        res.send({ totalUsers, totalAppoinments, totalTest, chart: counts })
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const verifyAdmin = async (req, res, next) => {
    try {
        const user = await userStore.findOne({ email: req.query.email });
        const isAdmin = user?.role === 'admin';
        if (!isAdmin) {
            return res.status(403).send({ message: 'forbidden access' });
        }
        next();
    } catch (err) {
        res.status(402).send({ err : err.message })
    }
}

module.exports = {
    getAdminDash,
    verifyAdmin
}