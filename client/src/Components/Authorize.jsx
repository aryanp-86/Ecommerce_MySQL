import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthorizeSeller = () => {
  const [sellerData, setsellerData] = useState({
    sellerName: "",
    sellerPassword: "",
    sellerAddress: "",
    sellerCode: "",
    sellerType: "",
    sellerCategory: "",
    sellerNo: "",
  });
  const headers = {
    "Content-Type": "application/json",
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const sendSellerData = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:3001/signup-seller",
          newObj,
          {
            headers: headers,
          }
        );
        console.log(response);
        if (response.data == "Customer profile created successfully") {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    };
    sendSellerData();
  };

  // console.log(sellerData);
  // const {
  //   sellerName,
  //   sellerPassword,
  //   sellerAddress,
  //   sellerCode,
  //   sellerType,
  //   sellerCategory,
  //   sellerNo,
  // } = sellerData;

  const newObj = Object.keys(sellerData).reduce((sellerNewData, key) => {
    sellerNewData[key] = sellerData[key][0];
    return sellerNewData;
  }, {});

  console.log(newObj);
  const handleChange = (event) => {
    setsellerData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: [event.target.value],
      };
    });
  };
  return (
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
                  value={sellerData.sellerName}
                  name="sellerName"
                  placeholder="Seller Name"
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
                  type="password"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                  id="exampleFormControlInput33"
                  placeholder="Seller Password"
                  name="sellerPassword"
                  value={sellerData.sellerPassword}
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
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                  id="exampleFormControlInput33"
                  placeholder="Seller Address"
                  name="sellerAddress"
                  onChange={handleChange}
                  value={sellerData.sellerAddress}
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
                  type="number"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                  id="exampleFormControlInput33"
                  placeholder="Seller Pincode"
                  name="sellerCode"
                  value={sellerData.sellerCode}
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
                  type="number"
                  min={10}
                  className="peer block min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                  id="exampleFormControlInput33"
                  value={sellerData.sellerNo}
                  name="sellerNo"
                  placeholder="Seller Number"
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
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                  id="exampleFormControlInput33"
                  placeholder="Seller Category"
                  value={sellerData.sellerCategory}
                  name="sellerCategory"
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
                  placeholder="Seller Type"
                  value={sellerData.sellerType}
                  onChange={handleChange}
                  name="sellerType"
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
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorizeSeller;
