const express = require('express');
const app = express();
const port = 8000; 
const cors = require('cors');
const route = require ('./server/routes/travel.routes');
const cookieParser = require('cookie-parser');

require('dotenv').config()
process.env
console.log(process.env.SECRET_KEY)
require('./server/config/mongoose.config');



app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({extended: true}));

const userRoutes = require('./server/routes/user.routes');
userRoutes(app);
route(app);
app.listen(8000, () => {
    console.log("Listening at port:" +port)
});