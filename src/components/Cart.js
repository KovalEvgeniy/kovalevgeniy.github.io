import React, {useContext} from "react";
import formatPrice from "../utils/formatPrice";
import {CartContext} from '../context/CartContext';
import {ProductsContext} from "../context/ProductsContext";
import CartItem from "./CartItem";
import "../assets/scss/Cart.scss"
import {siteAmount, siteCyrrency} from "../config";

const Cart = () => {
	const {cartItems, total, itemCount} = useContext(CartContext);
	const {rate} = useContext(ProductsContext);

	return (
		<div>
			{
				Object.keys(cartItems).length
					? <div className="shopping-cart">
						<div className="shopping-cart__title">Корзина</div>
						<div className="shopping-cart__head">
							<div className="cart-details">Найменование товара и описание</div>
							<div className="cart-quantity">Количество</div>
							<div className="cart-price">Цена</div>
							<div className="cart-removal">&nbsp;</div>
						</div>
						<div className="shopping-cart__list">
							{Object.keys(cartItems).map((productId) => <CartItem key={productId}
																				 product={cartItems[productId]}/>)}
						</div>
						<div className="totals">
							<div className="totals__item">
								<div className="totals__title">Всего товаров:</div>
								<div className="totals__value">{itemCount} {siteAmount}</div>
							</div>
							<div className="totals__item totals__item--bold">
								<div className="totals__title">Всего к оплате:</div>
								<div
									className="totals__value totals__value--orange">{formatPrice(total * rate)} {siteCyrrency}</div>
							</div>
						</div>
					</div>
					: null
			}
		</div>
	)
};

export default Cart;
