import ProductList from "./ProductList";
import {useEffect} from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {fetchFilters, fetchProductsAsync, productSelectors, setProductParams} from "./catalogSlice";
import {
    Grid,
    Paper
} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckBoxButtons from "../../app/components/CheckBoxButton";
import AppPagination from "../../app/components/AppPagination";

const sortOptions = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'price', label: 'Price Low to High'},
    {value: 'priceDesc',label: 'Price High to Low'}
]

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, filtersLoaded,brands, types, productParams, metaData} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    useEffect(() => {
      if(!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])
    useEffect(() => {
        if(!filtersLoaded) dispatch(fetchFilters());
    },[dispatch, filtersLoaded])
     if((!filtersLoaded)) return <LoadingComponent message={'Loading products...'}/>
    return (
        <Grid container columnSpacing={4}>
            <Grid item xs={3}>
                <Paper sx={{mb: 2}}>
                    <ProductSearch/>
                </Paper>
                <Paper sx={{mb: 2,p: 2}}>
                    <RadioButtonGroup
                        selectedValue={productParams.orderBy}
                        options={sortOptions}
                        onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
                    />
                </Paper>
                <Paper sx={{mb: 2,p: 2}}>
                    <CheckBoxButtons
                        items={brands}
                        checked={productParams.brands}
                        onChange={(items: string[]) => dispatch(setProductParams({brands: items, pageNumber: 1}))}
                    />
                </Paper>
                <Paper sx={{mb: 2,p: 2}}>
                    <CheckBoxButtons
                        items={types}
                        checked={productParams.types}
                        onChange={(items: string[]) => dispatch(setProductParams({types: items, pageNumber: 1}))}
                    />
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products}/>
            </Grid>
            <Grid item xs={3}/>
            <Grid item xs={9} sx={{mb:2}}>
                {metaData &&
                <AppPagination
                    metaData={metaData}
                    onPageChange={(page: number) => dispatch(setProductParams({pageNumber: page}))}
                />}
            </Grid>
        </Grid>
    )
}
