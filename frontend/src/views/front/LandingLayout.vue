<template>
    <div class="landing-page">
        <NavbarSection />
        <HeroSection />
        <ImpactStatsSection />
        <AboutSection />
        <FeatureSection />
        <HowItWorksSection />
        <ImpactSection />
        <FooterSection />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavbarSection from './sections/NavbarSection.vue'
import HeroSection from './sections/HeroSection.vue'
import ImpactStatsSection from './sections/ImpactStatsSection.vue'
import AboutSection from './sections/AboutSection.vue'
import FeatureSection from './sections/FeatureSection.vue'
import HowItWorksSection from './sections/HowItWorksSection.vue'
import ImpactSection from './sections/ImpactSection.vue'
import FooterSection from './sections/FooterSection.vue'

export default defineComponent({
    name: 'LandingLayout',
    components: {
        NavbarSection,
        HeroSection,
        ImpactStatsSection,
        AboutSection,
        FeatureSection,
        HowItWorksSection,
        ImpactSection,
        FooterSection,
    },
})
</script>

<style>
/* Global Landing Page Styles */
.landing-page {
    width: 100%;
    min-height: 100vh;
    background-color: #000000;
    color: #fff;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    position: relative;
    --neon-green: #16FF00;
    --dark-bg: #050505;
    --card-bg: rgba(20, 20, 20, 0.8);
}

.text-neon {
    color: var(--neon-green);
}

.bg-neon {
    background-color: var(--neon-green);
}

/* Smooth Scroll */
html {
    scroll-behavior: smooth;
}

/* Custom Scrollbar for Landing Page */
.landing-page::-webkit-scrollbar {
    width: 6px;
}

.landing-page::-webkit-scrollbar-track {
    background: #000;
}

.landing-page::-webkit-scrollbar-thumb {
    background: var(--neon-green);
    border-radius: 3px;
}

.landing-page::-webkit-scrollbar-thumb:hover {
    background: #3aff22;
}

/* Selection Color */
.landing-page ::selection {
    background: rgba(22, 255, 0, 0.3);
    color: #fff;
}
</style>
