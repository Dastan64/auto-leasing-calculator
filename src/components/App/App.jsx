import './App.scss';
import { useEffect, useState } from 'react';

//UI
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

//Utils
import { calculateInitialPayment, calculateMonthlyPayment, calculateTotalSum } from '../../utils/calculations';

const App = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [state, setState] = useState({
        car_cost: 1000000,
        initial_payment_percent: 10,
        lease_term: 60,
        initial_payment: 100_000,
        total_sum: 2_264_800,
        monthly_payment_from: 36_080,
    });

    const [ranges] = useState({
        car_cost: {
            min: 1_000_000,
            max: 6_000_000,
        },
        initial_payment_percent: {
            min: 10,
            max: 60,
        },
        lease_term: {
            min: 1,
            max: 60,
        }
    })

    useEffect(() => {
        setState({
            ...state,
            initial_payment: calculateInitialPayment(state.initial_payment_percent, state.car_cost),
            total_sum: calculateTotalSum(state),
            monthly_payment_from: calculateMonthlyPayment(state),
        })
    }, [state.car_cost, state.initial_payment, state.initial_payment_percent, state.lease_term, state.monthly_payment_from])

    const handleBlur = (event) => {
        const { target: { name, value } } = event;
        if (value < ranges[name].min) {
            setState({ ...state, [name]: ranges[name].min })
        } else if (value > ranges[name].max) {
            setState({ ...state, [name]: ranges[name].max })
        }
    }

    const handleChange = (event) => {
        const { target: { name, value } } = event;
        setState({ ...state, [name]: value, })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        // fetch('https://hookb.in/eK160jgYJ6UlaRPldJ1P', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(state),
        // }).then(response => {
        //     console.log(response);
        //     return response.json();
        // }).then(data => {
        //     console.log(data);
        //     setIsSubmitting(false);
        // }).catch(error => {
        //     setIsSubmitting(false);
        //     console.log(error);
        // })
    }

    return (
        <div className="app">
            <h1 className="app__title">Рассчитайте стоимость автомобиля в лизинг</h1>
            <form className="app__form form" onSubmit={handleSubmit}>
                <div className="price form__item">
                    <label htmlFor="price">Стоимость автомобиля:</label>
                    <Input name={'car_cost'} value={state.car_cost} min={ranges.car_cost.min}
                           max={ranges.car_cost.max}
                           handleChange={handleChange} handleBlur={handleBlur} disabled={isSubmitting}/>
                </div>
                <div className="payment form__item">
                    <label htmlFor="payment">Первоначальный взнос:</label>
                    <Input name={'initial_payment_percent'} value={state.initial_payment_percent}
                           initialPayment={state.initial_payment}
                           min={ranges.initial_payment_percent.min}
                           max={ranges.initial_payment_percent.max} handleChange={handleChange} handleBlur={handleBlur}
                           isPercent
                           disabled={isSubmitting}/>
                </div>
                <div className="term form__item">
                    <label htmlFor="term">Срок лизинга:</label>
                    <Input name={'lease_term'} value={state.lease_term} min={ranges.lease_term.min}
                           max={ranges.lease_term.max} handleChange={handleChange} handleBlur={handleBlur}
                           disabled={isSubmitting}></Input>
                </div>
                <div className="sum form__item">
                    <span className="form__caption">Сумма договора лизинга:</span>
                    <span className="form__value">{state.total_sum.toLocaleString()} ₽</span>
                </div>
                <div className="payment form__item">
                    <span className="form__caption">Ежемесячный платеж от:</span>
                    <span className="form__value">{state.monthly_payment_from.toLocaleString()} ₽</span>
                </div>
                <Button isSubmitting={isSubmitting}>Оставить заявку</Button>
            </form>
        </div>
    );
}

export default App;
