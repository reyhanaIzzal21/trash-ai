<template>
    <Busy v-if="summary == null" />
    <div v-else class="summary-container">
        <!-- Tabs Navigation -->
        <v-row align="center" class="mb-4">
            <v-col align="center" justify="center">
                <v-tabs v-model="selected" class="summary-tabs" grow center-active centered :show-arrows="is_mobile">
                    <v-tab value="detections" :class="tclass('detections')" v-if="summary.detected_objects.length > 0"
                        @click="$router.push({ name: 'summary', params: { tab: 'detections' } })">
                        <v-icon start class="tab-icon">mdi-check-circle</v-icon>
                        <span v-if="!is_mobile">Detections</span>
                    </v-tab>
                    <v-tab value="nodetections" :class="tclass('nodetections')"
                        v-if="summary.no_detection_hashes.length > 0"
                        @click="$router.push({ name: 'summary', params: { tab: 'nodetections' } })">
                        <v-icon start class="tab-icon">mdi-alert-circle</v-icon>
                        <span v-if="!is_mobile">No Detections</span>
                    </v-tab>
                    <v-tab value="maps" :class="tclass('maps')" v-if="summary.gps.list.length > 0"
                        @click="$router.push({ name: 'summary', params: { tab: 'maps' } })">
                        <v-icon start class="tab-icon">mdi-map</v-icon>
                        <span v-if="!is_mobile">Map Summary</span>
                    </v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <!-- Content Card -->
        <div class="summary-content">
            <v-window v-model="selected">
                <!-- No Detections Tab -->
                <v-window-item value="nodetections" v-if="summary.no_detection_hashes.length > 0">
                    <div class="section-header">
                        <v-icon class="mr-2 text-error">mdi-alert-circle</v-icon>
                        <h2>No Detections</h2>
                    </div>
                    <NoDetectGroup />
                </v-window-item>

                <!-- Detections Tab -->
                <v-window-item value="detections" v-if="summary.detected_objects.length > 0">
                    <div class="section-header">
                        <v-icon class="mr-2 text-neon">mdi-check-circle</v-icon>
                        <h2>Detected Objects</h2>
                    </div>

                    <!-- Chart Section -->
                    <div class="chart-section mb-6" v-if="detections && detections.length > 0">
                        <TrashChart :data="detections" />
                    </div>

                    <div class="detections-list">
                        <div class="detection-row" v-for="(det, idx) in detections" :key="'det' + idx">
                            <router-link class="detection-link" :to="{ name: 'detection', params: { name: det.name } }">
                                <v-icon class="detection-icon" size="20">mdi-tag</v-icon>
                                <span class="detection-name">{{ det.name }}</span>
                            </router-link>
                            <div class="detection-count">
                                <span class="count-value">{{ det.count }}</span>
                            </div>
                        </div>
                    </div>
                </v-window-item>

                <!-- Maps Tab -->
                <v-window-item value="maps" v-if="summary.gps.list.length > 0">
                    <div class="section-header">
                        <v-icon class="mr-2 text-info">mdi-map</v-icon>
                        <h2>Location Summary</h2>
                    </div>
                    <v-row>
                        <v-col align="center" justify="center">
                            <GMapSummary />
                        </v-col>
                    </v-row>
                </v-window-item>
            </v-window>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as m from '@/lib'
import TrashChart from '@/components/TrashChart.vue'

interface Data {
    summary: m.Summary | null
    selected: string | null
}

interface Rank {
    name: string
    count: number
}

export default defineComponent({
    components: {
        TrashChart,
    },
    data(): Data {
        return {
            summary: null,
            selected: null,
        }
    },
    setup() {
        const store = m.useImageStore()
        const appstore = m.useAppStore()
        return {
            store,
            appstore,
        }
    },
    computed: {
        detections(): Rank[] | null {
            let sum: m.Summary | null = null
            sum = this.summary
            if (sum == null) {
                return null
            }
            return sum.page_list()
        },
        is_mobile(): boolean {
            return this.$vuetify.display.mobile
        },
    },
    async mounted() {
        m.log.debug('summary this', this)
        this.summary = this.store.summary
        // @ts-ignore
        this.selected = this.$route.params.tab
    },
    watch: {
        selected: {
            handler(val: string | null) {
                if (val != null) {
                    this.$router.push({
                        name: 'summary',
                        params: { tab: val },
                    })
                }
            },
            immediate: true,
        },
    },
    methods: {
        async navdetection(idx: number) {
            const det_name = this.detections![idx].name
            await this.$router.push({
                name: 'detection',
                params: {
                    idx: idx,
                    name: det_name,
                },
            })
        },
        tclass(tab: string) {
            return this.$route.params.tab == tab ? 'thightlight' : 'tbg'
        },
    },
})
</script>

<style scoped>
.summary-container {
    min-height: 50vh;
}

.summary-tabs {
    background: transparent;
}

.summary-content {
    background: rgba(18, 18, 18, 0.6);
    border: 1px solid rgba(0, 255, 136, 0.1);
    border-radius: 12px;
    padding: 24px;
    min-height: 300px;
}

.section-header {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(0, 255, 136, 0.1);
}

.section-header h2 {
    color: #e0e0e0;
    font-size: 1.3rem;
    font-weight: 600;
}

.text-neon {
    color: #16FF00 !important;
}

.text-error {
    color: #ff4444 !important;
}

.text-info {
    color: #00bfff !important;
}

.detections-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.detection-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: rgba(26, 26, 26, 0.8);
    border: 1px solid rgba(0, 255, 136, 0.1);
    border-radius: 8px;
    transition: all 0.3s ease;
}

.detection-row:hover {
    border-color: #16FF00;
    background: rgba(0, 255, 136, 0.05);
}

.detection-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #e0e0e0;
    transition: color 0.3s ease;
}

.detection-link:hover {
    color: #16FF00;
}

.detection-icon {
    color: #16FF00;
    margin-right: 12px;
}

.detection-name {
    font-weight: 500;
    text-transform: capitalize;
}

.detection-count {
    background: rgba(0, 255, 136, 0.15);
    border: 1px solid rgba(0, 255, 136, 0.3);
    border-radius: 20px;
    padding: 4px 12px;
}

.count-value {
    color: #16FF00;
    font-weight: 700;
    font-size: 0.9rem;
}

.tab-icon {
    margin-right: 8px;
}
</style>
