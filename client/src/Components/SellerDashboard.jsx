import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CustomerContext } from "../Context";

const SellerDashboard = () => {
  const { sellerId, sellerName, setSellingProducts } =
    useContext(CustomerContext);
  const [sellerProducts, setsellerProducts] = useState({
    sellerProductName: "",
    sellerProductCost: "",
    sellerProductQuantity: "",
    sellerProductSize: "",
    sellerProductColor: "",
    sellerProductType: "",
    sellerId: "",
  });
  const headers = {
    "Content-Type": "application/json",
  };

  const navigate = useNavigate();

  const handleSellerDashboard = () => {
    const showProducts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3001/showProducts/${sellerId}`
        );
        console.log(response.data);
        setSellingProducts(response.data);
        navigate("/seller-products");
      } catch (error) {
        console.error(error);
      }
    };
    showProducts();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const sendsellerProducts = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:3001/seller-dashboard",
          newObj,
          {
            headers: headers,
          }
        );
        console.log(response);
        // if (response.data == "Product added successfully") {
        //   navigate("/seller-dashboard");
        // }
      } catch (error) {
        console.error(error);
      }
    };
    sendsellerProducts();
  };

  // console.log(sellerProducts);
  // const {
  //   sellerProductName,
  //   sellerPassword,
  //   sellerAddress,
  //   sellerCode,
  //   sellerType,
  //   sellerCategory,
  //   sellerNo,
  // } = sellerProducts;

  const newObj = Object.keys(sellerProducts).reduce((sellerNewData, key) => {
    sellerNewData[key] = sellerProducts[key][0];
    return sellerNewData;
  }, {});

  console.log(newObj);
  const handleChange = (event) => {
    setsellerProducts((prevData) => {
      return {
        ...prevData,
        [event.target.name]: [event.target.value],
      };
    });
  };
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 mr-4 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">{sellerName}</span>
          </a>
          {/* <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900">First Link</a>
            <a className="mr-5 hover:text-gray-900">Second Link</a>
            <a className="mr-5 hover:text-gray-900">Third Link</a>
            <a className="mr-5 hover:text-gray-900">Fourth Link</a>
          </nav> */}
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            <Link to="/">Log Out</Link>
          </button>
        </div>
      </header>
      <section className="h-screen bg-black overflow-scroll">
        <div className="container h-full px-6 py-24">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>

            <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
              <form onSubmit={handleSubmit}>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                    id="exampleFormControlInput3"
                    value={sellerProducts.sellerProductName}
                    name="sellerProductName"
                    placeholder="Product Name"
                    onChange={handleChange}
                  />
                  {/* <label
                  htmlFor="exampleFormControlInput3"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-white dark:peer-focus:text-white"
                >
                  Seller Name
                </label> */}
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                    id="exampleFormControlInput33"
                    placeholder="Product Cost"
                    name="sellerProductCost"
                    value={sellerProducts.sellerProductCost}
                    onChange={handleChange}
                  />
                  {/* <label
                  htmlFor="exampleFormControlInput33"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-white dark:peer-focus:text-white"
                >
                  Seller Password
                </label> */}
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="number"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                    id="exampleFormControlInput33"
                    placeholder="Product Quantity"
                    name="sellerProductQuantity"
                    onChange={handleChange}
                    value={sellerProducts.sellerProductQuantity}
                  />
                  {/* <label
                  htmlFor="exampleFormControlInput33"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-white dark:peer-focus:text-white"
                >
                  Seller Address
                </label> */}
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                    id="exampleFormControlInput33"
                    placeholder="Product Size "
                    name="sellerProductSize"
                    value={sellerProducts.sellerProductSize}
                    onChange={handleChange}
                  />
                  {/* <label
                  htmlFor="exampleFormControlInput33"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-white dark:peer-focus:text-white"
                >
                  Seller Pincode
                </label> */}
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                    id="exampleFormControlInput33"
                    value={sellerProducts.sellerProductType}
                    name="sellerProductType"
                    placeholder="Product Type"
                    onChange={handleChange}
                  />
                  {/* <label
                  htmlFor="exampleFormControlInput33"
                  className="top-0 mb-0 text-white motion-reduce:transition-none dark:text-white dark:peer-focus:text-white"
                >
                  Seller Number
                </label> */}
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="number"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                    id="exampleFormControlInput33"
                    placeholder="Seller Id"
                    value={sellerProducts.sellerId}
                    name="sellerId"
                    onChange={handleChange}
                  />
                  {/* <label
                  htmlFor="exampleFormControlInput33"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-white dark:peer-focus:text-white"
                >
                  Seller Category
                </label> */}
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                    id="exampleFormControlInput33"
                    placeholder="Product Color"
                    value={sellerProducts.sellerProductColor}
                    onChange={handleChange}
                    name="sellerProductColor"
                  />
                  {/* <label
                  htmlFor="exampleFormControlInput33"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-white dark:peer-focus:text-white"
                >
                  Seller Type
                </label> */}
                </div>

                <button
                  type="submit"
                  className="inline-block w-full rounded bg-white text-black px-7 pb-2.5 pt-3 text-sm font-bold uppercase leading-normal transition ease-in-out hover:text-white delay-150 hover:-translate-y-1 hover:scale-110  hover:bg-gray-800 duration-300"
                  data-te-ripple-init
                >
                  Add product
                </button>
              </form>
            </div>
            <button
              className="inline-block w-full rounded bg-white text-black px-7 pb-2.5 pt-3 text-sm font-bold uppercase leading-normal transition ease-in-out hover:text-white delay-150 hover:-translate-y-1 hover:scale-110  hover:bg-gray-800 duration-300 mt-8"
              data-te-ripple-init
              onClick={handleSellerDashboard}
            >
              My products
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SellerDashboard;
