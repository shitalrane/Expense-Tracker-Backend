import { Expense } from "./ExpenseType"

export type User = {
    id: string
    firstName: string
    lastName: string
    emailId: string
    password: string
    expenses: Array<Expense>
}