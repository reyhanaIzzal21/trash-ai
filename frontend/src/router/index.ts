import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { log } from '@/lib/logging'

// Landing Page
import Home from '@/views/front/home.vue'

// Dashboard Views
import About from '@/views/dashboard/about.vue'
import Uploads from '@/views/dashboard/uploads.vue'
import Summary from '@/views/dashboard/summary.vue'
import Image from '@/views/dashboard/image.vue'
import Detection from '@/views/dashboard/detection.vue'
import Test from '@/views/dashboard/test.vue'

const routes: Array<RouteRecordRaw> = [
    // Landing Page Route (Full screen, no dashboard)
    {
        path: '/',
        name: 'home',
        component: Home,
    },

    // Dashboard Routes
    {
        path: '/dashboard/about',
        name: 'dashboard-about',
        component: About,
    },
    {
        path: '/uploads/:idx',
        name: 'uploads',
        component: Uploads,
    },
    {
        path: '/image/:idx/:tab',
        name: 'image',
        component: Image,
    },
    {
        path: '/summary/:tab',
        name: 'summary',
        component: Summary,
    },
    {
        path: '/detection/:name',
        name: 'detection',
        component: Detection,
    },
    {
        path: '/test',
        name: 'test',
        component: Test,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.onError((error) => {
    log.error(`Error in router: ${error}`)
})

export default router
