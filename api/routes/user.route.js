import express from 'express';
import { test, updateUser, deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();
router.get('/', test);
    
router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;





// 검증용 블록: 주소(http://localhost:8080/api/user)에서 출력
{/* 
  router.get('/', (req, res) => {
    res.json({
      "message": "API is working...",
    })
  });
*/}