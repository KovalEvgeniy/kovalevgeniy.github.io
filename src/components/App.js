import React, {useContext} from "react";
import List from "./List";
import {ProductsContext} from '../context/ProductsContext';
import Accordion from "./Accordion";
import Cart from "./Cart";
import {siteCyrrency} from "../config";

const App = () => {
	const {loading, products, errorMessage, rate} = useContext(ProductsContext);

	return (
		<div className="wrapper">
			<div className="main">
				<section className="container">
					<h2>Курс: $1 = {rate} {siteCyrrency}</h2>
					<Cart/>

					<h2>Список товаров</h2>
					<div className="product-list">
						{loading && !errorMessage ? (
							<span>loading... </span>
						) : errorMessage ? (
							<div className="errorMessage">{errorMessage}</div>
						) : (
							Object.keys(products).map((groupId) => (
								<Accordion key={groupId} title={products[groupId]['G']}>
									{
										Object.keys(products[groupId]['B']).length
											? <List products={products[groupId]['B']} group={products[groupId]['G']}/>
											: null
									}
								</Accordion>
							))
						)}
					</div>
				</section>
			</div>
		</div>
	);
};

export default App;
