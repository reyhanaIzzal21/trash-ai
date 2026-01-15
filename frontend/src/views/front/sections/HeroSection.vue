<template>
    <section class="hero-section">
        <!-- Background Grid & Effects -->
        <div class="hero-bg">
            <div class="grid-overlay"></div>
            <div class="radar-scan"></div>
        </div>

        <div class="hero-content">
            <div class="hero-text">
                <div class="badge-pill" ref="badgeRef">VERTICAL HERO</div>
                <h1 ref="titleRef">
                    DETECTING THE <span class="text-neon">INVISIBLE</span><br />
                    PROTECTING THE FUTURE
                </h1>
                <p ref="descRef">
                    Deploy autonomous drone drones powered by advanced computer vision to
                    identify, track, and analyze waste patterns in educational environments.
                </p>

                <div class="hero-actions" ref="actionsRef">
                    <router-link to="/uploads/0" class="btn-primary">
                        GET STARTED
                    </router-link>
                </div>
            </div>

            <!-- Visual element (Radar/Globe/Drone placeholder) -->
            <div class="hero-visual" ref="visualRef">
                <div class="radar-display">
                    <div class="circle c1"></div>
                    <div class="circle c2"></div>
                    <div class="circle c3"></div>
                    <div class="scanning-line"></div>
                    <div class="dot d1"></div>
                    <div class="dot d2"></div>
                    <div class="globe-icon">🌐</div>
                    <div class="stats-overlay">
                        <div class="stat-box top-left">TARGET: PLASTIC</div>
                        <div class="stat-box bottom-right">CONF: 98%</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import gsap from 'gsap'

export default defineComponent({
    name: 'HeroSection',
    setup() {
        const titleRef = ref(null)
        const descRef = ref(null)
        const actionsRef = ref(null)
        const badgeRef = ref(null)
        const visualRef = ref(null)

        onMounted(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            tl.from(badgeRef.value, { opacity: 0, y: -20, duration: 0.8 })
                .from(titleRef.value, { opacity: 0, y: 30, duration: 1 }, '-=0.4')
                .from(descRef.value, { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
                .from(actionsRef.value, { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
                .from(visualRef.value, { opacity: 0, scale: 0.8, duration: 1 }, '-=0.8')

            // Continuous animation for radar
            gsap.to('.scanning-line', {
                rotation: 360,
                duration: 4,
                repeat: -1,
                ease: 'linear',
                transformOrigin: 'bottom center',
            })
        })

        return {
            titleRef,
            descRef,
            actionsRef,
            badgeRef,
            visualRef,
        }
    },
})
</script>

<style scoped>
.hero-section {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding-top: 80px; /* Space for Navbar */
}

/* Background Effects */
.hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.grid-overlay {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
            rgba(22, 255, 0, 0.1) 1px,
            transparent 1px
        ),
        linear-gradient(90deg, rgba(22, 255, 0, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.2;
    mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
}

.hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    padding: 0 5%;
    gap: 4rem;
}

.hero-text {
    flex: 1;
    max-width: 650px;
}

.badge-pill {
    display: inline-block;
    padding: 6px 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    font-size: 0.8rem;
    color: #888;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    background: rgba(255, 255, 255, 0.05);
}

h1 {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    letter-spacing: -1px;
    font-family: 'Michroma', sans-serif;
}

p {
    font-size: 1.1rem;
    color: #aaa;
    line-height: 1.6;
    margin-bottom: 2.5rem;
    max-width: 500px;
}

.hero-actions {
    display: flex;
    gap: 1.5rem;
}

.btn-primary {
    background: var(--neon-green);
    color: #000;
    padding: 12px 32px;
    font-weight: 700;
    text-decoration: none;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
}

.btn-primary:hover {
    background: #fff;
    box-shadow: 0 0 20px rgba(22, 255, 0, 0.5);
}

.btn-secondary {
    background: transparent;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 12px 24px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
}

.btn-secondary:hover {
    border-color: var(--neon-green);
    color: var(--neon-green);
}

/* Visual Radar */
.hero-visual {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.radar-display {
    width: 400px;
    height: 400px;
    border: 2px solid rgba(22, 255, 0, 0.3);
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(
        circle,
        rgba(22, 255, 0, 0.1) 0%,
        transparent 70%
    );
    box-shadow: 0 0 50px rgba(22, 255, 0, 0.05);
}

.circle {
    position: absolute;
    border: 1px solid rgba(22, 255, 0, 0.2);
    border-radius: 50%;
}

.c1 {
    width: 80%;
    height: 80%;
}

.c2 {
    width: 60%;
    height: 60%;
}

.c3 {
    width: 40%;
    height: 40%;
}

.scanning-line {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 2px;
    background: linear-gradient(90deg, var(--neon-green), transparent);
    transform-origin: left center;
    opacity: 0.8;
}

.globe-icon {
    font-size: 5rem;
    opacity: 0.5;
    filter: drop-shadow(0 0 10px var(--neon-green));
}

.stat-box {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid var(--neon-green);
    padding: 5px 10px;
    font-size: 0.7rem;
    color: var(--neon-green);
    font-family: monospace;
}

.top-left {
    top: 10%;
    left: 0;
}

.bottom-right {
    bottom: 15%;
    right: 10%;
}

@media (max-width: 960px) {
    .hero-content {
        flex-direction: column-reverse;
        padding-top: 50px;
        text-align: center;
    }

    .hero-text {
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    .hero-actions {
        justify-content: center;
    }

    .hero-visual {
        margin-bottom: 2rem;
    }

    h1 {
        font-size: 2.5rem;
    }
}
</style>
