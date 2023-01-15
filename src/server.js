require('dotenv').config();
const app = require('./api');
require('express-async-errors');

const loginRoute = require('./routers/loginRoute');
const userRoute = require('./routers/userRoute');
const categoryRoute = require('./routers/categoryRoute');
const postRoute = require('./routers/postRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');
// const postController = require('./controllers/postController');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoryRoute);
app.use('/post', postRoute);
app.use(errorMiddleware);

app.listen(port, () => console.log('ouvindo porta', port));
