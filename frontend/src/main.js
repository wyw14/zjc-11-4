import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import StoryList from './views/StoryList.vue'
import StoryDetail from './views/StoryDetail.vue'
import AdminPanel from './views/AdminPanel.vue'
import MyFavorites from './views/MyFavorites.vue'
import './style.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: StoryList },
    { path: '/story/:id', name: 'story', component: StoryDetail, props: true },
    { path: '/favorites', name: 'favorites', component: MyFavorites },
    { path: '/admin', name: 'admin', component: AdminPanel }
  ]
})

createApp(App).use(router).mount('#app')
