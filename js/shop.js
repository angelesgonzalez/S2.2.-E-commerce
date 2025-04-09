import { products } from "./dummyData.js";

const cart = [];

let total = 0;

// Exercise 1
window.buy = function (id) {
	// const addProduct = (id) => {
	// 	const product = products.find((element) => element.id === id);
	// 	if (product)
	// 		cart.push({
	// 			...product,
	// 			quantity: 1,
	// 			getSubtotal: function () {
	// 				return this.price * this.quantity;
	// 			},
	// 		});
	// };

	const addProduct = (id) => {
		const product = products.find((element) => element.id === id);

		if (product) {
			const newProduct = {
				...product,
				quantity: 1,
				getSubtotal: function () {
					return this.price * this.quantity;
				},
			};
			newProduct.subTotal = newProduct.getSubtotal();
			cart.push(newProduct);
			addProductToCart(newProduct);
		}
	};

	const existingCartItem = cart.find((element) => element.id === id);

	if (existingCartItem) {
		existingCartItem.quantity++;
		calculateDiscount(existingCartItem);
		updateProductInCart(existingCartItem);
	} else {
		addProduct(id);
	}

	calculateTotal();
	// printCart();
};

// Exercise 2
const cleanHTML = (id, update) => {
	const htmlElement = document.getElementById(`${id}`);
	if (htmlElement) htmlElement.innerHTML = update;
};

window.cleanCart = function () {
	cart.length = 0;
	cleanHTML("cart_list", "");
	cleanHTML("total_price", 0);
};

// Exercise 3
function calculateTotal() {
	for (let i = 0; i < cart.length; i++) {
		total += cart[i].subTotal;
	}
	return total;
}

// Exercise 4

const calculateDiscount = (element) => {
	const subTotal = element.getSubtotal();
	if (element.offer && element.quantity >= element.offer.number) {
		element.subTotalWithDiscount = Math.round(
			subTotal * (1 - element.offer.percent / 100)
		);
	}
	element.subTotal = subTotal;
};

// Exercise 5

const addProductToCart = (product) => {
	const cartList = document.getElementById("cart_list");
	const productRow = document.createElement("tr");
	const productHeader = document.createElement("th");
	const productPrice = document.createElement("td");
	const productQuantity = document.createElement("td");
	const productSubtotal = document.createElement("td");

	productRow.id = `${product.id}`;
	productRow.setAttribute("scope", "row");
	productHeader.textContent = `${product.name}`;
	productPrice.textContent = `$${product.price}`;
	productPrice.id = `${product.id}-price`;
	productQuantity.textContent = `${product.quantity}`;
	productQuantity.id = `${product.id}-quantity`;
	productSubtotal.id = `${product.id}-subtotal`;
	productSubtotal.textContent = product.subTotalWithDiscount
		? `$${product.subTotalWithDiscount}`
		: `$${product.subTotal}`;

	productRow.append(
		productHeader,
		productPrice,
		productQuantity,
		productSubtotal
	);

	cartList.appendChild(productRow);
};

const updateProductInCart = (product) => {
	const productQuantity = document.getElementById(`${product.id}-quantity`);
	const productSubtotal = document.getElementById(`${product.id}-subtotal`);

	productQuantity.textContent = product.quantity;
	productSubtotal.textContent = product.subTotalWithDiscount
		? `$${product.subTotalWithDiscount}`
		: `$${product.subTotal}`;
};

function printCart() {
	cleanHTML("cart_list", "");
	cart.forEach(addProductToCart);
}

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {}

function open_modal() {
	printCart();
}
