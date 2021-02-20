<template>
    <div id = "home">
        <nav-bar class = "home-nav">
            <div slot = "center">购物街</div>
        </nav-bar>
        <tab-control class = "tab-control"
                     @tabClick = "tabClick"
                     :titles = "['流行','新款','精选']"
                     ref = "tabControl2"
                     v-show = "isTabFixed"
        />
        <scroll class = "content" ref = "scroll" :probe-type = "3" @scroll = "contentScroll" :pull-up-load = "true"
                @pullingUp = "loadMore">
            <home-swiper :banners = "banners" @swiperImageLoad = "swiperImageLoad" />
            <home-recommend-view :recommends = "recommends" />
            <feature-view />
            <!--            <tab-control class = "tab-control" @tabClick = "tabClick" :titles = "['流行','新款','精选']" />-->
            <tab-control :class = "{fixed:isTabFixed}" @tabClick = "tabClick" :titles = "['流行','新款','精选']"
                         ref = "tabControl1" />
            <goods-list :goods = "showGoods" />
        </scroll>

        <back-top @click.native = "backClick" v-show = "isShowBackTop"></back-top>
    </div>
</template>

<script>
    import HomeSwiper from "./childComps/HomeSwiper";
    import HomeRecommendView from "./childComps/HomeRecommendView";
    import FeatureView from "./childComps/FeatureView";

    import NavBar from "components/common/navbar/NavBar";
    import TabControl from "components/contents/tabControl/TabControl";
    import GoodsList from "components/contents/goods/GoodsList";
    import Scroll from "components/common/scroll/Scroll";

    import {getHomeMultiData, getGoodsData} from "network/home";
    import {itemListenerMixin} from "common/mixin";

    export default {
        name: "Home",
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []}
                },
                currentType: 'pop',
                tabOffsetTop: 0,
                isTabFixed: false,
                saveY: 0
            }
        },

        components: {
            NavBar,
            HomeSwiper,
            HomeRecommendView,
            FeatureView,
            TabControl,
            GoodsList,
            Scroll
        },
        mixins:[itemListenerMixin],
        created() {
            // 请求多个数据
            this.getHomeMultiData()

            this.getGoodsData('pop')

            this.getGoodsData('new')

            this.getGoodsData('sell')

        },

        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },

        activated() {
            this.$refs.scroll.scrollTo(0, this.saveY, 0)
            this.$refs.scroll.refresh()

        },

        deactivated() {
            this.saveY = this.$refs.scroll.getScrollY()

            //  取消全局事件的监听
            this.$bus.$off('itemImgLoad',this.itemImgListener)
        },

        mounted() {

        },

        methods: {
            /*
                事件监听
            */
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                }
                this.$refs.tabControl2.currentIndex = index
                this.$refs.tabControl1.currentIndex = index
            },

            contentScroll(position) {
                //  判断BackTop是否显示
                this.isShowBackTop = (-position.y) > 1000

                //  判断tabControl是否吸顶
                this.isTabFixed = (-position.y) > this.tabOffsetTop

            },

            loadMore() {
                this.getGoodsData(this.currentType)
            },

            swiperImageLoad() {
                this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
            },

            /*
              获取数据
             */
            getHomeMultiData() {
                getHomeMultiData().then(res => {
                    // console.log(res)
                    this.banners = res.data.banner.list
                    this.recommends = res.data.recommend.list
                })
            },

            getGoodsData(type) {
                const page = this.goods[type].page + 1
                getGoodsData(type, page).then(res => {
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1

                    //  完成上拉加载动作
                    this.$refs.scroll.finishPullUp()
                })
            }
        }
    }
</script>

<style scoped>

    #home {
        /*margin-top: 44px;*/
        /*padding-top: 44px;*/
        height: 100vh;
        position: relative;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: #fff;

        /*使用better-scroll,导航未包含在scroll中，无需脱离标准流*/
        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/
        /*z-index: 9;*/
    }

    /*使用better-scroll后，原生滚动失效*/
    /*.tab-control {*/
    /*    !*position: sticky;*!*/
    /*    !*top: 44px;*!*/
    /*    !*z-index: 9;*!*/
    /*}*/

    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
    }

    .tab-control {
        position: relative;
        z-index: 9;
    }

    /*.fixed {*/
    /*    position: fixed;*/
    /*    left: 0;*/
    /*    right: 0;*/
    /*    top: 44px;*/
    /*}*/

    /*.content {*/
    /*    height: calc(100% - 93px);*/
    /*    overflow: hidden;*/
    /*    margin-top: 44px;*/
    /*}*/
</style>
