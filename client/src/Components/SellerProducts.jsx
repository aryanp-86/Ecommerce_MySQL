import { useContext, useState, useEffect } from "react";
import { CustomerContext } from "../Context";
import axios from "axios";
import { useNavigate } from "react-router";

export default function SellerProducts() {
  const navigate = useNavigate();
  const { sellingProducts, sellerId, setSellingProducts } =
    useContext(CustomerContext);
  //   const extractedProductIds = cartItems.map((obj) => obj.product_id);
  //   const filteredProducts = products.filter((product) => {
  //     return extractedProductIds.includes(product.product_id);
  //   });
  const [getData, setgetData] = useState(false);
  const handleCancelProduct = (product_id) => {
    const deleteProductNow = async () => {
      try {
        const response = await axios.post(
          `http://127.0.0.1:3001/deleteSellerProduct/${sellerId}/${product_id}`
        );
        console.log(response.data);
        setgetData((prev) => !prev);
        console.log(getData);
      } catch (error) {
        console.error(error);
      }
    };
    deleteProductNow();
  };

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3001/showProducts/${sellerId}`
        );
        console.log(response.data);
        setSellingProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getOrderData();
  }, [getData]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Your products
        </h2>
        {/* 
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div key={product.product_id} className="group relative">
              <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {product.product_id}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {product.product_name}
                </p>
                <button className="rounded-full bg-blue-900 px-8 py-2 mr-2">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div> */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {sellingProducts.map((product) => (
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
              </div>

              {/* <div className="flex flex-row items-center justify-center mt-2">
                <button
                  className="rounded-full bg-blue-900 px-8 py-2 mr-2"
                  onClick={() => handleBuyNow(product.product_id, product.cost)}
                >
                  Buy Now
                </button>
              </div> */}
              <div className="flex flex-row items-center justify-center mt-2">
                <button
                  className="rounded-full bg-blue-900 px-8 py-2 mr-2"
                  onClick={() => handleCancelProduct(product.product_id)}
                >
                  Delete product
                </button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
