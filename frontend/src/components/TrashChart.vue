<template>
    <div class="chart-wrapper">
        <div class="chart-header">
            <div class="chart-title">
                <v-icon class="mr-2 text-neon">mdi-chart-bar</v-icon>
                <h3>Detection Statistics</h3>
            </div>
            <button @click="downloadChart" class="download-btn">
                <v-icon size="18" class="mr-1">mdi-download</v-icon>
                Download PNG
            </button>
        </div>
        <div class="chart-container">
            <canvas ref="chartCanvas"></canvas>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, PropType } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

interface DetectionData {
    name: string
    count: number
}

export default defineComponent({
    name: 'TrashChart',
    props: {
        data: {
            type: Array as PropType<DetectionData[]>,
            required: true,
        },
    },
    setup(props) {
        const chartCanvas = ref<HTMLCanvasElement | null>(null)
        let chartInstance: Chart | null = null

        const createChart = () => {
            if (!chartCanvas.value || !props.data || props.data.length === 0) return

            // Destroy existing chart
            if (chartInstance) {
                chartInstance.destroy()
            }

            const ctx = chartCanvas.value.getContext('2d')
            if (!ctx) return

            // Sort data by count (descending)
            const sortedData = [...props.data].sort((a, b) => b.count - a.count)

            const labels = sortedData.map((d) => d.name.replace(/_/g, ' '))
            const values = sortedData.map((d) => d.count)

            // Generate gradient colors based on neon green
            const backgroundColors = values.map((_, i) => {
                const opacity = 0.8 - (i * 0.05)
                return `rgba(22, 255, 0, ${Math.max(opacity, 0.3)})`
            })

            const borderColors = values.map(() => '#16FF00')

            chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Count',
                            data: values,
                            backgroundColor: backgroundColors,
                            borderColor: borderColors,
                            borderWidth: 1,
                            borderRadius: 4,
                        },
                    ],
                },
                options: {
                    indexAxis: 'y', // Horizontal bar chart
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            titleColor: '#16FF00',
                            bodyColor: '#fff',
                            borderColor: '#16FF00',
                            borderWidth: 1,
                            padding: 12,
                            displayColors: false,
                            callbacks: {
                                title: (items) => {
                                    return items[0].label.toUpperCase()
                                },
                                label: (item) => {
                                    return `Detected: ${item.raw} items`
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(22, 255, 0, 0.1)',
                            },
                            ticks: {
                                color: '#888',
                                font: {
                                    size: 11,
                                },
                            },
                        },
                        y: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                                color: '#e0e0e0',
                                font: {
                                    size: 12,
                                    weight: '500',
                                },
                            },
                        },
                    },
                },
            })
        }

        const downloadChart = () => {
            if (!chartCanvas.value) return

            const link = document.createElement('a')
            link.download = 'trash-detection-chart.png'
            link.href = chartCanvas.value.toDataURL('image/png', 1.0)
            link.click()
        }

        onMounted(() => {
            createChart()
        })

        watch(
            () => props.data,
            () => {
                createChart()
            },
            { deep: true }
        )

        return {
            chartCanvas,
            downloadChart,
        }
    },
})
</script>

<style scoped>
.chart-wrapper {
    background: rgba(18, 18, 18, 0.8);
    border: 1px solid rgba(22, 255, 0, 0.2);
    border-radius: 12px;
    padding: 20px;
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(22, 255, 0, 0.1);
}

.chart-title {
    display: flex;
    align-items: center;
}

.chart-title h3 {
    color: #e0e0e0;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
}

.text-neon {
    color: #16FF00 !important;
}

.download-btn {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background: transparent;
    border: 1px solid #16FF00;
    color: #16FF00;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.download-btn:hover {
    background: rgba(22, 255, 0, 0.15);
    box-shadow: 0 0 15px rgba(22, 255, 0, 0.3);
}

.chart-container {
    height: 500px;
    min-height: 200px;
}

@media (max-width: 600px) {
    .chart-header {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
    }

    .download-btn {
        width: 100%;
        justify-content: center;
    }

    .chart-container {
        height: 250px;
    }
}
</style>
