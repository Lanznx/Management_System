const axios = require("axios")

// function to post data from "https://nccu-dbms-team11.herokuapp.com/product/getAllProducts" by userId: userId
async function getAllProducts(userId){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/product/getAllProducts", {
        userId: userId
    })

    let allProduct = result.data.allProductInformation.map(item => {
        return {
        id: item.productId, 
        name: item.name, 
        price: item.price, 
        amount: item.amount
        }
    })

    return allProduct
}

// function to post data from "https://nccu-dbms-team11.herokuapp.com/material/getAllMaterials" by userId: userId
async function getAllMaterials(userId){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/material/getAllMaterials", {
        userId: userId
    })

    let allMaterial = result.data.allMaterialInformation.map(item => {
        return {
        id: item.materialId,
        name: item.name,
        price: item.price,
        amount: item.amount
        }
    })

    return allMaterial
}

export { getAllProducts, getAllMaterials }