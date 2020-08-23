import React, {useState} from "react";
import "../assets/scss/Accordion.scss";

function Accordion(props) {
	const [isActive, setIsActive] = useState(true);

	function toggle() {
		setIsActive(!isActive);
	}

	return (
		<div className="accordion">
			<div onClick={() => toggle()}
				 className={'accordion__title' + (isActive ? ' is-toggle' : '')}>{props.title}</div>
			<div className={'accordion__content' + (isActive ? ' is-toggle' : '')}>{props.children}</div>
		</div>
	);
}

export default Accordion;
