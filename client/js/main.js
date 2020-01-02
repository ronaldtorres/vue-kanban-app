import '../scss/app.scss';

import Vue from 'vue';
import App from './app/App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
    el: '#app',
    render: h => h(App)
});

/*
    // I leave this comment here by learning reasons, this way produce an error
    // not works if the $mount method or render prop are used.
    new Vue({
        el: '#app',
        components: {App},
        template: '<App/>'
    })

    =========================

    This way works:

    new Vue({
        components: {App},
        template: '<App/>',
        mounted() {
            console.log('App initialized');
        }
    }).$mount('#app');
 */