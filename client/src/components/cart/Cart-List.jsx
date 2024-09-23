import React, {useEffect, useState} from 'react';
import CartStore from "../../store/CartStore.js";
import CartSubmitButton from "./CartSubmitButton.jsx";
import CartSkeleton from "../../skeleton/Cart-Skeleton.jsx";
import NoData from "../layout/No-Data.jsx";
import ProductStore from "../../store/ProductStore.js";
import Details from "../product/Details.jsx";
import axios from "axios";

const CartList = () => {

    const {CartFormChange,CartForm,CartUpdateRequest,CartTotal,CartVatTotal,CartPayableTotal,CartListRequest,CartList,RemoveCartListRequest,CreateInvoiceRequest}=CartStore()
    const {CategoryListRequest}=ProductStore()

    const [Quantity,SetQuantity]=useState(1)



    useEffect(() => {

        (async ()=>{
            await CartListRequest()
            await CategoryListRequest()

        })()

    }, []);



    const IncrementQuantity = (CartID) => {
        SetQuantity(Quantity=> Quantity+1)
    }

    const DecrementQuantity = (CartID) => {
        if(Quantity>1){
            SetQuantity(Quantity=> Quantity-1)
        }
    }


    const remove=async (CartID)=>{
            await RemoveCartListRequest(CartID)
            await CartListRequest()
    }

    if(CartList===null){
        return (
            <CartSkeleton/>
        )
    }else if(CartList.length===0){
        return (
            <NoData/>
        )
    }else{
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-4">
                            <ul className="list-group list-group-flush">
                                {
                                    CartList.map((item, i) => {
                                        let price=item["product"]["price"]
                                        if(item["product"]["discount"]===true){
                                            price=item["product"]["discountPrice"]
                                        }
                                        return (

                                            <li key={i}
                                                className="list-group-item d-flex justify-content-between align-items-start col-sm-12">
                                                <img alt="" className="rounded-1" width="90" height="auto"
                                                     src={item['product']['image']}/>

                                                <div className="ms-2 me-auto">
                                                    <p className="fw-lighter m-0">{item['product']['title']}</p>
                                                    <p className="fw-lighter my-1">Unit
                                                        Price: {price},Qty: {item['qty']},
                                                        Size: {item['size']},
                                                        Color: {item['color']}</p>
                                                    <p className=" h6 fw-bold m-0 text-dark">Total <i
                                                        className="bi bi-currency-dollar"></i>
                                                        {parseInt(price) * parseInt(item['qty'])} </p>
                                                </div>

                                                <div className="ms-5 d-flex">

                                                    <div className="input-group my-2">
                                                        <button onClick={DecrementQuantity}
                                                                className="btn btn-outline-secondary" style={{width:45,height:"auto"}}>-
                                                        </button>
                                                        <input value={CartForm.Quantity} onChange={(e) => {
                                                            CartFormChange("qty", e.target.value)
                                                        }} type="text"
                                                               className="form-control bg-light text-center" style={{width:50,height:"auto"}} readOnly/>
                                                        <button onClick={IncrementQuantity}
                                                                className="btn btn-outline-secondary" style={{width:45,height:"auto"}}>+
                                                        </button>
                                                    </div>

                                                    <button onClick={() => remove(item['_id'])}
                                                            className="btn btn-sm btn-outline-danger ms-3 mt-1" style={{width:45,height:"auto"}}><i
                                                        className="bi bi-trash"></i>
                                                    </button>

                                                </div>

                                            </li>
                                        )
                                    })}
                            </ul>

                            <div className="my-4">
                                <ul className="list-group bg-transparent list-group-flush">
                                <li className="list-group-item bg-transparent h6 m-0 text-dark">
                                        <span className="float-end">Total: <i
                                            className="bi bi-currency-dollar"/>{CartTotal} </span>
                                    </li>
                                    <li className="list-group-item bg-transparent h6 m-0 text-dark">
                                        <span className="float-end"> Vat(5%): <i
                                            className="bi bi-currency-dollar"/>{CartVatTotal}
                                        </span>
                                    </li>
                                    <li className="list-group-item bg-transparent h6 m-0 text-dark">
                                <span className="float-end"> Payable: <i className="bi bi-currency-dollar"/>{CartPayableTotal}
                                </span>
                                    </li>

                                <li className="list-group-item bg-transparent ">
                                <span className="float-end">
                                <CartSubmitButton text="Check Out " onClick={async () => {
                                    await CreateInvoiceRequest()
                                }} className="btn px-5 mt-2 btn-success"/>
                                </span>
                                </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default CartList;