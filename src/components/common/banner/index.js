import React from "react";

import "./index.scss";
import {Button, Row, Col} from "antd";

const Banner = ({ title, description, buttonClick }) => {
	return (
		<div className={'banner-container'}>
			<Row justify={'space-between'} align={'middle'}>
				<Col md={10} lg={10}>
					<h3 className={'banner-heading'}><b>{title}</b></h3>
					<h4 className={'banner-description'}><b>{description || ''}</b></h4>
				</Col>
				<Button shape="round" size={'large'} className={'banner-button'} onClick={buttonClick}>
					Complete your registration
				</Button>
			</Row>
		</div>
	);
}

export default Banner;
