const express = require('express');
require('dotenv').config();
const { connection } = require('./src/db')
connection();
const app = express();
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./src/middlewares/errorHandler.js');
const userRouter = require('./src/routes/userRouter.js');
const propertyRouter = require('./src/routes/propertyRouter.js');
const reviewRouter = require('./src/routes/reviewRouter.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("tiny"))

app.use("/", userRouter);
app.use("/property", propertyRouter);
app.use("/review", reviewRouter);

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use('*', (req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

app.use(errorHandler)

app.listen(3000, () => {
    console.log(`Server started on port ${PORT}`);
})