<template>
    <div class = "goods">
        <good-list-item v-for = "item in goods" :goods-item="item" />
    </div>
</template>

<script>
    import GoodListItem from "./GoodsListItem";

    export default {
        name: "GoodsList",
        components: {
            GoodListItem
        },
        props: {
            goods: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .goods {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        background-color: var(--color-background);

        padding-right: 1px;
    }
</style>