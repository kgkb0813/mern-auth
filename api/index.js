import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';

dotenv.config()

const app = express();
app.use(express.json());
app.use('/api/user', userRoutes);


mongoose.connect(process.env.MONGO)
.then(() => {
  console.log('Connected to MongoDB...');
})
.catch((err) => {
  console.log(err);
});

app.listen(8080, () => {
  console.log('Server listening on port 8080...');
});

// 검증용 블록: 주소(http://localhost:8080)에서 출력
{/*
  app.get("/", (req, res) => {
      res.json({
          message: "API is working!"
        })
  })
*/}
      

// import authRoutes from './routes/auth.route.js';
// import cookieParser from 'cookie-parser';
// import path from 'path';


// const __dirname = path.resolve();


// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });


// app.use(cookieParser());


// app.use('/api/auth', authRoutes);

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   return res.status(statusCode).json({
//     success: false,
//     message,
//     statusCode,
//   });
// });
