import express from 'express';
import cors from 'cors';

import userRouter from './user/user.router';
import categoryRouter from './category/category.router';
import productRouter from './product/product.router';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use(cors());

//routers
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);

//error handler
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`app listening on port 3000`)
})