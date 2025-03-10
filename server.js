const mongooose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    await mongooose.connect("mongodb://localhost:27017/gitsetup");
    console.log("DB CONNECTED");
}