import { createContext, useState } from "react";

export const CustomerContext = createContext(null);

export const CustomerProvider = ({ children }) => {
  const [customerId, setCustomerId] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [sellerId, setsellerId] = useState(null);
  const [sellerName, setsellerName] = useState(null);
  const [productId, setproductId] = useState(null);
  const [cartItems, setcartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [sellingProducts, setSellingProducts] = useState([]);
  const [orderitems, setorderItems] = useState([]);

  const values = {
    customerId,
    setCustomerId,
    customerName,
    sellerId,
    setCustomerName,
    setsellerId,
    productId,
    setproductId,
    cartItems,
    setcartItems,
    products,
    setProducts,
    orderitems,
    setorderItems,
    sellerName,
    setsellerName,
    sellingProducts,
    setSellingProducts,
  };
  return (
    <CustomerContext.Provider value={values}>
      {children}
    </CustomerContext.Provider>
  );
};
