import React, { useState } from 'react';
import Pizza3D from './components/Pizza3D';
import SelectPizza from './components/SelectPizza';
import SelectToppings from './components/SelectToppings';
import SelectDough from './components/SelectDough'
import SelectDrink from './components/SelectDrink'
import CheckoutForm from './components/CheckoutForm';
import SubmissionCheck from './components/SubmissionCheck';

export type PizzaType =
    | 'Marinara'
    | 'Margherita'
    | 'Diavola'
    | 'Quattro Formaggi'
    | 'Siciliana'
    | null;

// 'default' is a preview that is a thinkness between thin and thick, before the users choose the `DoughType`
export type DoughType = 'thin' | 'thick' | 'sour' | 'default';

export type DrinkType =
    | 'San Pelegrino'
    | 'San Pelegrino Limonata'
    | 'San Pelegrino Aranciata'
    | 'Moretti Beer'
    | 'Aperol Spritz'
    | 'Italian Water'
    | null

function App() {
    const [step, setStep] = useState(1);

    // State for selections
    const [pizzaType, setPizzaType] = useState<PizzaType>(null);
    const [doughType, setDough] = useState<DoughType>('default');
    const [toppings, setToppings] = useState<string[]>([]);
    const [drink, setDrink] = useState<DrinkType>(null);
    const [orderType, setOrderType] = useState<'Dine In' | 'Take Away' | null>(null);
    const [orderDetails, setOrderDetails] = useState<Record<string, any>>({});
    // const [orderDetails, setOrderDetails] = useState<{
    //     dineInDate?: string
    //     name?: string
    //     phone?: string
    //     orderType?: 'Dine In' | 'Take away' | 'Delivery' | null
    // }>({ orderType: null })

    type PizzaOrder = {
        pizzaType: PizzaType
        doughType: DoughType
        toppings: string[]
        drink: DrinkType
    }

    const [oderPizzas, setOrderPizzas] = useState<PizzaOrder>([])
    function addCurrentPizzaToOrder(){
        if (!pizzaType){
            alert('Select a pizza before adding.')
            return
        }
        const newPizza = { pizzaType, doughType, toppings, drink }
        setOrderPizzas((prev) => [...prev, newPizza])
        setPizzaType(null)
        setDough('default')
        setToppings([])
        setDrink(null)
        setStep(1)
    }

    // Navigation helpers
    const nextStep = () => setStep((s) => Math.min(s + 1, 7))
    const prevStep = () => setStep((s) => Math.max(s - 1, 1))

    // reset order for new Submission
    const resetOrder = () => {
        setStep(1);
        setPizzaType(null);
        setDough('thin');
        setToppings([]);
        setDrink(null);
        setOrderType(null);
        setOrderDetails({});
    };

    return (
        <div style={{display:'flex', minHeight:'100vh'}}>
            {/* LEFT side: 3D PIZZA */}
            <div style={{
                width: 400, borderRight: '1px solid #ddd', padding: '1rem', position: 'sticky', top: 0, height: '100vh', backgroundColor: '#eee',
            }}>
                <Pizza3D doughType={doughType} pizzaType={pizzaType} toppings={toppings} />
            </div>

            {/* RIGHT side: form and steps */}
            <div style={{ flex: 1, padding: '2rem', maxWidth:600 }}>
                {step === 1 && (
                    // This component receives props (inputs) from its parent
                    <SelectPizza
                        // Passes the current dough selection
                        pizzaType={pizzaType}
                        // Passes the function that can update the dough selection
                        setPizzaType={setPizzaType}
                        onNext ={() => {
                            if (pizzaType) nextStep()
                            else alert("Select a pizza")
                        }}
                    />
                )}
                {step === 2 && (
                    <SelectToppings
                        toppings={toppings}
                        setToppings={setToppings}
                        onprev={prevStep}
                        onNext={nextStep}
                    />
                )}
                {step === 3 && (
                    <SelectDough
                        doughType={doughType}
                        setDoughType={setDough}
                        onprev={prevStep}
                        onNext={nextStep}
                    />
                )}
                {step === 4 && (
                    <SelectDrink
                        drink={drink}
                        setDrink={setDrink}
                        onprev={prevStep}
                        onNext={nextStep}
                    />
                )}
                {step === 5 && (
                    <div style={{ display: 'flex', gap: '1rem'}}>
                        <button onClick={addCurrentPizzaToOrder} style={{flex:1}}>Add Another Pizza
                        </button>
                        <button
                            onClick={()=> {
                            if(pizzaType){addCurrentPizzaToOrder()}nextStep()
                        }} style={{flex:1}}>
                            Checkout
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default App
