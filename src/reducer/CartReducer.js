/**
 * Set cart items to localstorage
 * @param {Array} cartItems
 */
const setToStorage = cartItems => {
	localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems : []));
};

/**
 * Sum total items counts and prices
 * @param {Array} cartItems
 * @returns {{total: string, itemCount: number}}
 */
export const sumItems = cartItems => {
	setToStorage(cartItems);
	let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
	let total = cartItems.reduce((total, product) => total + product.C * product.quantity, 0).toFixed(2);
	return {total, itemCount};
};

export const CartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_ITEM":
			if (!state.cartItems.find(item => item.id === action.payload.id)) {
				state.cartItems.push({
					...action.payload,
					group: action.group,
					quantity: 1
				})
			}

			return {
				...state,
				...sumItems(state.cartItems),
				cartItems: [...state.cartItems]
			};
		case "REMOVE_ITEM":
			return {
				...state,
				...sumItems(state.cartItems.filter(item => item.id !== action.payload.id)),
				cartItems: [...state.cartItems.filter(item => item.id !== action.payload.id)]
			};
		case "INCREASE":
			state.cartItems[state.cartItems.findIndex(item => item.id === action.payload.id)].quantity++;
			return {
				...state,
				...sumItems(state.cartItems),
				cartItems: [...state.cartItems]
			};
		case "DECREASE":
			state.cartItems[state.cartItems.findIndex(item => item.id === action.payload.id)].quantity--;
			return {
				...state,
				...sumItems(state.cartItems),
				cartItems: [...state.cartItems]
			};
		case 'UPDATE_ITEM':
			state.cartItems[state.cartItems.findIndex(item => item.id === action.payload.id)].quantity = action.quantity;
			return {
				...state,
				...sumItems(state.cartItems),
				cartItems: [...state.cartItems]
			};
		default:
			return state;
	}
};
