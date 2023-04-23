const express = require("express");
var server = require("./server");
const query = require("./query");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./config.env" });
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("hi");
  res.send("hi");
});
app.post("/signup-seller", (req, res) => {
  let seller = req.body;
  seller = {
    ...seller,
    sellerNo: seller.sellerNo * 1,
    sellerCode: seller.sellerCode * 1,
  };

  console.log(seller);
  const sellerData = query.sellerData(seller);
  server.query(sellerData, function (error, data) {
    if (error) throw error;
    const sellerRem = { ...data };
    if (sellerRem.insertId) {
      res.send("Seller profile created successfully");
    } else {
      res.send("Seller profile creation failed");
    }
  });
});

app.post("/signup-customer", (req, res) => {
  let customer = req.body;
  customer = {
    ...customer,
    customerNo: customer.customerNo * 1,
    customerCode: customer.customerCode * 1,
  };

  console.log(customer);
  const customerData = query.customerData(customer);
  server.query(customerData, function (error, data) {
    if (error) throw error;
    const customerRem = { ...data };
    if (customerRem.insertId) {
      res.send("Customer profile created successfully");
    } else {
      res.send("Customer profile creation failed");
    }
  });
});

app.post("/login-seller", (req, res) => {
  let loginSeller = req.body;
  loginSeller = {
    ...loginSeller,
    sellerNo: loginSeller.sellerNo * 1,
  };

  console.log(loginSeller);
  const sellerLoginData = query.sellerLogin(loginSeller);
  server.query(sellerLoginData, function (error, data) {
    if (error) throw error;
    const dataRem = { ...data };
    const { phn_no, sell_pass } = dataRem[0];
    if (phn_no && sell_pass) {
      res.status(200).json(dataRem);
    } else {
      res.send("Login Failed");
    }
  });
});

app.post("/login-customer", (req, res) => {
  let loginCustomer = req.body;
  loginCustomer = {
    ...loginCustomer,
    customerNo: loginCustomer.customerNo * 1,
  };

  console.log(loginCustomer);
  const customerLoginData = query.customerLogin(loginCustomer);
  server.query(customerLoginData, function (error, data) {
    if (error) throw error;
    const dataRem = { ...data };
    const { phn_no, cust_pass } = dataRem[0];
    console.log(phn_no, cust_pass);
    if (phn_no && cust_pass) {
      res.status(200).json(dataRem);
    } else {
      res.send("Login Failed");
    }
  });
});

app.post("/seller-dashboard", (req, res) => {
  let sellerDashboard = req.body;
  sellerDashboard = {
    ...sellerDashboard,
    sellerProductCost: sellerDashboard.sellerProductCost * 1,
    sellerProductQuantity: sellerDashboard.sellerProductQuantity * 1,
  };

  console.log(sellerDashboard);
  const sellerProductData = query.sellerDashboard(sellerDashboard);
  server.query(sellerProductData, function (error, data) {
    res.status(201).json({ sellerDashboard });
  });
});

app.get("/products", (req, res) => {
  const ProductsData = query.products();
  server.query(ProductsData, function (error, data) {
    res.status(200).json(JSON.stringify(data));
  });
});

app.post("/product-filter", (req, res) => {
  let productFilter = req.body;
  productFilter = {
    ...productFilter,
    customerInitialCost: productFilter.customerInitialCost * 1,
    customerFinalCost: productFilter.customerFinalCost * 1,
  };

  console.log(productFilter);
  const filterProductData = query.productView(productFilter);
  server.query(filterProductData, function (error, data) {
    res.status(200).json(JSON.stringify(data));
  });
});

app.post("/cart-add", (req, res) => {
  let cartDetails = req.body;
  cartDetails = {
    product_id: cartDetails.product_id * 1,
    customer_id: cartDetails.customer_id * 1,
    purchased: 1
  };

  console.log(cartDetails);
  const cartDataQuery = query.addToCart(cartDetails);
  server.query(cartDataQuery, function (error, data) {
    res.status(200).json({ data })
  });
});

app.post("/cart/:customerId", (req, res) => {
  let { customerId } = req.params;
  console.log(customerId);
  const cartDataQuery = query.cartDetails(customerId);
  server.query(cartDataQuery, function (error, data) {
    res.status(200).json(JSON.stringify(data))
  });
});

app.post("/buy/:customerId/:productId", (req, res) => {
  let { amount } = req.body;
  let { customerId, productId } = req.params;
  console.log(customerId, productId);
  const paymentData = { customerId: customerId * 1, productId: productId * 1, amount: amount * 1 }
  const paymentDataQuery = query.paymentDetails(paymentData);
  server.query(paymentDataQuery, function (error, data) {
    res.status(200).json(JSON.stringify(data))
  });
});

app.get("/order/:customerId", (req, res) => {
  const { customerId } = req.params
  const OrdersData = query.orderDetails(customerId);
  server.query(OrdersData, function (error, data) {
    res.status(200).json(JSON.stringify(data));
  });
});

app.post("/deleteOrder/:customerId/:productId", (req, res) => {
  let { customerId, productId } = req.params;
  console.log(customerId, productId);
  const orderData = { customerId: customerId * 1, productId: productId * 1 }
  const orderDataQuery = query.orderDeleteDetails(orderData);
  server.query(orderDataQuery, function (error, data) {
    res.status(200).json(JSON.stringify(data))
  });
});

app.get("/showProducts/:sellerId", (req, res) => {
  const { sellerId } = req.params
  console.log(sellerId)
  const SellerData = query.sellerProductDetails(sellerId);
  server.query(SellerData, function (error, data) {
    res.status(200).json(data);
  });
});

app.post("/deleteSellerProduct/:sellerId/:productId", (req, res) => {
  let { sellerId, productId } = req.params;
  console.log(sellerId, productId);
  const orderData = { sellerId: sellerId * 1, productId: productId * 1 }
  const orderDataQuery = query.productDeleteDetails(orderData);
  server.query(orderDataQuery, function (error, data) {
    res.status(200).json(data)
  });
});


app.listen(process.env.PORT, () => {
  console.log(`Listening at port ${process.env.PORT}...`);
});
