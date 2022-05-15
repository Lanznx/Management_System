const axios = require("axios")

// function to post data from "https://nccu-dbms-team11.herokuapp.com/product/getAllProducts" by userId: userId
async function getAllProduct(userId){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/product/getAllProducts", {
        userId: userId
    })

    let allProduct = result.data.allProductInformation.map(item => {
        // console.log(item)
        return {
        id: item.productId, 
        name: item.name, 
        price: item.price, 
        amount: item.amount
        }
    })

    return allProduct
}

export { getAllProduct }