export const calculateInitialPayment = (initial_payment_percent, car_cost) => {
    // console.log(`Процент: ${initial_payment_percent}, а цена: ${car_cost.toLocaleString()}`)
    // console.log(Math.floor((car_cost * initial_payment_percent) / 100))
    return Math.floor((car_cost * initial_payment_percent) / 100)
};

export const calculateTotalSum = (data) => {
    const { initial_payment, lease_term, monthly_payment_from } = data;
    return Math.round(initial_payment + (lease_term * monthly_payment_from));
}

export const calculateMonthlyPayment = (data) => {
    const { car_cost, initial_payment, lease_term } = data;
    return Math.round((car_cost - initial_payment) * ((0.035 * Math.pow((1 + 0.035), lease_term)) / (Math.pow((1 + 0.035), lease_term) - 1)));
}
