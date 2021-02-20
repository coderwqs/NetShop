import {ADD_COUNTER,ADD_TO_CART} from "./mutation-types";

export default {
    addCart(context, payload) {
        return new Promise((resolve,reject)=>{
           /*  payload新添加的商品
            let oldProduct = null
            for (let item of state.cartList) {
                if (item.iid === payload.iid) {
                    oldProduct = item
                }
            }*/

            //  查找数组中是否有该商品
            let oldProduct = context.state.cartList.find(function (item) {
                return item.iid === payload.iid
            })

            //  判断oldProduct
            if (oldProduct) {   //  数量+1
                context.commit(ADD_COUNTER, oldProduct)
                resolve('商品数量+1')
            } else {    //  添加新商品
                payload.count = 1
                // state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve('添加商品到购物车')
            }
        })
    }
}