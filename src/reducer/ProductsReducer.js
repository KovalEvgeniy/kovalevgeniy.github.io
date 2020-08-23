export const ProductsReducer = (state, action) => {
	switch (action.type) {
		case "PRODUCTS_SUCCESS":
			return {
				...state,
				loading: true,
				products: action.payload.products,
				rate: action.payload.rate,
				priceStatus: action.payload.priceStatus,
			};
		case "PRODUCTS_FAILURE":
			return {
				...state,
				loading: false,
				errorMessage: action.error
			};
		default:
			return state;
	}
};
