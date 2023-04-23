import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CustomerContext } from "../Context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const {
    customerName,
    customerId,
    setcartItems,
    cartItems,
    products,
    setProducts,
  } = useContext(CustomerContext);
  const [isInCart, setisInCart] = useState(false);
  const [customerData, setcustomerData] = useState({
    customerInitialCost: "",
    customerFinalCost: "",
    customerSize: "",
    customerColor: "",
    customerType: "",
  });
  useEffect(() => {
    const getProductsData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3001/products");
        console.log(JSON.parse(response.data));
        const newData = JSON.parse(response.data);
        setProducts(newData);
      } catch (error) {
        console.error(error);
      }
    };
    getProductsData();
  }, []);

  const handleChange = (event) => {
    setcustomerData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: [event.target.value],
      };
    });
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const cartSubmit = (product_id) => {
    setisInCart(true);
    console.log(isInCart);
    const cartData = {
      product_id: product_id,
      customer_id: customerId,
      purchased: 1,
    };
    const addToCart = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:3001/cart-add",
          cartData,
          {
            headers: headers,
          }
        );
        console.log(response.data);
        // const newData = JSON.parse(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    addToCart();
  };

  const handleCartItems = () => {
    // setisInCart(true);
    // console.log(isInCart);
    // const cartData = {
    //   customer_id: customerId,
    // };
    const showCart = async () => {
      try {
        const response = await axios.post(
          `http://127.0.0.1:3001/cart/${customerId}`
        );
        console.log(JSON.parse(response.data));
        const newData = JSON.parse(response.data);
        setcartItems(newData);
        console.log(cartItems);
        // const newData = JSON.parse(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    showCart();
    navigate("/cart");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const sendCustomerData = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:3001/product-filter",
          newObj,
          {
            headers: headers,
          }
        );
        console.log(JSON.parse(response.data));
        const newData = JSON.parse(response.data);
        setProducts(newData);
      } catch (error) {
        console.error(error);
      }
    };
    sendCustomerData();
  };
  const newObj = Object.keys(customerData).reduce((customerNewData, key) => {
    customerNewData[key] = customerData[key][0];
    return customerNewData;
  }, {});

  const handleBuyNow = (product_id, amount) => {
    let amountData = { amount: amount };
    const headers = {
      "Content-Type": "application/json",
    };
    const buyNow = async () => {
      try {
        const response = await axios.post(
          `http://127.0.0.1:3001/buy/${customerId}/${product_id}`,
          amountData,
          {
            headers: headers,
          }
        );
        console.log(response.data);
        const newData = JSON.parse(response.data);
        navigate("/products");
      } catch (error) {
        console.error(error);
      }
    };
    buyNow();
  };

  return (
    <div className="bg-white">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex h-screen flex-col justify-between border-r col-span-1 fixed inset-y-0 left-0 w-1/4 bg-white">
          <div className="px-4 py-6">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-mono mb-2">Filter</h2>
              <div className="flex flex-row items-center justify-center mb-4">
                <input
                  type="text"
                  className="peer block mr-2 min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                  id="exampleFormControlInput3"
                  value={customerData.customerInitialCost}
                  name="customerInitialCost"
                  placeholder="Initial Cost"
                  onChange={handleChange}
                />{" "}
                to
                <input
                  type="text"
                  className="peer ml-2 block min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                  id="exampleFormControlInput3"
                  value={customerData.customerFinalCost}
                  name="customerFinalCost"
                  placeholder="Final Cost"
                  onChange={handleChange}
                />
              </div>
              <input
                type="text"
                className="peer block mb-4 min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                id="exampleFormControlInput3"
                value={customerData.customerSize}
                name="customerSize"
                placeholder="Size"
                onChange={handleChange}
              />
              <input
                type="text"
                className="peer block mb-4 min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                id="exampleFormControlInput3"
                value={customerData.customerColor}
                name="customerColor"
                placeholder="Color"
                onChange={handleChange}
              />
              <input
                type="text"
                className="peer block mb-4 min-h-[auto] w-full rounded border-0 bg-gray-800 px-3 py-[0.32rem] leading-[2.15] text-white"
                id="exampleFormControlInput3"
                value={customerData.customerType}
                name="customerType"
                placeholder="Type"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="inline-block w-full rounded bg-black text-black px-7 pb-2.5 pt-3 text-sm font-bold uppercase leading-normal transition ease-in-out hover:text-white delay-150 hover:-translate-y-1 hover:scale-110  hover:bg-gray-800 duration-300"
                data-te-ripple-init
              >
                Filter
              </button>
            </form>
          </div>
          <button
            className="inline-block w-full rounded bg-black text-black px-7 pb-2.5 pt-3 text-sm font-bold uppercase leading-normal transition ease-in-out hover:text-white delay-150 hover:-translate-y-1 hover:scale-110  hover:bg-gray-800 duration-300"
            data-te-ripple-init
            onClick={handleCartItems}
          >
            My Cart
          </button>
          <button
            className="inline-block w-full rounded bg-black text-black px-7 pb-2.5 pt-3 text-sm font-bold uppercase leading-normal transition ease-in-out hover:text-white delay-150 hover:-translate-y-1 hover:scale-110  hover:bg-gray-800 duration-300"
            data-te-ripple-init
          >
            <Link to="/orders">My Orders</Link>
          </button>
          <div className="sticky flex flex-row justify-between items-center inset-x-0 bottom-0 border-gray-100">
            <img
              alt="Man"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-10 w-10 rounded-full object-cover"
            />

            <p className="text-lg">
              <strong className="block font-medium">{customerName}</strong>
            </p>
            <button className="rounded-full bg-blue-900 px-8 py-2">
              <Link to="/">Log Out</Link>
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 fixed overflow-scroll col-span-3 w-3/4 inset-y-0 right-0">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <a key={product.product_id} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-center text-gray-700">
                  {product.product_name}
                </h3>
                <div className="flex flex-row justify-center items-center">
                  <p className="mt-1 mr-4 text-sm font-medium text-gray-900">
                    Cost: {product.cost}
                  </p>
                  <p className="mt-1 mr-4 text-sm font-medium text-gray-900">
                    Quantity: {product.quantity}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    Size: {product.size}
                  </p>
                </div>

                <div className="flex flex-row items-center justify-center mt-2">
                  <button
                    className="rounded-full bg-blue-900 px-8 py-2 mr-2"
                    onClick={() =>
                      handleBuyNow(product.product_id, product.cost)
                    }
                  >
                    Buy Now
                  </button>

                  <button
                    onClick={() => cartSubmit(product.product_id)}
                    className="rounded-full bg-blue-900 px-8 py-2"
                  >
                    Add to cart
                  </button>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
