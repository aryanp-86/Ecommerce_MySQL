import { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../Context";
import axios from "axios";

export default function Orders() {
  const { customerId, setorderItems, orderitems, products } =
    useContext(CustomerContext);
  const extractedProductIds = orderitems.map((obj) => obj.product_id);
  const filteredProducts = products.filter((product) => {
    return extractedProductIds.includes(product.product_id);
  });
  const [render, setRender] = useState(false);
  const handleCancelOrder = (product_id) => {
    const deleteNow = async () => {
      try {
        const response = await axios.post(
          `http://127.0.0.1:3001/deleteOrder/${customerId}/${product_id}`
        );
        console.log(response.data);
        const newData = JSON.parse(response.data);
        setRender((prev) => !prev);
      } catch (error) {
        console.error(error);
      }
    };
    deleteNow();
  };

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3001/order/${customerId}`
        );
        console.log(response.data);
        const newData = JSON.parse(response.data);
        setorderItems(newData);
      } catch (error) {
        console.error(error);
      }
    };
    getOrderData();
  }, [render]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Your Orders
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <a key={product.product_id} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
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
                <div className="flex flex-row items-center justify-center mt-2">
                  <button
                    className="rounded-full bg-blue-900 px-8 py-2 mr-2"
                    onClick={() => handleCancelOrder(product.product_id)}
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
