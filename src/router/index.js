import Vue from 'vue';
import Router from 'vue-router';
import main from 'components/main/main.vue';
import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import shops from 'components/shops/shops.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: main,
            children: [
                /** 这样设置默认跳转**/
                {
                    path: '',
                    component: goods
                },
                {
                    path: 'goods',
                    name: 'goods',
                    component: goods
                },
                {
                    path: 'ratings',
                    name: 'ratings',
                    component: ratings
                },
                {
                    path: 'shops',
                    name: 'shops',
                    component: shops
                }
            ]
        }
    ]
});
