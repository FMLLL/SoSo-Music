import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const router = [{
  path: '*',
  redirect: '/recommend'
}, {
  path: '/recommend',
  name: 'Recommend',
  component: () => import ('@/components/recommend/recommend.vue')
}, {
  path: '/singer',
  name: 'Singer',
  component: () => import ('@/components/singer/singer.vue'),
  children: [{
    path: ':id',
    component: () => import ('@/components/singerDetail/singerDetail.vue')
  }]
}, {
  path: '/search',
  name: 'Search',
  component: () => import ('@/components/search/search.vue')
}, {
  path: '/rank',
  name: 'Rank',
  component: () => import ('@/components/rank/rank.vue'),
  children: [{
    path: ':id',
    component: () => import ('@/components/rank/rank.vue')
  }]
}, {
  path: '/person',
  name: 'Person',
  component: () => import ('@/components/person/person.vue')
}]

export default new Router({
  routes: router
})
