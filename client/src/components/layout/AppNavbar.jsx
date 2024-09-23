import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import logo1 from "../../assets/images/logo1.jpg"
import ProductStore from "../../store/ProductStore.js";
import UserStore from "../../store/UserStore.js";
import UserSubmitButton from "../user/UserSubmitButton.jsx";
import CartStore from "../../store/CartStore.js";
import WishStore from "../../store/WishStore.js";

const AppNavbar = () => {

    const {SetSearchKeyword, SearchKeyword} = ProductStore();
    const {IsLogin, UserLogoutRequest} = UserStore();
    const {CartCount, CartListRequest} = CartStore();
    const {WishCount, WishListRequest} = WishStore();


    const OnLogout = async () => {
        await UserLogoutRequest();
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/";
    }

    useEffect(() => {

        (async () => {
            if (IsLogin()) {
                await CartListRequest()
                await WishListRequest()
            }
        })()

    }, []);


    return (
        <>
            <div className="container-fluid text-white p-2 color">
                <div className="container">
                    <div className="row justify-content-around">

                        <div className="col-md-6">
                            <span>
                                <span className="f-12">
                                    <i className="bi bi-envelope"></i> Support@PlanB.com
                                </span>
                                <span className="f-12 mx-2">
                                    <i className="bi bi-envelope"></i> 01774688159
                                </span>
                            </span>
                        </div>

                        <div className="col-md-6">
                            <span className="float-end">
                                <span className="bodySmal mx-2">
                                    <i className="bi bi-whatsapp"></i>
                                </span>
                                <span className="bodySmal mx-2">
                                    <i className="bi bi-youtube"></i>
                                </span>
                                <span className="bodySmal mx-2">
                                    <i className="bi bi-facebook"></i>
                                </span>
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            <nav className="navbar navbar-expand-md navbar-light color">
                <div className="container">

                            <Link className="navbar-brand" to="/">
                                <img className="img-fluid rounded-5" src={logo1} alt="" width="60px"/>
                            </Link>

                            <button className="navbar-toggler text-bg-light" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>


                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto ">

                                    <Link className="btn btn-light position-relative text-start" to="/">
                                        <i className="bi bi-house"></i>Home
                                    </Link>


                                    <Link to="/cart" type="button"
                                          className="btn mx-md-2 btn-light position-relative text-start">
                                        <i className="bi text-dark bi-bag"></i> Cart
                                        <span
                                            className="position-absolute top-0 start-25 translate-middle badge rounded-pill bg-success">
                                {CartCount}
                                        </span>
                                    </Link>


                                    <Link to="/wish" type="button"
                                          className="btn btn-light mx-md-2 position-relative text-start">
                                        <i className="bi text-dark bi-heart"></i> Wish
                                        <span
                                            className="position-absolute top-0 start-25 translate-middle badge rounded-pill bg-warning">
                                    {WishCount}
                                </span>
                                    </Link>

                                    <Link to="/order" type="button"
                                          className="btn btn-light position-relative text-start">
                                        <i className="bi text-dark  bi-truck"></i> Order
                                    </Link>
                                </ul>
                            </div>


                            <div className="d-md-flex">
                                <div className="input-group mt-1 ms-md-2">
                                    <input onChange={(e) => SetSearchKeyword(e.target.value)} className="form-control"
                                           type="search" placeholder="Search..." aria-label="Search"/>
                                    <Link to={SearchKeyword.length > 0 ? `/by-keyword/${SearchKeyword}` : `/`}
                                          className="btn btn-outline-info" type="submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" style={{width: 20, height: 20}}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                        </svg>
                                    </Link>

                                    {
                                        IsLogin() ? (
                                            <>
                                                <UserSubmitButton onClick={OnLogout}
                                                                  className="btn ms-1 btn-outline-light d-flex"
                                                                  text="Logout"/>
                                                <Link type="button" className="btn ms-1 btn-outline-light d-flex"
                                                      to="/profile">Profile</Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link type="button" className="btn ms-1 btn-outline-light d-flex"
                                                      to="/login">Login</Link>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

            </nav>
        </>
    );
};

export default AppNavbar;




