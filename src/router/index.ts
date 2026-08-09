import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: 'Патиланци — Българска gaming и creator общност',
        description:
          'Патиланци са българска общност за игри, видеа, стриймове и забавни приключения с приятели.',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: {
        title: 'За нас — Патиланци',
        description:
          'Историята на Патиланци, нашите ценности и какви Patilanci Gaming търсим в общността.',
      },
    },
    {
      path: '/creators',
      name: 'creators',
      component: () => import('@/views/CreatorsView.vue'),
      meta: {
        title: 'Създатели — Патиланци',
        description: 'Хората зад Patilanci Gaming — създателите и стриймърите на Патиланци.',
      },
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('@/views/EventsView.vue'),
      meta: {
        title: 'Събития — Патиланци',
        description: 'Предстоящи и минали събития на общността Патиланци.',
      },
    },
    {
      path: '/podcast',
      name: 'podcast',
      component: () => import('@/views/PodcastView.vue'),
      meta: {
        title: 'Подкаст — Патиланци (скоро)',
        description: 'Подкастът на Патиланци е в разработка — очаквай новини скоро в Discord.',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: {
        title: 'Контакти — Патиланци',
        description: 'Свържи се с общността Патиланци или поискай покана.',
      },
    },
  ],
})

router.afterEach((to) => {
  const title = (to.meta.title as string) ?? 'Патиланци'
  document.title = title

  const description = to.meta.description as string | undefined
  if (description) {
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }

  const canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) {
    canonical.setAttribute('href', `https://patilanci.gg${to.path}`)
  }
})

export default router
