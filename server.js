const mongoose= require('mongoose');
const app = require('./index')
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE_URL;

mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(() => console.log('DB connection successful'));

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})

