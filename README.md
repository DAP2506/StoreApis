
# STORE APIS

Handle the backend part of an online store using the provided some apis below!




## Tech Stack


**Server:** Node, Express

**Database:** MySql

## API Reference

#### Get all products available in the store

```http
  GET /api/products/getAllProducts
```

#### Get a particular product details available in the store

```http
  GET /api/products/getAProductByID/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of product to fetch |


#### Fetch a product and its details with help of QRCODE

```http
  GET /api/products/getAProductByQrCode
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `qrcode` | `image` | **Required**. Image should be in .png |


#### Add a New Product to the store

```http
  POST /api/products/addNewProduct
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Product title|
| `description` | `string` | **Required**. Product bio |
| `cost_prize` | `int` | **Required**. Cost Prize of the product |
| `selling_prize` | `int` | **Required**. Selling prize of the product |
| `quantity` | `int` | **Required**. Quantity of the product that you want to add in store |


#### Add the stock of the a existing product in the store


```http
  POST /api/products/addStockInStore/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required**. id of the product |
| `quantity` | `int` | **Required**. quantity of the product to be added |



#### Delete a product from the store


```http
  DELETE /api/products/deleteAProduct/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required**. id of the product |


#### Update a product details 


```http
  PUT /api/products/updateAProduct/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required**. id of the product |
| `title` | `string` | **Required**. title of the product |
| `description` | `string` | **Required**. description of product |
| `cost_prize` | `int` | **Required**.  |
| `selling_prize` | `int` | **Required**.  |


#### Get a particular product details available in the store

```http
  POST /api/cart/makeCart
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. name of buyer |
| `address`      | `string` | **Required**. address of buyer |
| `phoneNumber`      | `string` | **Required**. phone number of buyer |
| `promoCode`      | `string` | **Required**. promo code to have discounts |
| `products`      | `Array of JSON` | **Required**. all products that user want to buy in JSON |

Products 


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. title of product |
| `description`      | `string` | **Required**.  |
| `selling_prize`      | `int` | **Required**. selling proze to buyer|
| `cost_prize`      | `int` | **Required**. |
| `productID`      | `int` | **Required**. Id of the product want to buy |
| `quantityToBuy`      | `int` | **Required**. quantity of product to buy |



#### Get a cart from cartID

```http
  GET /api/cart/getACart/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of cart to fetch |



#### Purchase a cart 

```http
  POST /api/cart/purchaseACart/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of cart to purchase |


#### Get bill for a purchased cart

```http
  GET /api/cart/getBillForACart/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of cart which is purchased  |


#### Get bill for a purchased cart

```http
  GET /api/cart/getProfitForADay
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `date`      | `date` | **Required**. date on which to get total profit |

