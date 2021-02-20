import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const routes = [
    {path: '', redirect: '/home'},
    {path: '/home', component: () => import('views/home/Home')},
    {path: '/cart', component: () => import('views/cart/Cart')},
    {path: '/category', component: () => import('views/category/Category')},
    {path: '/profile', component: () => import('views/profile/Profile')},
    {path: '/detail/:iid', component: () => import('views/detail/Detail')}
]

const router = new Router(
    {
        routes,
        mode: 'history',
        linkActiveClass: 'active'
    }
)

export default router
