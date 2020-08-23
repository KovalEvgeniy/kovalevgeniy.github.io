import React, {useContext, useEffect, useRef, useState} from "react";
import formatPrice from "../utils/formatPrice";
import {CartContext} from '../context/CartContext';
import {ProductsContext} from "../context/ProductsContext";
import "../assets/scss/CartItem.scss"
import {siteAmount, siteCyrrency} from "../config";

const CartItem = ({product}) => {
	const {updateProductQuantity, removeProduct, decrease, increase} = useContext(CartContext);
	const {rate, priceStatus} = useContext(ProductsContext);
	const inputEl = useRef(null);
	const [decreaseButtonDisabled, setDecreaseButtonDisabled] = useState(product.quantity <= 1);
	const [increaseButtonDisabled, setIncreaseButtonDisabled] = useState(product.P <= product.quantity);

	function handleChange(product, event) {
		let {value, min, max} = event.target;
		value = Math.max(Number(min), Math.min(Number(max), Number(value)));

		setIncreaseButtonDisabled(false);
		setDecreaseButtonDisabled(false);
		if (+value <= +min) {
			setDecreaseButtonDisabled(true);
		}
		if (+value >= +max) {
			setIncreaseButtonDisabled(true);
		}
		updateProductQuantity(product, value);
	}

	function handleClick(product, type) {
		let {value, min, max} = inputEl.current;
		switch (type) {
			case 'decrease':
				if (+value === +min) {
					setDecreaseButtonDisabled(true);
				} else if (+value - 1 === +min) {
					decrease(product);
					setDecreaseButtonDisabled(true);
				} else {
					decrease(product);
					setIncreaseButtonDisabled(false);
					setDecreaseButtonDisabled(false);
				}
				break;
			case 'increase':
				if (+value === +max) {
					setIncreaseButtonDisabled(true);
				} else if (+value + 1 === +max) {
					increase(product);
					setIncreaseButtonDisabled(true);
				} else {
					increase(product);
					setIncreaseButtonDisabled(false);
					setDecreaseButtonDisabled(false);
				}
				break;
			default:
				break;
		}
	}

	useEffect(() => {
		if (inputEl.current) {
			let {value, min, max} = inputEl.current;
			setIncreaseButtonDisabled(false);
			setDecreaseButtonDisabled(false);
			if (+value <= +min) {
				setDecreaseButtonDisabled(true);
			}
			if (+value >= +max) {
				setIncreaseButtonDisabled(true);
			}
		}
	});

	return (
		<div className="cart" key={product.id}>
			<div className="cart-details">
				<div className="cart-cross">
					<button onClick={() => removeProduct(product)} className="btn-icon">&times;</button>
				</div>
				<div className="cart-title">{product.N}</div>
			</div>
			<div className="cart-quantity">
				<div className="cart-quantity__top">
					<div className="quantities">
						<div onClick={handleClick.bind(this, product, 'decrease')}
							 className={'quantities__ctrl decrease' + (decreaseButtonDisabled ? ' disabled' : '')}>
							<span>−</span>
						</div>
						<div className="quantities__input">
							<input ref={inputEl} type="number" value={product.quantity} min="1" max={product.P}
								   onChange={handleChange.bind(this, product)}/>
						</div>
						<div onClick={handleClick.bind(this, product, 'increase')}
							 className={'quantities__ctrl increase' + (increaseButtonDisabled ? ' disabled' : '')}>
							<span>+</span>
						</div>
					</div>
					<span className="amount"> {siteAmount}</span>
				</div>

				<div className="cart-quantity__bottom">
					{product.quantity === product.P ? <span className="noty-msg">Количество ограничено</span> : null}
				</div>
			</div>
			{
				product.C
					? <div className="cart-price">
						<div
							className={'price ' + priceStatus}>{formatPrice(product.C * rate)} {siteCyrrency} / {siteAmount}</div>
						<div className="price price--small">{'$' + product.C}</div>
					</div>
					: null
			}
			<div className="cart-removal">
				<button onClick={() => removeProduct(product)} className="btn-link">Удалить</button>
			</div>
		</div>
	)
};

export default CartItem;
