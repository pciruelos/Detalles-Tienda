const mongoose = require('mongoose');

const { VIRTUALSTORE_MONGODB_HOST,VIRUTALSTORE_MONGODB_DATABASE} = process.env;
const MONGODB_URI=`mongodb://${VIRTUALSTORE_MONGODB_HOST}/${VIRUTALSTORE_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,


})
.then(db => console.log('database conectada papu'))
.catch(err => console.log(err));