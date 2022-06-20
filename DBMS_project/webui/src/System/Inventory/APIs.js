const axios = require("axios")

// function to post data from "https://nccu-dbms-team11.herokuapp.com/product/getAllProducts" by userId: userId
async function getAllProducts(){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/product/getAllProducts", {
        userId: localStorage.getItem("id_token")
    })

    if(result.data.message == "尚無商品") return []

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
async function getAllMaterials(){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/material/getAllMaterials", {
        userId: localStorage.getItem("id_token")
    })

    
    if(result.data.message == "尚無原料") return []

    let allMaterial = result.data.allMaterialInformation.map(item => {
        return {
        id: item.materialId,
        name: item.name,
        amount: item.amount
        }
    })

    return allMaterial
}

async function getMaterialDict(){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/material/getMaterialDict", {
        userId: localStorage.getItem("id_token")
    })

    let materialDict = result.data.materialDict

    return materialDict
}

async function getMaterialHistory(materialId){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/material/getMaterialHistory", {
        userId: localStorage.getItem("id_token"),
        materialId: materialId
    })

    // API 應該要要把 time 改成 date，並且 cost 不需要
    let materialHistory = result.data.materialInformation.map(item => {
        return {
            price: item.price,
            amount: item.amount,
            date: item.time,
            cost: item.cost
        }
    })

    return materialHistory
}

// function to post data to "https://nccu-dbms-team11.herokuapp.com/product/addNewProduct" by newObj
async function addNewProduct(newObj){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/product/addNewProduct", {
        userId: localStorage.getItem("id_token"),
        productName: newObj.productName,
        productPrice: newObj.productPrice,
        productAmount: newObj.productAmount,
        materialIds: newObj.materialIds
    })

    return result.data.message
}

// function to post data to "https://nccu-dbms-team11.herokuapp.com/material/addNewMaterial" by newObj
async function addNewMaterial(newObj){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/material/addNewMaterial", {
        userId: localStorage.getItem("id_token"),
        materialName: newObj.materialName,
        materialPrice: newObj.materialPrice,
        materialAmount: newObj.materialAmount
    })

    return result.data.message
}

async function updateProductAmount(productId, amountChange){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/product/updateAmount", {
        userId: localStorage.getItem("id_token"),
        productId: productId,
        amountChange: amountChange
    })

    return result.data.message
}

async function updateMaterialAmount(materialId, amountChange, price){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/material/updateAmount", {
        userId: localStorage.getItem("id_token"),
        materialId: materialId,
        amountChange: amountChange,
        price: price
    })

    return result.data.message
}

async function deleteProduct(productId){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/product/deleteProduct", {
        userId: localStorage.getItem("id_token"),
        productId: productId
    })

    return result.data.message
}

async function deleteMaterial(materialId){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/material/deleteMaterial", {
        userId: localStorage.getItem("id_token"),
        materialId: materialId
    })
    
    return result.data.message
}

export { 
    getAllProducts, 
    getAllMaterials, 
    addNewProduct, 
    addNewMaterial, 
    getMaterialDict, 
    getMaterialHistory, 
    updateProductAmount,
    updateMaterialAmount,
    deleteProduct, 
    deleteMaterial }