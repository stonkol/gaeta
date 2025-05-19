import React from 'react';
import { PizzaOrder, OrderDetails } from '../App';

type CheckoutFormProps = {
    orderType: 'Dine In' | 'Take Away' | null;
    setOrderType: React.Dispatch<React.SetStateAction<'Dine In' | 'Take Away' | null>>;
    orderDetails: OrderDetails;
    setOrderDetails: React.Dispatch<React.SetStateAction<OrderDetails>>;
    orderPizzas: PizzaOrder[];
    onBack: () => void;
    onNext: () => void;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    orderType,
    setOrderType,
    orderDetails,
    setOrderDetails,
    onBack,
    onNext,
}) => {
    // Your form logic and JSX here

    return (
        <div>
            <h2>Checkout</h2>

            {/* Example: select order type */}
            <div>
                <label>
                    <input
                        type='radio'
                        name='orderType'
                        value='Dine In'
                        checked={orderType === 'Dine In'}
                        onChange={() => setOrderType('Dine In')}
                    />
                    Dine In
                </label>
                <label>
                    <input
                        type='radio'
                        name='orderType'
                        value='Take Away'
                        checked={orderType === 'Take Away'}
                        onChange={() => setOrderType('Take Away')}
                    />
                    Take Away
                </label>
            </div>

            {/* Add form fields for orderDetails (name, phone, etc.) here */}
            {/* Example: */}
            <div>
                <label>
                    Name:
                    <input
                        type='text'
                        value={orderDetails.name}
                        onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                    />
                </label>
            </div>

            {/* Add other fields similarly */}

            <div style={{ marginTop: '1rem' }}>
                <button onClick={onBack}>Back</button>
                <button onClick={onNext} disabled={!orderType || !orderDetails.name}>
                    Confirm Order
                </button>
            </div>
        </div>
    );
};

export default CheckoutForm;
