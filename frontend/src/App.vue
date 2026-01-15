<template>
    <v-app>
        <!-- Landing Page - Full Screen without Dashboard elements -->
        <LandingLayout v-if="isLandingPage" />
        
        <!-- Dashboard Layout - With sidebar, navbar, etc -->
        <DashboardLayout v-else />
    </v-app>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import LandingLayout from '@/views/front/LandingLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

export default defineComponent({
    name: 'App',
    components: {
        LandingLayout,
        DashboardLayout,
    },
    setup() {
        const route = useRoute()
        
        // Check if current route is the landing page
        const isLandingPage = computed(() => {
            return route.name === 'home'
        })
        
        return {
            isLandingPage,
        }
    },
})
</script>

<style>
/* Global App Styles */
html {
    scroll-behavior: smooth;
}

body {
    margin: 0;
    padding: 0;
    background: #0a0a0a;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
    background: rgba(22, 255, 0, 0.3);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(22, 255, 0, 0.5);
}

/* Selection Color */
::selection {
    background: rgba(22, 255, 0, 0.3);
    color: #fff;
}
</style>
