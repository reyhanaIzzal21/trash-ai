<template>
    <section class="how-it-works-section" id="how-it-works">
        <div class="section-header">
            <h2>OPERATIONAL FLOW</h2>
            <div class="underline"></div>
        </div>

        <div class="flow-container">
            <div class="flow-step" v-for="(step, index) in steps" :key="index">
                <div class="step-circle">{{ index + 1 }}</div>
                <div class="step-box">
                    <h3>{{ step.title }}</h3>
                    <p>{{ step.description }}</p>
                </div>
            </div>
            <!-- Connecting Line -->
             <div class="flow-line"></div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'HowItWorksSection',
    setup() {
        const steps = [
            {
                title: 'DEPLOY',
                description: 'Drone begins patrol from the grey-deck.'
            },
            {
                title: 'SCAN',
                description: 'AI-filtered Camera maps the environment.'
            },
            {
                title: 'ANALYZE',
                description: 'Integrated GPU for image processing.'
            },
            {
                title: 'RESULT',
                description: 'Data sent to dashboard for cleanup action.'
            }
        ]

        return {
            steps
        }
    }
})
</script>

<style scoped>
.how-it-works-section {
    padding: 6rem 5%;
    background: #000;
    position: relative;
    border-top: 1px solid #111;
}

.section-header {
    text-align: center;
    margin-bottom: 5rem;
}

h2 {
    font-size: 2rem;
    font-family: 'Michroma', sans-serif;
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
    color: #fff;
}

.underline {
    width: 60px;
    height: 4px;
    background: var(--neon-green);
    margin: 0 auto;
    box-shadow: 0 0 10px var(--neon-green);
}

.flow-container {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    gap: 2rem;
}

.flow-line {
    position: absolute;
    top: 25px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #222;
    z-index: 0;
}

.flow-step {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 1;
}

.step-circle {
    width: 50px;
    height: 50px;
    background: #000;
    border: 2px solid var(--neon-green);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: var(--neon-green);
    margin-bottom: 2rem;
    box-shadow: 0 0 15px rgba(22, 255, 0, 0.2);
}

.step-box {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid #333;
    padding: 1.5rem;
    border-radius: 8px;
    width: 100%;
    transition: all 0.3s ease;
}

.step-box:hover {
    border-color: var(--neon-green);
}

h3 {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
}

p {
    color: #888;
    font-size: 0.8rem;
    line-height: 1.5;
}

@media (max-width: 768px) {
    .flow-container {
        flex-direction: column;
        align-items: flex-start;
    }

    .flow-line {
        width: 2px;
        height: 100%;
        left: 25px;
        top: 0;
    }
    
    .flow-step {
        flex-direction: row;
        align-items: flex-start;
        text-align: left;
        gap: 2rem;
    }
}
</style>
