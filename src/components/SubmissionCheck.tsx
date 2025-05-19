// src/components/SubmissionCheck.tsx
import React from 'react'
import type { PizzaOrder, OrderDetails } from '../App'

type SubmissionCheckProps = {
  orderSummary: {
    pizzas: PizzaOrder[]
    orderType: 'Dine In' | 'Take Away' | null
    orderDetails: OrderDetails
  }
  onAddMore: () => void
}

const SubmissionCheck: React.FC<SubmissionCheckProps> = ({ orderSummary, onAddMore }) => {
  const { pizzas, orderType, orderDetails } = orderSummary

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '2rem',
          maxWidth: 600,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <h2 tabIndex={0}>Order Confirmation</h2>

        <section aria-label="Pizzas ordered" style={{ marginBottom: '1.5rem' }}>
          <h3>Your Pizzas ({pizzas.length}):</h3>
          {pizzas.length === 0 && <p>No pizzas ordered.</p>}
          {pizzas.map((pizza, index) => (
            <div
              key={index}
              style={{
                borderBottom: '1px solid #ddd',
                paddingBottom: '1rem',
                marginBottom: '1rem',
              }}
            >
              <strong>
                {index + 1}. {pizza.pizzaType || 'Unknown Pizza'}
              </strong>
              <p>Dough: {pizza.doughType}</p>
              <p>
                Toppings:{' '}
                {pizza.toppings.length > 0
                  ? pizza.toppings
                      .map((t) => `${t.quantity}x ${t.name}`)
                      .join(', ')
                  : 'None'}
              </p>
              <p>Drink: {pizza.drink || 'None'}</p>
            </div>
          ))}
        </section>

        <section aria-label="Order details" style={{ marginBottom: '1.5rem' }}>
          <h3>Order Type: {orderType || 'Not specified'}</h3>
          {orderType && (
            <>
              <p>
                <strong>Reservation Time:</strong>{' '}
                {orderDetails.reservationTime || 'N/A'}
              </p>
              {orderType === 'Dine In' && (
                <p>
                  <strong>Number of People:</strong>{' '}
                  {orderDetails.numberPeople ?? 'N/A'}
                </p>
              )}
              <p>
                <strong>Name:</strong> {orderDetails.name || 'N/A'}
              </p>
              <p>
                <strong>Phone:</strong> {orderDetails.phone || 'N/A'}
              </p>
              <p>
                <strong>Email:</strong> {orderDetails.email || 'N/A'}
              </p>
            </>
          )}
        </section>

        <button
          onClick={onAddMore}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
          }}
          aria-label="Add another order"
        >
          Add Another Order
        </button>
      </div>
    </div>
  )
}

export default SubmissionCheck
