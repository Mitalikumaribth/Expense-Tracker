
import express from 'express'
import { login, register } from '../controllers/userController.js'
import authMiddleWare from '../middleware/authMiddleWare.js'
import { addIncome, deleteIncome, getIncome, updateIncome } from '../controllers/incomeContrller.js'
import { addExpense, deleteExpense, getExpense, updateExpense } from '../controllers/expenseController.js'

const userRouter = express.Router()
userRouter.post('/register',register)
userRouter.post('/login',login)

userRouter.post('/add-income',authMiddleWare, addIncome)
userRouter.put('/update-income/:id', authMiddleWare, updateIncome)
userRouter.delete('/delete-income/:id', deleteIncome)
userRouter.get('/get-income',authMiddleWare,getIncome)

userRouter.post('/add-expense',authMiddleWare, addExpense)
userRouter.put('/update-expense/:id', authMiddleWare, updateExpense)
userRouter.delete('/delete-expense/:id', deleteExpense)
userRouter.get('/get-expense',authMiddleWare,getExpense)


export default userRouter