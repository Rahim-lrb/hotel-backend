require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
const cookieParser = require("cookie-parser")
const fileupload = require('express-fileupload');

const errorHandling = require("./middleware/error")
// security
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require("morgan")
// routes
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const roomRouter = require('./routes/room');
const reservationRouter = require('./routes/reservation');

const { forgetPassword, resetPassword } = require("./controllers/authController")
const { protect, authorize } = require("./middleware/protect")



const app = express()
app.use(express.json());
app.use((req, res, next) => { console.log(req.path, req.method); next()})
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// security
app.use(mongoSanitize());
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
});
app.use(limiter);
app.use(helmet());
app.use(hpp());
app.use(xss()); 



app.get('/', (req, res) => {
    res.send("welcome to my hotel backend")
})
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/reservations', reservationRouter)
app.use(errorHandling)




mongoose.set("strictQuery", true)
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("db is connected")
})
.catch((error) => {
    console.log("db is not connected" + error)
})


app.listen(process.env.PORT || 5000, () => {
    console.log(`server is listening on port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})