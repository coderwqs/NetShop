import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {

    /*
    //  方法一：失败，Toast可能未挂载成功
    Vue.extend(Toast)

    document.body.appendChild(Toast.$el)

    Vue.prototype.$toast = Toast
    */

    //  方法二
    //  创建组件构造器
    const toastContrustor = Vue.extend(Toast)

    //  new的方式，根据组件构造器，可以创建一个组件对象
    const toast = new toastContrustor()

    //  将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    //  toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}

export default obj