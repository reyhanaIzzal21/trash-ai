<template>
    <div class="stats-container">
        <v-row class="stats-row" no-gutters>
            <!-- Upload Control -->
            <v-col cols="12" sm="6" md="3" class="pa-2">
                <div class="stat-card action-card">
                    <UploadControl />
                </div>
            </v-col>
            
            <!-- Space Used -->
            <v-col cols="6" sm="6" md="2" class="pa-2">
                <div class="stat-card">
                    <div class="stat-icon">
                        <v-icon color="warning" size="24">mdi-database</v-icon>
                    </div>
                    <div class="stat-label">Space Used</div>
                    <div class="stat-value warning-value">
                        {{ store.capacity.usage }} <span class="stat-unit">MB</span>
                    </div>
                </div>
            </v-col>
            
            <!-- Total Detections -->
            <v-col cols="6" sm="6" md="2" class="pa-2">
                <div class="stat-card">
                    <div class="stat-icon">
                        <v-icon color="success" size="24">mdi-check-circle</v-icon>
                    </div>
                    <div class="stat-label">Total Detections</div>
                    <div class="stat-value success-value">
                        {{ summary.total_detections }}
                    </div>
                </div>
            </v-col>
            
            <!-- Unique Detections -->
            <v-col cols="6" sm="6" md="2" class="pa-2">
                <div class="stat-card">
                    <div class="stat-icon">
                        <v-icon color="info" size="24">mdi-tag-multiple</v-icon>
                    </div>
                    <div class="stat-label">Unique Types</div>
                    <div class="stat-value info-value">
                        {{ summary.unique_detections }}
                    </div>
                </div>
            </v-col>
            
            <!-- No Detections -->
            <v-col cols="6" sm="6" md="3" class="pa-2">
                <div class="stat-card">
                    <div class="stat-icon">
                        <v-icon color="error" size="24">mdi-alert-circle</v-icon>
                    </div>
                    <div class="stat-label">No Detections</div>
                    <div class="stat-value error-value">
                        {{ summary.no_detection_hashes.length }}
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as m from '@/lib'

export default defineComponent({
    name: 'TrashSummary',
    setup() {
        const store = m.useImageStore()
        return {
            store,
        }
    },
    computed: {
        summary(): m.Summary {
            return this.store.summary
        },
    },
})
</script>

<style scoped>
.stats-container {
    margin-bottom: 16px;
}

.stats-row {
    display: flex;
    flex-wrap: wrap;
}

.stat-card {
    background: linear-gradient(135deg, rgba(18, 18, 18, 0.95) 0%, rgba(26, 26, 26, 0.9) 100%);
    border: 1px solid rgba(0, 255, 136, 0.15);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    transition: all 0.3s ease;
    height: 100%;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.stat-card:hover {
    border-color: rgba(0, 255, 136, 0.4);
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.15);
    transform: translateY(-2px);
}

.action-card {
    display: flex;
    align-items: center;
    justify-content: center;
}

.stat-icon {
    margin-bottom: 8px;
}

.stat-label {
    color: #a0a0a0;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
    font-weight: 500;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 700;
}

.stat-unit {
    font-size: 0.9rem;
    font-weight: 400;
    opacity: 0.7;
}

.success-value {
    color: #16FF00;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.4);
}

.warning-value {
    color: #ffaa00;
    text-shadow: 0 0 10px rgba(255, 170, 0, 0.4);
}

.info-value {
    color: #00bfff;
    text-shadow: 0 0 10px rgba(0, 191, 255, 0.4);
}

.error-value {
    color: #ff4444;
    text-shadow: 0 0 10px rgba(255, 68, 68, 0.4);
}
</style>

