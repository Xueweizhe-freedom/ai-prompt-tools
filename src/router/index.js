import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import PromptList from '@/pages/PromptList.vue'
import PromptDetail from '@/pages/PromptDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'AI Prompt Hub - 发现最优质的 AI 提示词',
      description: '收录各行业专业 AI 提示词，助力你的 AI 创作之旅'
    }
  },
  {
    path: '/prompts',
    name: 'Prompts',
    component: PromptList,
    meta: {
      title: '全部提示词 - AI Prompt Hub',
      description: '浏览所有 AI 提示词，按分类和等级筛选'
    }
  },
  {
    path: '/prompts/:category',
    name: 'Category',
    component: PromptList,
    props: true,
    meta: {
      title: '分类浏览 - AI Prompt Hub',
      description: '按行业分类浏览 AI 提示词'
    }
  },
  {
    path: '/prompt/:id',
    name: 'PromptDetail',
    component: PromptDetail,
    props: true,
    meta: {
      title: '提示词详情 - AI Prompt Hub',
      description: '查看提示词详细内容和使用说明'
    }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: PromptList,
    props: { favoritesOnly: true },
    meta: {
      title: '我的收藏 - AI Prompt Hub',
      description: '查看你收藏的 AI 提示词'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update page title and meta
router.beforeEach((to, from, next) => {
  const defaultTitle = 'AI Prompt Hub'
  const defaultDesc = '专业的 AI 提示词资源平台'
  
  document.title = to.meta.title || defaultTitle
  
  // Update meta description
  let metaDesc = document.querySelector('meta[name="description"]')
  if (!metaDesc) {
    metaDesc = document.createElement('meta')
    metaDesc.setAttribute('name', 'description')
    document.head.appendChild(metaDesc)
  }
  metaDesc.setAttribute('content', to.meta.description || defaultDesc)
  
  next()
})

export default router
