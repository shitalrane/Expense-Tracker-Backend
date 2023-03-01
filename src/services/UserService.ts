import { Expense } from "../entities/ExpenseType";
import { User } from "../entities/UserType";
import { v4 as uuidv4 } from 'uuid';

export class UserService {
    private users: User[]

    constructor() {
        this.users = []
    }

    getUsers() {
        return this.users
    }

    getUser(id: any) {
        if (!id) {
            throw Error("Id is mandatory!")
        }

        let userobj = this.getUserById(id)

        if (!userobj) {
            throw Error("Invalid ID!")
        }
        return userobj;
    }

    userLogin(body: User): User {
        const emailId = body.emailId

        if (!emailId) {
            throw Error('Email Address is must!')
        }
        const password = body.password
        if (!password) {
            throw Error('Password is must!')
        }

        const user = this.getUserByEmailId(emailId)

        if (!user) {
            throw Error('User does not exist!')
        }

        if (user.password !== password) {
            throw Error('Password is incorrect!')
        }

        return user;
    }

    addUser(body: User) {

        if (!body.firstName) {
            throw Error("First Name is compulsory and first name cannot be empty")
        }

        if (!body.lastName) {
            throw Error("Last Name is compulsory and last name cannot be empty")
        }

        if (!body.emailId) {
            throw Error("Email address is compulsory and email address cannot be empty")
        }

        let isValidEmail = this.checkValidEmail(body.emailId)
        if (!isValidEmail) {
            throw Error("Invalid email address!")
        }

        let user = this.getUserByEmailId(body.emailId)
        if (user) {
            throw Error("Email address is already in use, please use another email address!")
        }

        if (!body.password) {
            throw Error("Password in compulsory!")
        }

        validatePassword(body.password)

        user = {
            id: uuidv4(),
            firstName: body.firstName,
            lastName: body.lastName,
            emailId: body.emailId,
            password: body.password,
            expenses: []
        }
        this.users.push(user)
        return user;
    }

    getUserExpenses(id: any) {
        let userobj = this.getUser(id)
        return userobj.expenses
    }

    addUserExpense(id: any, body: Expense) {

        if (!body.reason) {
            throw Error("Reason is compulsory and cannot be empty!")
        }

        if (body.cost == undefined) {
            throw Error("Cost is compulsory!")
        }
        if (body.cost <= 0) {
            throw Error("Cost cannot be 0 or less than 0!")
        }
        if (body.date == undefined) {
            throw Error("Date is mandatory!")
        }
        // if (body.date == "") {
        //     throw Error("date cannot be empty")
        // }

        let expobj: Expense = {
            id: uuidv4(),
            reason: body.reason,
            cost: body.cost,
            date: body.date
        }
        let userExp = this.getUserExpenses(id)
        userExp.push(expobj)
        return expobj;
    }

    editUserExpense(id: any, body: Expense, expenseId: any) {
        if (id === undefined) {
            throw Error("ID is mandatory!")
        }

        let expenses = this.getUserExpenses(id)
        let expObj = expenses.find(expid => expid.id == expenseId)
        if (!expObj) {
            throw Error("Invalid Id")
        }

        if (body.reason !== undefined) {
            if (body.reason == "") {
                throw new Error("Reason cannot be empty!")
            }
            expObj.reason = body.reason
        }

        if (body.cost) {
            if (body.cost <= 0) {
                throw new Error("Cost cannot be 0 less than 0!")
            }
            expObj.cost = body.cost
        }

        if (body.date) {
            expObj.date = body.date
        }

        return expObj;
    }

    deleteUserExpense(id: any, expenseId: any) {
        if (!id) {
            throw Error("ID is mandatory!")
        }

        let expenses = this.getUserExpenses(id)
        let expObj = expenses.find(exp => exp.id == expenseId)
        if (!expObj) {
            throw Error("Invalid Id")
        }
        const index = expenses.indexOf(expObj);

        return expenses.splice(index, 1);
    }

    deleteUser(id: any) {
        if (!id) {
            throw Error("ID is mandatory!!")
        }
        let expobj = this.getUserById(id)
        if (!expobj) {
            throw Error("Invalid ID!")
        }

        const index = this.users.indexOf(expobj);

        const users = this.users.splice(index, 1);
        return users;
    }

    deleteAllExpenses(id: any) {
        if (id == undefined) {
            throw Error("ID is mandatory!!")
        }
        let userObj = this.getUserById(id)
        if (!userObj) {
            throw Error("Invalid ID!")
        }
        userObj.expenses = []
    }

    private checkValidEmail(emailId: string): boolean {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return expression.test(emailId);
    }

    private getUserByEmailId(emailId: string) {
        return this.users.find(user => user.emailId == emailId)
    }

    /**
     * Return user object for given id else return undefined.
     * @param id Id of user.
     */
    private getUserById(id: string): User | undefined {
        return this.users.find(user => user.id === id)
    }
}

function validatePassword(password: string): boolean {

    const uppercaseRegExp: RegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp: RegExp = /(?=.*?[a-z])/;
    const digitsRegExp: RegExp = /(?=.*?[0-9])/;
    const specialCharRegExp: RegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp: RegExp = /.{8,}/;

    if (!uppercaseRegExp.test(password)) {
        throw Error("At least one Uppercase");
    } else if (!lowercaseRegExp.test(password)) {
        throw Error("At least one Lowercase");
    } else if (!digitsRegExp.test(password)) {
        throw Error("At least one digit");
    } else if (!specialCharRegExp.test(password)) {
        throw Error("At least one Special Characters");
    } else if (!minLengthRegExp.test(password)) {
        throw Error("At least minumum 8 characters");
    }

    return true
}
