<template>
    <div id = "detail">
        <detail-nav-bar class = "detail-nav" @titleClick = "titleClick" ref = "nav" />
        <scroll class = "content" ref = "scroll" @scroll = "contentScroll" :probe-type = "3">
            <detail-swiper :top-images = "topImages"></detail-swiper>
            <detail-base-info :goods = "goods" />
            <detail-shop-info :shop = "shop" />
            <detail-goods-info :detail-info = "detailInfo" @imageLoad = "imageLoad" />
            <detail-param-info ref = "params" :param-info = "paramInfo" />
            <detail-comment-info ref = "comment" :comment-info = "commentInfo" />
            <goods-list ref = "recommend" :goods = "recommends" />
        </scroll>
        <detail-bottom-bar @addCart = "addToCart" />
        <back-top @click.native = "backClick" v-show = "isShowBackTop" />
        <toast :message = "message" :show = "show" />
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import DetailBottomBar from "./childComps/DetailBottomBar";

    import Scroll from "components/common/scroll/Scroll";
    import GoodsList from "components/contents/goods/GoodsList";

    import {getDetail, GoodsInfo, Shop, GoodsParam, getRecommend} from "network/detail";
    import {itemListenerMixin} from "common/mixin";
    import {debounce} from "../../common/utils";
    import {mapActions} from 'vuex';

    // import Toast from "components/common/toast/Toast";

    export default {
        name: "Detail",
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopYs: [],
                getThemeTopY: null,
                currentIndex: 0,
                // message: '',
                // show: false
            }
        },
        components: {
            Scroll,
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar,
            // Toast,
            Scroll

        },
        //  混入
        mixins: [itemListenerMixin],
        created() {
            this.iid = this.$route.params.iid

            getDetail(this.iid).then((res) => {
                const data = res.result

                this.topImages = data.itemInfo.topImages

                this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)

                this.shop = new Shop(data.shopInfo)

                this.detailInfo = data.detailInfo

                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }

                //  值不对：DOM未渲染
                // this.themeTopYs = []
                // this.themeTopYs.push(0);
                // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                //
                // console.log(this.themeTopYs);

                // this.$nextTick(() => {
                //  值不对：图片未加载完成，未计算在offsetTOP中
                // this.themeTopYs = []
                // this.themeTopYs.push(0);
                // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                //
                // console.log(this.themeTopYs);
                // })
            })

            getRecommend().then(res => {
                this.recommends = res.data.list
            })

            this.getThemeTopY = debounce(() => {
                this.themeTopYs = []
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                this.themeTopYs.push(Number.MAX_VALUE)
            })
        },
        methods: {
            ...mapActions({
                add: 'addCart'
            }),
            imageLoad() {
                this.$refs.scroll.refresh()

                this.getThemeTopY()
            },
            titleClick(index) {
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
            },
            contentScroll(position) {
                const positionY = -position.y
                let length = this.themeTopYs.length

                // for (let i = 0; i < length; i++) {
                //     if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
                //         this.currentIndex = i
                //         this.$refs.nav.currentIndex=this.currentIndex
                //     }
                // }

                for (let i = 0; i < length - 1; i++) {
                    if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
                        this.currentIndex = i
                        this.$refs.nav.currentIndex = this.currentIndex
                    }
                }

                //  判断BackTop是否显示
                this.isShowBackTop = (-position.y) > 1000
            },
            addToCart() {
                //  获取购物车需要展示的信息
                const product = {}
                product.image = this.topImages[0]
                product.title = this.goods.title
                product.desc = this.goods.desc
                product.price = this.goods.realPrice
                product.iid = this.iid

                //  将商品添加到购物车
                //  this.$store.commit('addCart',product)
                //  this.$store.dispatch会返回一个Promise

                // 映射actions方法
                this.add(product).then(res => {
                   this.$toast.show(res,1000)
                })

                /* this.$store.dispatch('addCart', product).then(res => {
                     console.log(res);
                 })*/
            }
        },
        mounted() {
        },
        updated() {
        },
        destroyed() {
            this.$bus.$off('itemImgLoad', this.itemImgListener)
        }
    }
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }

    .content {
        height: calc(100% - 44px);
        /*position: ;*/
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
</style>