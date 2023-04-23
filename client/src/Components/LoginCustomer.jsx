import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CustomerContext } from "../Context";

export default function LoginCustomer() {
  const { customerId, setCustomerId } = useContext(CustomerContext);
  const { customerName, setCustomerName } = useContext(CustomerContext);
  const [customerLogin, setcustomerLogin] = useState({
    customerNo: "",
    customerPassword: "",
  });
  const headers = {
    "Content-Type": "application/json",
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const sendCustomerLogin = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:3001/login-customer",
          newObj,
          {
            headers: headers,
          }
        );
        console.log(response.data[0]);
        const newData = response.data[0];
        if ((response.status = 200)) {
          setCustomerId(newData.customer_id);
          setCustomerName(newData.name);
          console.log(customerId);
          console.log(customerName);
          navigate("/products");
        }
      } catch (error) {
        console.error(error);
      }
    };
    sendCustomerLogin();
  };

  const newObj = Object.keys(customerLogin).reduce((customerNewLogin, key) => {
    customerNewLogin[key] = customerLogin[key][0];
    return customerNewLogin;
  }, {});

  console.log(newObj);
  const handleChange = (event) => {
    setcustomerLogin((prevData) => {
      return {
        ...prevData,
        [event.target.name]: [event.target.value],
      };
    });
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8 h-screen bg-black overflow-scroll">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label
                  htmlFor="email-address"
                  className="sr-only text-xl font-bold"
                >
                  Phone Number
                </label>
                <input
                  name="customerNo"
                  type="number"
                  min={10}
                  required
                  className="relative block w-full rounded-t-md border-0 text-2xl font-bold text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-4 py-4"
                  placeholder="Phone number"
                  onChange={handleChange}
                  value={customerLogin.customerNo}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  name="customerPassword"
                  type="password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-4 text-2xl font-bold text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  onChange={handleChange}
                  value={customerLogin.customerPassword}
                />
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-white group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
