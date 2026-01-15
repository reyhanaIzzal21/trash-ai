<template>
    <section class="impact-visual-section">
        <div class="content-wrapper">
            <!-- Left Side: Dashboard Preview / Chart -->
            <div class="dashboard-preview">
                <div class="preview-header">
                    <div class="dots">
                        <span></span><span></span><span></span>
                    </div>
                    <div class="header-title">LIVE FEED // DRONE-01</div>
                </div>
                
                <div class="preview-content">
                    <div class="stats-row">
                        <div class="mini-stat">
                            <label>TRASH DET</label>
                            <div class="value">46%</div>
                            <div class="bar"><div class="fill" style="width: 46%"></div></div>
                        </div>
                        <div class="mini-stat">
                            <label>AREA</label>
                            <div class="value">825</div>
                            <div class="bar"><div class="fill" style="width: 80%"></div></div>
                        </div>
                        <div class="mini-stat">
                            <label>AGGREGATE</label>
                            <div class="value">1.2bB</div>
                            <div class="bar"><div class="fill" style="width: 60%"></div></div>
                        </div>
                    </div>

                    <div class="chart-area">
                        <!-- Mock Bar Chart -->
                         <div class="bar-chart">
                             <div class="chart-bar" style="height: 40%"></div>
                             <div class="chart-bar" style="height: 60%"></div>
                             <div class="chart-bar" style="height: 30%"></div>
                             <div class="chart-bar" style="height: 80%"></div>
                             <div class="chart-bar" style="height: 50%"></div>
                             <div class="chart-bar active" style="height: 75%">
                                 <div class="pulse-point"></div>
                             </div>
                             <div class="chart-bar" style="height: 45%"></div>
                         </div>
                    </div>
                </div>
            </div>

            <!-- Right Side: Text Content -->
            <div class="text-content">
                <h2>VISUALIZE THE IMPACT</h2>
                <div class="underline"></div>
                <p>
                    Access detailed analytics on waste reduction. Schools using EcoScan AI report a
                    40% reduction in ground litter within the first 3 months.
                </p>

                <div class="impact-metric">
                    <div class="metric-label">
                        <span>40%</span>
                        <span>REDUCTION IN LITTER</span>
                    </div>
                    <div class="metric-bar">
                        <div class="metric-fill"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ImpactSection'
})
</script>

<style scoped>
.impact-visual-section {
    padding: 6rem 5%;
    background: #000;
    display: flex;
    justify-content: center;
    border-top: 1px solid #111;
}

.content-wrapper {
    display: flex;
    align-items: center;
    gap: 4rem;
    max-width: 1200px;
    width: 100%;
}

/* Dashboard Preview */
.dashboard-preview {
    flex: 1;
    background: rgba(10, 10, 10, 0.8);
    border: 1px solid var(--neon-green);
    border-radius: 8px;
    padding: 2px; /* Inner border spacing */
    box-shadow: 0 0 20px rgba(22, 255, 0, 0.1);
}

.preview-header {
    background: rgba(22, 255, 0, 0.05);
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(22, 255, 0, 0.2);
}

.dots {
    display: flex;
    gap: 5px;
}

.dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #333;
}

.dots span:nth-child(1) { background: #ff5f56; }
.dots span:nth-child(2) { background: #ffbd2e; }
.dots span:nth-child(3) { background: #27c93f; }

.header-title {
    color: #666;
    font-size: 0.7rem;
    letter-spacing: 2px;
}

.preview-content {
    padding: 20px;
    background: radial-gradient(circle at top right, #0a0a0a, #000);
}

.stats-row {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
}

.mini-stat {
    flex: 1;
    background: rgba(255, 255, 255, 0.03);
    padding: 10px;
    border-radius: 4px;
}

.mini-stat label {
    font-size: 0.6rem;
    color: #666;
}

.mini-stat .value {
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    margin: 5px 0;
}

.mini-stat .bar {
    height: 3px;
    background: #222;
    border-radius: 2px;
}

.mini-stat .fill {
    height: 100%;
    background: var(--neon-green);
    border-radius: 2px;
}

.chart-area {
    height: 200px;
    border-left: 1px solid #333;
    border-bottom: 1px solid #333;
    padding: 20px;
    position: relative;
}

.bar-chart {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 100%;
    gap: 10px;
}

.chart-bar {
    flex: 1;
    background: #222;
    transition: all 0.3s ease;
    position: relative;
}

.chart-bar.active {
    background: linear-gradient(to top, var(--neon-green), transparent);
    box-shadow: 0 0 15px rgba(22, 255, 0, 0.2);
}

.pulse-point {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border: 2px solid var(--neon-green);
    border-radius: 50%;
    animation: pulse 2s infinite;
}

/* Right Content */
.text-content {
    flex: 1;
}

h2 {
    font-family: 'Michroma', sans-serif;
    font-size: 2rem;
    color: #fff;
    margin-bottom: 0.5rem;
}

.underline {
    width: 60px;
    height: 4px;
    background: var(--neon-green);
    margin-bottom: 2rem;
}

p {
    color: #888;
    line-height: 1.6;
    margin-bottom: 3rem;
}

.impact-metric {
    margin-top: 2rem;
}

.metric-label {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 10px;
}

.metric-label span:nth-child(1) {
    font-size: 2rem;
    font-weight: 700;
    color: var(--neon-green);
}

.metric-label span:nth-child(2) {
    font-size: 0.8rem;
    color: #666;
    letter-spacing: 1px;
}

.metric-bar {
    height: 6px;
    background: #222;
    border-radius: 3px;
    overflow: hidden;
}

.metric-fill {
    height: 100%;
    width: 40%;
    background: var(--neon-green);
    box-shadow: 0 0 10px var(--neon-green);
}

@media (max-width: 768px) {
    .content-wrapper {
        flex-direction: column-reverse;
    }
}
</style>
