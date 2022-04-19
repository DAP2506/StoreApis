module.exports = ({ date, promoAmount, billNumber, Amount, name, phoneNumber, address, products }) => {
    let htmlStart = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bill HOTNOT</title>

    <style>
        .main {
            background-color: rgb(215, 252, 255);
            border: 3px solid black;
            border-radius: 10px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            min-height: 100vh;
        }

        .main-title {
            align-items: center;
            text-align: center;
        }

        .line-break {
            width: 100%;
            background-color: black;
            height: 1.5px;

        }

        .info {
            display: flex;
            flex-direction: column;
            width: 80%;
            margin: 2%;
        }

        .info-item {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            padding-top: 10px;

        }
        .table-details{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
        }
        table {
            margin-top: 20px;
            border-collapse: collapse;
            border: 1px solid black;
            width: 100%;
        }
  
        th,
        td {
            border: 1px solid black;
            width: 10%;
            height: 10%;
            text-align: center;
        }
        .promoCode{
            width: 100%;
            align-items: center;
            text-align: center;
            margin-top: 30px;
        }
        .totalCost{
            padding-top: 20px;
        }
        .totalCost{
            width: 80%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

    </style>
</head>

<body>
    <div class="main">
        <div class="line-break">
        </div>
        <div class="main-title">
            <h2>Purchase BILL</h2>
            <!-- add bill number here -->
            <h1>
                ${billNumber}
            </h1>
            <h5>Hotnot pvt lt</h5>
        </div>
        <div class="line-break">
        </div>

        <div class="info">
            <div class="info-item">
                <div class="info-item-left" style="font-weight: 500; font-size: large" >
                    DATE:
                </div>
                <!-- add date here -->
                <div class="info-item-right">
                    ${date}
                </div>
            </div>

            <div class="info-item">
                <div class="info-item-left" style="font-weight: 500; font-size: large" >
                    Name:
                </div>
                <!-- add date here -->
                <div class="info-item-right">
                    ${name}
                </div>
            </div>


            <div class="info-item">
                <div class="info-item-left" style="font-weight: 500; font-size: large" >
                    Contact Number:
                </div>
                <!-- add date here -->
                <div class="info-item-right">
                    ${phoneNumber}
                </div>
            </div>

            <div class="info-item">
                <div class="info-item-left" style="font-weight: 500; font-size: large" >
                    ADDRESS:
                </div>
                <!-- add date here -->
                <div class="info-item-right">
                    ${address}
                </div>
            </div>

        </div>

        <div class="line-break">
        </div>

        <div class="table-details">

            <table>
                <tr style="font-weight: 500; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; font-size: 20px; ">
                    <td>Product Name</td>
                    <td>Product Bio</td>
                    <td>Quantity</td>
                    <td>Cost</td>
                </tr>`

                products.forEach(product => {
                    htmlStart += `
                    <tr>
                        <td>${product.title}</td>
                        <td>${product.description}</td>
                        <td>${product.quantityToBuy}</td>
                        <td>${product.selling_prize}</td>
                    </tr> 
                    `
                });


   const htmlLast = `</table>

        </div>
        <br><br>
        <div class="line-break">
        </div>
        <div class="promoCode">
            
            PROMOAMOUNT: ${promoAmount}
        </div>
        <br><br>
        <div class="line-break">
        </div>
        <div class="totalCost">
            <div class="totalCost-left" style="text-align:center;" >
                Total Amount - PROMO CODE
            </div>
            
        </div>
        <div class="totalCost">
            <div class="totalCost-left " style="font-size: larger; font-weight: 700; text-align:center; " >
                ${Amount} - ${promoAmount}
            </div>
            <br><br>
            <div class="totalCost-right" style="text-align:center;" >
                Final amount
            </div>
            <div class="totalCost-right" style="font-size: larger; font-weight: 700; text-align:center;" >
                RUPEES - ${Amount - promoAmount}
            </div>
        </div>

        <br><br>
        <div class="line-break">
        </div>


    </div>


</body>

</html>
    
    `
    htmlStart += htmlLast;
    
    return htmlStart;




}



// <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Bill HOTNOT</title>

//     <style>
//         .main {
//             background-color: azure;
//             width: 100%;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
//             min-height: 100vh;
//         }

//         .main-title {
//             align-items: center;
//             text-align: center;
//         }

//         .line-break {
//             width: 80%;
//             background-color: black;
//             height: 1.5px;

//         }

//         .info {
//             display: flex;
//             flex-direction: column;
//             width: 80%;
//             margin: 2%;
//         }

//         .info-item {
//             display: flex;
//             flex-direction: row;
//             justify-content: space-evenly;
//             padding-top: 10px;

//         }
//         .table-details{
//             width: 100%;
//             display: flex;
//             flex-direction: column;
//             justify-content: space-evenly;
//             align-items: center;
//         }
//         table {
//             margin-top: 20px;
//             border-collapse: collapse;
//             border: 1px solid black;
//             width: 80%;
//         }

//         th,
//         td {
//             border: 1px solid black;
//             width: 10%;
//             height: 10%;
//             text-align: center;
//         }
//         .promoCode{
//             width: 100%;
//             align-items: center;
//             text-align: center;
//             margin-top: 30px;
//         }
//         .totalCost{
//             padding-top: 20px;
//         }
//         .totalCost{
//             width: 80%;
//             display: flex;
//             flex-direction: row;
//             justify-content: space-between;
//         }

//     </style>
// </head>

// <body>
//     <div class="main">
//         <div class="line-break">
//         </div>
//         <div class="main-title">
//             <h2>Purchase BILL</h2>
//             <!-- add bill number here -->
//             <h1>
//                 <%= billNumber %> 
//             </h1>
//             <h5>Hotnot pvt lt</h5>
//         </div>
//         <div class="line-break">
//         </div>

//         <div class="info">
//             <div class="info-item">
//                 <div class="info-item-left">
//                     DATE:
//                 </div>
//                 <!-- add date here -->
//                 <div class="info-item-right">
//                     date
//                 </div>
//             </div>

//             <div class="info-item">
//                 <div class="info-item-left">
//                     Name:
//                 </div>
//                 <!-- add date here -->
//                 <div class="info-item-right">
//                     name
//                 </div>
//             </div>


//             <div class="info-item">
//                 <div class="info-item-left">
//                     Contact Number:
//                 </div>
//                 <!-- add date here -->
//                 <div class="info-item-right">
//                     phoneNumber
//                 </div>
//             </div>

//             <div class="info-item">
//                 <div class="info-item-left">
//                     ADDRESS:
//                 </div>
//                 <!-- add date here -->
//                 <div class="info-item-right">
//                     address
//                 </div>
//             </div>

//         </div>

//         <div class="line-break">
//         </div>

//         <div class="table-details">

//             <table>
//                 <tr style="font-weight: 500; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; font-size: 20px; ">
//                     <td>Product Name</td>
//                     <td>Product Bio</td>
//                     <td>Quantity</td>
//                     <td>Cost</td>
//                 </tr>


//                 <tr>
//                     <td>Product Name</td>
//                     <td>Product Bio</td>
//                     <td>quantity</td>
//                     <td>Cost</td>
//                 </tr>






//             </table>

//         </div>
//         <br><br>
//         <div class="line-break">
//         </div>
//         <div class="promoCode">

//             PROMOCODE: promocode
//         </div>
//         <br><br>
//         <div class="line-break">
//         </div>
//         <div class="totalCost">
//             <div class="totalCost-left">
//                 Total Amount - PROMO CODE
//             </div>
//             <div class="totalCost-right">
//                 Final amount
//             </div>
//         </div>
//         <div class="totalCost">
//             <div class="totalCost-left " style="font-size: larger; font-weight: 700;" >
//                 Total Amount - PROMO CODE
//             </div>
//             <div class="totalCost-right" style="font-size: larger; font-weight: 700;" >
//                 Final amount
//             </div>
//         </div>




//     </div>


// </body>

// </html>














