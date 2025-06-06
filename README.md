<div align="center">
  <h1>Gaeta</h1>

  ![pizza.gif]()
</div>

A selection and checkout menu for a Pizzeria website. It displays a draggable, dynamic low-poly 3D pizza that visually represents the dough, ingredients, and sides according to the pizza chosen by the user. Built using React with [TypeScript](https://www.typescriptlang.org/) and [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction), along with Vite and pnpm.

<div align="center">
<img src="assets/prev.jpg" width="66%">
</div>

## Information

1. A visual 3D pizza with its ingredients.
2. Dynamic pricing (depending on the pizza, added ingredients, and beverages).
3. Flavor profiles such as saltiness and spiciness represented in a pie chart.
4. Ingredients list with add and minus buttons, plus an add button to add more ingredients.

## Tech

### Manage State and User Interaction

- Use React state (`useState`) and effects (`useEffect`) to track user selections (pizza type, dough, toppings, drinks, order details).
- Update the 3D pizza model dynamically based on state.
- Calculate and display dynamic price and flavor charts.
- Add forms for order details and confirmation screens.

## User Journey

1. Select a type of 11" pizza:
   - Marinara, Margherita, Diavola, Quattro Formaggi, Siciliana
2. Select dough (sour, thin, or thick).
3. Add or remove toppings.
4. Add a drink (San Pellegrino, San Pellegrino Limonata, San Pellegrino Aranciata, Moretti Beer, Italian Water, Aperol Spritz).
5. Buttons for "Add another pizza" or "Checkout".
6. Choose order type:
   - **Dine In:** reservation time, number of people, name, phone, email.
   - **Take Away:** reservation time, name, phone, email.
7. A success confirmation overlay page is shown with a button to add more orders and receive an email receipt.

## Features

- Include accessibility features for users with disabilities.
- Preview combos with drink options visually and a summary.
- Animate topping changes by swapping or adding/removing 3D objects representing ingredients dynamically.
- Save user preferences or past orders for quicker repeat ordering.
- Add tooltips or info icons explaining dough types and toppings.

## Visuals

After the website loads, a new 3D pizza will drop from 20% of its current height, fading in from 0 to 100% opacity with an ease-in speed and a small rebound effect.
Toppings are displayed randomly on the dough’s surface with rotation on the z-axis. If a topping is deleted, it will exit with a rebound animation.
Multiple pizzas will be displayed stacked on top of the current one.

## Pizza Types

### Marinara
Tomato sauce, garlic, oregano, and olive oil - one of the oldest pizzas, without cheese.

### Margherita
Tomato sauce, mozzarella, basil, and olive oil - the classic pizza representing the Italian flag.

### Diavola
Tomato, mozzarella, and spicy salami (Italian pepperoni).

### Pizza Siciliana (Sfincione)
Thick, focaccia-like crust topped with tomato sauce, onions, oregano, cheese, and anchovies.

### Quattro Formaggi (Four Cheese)
Combines mozzarella, gorgonzola, fontina, and parmesan cheeses.

## The Naming

The earliest known use of the word "pizza" dates back to May 997 CE in a Latin document from **Gaeta**, then part of the Byzantine Empire. It records a tenant owing the bishop twelve pizzas, a pork shoulder, and kidney each Christmas, plus twelve pizzas and a couple of chickens each Easter Sunday.
