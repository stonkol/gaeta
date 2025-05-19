<div align="center">
<h1>Gaeta</h1>

![pizza.gif]()
</div>

A selection and checkout menu Pizzeria website. It displays a draggable dynamic low-poly 3D pizza. it will display the dough, ingredients and sides in 3D according to the pizza chosen by the user. Using React with [TypeScript](https://www.typescriptlang.org/) and [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction). Also vite and pnpm.

## Information

1. A visual 3D pizza with its ingredients
2. Dynamic price (depending on the pizza and ingredients added on top and if added a beverage)
3. the flavour, saltiness, spicyness. Represented in pie chart
4. ingredients list (each item having and add or minus button). And an add button to add more ingredients    what do you thing about this page? anything i can improve? do i need react or with typescript/js will work

## Tech

### Manage State and User Interaction
- Use React state (useState) and effects (useEffect) to track user selections (pizza type, dough, toppings, drinks, order details).
- Update the 3D pizza model dynamically based on state.
- Calculate and display dynamic price and flavor charts.
-Add forms for order details and confirmation screens.

## User Journey

1. Select a type of 11" pizza:
  - Marinara, Margherita, Diavola, Quattro Formaggi, Siciliana
2. Select dough (sour, thin or thick)
3. let you add or remove toppings
4. Add a drinks. (San Pelegrino, San Pelegrino Limonata, San Pelegrino Aranciata, Moretti Beer, Italian Water, Aperol Spritz)
5. Buttons for Add another pizza or Checkout
6. Checkout: Choose Dine In or Take away
7. A success confirmation overlay page is shown
   - with a button for add more orders and you will receive an email with the receipt.

## Features

- Include accessibility features for users with disabilities.
- Preview combos with drink options visually and a summary. Animate topping changes by swapping or adding/removing 3D objects representing ingredients dynamically.
- Save user preferences or past orders for quicker repeat ordering.
- Add tooltips or info icons explaining dough types and toppings.

## Visuals

After the website is loaded a new 3d pizza will be dropped from 20% of his current height going from 0 to 100% of opacity and in a easy-in speed with a small rebound.
Topping: displayed randomly on the x,y position to the dough and z_rotate. if a topping is deleted it will go out with a rebound.
Multiple pizzas: will be displayed on top of the current one.

## Pizza Types

### Diavola
Tomato, mozzarella, and spicy salami (Italian pepperoni).

### Pizza Siciliana (Sfincione)
Thick, focaccia-like crust topped with tomato sauce, onions, oregano, cheese, and anchovies.

### Quattro Formaggi (Four Cheese)
Combines mozzarella, gorgonzola, fontina, and parmesan cheeses.

### Marinara
Tomato sauce, garlic, oregano, and olive oil - one of the oldest pizzas, without cheese.

### Margherita
Tomato sauce, mozzarella, basil, and olive oil - the classic pizza representing the Italian flag.

## the naming

The earliest known use of the word "pizza" dates back to May 997 CE in a Latin document from **Gaeta**, then part of the Byzantine Empire. It records a tenant owing the bishop twelve pizzas, a pork shoulder, and kidney each Christmas, plus twelve pizzas and a couple of chickens each Easter Sunday.
