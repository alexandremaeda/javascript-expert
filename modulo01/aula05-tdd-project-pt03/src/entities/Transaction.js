class Transaction {
  constructor({ customer, car, amount, dueDate }) {
    this.customer = customer;
    this.car = car;
    this.amount = amount;
    this.dueDa = dueDate;
  }
}

module.exports = Transaction;
