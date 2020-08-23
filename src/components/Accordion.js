import React, {Component} from "react";
import "../assets/scss/Accordion.scss";

class Accordion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: true
		};

		this.activateTab = this.activateTab.bind(this);
	}

	activateTab() {
		let {isActive} = this.state;
		this.setState({
			isActive: !isActive
		});
	}

	render() {
		let {title, children} = this.props;
		let {isActive} = this.state;
		return (
			<div className="accordion">
				<div onClick={this.activateTab}
					 className={'accordion__title' + (isActive ? ' is-toggle' : '')}>{title}</div>
				<div className={'accordion__content' + (isActive ? ' is-toggle' : '')}>{children}</div>
			</div>
		)
	}
}

export default Accordion;

