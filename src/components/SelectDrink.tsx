import React from 'react';
import { DrinkType } from '../App';

type SelectDrinkProps = {
    drink: DrinkType;
    setDrink: (drink: DrinkType) => void;
    onNext: () => void;
    onBack: () => void;
};

const SelectDrink: React.FC<SelectDrinkProps> = ({ drink, setDrink, onNext, onBack }) => {
    // Example drink options
    const drinks = [
        'San Pelegrino',
        'San Pelegrino Limonata',
        'San Pelegrino Aranciata',
        'Moretti Beer',
        'Aperol Spritz',
        'Italian Water',
    ];

    return (
        <div>
            <h2>Select a Drink</h2>
            <ul>
                {drinks.map((d) => (
                    <li key={d}>
                        <label>
                            <input
                                type='radio'
                                name='drink'
                                value={d}
                                checked={drink === d}
                                onChange={() => setDrink(d as DrinkType)}
                            />
                            {d}
                        </label>
                    </li>
                ))}
            </ul>
            <button onClick={onBack} style={{ marginRight: '1rem' }}>
                Back
            </button>
            <button onClick={onNext} disabled={!drink}>
                Next
            </button>
        </div>
    );
};

export default SelectDrink;
