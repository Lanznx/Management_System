const axios = require("axios")

const getAllProduct = (userId) => axios
    .post("https://nccu-dbms-team11.herokuapp.com/product/getAllProducts",{
        userId: userId
    })
    .then((res) => {
        // console.log(res)
        let allProduct = res.data.allProductInformation.map(item => {
            // console.log(item)
            return {
            id: item.productId, 
            name: item.name, 
            price: item.price, 
            amount: item.amount
            }
        })

        console.log(allProduct)
        return allProduct
    })
    .catch((err) => {
        //console.log(err)
        return []
    })


async function test(){
    let obj = await getAllProduct
    console.log(obj)
}

test()