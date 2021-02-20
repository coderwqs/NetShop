<template>
    <div ref = "wrapper" class="wrapper">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "Scroll",
        data() {
            return {
                scroll: null
            }
        },
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type:Boolean,
                default: true
            }
        },
        mounted() {
            //  创建scroll对象
            this.scroll = new BScroll(this.$refs.wrapper, {
                observeDOM: true,
                mouseWheel: true,
                click: true,
                pullUpLoad: this.pullUpLoad,
                probeType: this.probeType
            })

            //  监听滚动事件
            if (this.probeType === 2 || this.probeType === 3) {
                this.scroll.on('scroll', (position) => {
                    this.$emit('scroll', position)
                })
            }

            //  监听上拉事件
            this.scroll.on('pullingUp', () => {
                // console.log('上拉加载更多');
                this.$emit('pullingUp')
            })
        },
        methods: {
            scrollTo(x, y, time = 300) {
                this.scroll && this.scroll.scrollTo(x, y, time)
            },

            finishPullUp() {
                this.scroll && this.scroll.finishPullUp()
            },

            refresh() {
                this.scroll && this.scroll.refresh()
            },

            getScrollY() {
                return this.scroll ? this.scroll.y : 0
            }
        }
    }
</script>

<style scoped>

</style>