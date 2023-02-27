import { Expense } from "./ExpenseEntity"

export class User {
    id: number
    firstName: string
    lastName: string
    emailId: string
    password: string
    expenses: Expense[]


    constructor(id: number, firstName: string, lastName: string, emailId: string, password: string) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.emailId = emailId
        this.password = password
        this.expenses = []
    }

}