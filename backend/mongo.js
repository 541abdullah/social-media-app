const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async () => {
    await mongoose.connect(process.env.MONGO_dblink)
        .then((result) => {
            console.log('connection to the database was successful.');
        })
        .catch(err => {
            console.log(err);
        });
    return mongoose;
};


// let dbURI = process.env.MONGO_dblink;
// mongoose.connect(dbURI)
//     .then((result) => {
//         console.log('connection to the database was successful.');
//         app.listen(3001);
//     }).catch((error) => {
//         console.log(error);
//     });

