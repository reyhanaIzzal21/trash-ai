<template>
    <section class="impact-stats-section">
        <div class="stats-container">
            <div class="stat-item" v-for="(stat, index) in stats" :key="index">
                <div class="stat-value">
                    <span ref="statRef">{{ 0 }}</span>{{ stat.suffix }}
                </div>
                <div class="stat-label">{{ stat.label }}</div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default defineComponent({
    name: 'ImpactStatsSection',
    setup() {
        const stats = [
            { value: 98, suffix: '%', label: 'RECOGNITION ACCURACY' },
            { value: 24, suffix: '/7', label: 'DRONE SCOUTS' },
            { value: 50, suffix: 'K+', label: 'OBJECTS ANALYZED' },
            { value: 0.2, suffix: 's', label: 'RESPONSE TIME' },
        ]

        const statRef = ref<HTMLElement[]>([])

        const animateStats = () => {
            statRef.value.forEach((el, index) => {
                const targetValue = stats[index].value
                gsap.to(el, {
                    innerHTML: targetValue,
                    duration: 2,
                    snap: { innerHTML: 0.1 }, 
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                    },
                    ease: 'power1.out',
                    onUpdate: function () {
                        el.innerHTML = Number(this.targets()[0].innerHTML).toFixed(stats[index].label.includes('TIME') ? 1 : 0)
                    }
                })
            })
        }

        onMounted(() => {
            animateStats()
        })

        return {
            stats,
            statRef,
        }
    },
})
</script>

<style scoped>
.impact-stats-section {
    width: 100%;
    padding: 2rem 5%;
    background: linear-gradient(180deg, #000 0%, #0a0a0a 100%);
    border-bottom: 1px solid rgba(22, 255, 0, 0.1);
}

.stats-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.stat-item {
    text-align: center;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    transition: all 0.3s ease;
}

.stat-item:hover {
    border-color: var(--neon-green);
    box-shadow: 0 0 15px rgba(22, 255, 0, 0.1);
}

.stat-value {
    font-size: 3rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.5rem;
    font-family: 'Michroma', sans-serif; /* Futuristic font if available, or fallback */
}

.stat-value span {
    color: #fff;
}

.stat-item:hover .stat-value span,
.stat-item:hover .stat-value {
    color: var(--neon-green);
    text-shadow: 0 0 10px rgba(22, 255, 0, 0.4);
}

.stat-label {
    font-size: 0.8rem;
    color: #888;
    letter-spacing: 2px;
    text-transform: uppercase;
}

@media (max-width: 768px) {
    .stats-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .stats-container {
        grid-template-columns: 1fr;
    }
}
</style>
