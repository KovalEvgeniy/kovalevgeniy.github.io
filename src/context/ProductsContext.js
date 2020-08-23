import React, {createContext, useEffect, useReducer} from 'react';
import {ProductsReducer} from "../reducer/ProductsReducer";
import {timer} from "../config";

export const ProductsContext = createContext({});

const randomRate = {
	get value() {
		return Math.floor(Math.random() * (80 - 20) + 20);
	}
};

const initialState = {
	loading: false,
	products: [],
	rate: -1,
	priceStatus: '',
	errorMessage: null
};

const ProductsContextProvider = ({children}) => {
	const [state, dispatch] = useReducer(ProductsReducer, initialState);
	let {loading, products, rate, priceStatus, errorMessage} = state;

	function getProductOptions(responseProducts = null) {
		fetch(process.env.PUBLIC_URL + '/api/data.json')
			.then(response => response.json())
			.then(response => {
				if (!Object.keys(products).length && responseProducts) {
					products = responseProducts;
				}
				if (response.Success) {
					Object.keys(products).forEach((groupId) => {
						Object.keys(products[groupId]['B']).forEach((productId) => {
							products[groupId]['B'][productId]['id'] = productId;
							let good = response.hasOwnProperty('Value') && response.Value.hasOwnProperty('Goods') &&
								response.Value.Goods.find(good => +good.T === +productId && +good.G === +groupId);
							if (good) {
								good.P && (products[groupId]['B'][productId]['P'] = good.P);

								if (good.C) {
									products[groupId]['B'][productId]['C'] = good.C;
								} else {
									delete products[groupId]['B'][productId]['C'];
								}
							}
						});
					});
					let tempRandomRate = randomRate.value;
					dispatch({
						type: "PRODUCTS_SUCCESS",
						payload: {
							products: products,
							rate: randomRate.value,
							priceStatus: (() => {
								if (rate !== -1 && rate < tempRandomRate) {
									return 'less';
								} else if (rate !== -1 && rate > tempRandomRate) {
									return 'large';
								} else {
									return '';
								}
							})()
						}
					});
				}

				if (response.Error) {
					dispatch({
						type: "PRODUCTS_FAILURE",
						errorMessage: response.Error
					});
				}
			});
	}

	useEffect(() => {
		fetch(process.env.PUBLIC_URL + '/api/names.json')
			.then(response => response.json())
			.then(response => getProductOptions(response));
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			getProductOptions();
		}, timer);

		return () => clearInterval(intervalId);
	});

	return (
		<ProductsContext.Provider value={{loading, products, rate, priceStatus, errorMessage}}>
			{children}
		</ProductsContext.Provider>
	);
};

export default ProductsContextProvider;
