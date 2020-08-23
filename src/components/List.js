import React, {useContext} from "react";
import formatPrice from "../utils/formatPrice";
import {CartContext} from '../context/CartContext';
import {ProductsContext} from "../context/ProductsContext";
import {siteAmount, siteCyrrency} from "../config";
import "../assets/scss/Product.scss";

const List = ({products, group}) => {
	const {addProduct, cartItems, increase} = useContext(CartContext);
	const {rate, priceStatus} = useContext(ProductsContext);

	const isInCart = product => {
		return !!cartItems.find(item => item.id === product.id);
	};

	const isMaxQuantity = (product, quantity) => {
		let item = cartItems.find(item => item.id === product.id);
		if (item) {
			return item.quantity < quantity;
		}
		return false;
	};

	// Сортировка по остаткам на складе
	products = Object.entries(products).sort((a, b) => {
		return ('P' in b[1]) - ('P' in a[1]);
	});

	let html = products.map((array) => {
		let product = array[1];
		let inStock = !!product.P;

		return (
			<div key={array[0]} className={'product' + (!inStock ? ' product--empty' : '')}>
				<div className="product__col">
					<div className="product__info">
						<div className="product__title">{product.N} ({inStock ? product.P : 'Нет в наличии'})</div>
						{
							isInCart(product) && product.P && isMaxQuantity(product, product.P) &&
							<button onClick={() => increase(product)} className="btn">Добавить еще</button>
						}

						{
							!isInCart(product) && product.P &&
							<button onClick={() => addProduct((() => {
								product.N = group + '. ' + product.N;
								return product;
							})())} className="btn">Добавить в корзину</button>
						}
					</div>
				</div>
				<div className="product__col">
				{
					product.C
						? <div className="product__price">
							<div
								className={'price ' + priceStatus}>{formatPrice(product.C * rate)} {siteCyrrency} / {siteAmount}</div>
							<div className="price price--small">{'$' + product.C}</div>
						</div>
						: null
				}
				</div>
			</div>
		);
	});

	return (
		<div>{html}</div>
	)
};

export default List;
