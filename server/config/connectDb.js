const mongoose = require("mongoose");
const colors = require("colors");
const connectDb = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fzz1qah.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
      dbName : 'medicare'
    });
    console.log(`DB Running On ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`${error}`.bgRed);
    process.exit(1);
  }
};

module.exports = connectDb;