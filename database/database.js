const mongoose = require("mongoose")

const {MONGODB_URL} = process.env

exports.connect = () => {
    console.log(typeof MONGODB_URL);
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then()
    .catch((error) => {
        console.log(`DB connection FAIL`)
        console.log(error);
        process.exit(1)
    })
}