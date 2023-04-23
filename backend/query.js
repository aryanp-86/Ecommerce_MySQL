exports.sellerData = (values) => {
  return `Insert into seller(name,sell_pass,address,phn_no,pincode,type,seller_category) values ('${values.sellerName}','${values.sellerPassword}','${values.sellerAddress}',${values.sellerNo},${values.sellerCode},'${values.sellerType}','${values.sellerCategory}')`;
};

exports.customerData = (values) => {
  return `Insert into customer(cust_pass,name,address,phn_no,pincode) values ('${values.customerPassword}','${values.customerName}','${values.customerAddress}',${values.customerNo},${values.customerCode})`;
};

exports.sellerLogin = (values) => {
  return `Select * from seller where phn_no=${values.sellerNo} and sell_pass='${values.sellerPassword}'`;
};

exports.customerLogin = (values) => {
  return `Select * from customer where phn_no=${values.customerNo} and cust_pass='${values.customerPassword}'`;
};

exports.sellerDashboard = (values) => {
  return `Insert into products(product_name,cost,quantity,size,color,type,seller_id) values ('${values.sellerProductName}',${values.sellerProductCost},${values.sellerProductQuantity},'${values.sellerProductSize}','${values.sellerProductColor}','${values.sellerProductType}',${values.sellerId})`;
};

exports.products = () => {
  return "Select * from products";
};

exports.productView = (values) => {
  return `Select * from products where cost>${values.customerInitialCost} and cost<${values.customerFinalCost}`
}

exports.addToCart = (values) => {
  return `Insert into cart(product_id,customer_id,purchased) values (${values.product_id},${values.customer_id},${values.purchased})`;
}

exports.cartDetails = (customer_id) => {
  return `Select * from cart where customer_id=${customer_id}`
}

exports.paymentDetails = (values) => {
  return `Insert into payment(product_id,customer_id,amount) values (${values.productId},${values.customerId},${values.amount})`;
}

exports.orderDetails = (customer_id) => {
  return `Select * from payment where customer_id=${customer_id}`
}

exports.orderDeleteDetails = (values) => {
  return `Delete from payment where customer_id=${values.customerId} and product_id=${values.productId}`
}

exports.sellerProductDetails = (sellerId) => {
  return `Select * from products where seller_id=${sellerId}`
}

exports.productDeleteDetails = (values) => {
  return `Delete from products where seller_id=${values.sellerId} and product_id=${values.productId}`
}