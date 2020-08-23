import React, {createContext, useReducer} from 'react';
import {CartReducer, sumItems} from '../reducer/CartReducer';

export const CartContext = createContext([]);

const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = {
	cartItems: storage,
	...sumItems(storage)
};

const CartContextProvider = ({children}) => {
	const [state, dispatch] = useReducer(CartReducer, initialState);

	const increase = payload => {
		dispatch({type: 'INCREASE', payload})
	};

	const decrease = payload => {
		dispatch({type: 'DECREASE', payload})
	};

	const addProduct = (payload, group) => {
		dispatch({type: 'ADD_ITEM', payload, group})
	};

	const removeProduct = payload => {
		dispatch({type: 'REMOVE_ITEM', payload})
	};

	const updateProductQuantity = (payload, quantity) => {
		dispatch({type: 'UPDATE_ITEM', payload, quantity})
	};

	const contextValues = {
		removeProduct,
		addProduct,
		increase,
		decrease,
		updateProductQuantity,
		...state
	};

	return (
		<CartContext.Provider value={contextValues}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;
