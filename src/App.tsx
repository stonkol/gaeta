import { useState } from 'react';
import { PizzaType, IndividualTopping } from './types';
import Pizza3D from './components/Pizza3D';
import SelectPizza from './components/SelectPizza';
import SelectToppings from './components/SelectToppings';
import SelectDough from './components/SelectDough';
import SelectDrink from './components/SelectDrink';
import CheckoutForm from './components/CheckoutForm';
import SubmissionCheck from './components/SubmissionCheck';

// 'default' is a preview that is a thickness between thin and thick, before the users choose the `DoughType`
export type DoughType = 'thin' | 'thick' | 'sour' | 'default';

export type DrinkType =
    | 'San Pelegrino'
    | 'San Pelegrino Limonata'
    | 'San Pelegrino Aranciata'
    | 'Moretti Beer'
    | 'Aperol Spritz'
    | 'Italian Water'
    | null;

export type OrderDetails = {
    reservationTime: string;
    numberPeople?: number;
    name: string;
    phone: string;
    email: string;
};

export type PizzaOrder = {
    pizzaType: PizzaType;
    doughType: DoughType;
    toppings: IndividualTopping[];
    drink: DrinkType;
};

function App() {
    // Add error boundary state
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [step, setStep] = useState(1);

    // State for selections
    const [pizzaType, setPizzaType] = useState<PizzaType>(null);
    const [doughType, setDough] = useState<DoughType>('default');
    const [toppings, setToppings] = useState<IndividualTopping[]>([]);
    const [drink, setDrink] = useState<DrinkType>(null);
    const [orderType, setOrderType] = useState<'Dine In' | 'Take Away' | null>(null);
    const [orderDetails, setOrderDetails] = useState<OrderDetails>({
        reservationTime: '',
        numberPeople: undefined,
        name: '',
        phone: '',
        email: '',
    });

    // // Array of pizzas in the order
    const [orderPizzas, setOrderPizzas] = useState<PizzaOrder[]>([]);
    function addCurrentPizzaToOrder() {
        if (!pizzaType) {
            alert('Select a pizza before adding.');
            return;
        }
        const newPizza: PizzaOrder = {
            pizzaType,
            doughType,
            toppings,
            drink,
        };
        setOrderPizzas((prev) => [...prev, newPizza]);

        // Reset current pizza selections
        setPizzaType(null);
        setDough('default');
        setToppings([]);
        setDrink(null);
        setStep(1);
    }

    // Navigation helpers
    const nextStep = () => setStep((s) => Math.min(s + 1, 7));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    // reset order for new Submission
    const resetOrder = () => {
        setStep(1);
        setPizzaType(null);
        setDough('default');
        setToppings([]);
        setDrink(null);
        setOrderType(null);
        setOrderDetails({
            reservationTime: '',
            numberPeople: undefined,
            name: '',
            phone: '',
            email: '',
        });
        setOrderPizzas([]);
    };

    // Show debug message if there's an error
    if (hasError) {
        return (
            <div style={{ padding: '2rem', color: 'red' }}>
                <h1>Something went wrong</h1>
                <p>
                    {errorMessage || 'An unknown error occurred while rendering the application.'}
                </p>
                <button onClick={() => window.location.reload()}>Reload Page</button>
            </div>
        );
    }

    // Wrap the return in try/catch to handle render errors
    try {
        return (
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                {/* Fallback text to verify React is rendering */}
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        padding: '5px',
                        background: 'yellow',
                        zIndex: 9999,
                    }}
                >
                    Pizza App is Loading...
                </div>

                {/* LEFT side: 3D PIZZA */}
                <div
                    style={{
                        width: 'calc(100vw - 300px)',
                        borderRight: '1px solid #ddd',
                        padding: '0rem',
                        position: 'sticky',
                        top: 0,
                        height: '100vh',
                        backgroundColor: '#eee',
                    }}
                >
                    <Pizza3D doughType={doughType} pizzaType={pizzaType} toppings={toppings} />
                </div>

                {/* RIGHT side: form and steps */}
                <div style={{ flex: 1, padding: '2rem', width: 300 }}>
                    {step === 1 && (
                        <SelectPizza
                            pizzaType={pizzaType}
                            setPizzaType={setPizzaType}
                            onNext={() => {
                                if (pizzaType) nextStep();
                                else alert('Select a pizza');
                            }}
                        />
                    )}
                    {step === 2 && (
                        <SelectToppings
                            toppings={toppings}
                            setToppings={setToppings}
                            onBack={prevStep}
                            onNext={nextStep}
                        />
                    )}
                    {step === 3 && (
                        <SelectDough
                            doughType={doughType}
                            setDoughType={setDough}
                            onBack={prevStep}
                            onNext={nextStep}
                        />
                    )}
                    {step === 4 && (
                        <SelectDrink
                            drink={drink}
                            setDrink={setDrink}
                            onBack={prevStep}
                            onNext={nextStep}
                        />
                    )}
                    {step === 5 && (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={addCurrentPizzaToOrder} style={{ flex: 1 }}>
                                Add Another Pizza
                            </button>
                            <button
                                onClick={() => {
                                    if (pizzaType) {
                                        addCurrentPizzaToOrder();
                                    }
                                    nextStep();
                                }}
                                style={{ flex: 1 }}
                            >
                                Checkout
                            </button>
                        </div>
                    )}
                    {step === 6 && (
                        <CheckoutForm
                            orderType={orderType}
                            setOrderType={setOrderType}
                            orderDetails={orderDetails}
                            setOrderDetails={setOrderDetails}
                            orderPizzas={orderPizzas}
                            onBack={prevStep}
                            onNext={nextStep}
                        />
                    )}
                    {step === 7 && (
                        <SubmissionCheck
                            onAddMore={resetOrder}
                            orderSummary={{
                                pizzas: orderPizzas,
                                orderType,
                                orderDetails,
                            }}
                        />
                    )}
                </div>
            </div>
        );
    } catch (error) {
        // Catch render errors
        console.error('Render error:', error);
        setHasError(true);
        setErrorMessage(error instanceof Error ? error.message : String(error));
        return (
            <div style={{ padding: '2rem', color: 'red' }}>
                <h1>Render Error</h1>
                <p>Failed to render the application. Please check the console for details.</p>
            </div>
        );
    }
}

export default App;
