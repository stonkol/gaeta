import React from 'react'
import type { IndividualTopping } from '../types'

type SelectToppingsProps = {
  toppings: IndividualTopping[]
  setToppings: React.Dispatch<React.SetStateAction<IndividualTopping[]>>
  onBack: () => void
  onNext: () => void
}

const SelectToppings: React.FC<SelectToppingsProps> = ({ toppings, setToppings, onBack, onNext }) => {
  const increment = (name: string) => {
    setToppings((prev) =>
      prev.map((t) =>
        t.name === name ? { ...t, quantity: t.quantity + 1 } : t
      )
    )
  }

  const decrement = (name: string) => {
    setToppings((prev) =>
      prev
        .map((t) =>
          t.name === name && t.quantity > 1 ? { ...t, quantity: t.quantity - 1 } : t
        )
        .filter((t) => t.quantity > 0)
    )
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <h2>Customize Toppings</h2>
      <ul>
        {toppings.map(({ name, quantity }) => (
          <li key={name} style={{ marginBottom: '0.5rem' }}>
            <strong>{name}</strong> - {quantity}x
            <button
              onClick={() => decrement(name)}
              aria-label={`Remove one portion of ${name}`}
              style={{ marginLeft: '0.5rem' }}
            >
              -
            </button>
            <button
              onClick={() => increment(name)}
              aria-label={`Add one portion of ${name}`}
              style={{ marginLeft: '0.25rem' }}
            >
              +
            </button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={onBack} style={{ marginRight: '1rem' }}>
          Back
        </button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  )
}

export default SelectToppings
