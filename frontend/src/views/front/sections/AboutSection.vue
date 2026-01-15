<template>
    <section class="about-section">
        <div class="section-header">
            <h2>THE MISSION</h2>
            <div class="underline"></div>
        </div>

        <div class="about-content">
            <div class="about-visual trigger-about-visual">
                <div class="video-frame">
                    <!-- Placeholder for Drone Footage -->
                    <div class="drone-placeholder">
                        <span>Autonomous Patrol</span>
                    </div>
                </div>
                <div class="scan-overlay"></div>
            </div>

            <div class="about-text trigger-about-text">
                <h3>Cleaning Schools, One Plight at a Time</h3>
                <p>
                    Trashformers AI leverages state-of-the-art neural networks embedded in
                    drone hardware to patrol school grounds. We detect organic,
                    plastic, and hazardous materials often missed by the human eye.
                </p>

                <ul class="feature-list">
                    <li>
                        <span class="check-icon">✓</span> Real time trash exudation
                    </li>
                    <li>
                        <span class="check-icon">✓</span> Wireless generation for
                        high waste alerts
                    </li>
                    <li>
                        <span class="check-icon">✓</span> Automated reporting to
                        maintenance staff
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default defineComponent({
    name: 'AboutSection',
    setup() {
        onMounted(() => {
            gsap.from('.trigger-about-visual', {
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 70%',
                },
                x: -50,
                opacity: 0,
                duration: 1,
            })

            gsap.from('.trigger-about-text', {
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 70%',
                },
                x: 50,
                opacity: 0,
                duration: 1,
            })
        })
    },
})
</script>

<style scoped>
.about-section {
    padding: 6rem 5%;
    background: #000;
    position: relative;
    border-top: 1px solid #111;
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
}

.underline {
    width: 60px;
    height: 4px;
    background: var(--neon-green);
    margin: 0 auto;
    box-shadow: 0 0 10px var(--neon-green);
}

.about-content {
    display: flex;
    align-items: center;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
}

.about-visual {
    flex: 1;
    position: relative;
}

.video-frame {
    width: 100%;
    aspect-ratio: 16/9;
    border: 1px solid #333;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    background: #111;
}

.drone-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    padding: 20px;
    background: url('../../../../public/drone-image.avif') no-repeat center center;
    background-size: cover;
    position: relative;
}

.drone-placeholder span {
    font-weight: bold;
    letter-spacing: 1px;
    color: #fff;
    z-index: 2;
}

.scan-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 1px,
        rgba(22, 255, 0, 0.05) 2px
    );
     pointer-events: none;
     border-radius: 12px;
}

.about-text {
    flex: 1;
}

h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
    color: #fff;
}

p {
    color: #999;
    line-height: 1.6;
    margin-bottom: 2rem;
}

.feature-list {
    list-style: none;
    padding: 0;
}

.feature-list li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    color: #ccc;
    font-size: 0.95rem;
}

.check-icon {
    color: #000;
    background: var(--neon-green);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    font-weight: bold;
    margin-right: 15px;
    box-shadow: 0 0 10px rgba(22, 255, 0, 0.5);
}

@media (max-width: 768px) {
    .about-content {
        flex-direction: column;
    }
}
</style>
