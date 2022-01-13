import {Grid} from "@mui/material";
import {Product} from "../../app/models/product";
import ProductCard from "./ProductCard";
interface Props {
    products: Product[]
}
export default function ProductList({products}: Props) {
    return (
        <>
            <Grid container spacing={3}>
                {products.map((product,index) => (
                    <Grid item xs={3} key={product.id}>
                        <ProductCard product={product}/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}