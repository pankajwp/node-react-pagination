import React from "react";
import ProductPtable from "./product-ptable";

function List(props) {
	const qParams = props.location.search;
	// const dispatch = useDispatch();

	return (
		<div className="product-list">						
			<div className="row justify-content-center">
				<ProductPtable params={qParams} />
			</div>
		</div>
	);
}

export default List;
