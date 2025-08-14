
import ProductDescription from "@components/ProductDescription";
import { useSelector } from "react-redux";

const ModelDescription = () => {
	const data = useSelector(
    (state: any) => state.productAi.lastGeneratedData,
  );
	return (
		<div>
			<ProductDescription data={data} />
		</div>
	)
}

export default ModelDescription
