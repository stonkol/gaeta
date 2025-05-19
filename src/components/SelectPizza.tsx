// src/components/SelectPizza.tsx
import React from 'react'
import type { PizzaType, PizzaTypeName } from '../types'

type SelectPizzaProps = {
  pizzaType: PizzaType
  setPizzaType: (pizza: PizzaTypeName) => void
  onNext: () => void
}

const pizzaOptions: PizzaTypeName[] = [
  'Marinara',
  'Margherita',
  'Diavola',
  'Quattro Formaggi',
  'Siciliana',
]

const SelectPizza: React.FC<SelectPizzaProps> = ({ pizzaType, setPizzaType, onNext }) => {
  return (
    <div>
      <h2>Select Your Pizza</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {pizzaOptions.map((pizza) => (
          <li key={pizza} style={{ marginBottom: '0.75rem' }}>
            <label style={{ cursor: 'pointer' }}>
              <input
                type="radio"
                name="pizzaType"
                value={pizza}
                checked={pizzaType === pizza}
                onChange={() => setPizzaType(pizza)}
                style={{ marginRight: '0.5rem' }}
              />
              {pizza}
            </label>
          </li>
        ))}
      </ul>

      <button
        onClick={onNext}
        disabled={!pizzaType}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          cursor: pizzaType ? 'pointer' : 'not-allowed',
          backgroundColor: pizzaType ? '#007bff' : '#ccc',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
        }}
        aria-disabled={!pizzaType}
      >
        Next
      </button>
    </div>
  )
}

export default SelectPizza
