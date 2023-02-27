import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyparser from 'body-parser'
import { UserService } from './services/UserService';
import cors from 'cors';
import { User } from './entities/UserEntity';

dotenv.config();

const app: Express = express();
app.use(bodyparser.json())
const port = process.env.PORT;

app.use(cors())

const userService = new UserService()

app.get('/users', (req: Request, res: Response) => {
  console.log("users get api start")
  let users = userService.getUsers()
  console.log("users get api end")
  res.send(users);

});

app.post('/user', (req: Request, res: Response) => {
  console.log("add user api start")
  let responseMsg = "Error Occured!"
  res.statusCode = 400
  let user: User | undefined = undefined;
  try {
    user = userService.addUser(req.body)
    res.statusCode = 201
    responseMsg = "User Created Successfully!"
  } catch (err: any) {
    responseMsg = err.message
    console.log(`Error: ${responseMsg}`)
  }
  console.log("add user api end")
  res.send({ msg: responseMsg, data: user })

})


app.get('/user/:id', (req: Request, res: Response) => {
  console.log("get user by id api start")
  let id = req.params.id
  let user = userService.getUser(id)
  console.log("get user by id api end")
  res.send(user)

})

app.get('/user/:userId/expenses', (req: Request, res: Response) => {
  console.log("get user expenses by user id api start")
  let userId = req.params.userId
  let exp = userService.getUserExpenses(userId)
  
  console.log("get user expenses by user id api end")
  res.send(exp);

});

app.post('/user/login', (req: Request, res: Response, next) => {
  console.log(" user login api start")
  let responseMsg = "Error Occured!"
  res.statusCode = 400
  let user;
  try {
    user = userService.userLogin(req.body)

    res.statusCode = 200
    responseMsg = "User Login Successfully!"
  }
  catch (err: any) {
    responseMsg = err.message
    console.log(`Error : ${responseMsg}` )
  }
  console.log(" user login api end")
  res.send({ msg: responseMsg, data: user })

})


app.post('/user/:userId/expense', (req: Request, res: Response) => {
  console.log("add user expenses by user id api start")
  let responseMsg = "Error Occured!"
  res.statusCode = 400
  let expense = undefined
  try {
    expense = userService.addUserExpense(req.params.userId, req.body)
    res.statusCode = 201
    responseMsg = "Expense added successfully"
  } catch (err: any) {
    responseMsg = err.message
    console.log(`Error: ${responseMsg}`)
  }
  console.log("add user expenses by user id api end")
  res.send({ msg: responseMsg, data: expense })

});

app.put("/user/:userId/expense/:expenseId", (req: Request, res: Response) => {
  console.log("edit user expenses by expense id api start")
  let userId = req.params.userId
  let expenseId = req.params.expenseId
  let responseMsg = "Error Ocuured!"
  res.statusCode = 400
  try {
    userService.editUserExpense(userId, req.body, expenseId)
    res.statusCode = 200
    responseMsg = "Expense edited successfully"
  } catch (err: any) {
    responseMsg = err.message
    console.log(`Error: ${responseMsg}`)
  }
  console.log("edit user expenses by expense id api end")
  res.send({ msg: responseMsg })
})


app.delete("/user/:userId/expense/:expenseId", (req: Request, res: Response) => {
  console.log("delete user expenses by expense id api start")
  let userId = req.params.userId
  let expenseId = req.params.expenseId
  let responseMsg = "Error Ocuured!"
  res.statusCode = 400
  try {
    userService.deleteUserExpense(userId, expenseId)
    responseMsg = `Deleted expense successfully`
    res.statusCode = 200
  } catch (err: any) {   
    responseMsg = err.message
    console.log(`Error: ${responseMsg}`)
  }
  console.log("delete user expenses by expense id api end")
  res.send({ msg: responseMsg })
})

app.delete("/user/:userId", (req: Request, res: Response) => {
  console.log("delete user by user id api start")
  let userId = req.params.userId
  let responseMsg = "Error Ocuured!"
  res.statusCode = 400
  try {
    userService.deleteUser(userId)
    responseMsg = `Deleted User successfully`
    res.statusCode = 200
  } catch (err: any) {
    responseMsg = err.message
    console.log(`Error: ${responseMsg}`)
  }
  console.log("delete user by user id api end")
  res.send({ msg: responseMsg })
})

app.delete('/user/:userId/expenses', (req: Request, res: Response) => {
  console.log("delete all user expenses by user id api start")
  let userId = req.params.userId
  let responseMsg = "Error Ocuured!"
  res.statusCode = 400
  try {
    userService.deleteAllExpenses(userId)
    res.statusCode = 200
    responseMsg = `Deleted all Expenses Successfully`
  } catch (err: any) {
    console.log(`Error: ${responseMsg}`)
  }
  console.log("delete all user expenses by user id api end")
  res.send({ msg: responseMsg })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});