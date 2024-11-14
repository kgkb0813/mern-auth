import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';

dotenv.config()

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors())
// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//   res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//   res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
//   next();
// });

// app.use(cors({
//   origin: ["http://localhost:4000"],
//   credentials: true
// }));
// app.use(express.json());
// app.use(cookieParser());



app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

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
      

// import path from 'path';


// const __dirname = path.resolve();


// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });





