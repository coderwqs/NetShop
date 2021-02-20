<template>
    <div class = "cart">
        <nav-bar class = "nav-bar">
            <div slot = "center">购物车({{length}})</div>
        </nav-bar>
        <cart-list />
        <cart-bottom-bar />
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import CartList from "./childComps/CartList";
    import CartBottomBar from "./childComps/CartBottomBar";

    import {mapGetters} from 'vuex'

    export default {
        name: "Cart",
        components: {
            NavBar,
            CartList,
            CartBottomBar
        },
        computed: {
            //  映射成计算属性的getter
            //  方法一，数组映射
            // ...mapGetters(['cartLength'])

            //  方法二，对象映射，给getter取别名
            ...mapGetters({
                length: 'cartLength'
            })
        }
    }
</script>

<style scoped>
    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
        font-weight: 700;
    }
</style>
