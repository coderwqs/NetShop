import {debounce} from "common/utils";

import BackTop from "components/contents/backtop/BackTop";

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            isShowBackTop: false
        }
    },
    components: {
        BackTop
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500)
        }
    },
    mounted() {
        //  图片加载完成的事件监听
        let refresh = debounce(this.$refs.scroll.refresh, 200)

        //  对监听的事件进行保存
        this.itemImgListener = () => {
            // this.$refs.scroll.refresh()
            refresh()
        }

        this.$bus.$on('itemImageLoad', this.itemImgListener)

        //  获取tabControl的offsetTop
        //  所有的组件都有一个属性$el:用于获取组件中的元素
        //  方法一
        // setTimeout(()=>{
        //     // console.log(this.$refs.tabControl.$el.offsetTop)
        //     this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
        // },1000)
        //  方法二
        // 监听HomeSwiper中img的加载完成，即Home中的布局已固定
    }
}