<template>
    <section class="feature-section" id="features">
        <div class="section-header">
            <h2>RECOGNITION CAPABILITIES</h2>
            <div class="underline"></div>
            <p class="section-subtitle">Our AI model is trained on millions of waste imagery data points.</p>
        </div>

        <div class="cards-container">
            <div class="feature-card" v-for="(feature, index) in features" :key="index">
                <div class="card-icon">
                    <v-icon :color="'#16FF00'">{{ feature.icon }}</v-icon>
                </div>
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
                <div class="card-border"></div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'FeatureSection',
    setup() {
        const features = [
            {
                icon: 'mdi-delete',
                title: 'Plastics & Bottles',
                description: 'Identifies PET, HDPE, and other common plastic debris with 99% accuracy.'
            },
            {
                icon: 'mdi-water',
                title: 'Water Turbidity',
                description: 'Analyzes visual water clarity to detect contamination and pollution levels.'
            },
            {
                icon: 'mdi-recycle',
                title: 'General Debris',
                description: 'Detects paper, metal, and mixed waste to optimize cleanup routes.'
            }
        ]

        return {
            features
        }
    }
})
</script>

<style scoped>
.feature-section {
    padding: 6rem 5%;
    background: #050505;
    background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 30px 30px;
}

.section-header {
    text-align: center;
    margin-bottom: 4rem;
}

h2 {
    font-size: 2rem;
    font-family: 'Michroma', sans-serif;
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
    color: #fff;
    text-transform: uppercase;
}

.underline {
    width: 60px;
    height: 4px;
    background: var(--neon-green);
    margin: 0 auto;
    box-shadow: 0 0 10px var(--neon-green);
}

.section-subtitle {
    margin-top: 1rem;
    color: #666;
    font-size: 0.9rem;
}

.cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.feature-card {
    background: rgba(10, 10, 10, 0.8);
    border: 1px solid #222;
    padding: 2.5rem;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
    border-color: var(--neon-green);
    box-shadow: 0 0 20px rgba(22, 255, 0, 0.2);
}

.card-icon {
    width: 60px;
    height: 60px;
    background: rgba(22, 255, 0, 0.1);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(22, 255, 0, 0.3);
}

h3 {
    color: #fff;
    font-size: 1.25rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

p {
    color: #888;
    line-height: 1.6;
    font-size: 0.9rem;
}

.card-border {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--neon-green);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
}

.feature-card:hover .card-border {
    transform: scaleX(1);
}
</style>
