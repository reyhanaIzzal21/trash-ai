<template>
    <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
        <div class="navbar-container">
            <!-- Logo -->
            <div class="navbar-brand" @click="scrollToTop">
                <div class="logo-icon">
                    <v-icon size="32" class="logo-glow">mdi-robot</v-icon>
                </div>
                <span class="brand-text">
                    <span class="text-primary">Trash</span>formers
                </span>
                <!-- badge for beta application 'beta' -->
                <span class="badge">beta</span>
            </div>

            <!-- Desktop Navigation -->
            <div class="navbar-links" v-if="!isMobile">
                <a href="#about" class="nav-link" @click.prevent="scrollTo('about')">About</a>
                <a href="#features" class="nav-link" @click.prevent="scrollTo('features')">Features</a>
                <a href="#how-it-works" class="nav-link" @click.prevent="scrollTo('how-it-works')">How It Works</a>
                <a href="#impact" class="nav-link" @click.prevent="scrollTo('impact')">Impact</a>
            </div>

            <!-- CTA Button -->
            <router-link :to="{ name: 'uploads', params: { idx: '0' } }" class="cta-button">
                <v-icon size="18" class="mr-2">mdi-rocket-launch</v-icon>
                <span>Mulai Deteksi</span>
            </router-link>

            <!-- Mobile Menu Button -->
            <button class="mobile-menu-btn" v-if="isMobile" @click="toggleMobileMenu">
                <v-icon>{{ mobileMenuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
            </button>
        </div>

        <!-- Mobile Menu -->
        <transition name="slide-down">
            <div class="mobile-menu" v-if="mobileMenuOpen && isMobile">
                <a href="#about" class="mobile-link" @click="scrollTo('about')">About</a>
                <a href="#features" class="mobile-link" @click="scrollTo('features')">Features</a>
                <a href="#how-it-works" class="mobile-link" @click="scrollTo('how-it-works')">How It Works</a>
                <a href="#impact" class="mobile-link" @click="scrollTo('impact')">Impact</a>
            </div>
        </transition>
    </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
    name: 'NavbarSection',
    setup() {
        const isScrolled = ref(false)
        const mobileMenuOpen = ref(false)
        const isMobile = ref(window.innerWidth < 768)

        const handleScroll = () => {
            isScrolled.value = window.scrollY > 50
        }

        const handleResize = () => {
            isMobile.value = window.innerWidth < 768
            if (!isMobile.value) mobileMenuOpen.value = false
        }

        const scrollTo = (id: string) => {
            const element = document.getElementById(id)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
                mobileMenuOpen.value = false
            }
        }

        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }

        const toggleMobileMenu = () => {
            mobileMenuOpen.value = !mobileMenuOpen.value
        }

        onMounted(() => {
            window.addEventListener('scroll', handleScroll)
            window.addEventListener('resize', handleResize)
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        })

        return {
            isScrolled,
            mobileMenuOpen,
            isMobile,
            scrollTo,
            scrollToTop,
            toggleMobileMenu,
        }
    },
})
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 16px 24px;
    transition: all 0.3s ease;
    background: transparent;
}

.navbar-scrolled {
    background: rgba(10, 10, 10, 0.9);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(22, 255, 0, 0.1);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.navbar-container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.navbar-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
}

.logo-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, rgba(22, 255, 0, 0.2) 0%, rgba(22, 255, 0, 0.05) 100%);
    border: 1px solid rgba(22, 255, 0, 0.3);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo-glow {
    color: #16FF00 !important;
    filter: drop-shadow(0 0 10px rgba(22, 255, 0, 0.5));
}

.brand-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
}

.text-primary {
    color: #16FF00;
}

.badge{
    font-size: 0.75rem;
    font-weight: 500;
    color: #16FF00;
    background: rgba(22, 255, 0, 0.2);
    border: 1px solid #16FF00;    
    padding: 2px 10px;
    letter-spacing: 1.2px;
    margin: 0;
    border-radius: 12px;
}

.navbar-links {
    display: flex;
    align-items: center;
    gap: 32px;
}

.nav-link {
    color: #a0a0a0;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: #16FF00;
    transition: width 0.3s ease;
}

.nav-link:hover {
    color: #16FF00;
}

.nav-link:hover::after {
    width: 100%;
}

.cta-button {
    display: flex;
    align-items: center;
    padding: 12px 24px;
    background: linear-gradient(135deg, #16FF00 0%, #0fa00f 100%);
    color: #000;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.9rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(22, 255, 0, 0.3);
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 40px rgba(22, 255, 0, 0.5);
}

.mobile-menu-btn {
    display: none;
    background: transparent;
    border: 1px solid rgba(22, 255, 0, 0.3);
    border-radius: 8px;
    padding: 8px;
    color: #16FF00;
    cursor: pointer;
}

.mobile-menu {
    background: rgba(10, 10, 10, 0.98);
    border-top: 1px solid rgba(22, 255, 0, 0.1);
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.mobile-link {
    color: #e0e0e0;
    text-decoration: none;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: color 0.3s ease;
}

.mobile-link:hover {
    color: #16FF00;
}

.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

@media (max-width: 768px) {
    .mobile-menu-btn {
        display: block;
    }
    
    .cta-button {
        display: none;
    }
}
</style>
