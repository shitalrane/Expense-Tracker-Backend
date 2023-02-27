export class Expense {
    id: number
    reason: string
    cost: number
    date: Date
    static count = 1

    constructor(reason: string, cost: number, date: Date) {
        this.id = Expense.count++
        this.reason = reason
        this.cost = cost
        this.date = date
    }

    editReason(reason: string) {
        this.reason = reason
    }

    editCost(cost: number) {
        this.cost = cost
    }

    editDate(date: Date) {
        this.date = date
    }
}

