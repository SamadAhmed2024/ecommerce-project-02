import Layout from "../components/layout/Layout.jsx";
import ProductList from "../components/product/Product-List.jsx";
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

const ProductByBrand = () => {

    const {ListByBrandRequest}=ProductStore();
    const {id}=useParams()

    useEffect(() => {

        (async ()=>{
            await ListByBrandRequest(id);
        })()

    }, [id]);


    return (
        <Layout>
                <ProductList/>
        </Layout>
    );
};

export default ProductByBrand;