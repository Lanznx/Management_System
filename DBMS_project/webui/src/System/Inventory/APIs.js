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
        amount: item.amount
        }
    })

    return allMaterial
}

async function getMaterialDict(userId){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/material/getMaterialDict", {
        userId: userId
    })

    let materialDict = result.data.materialDict

    return materialDict
}

// function to post data to "https://nccu-dbms-team11.herokuapp.com/product/addNewProduct" by newObj
async function addNewProduct(newObj){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/product/addNewProduct", {
        userId: "6cc4a5be-08ba-41de-946d-a2e5c6ed43c2",
        productName: newObj.productName,
        productPrice: newObj.productPrice,
        productAmount: newObj.productAmount,
        materialIds: newObj.materialIds
    })

    return result.data.message
}

// function to post data to "https://nccu-dbms-team11.herokuapp.com/material/addNewMaterial" by newObj
async function addNewMaterial(newObj){
    console.log({
        userId: "6cc4a5be-08ba-41de-946d-a2e5c6ed43c2",
        materialName: newObj.materialName,
        materialPrice: newObj.materialPrice,
        materialAmount: newObj.materialAmount
    })

    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/material/addNewMaterial", {
        userId: "6cc4a5be-08ba-41de-946d-a2e5c6ed43c2",
        materialName: newObj.materialName,
        materialPrice: newObj.materialPrice,
        materialAmount: newObj.materialAmount
    })

    return result.data.message
}

async function deleteProduct(productId){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/product/deleteProduct", {
        userId: "6cc4a5be-08ba-41de-946d-a2e5c6ed43c2",
        productId: productId
    })

    return result.data.message
}

async function deleteMaterial(materialId){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/material/deleteMaterial", {
        userId: "6cc4a5be-08ba-41de-946d-a2e5c6ed43c2",
        materialId: materialId
    })
    
    return result.data.message
}

export { getAllProducts, getAllMaterials, addNewProduct, addNewMaterial, getMaterialDict, deleteProduct, deleteMaterial }