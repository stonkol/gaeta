// src/types.ts

// Pizza names used as keys (no null)
export type PizzaTypeName =
  | 'Marinara'
  | 'Margherita'
  | 'Diavola'
  | 'Quattro Formaggi'
  | 'Siciliana'

// Pizza selection, can be null when nothing selected
export type PizzaType = PizzaTypeName | null

// Topping with default quantity for each pizza
export type ToppingType = {
  name: string
  defaultQuantity: number
}

// Individual topping with user-selected quantity
export type IndividualTopping = {
  name: string
  quantity: number
}


// Mapping pizza names to their default toppings
export const pizzaToppings: Record<PizzaTypeName, ToppingType[]> = {
  Marinara: [
    { name: 'Tomato', defaultQuantity: 1 },
    { name: 'Garlic', defaultQuantity: 1 },
    { name: 'Oregano', defaultQuantity: 1 },
  ],
  Margherita: [
    { name: 'Tomato', defaultQuantity: 1 },
    { name: 'Mozzarella', defaultQuantity: 1 },
    { name: 'Basil', defaultQuantity: 1 },
  ],
  Diavola: [
    { name: 'Tomato', defaultQuantity: 1 },
    { name: 'Mozzarella', defaultQuantity: 1 },
    { name: 'Spicy Salami', defaultQuantity: 1 },
  ],
  'Quattro Formaggi': [
    { name: 'Mozzarella', defaultQuantity: 1 },
    { name: 'Gorgonzola', defaultQuantity: 1 },
    { name: 'Fontina', defaultQuantity: 1 },
    { name: 'Parmesan', defaultQuantity: 1 },
  ],
  Siciliana: [
    { name: 'Tomato Sauce', defaultQuantity: 1 },
    { name: 'Onions', defaultQuantity: 1 },
    { name: 'Oregano', defaultQuantity: 1 },
    { name: 'Cheese', defaultQuantity: 1 },
    { name: 'Anchovies', defaultQuantity: 1 },
  ],
}
