import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ZodError } from 'zod';

//routers
import userRouter from './user/user.router';
import categoryRouter from './category/category.router';
import productRouter from './product/product.router';

const app = express();

app.use(express.json());
app.use(cors());

//middleware
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);

//error handling
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  let message  = "";
  let statusCode = 500;
  const somethingWrong = "Something Went Wrong Please Try Again Later";
  if(error instanceof ZodError) {
    message = JSON.parse(error.message)[0].message;
    statusCode = 400;
  }
  else {
    message = error.message?? somethingWrong;
    statusCode = error.status?? 500;
  }
  res.status(statusCode).json({ message: message });
})

app.listen(3000, () => {
  console.log(`app listening on port 3000`)
})