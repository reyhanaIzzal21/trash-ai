<template>
    <div class="thumb-card">
        <div class="thumb-header">
            <span class="thumb-filename">{{ item.filename }}</span>
        </div>
        <div class="thumb-icons">
            <v-icon
                v-if="item.gps"
                size="18"
                class="icon-gps"
            >
                mdi-map-marker
            </v-icon>
            <v-icon
                v-if="item.has_detection"
                size="18"
                class="icon-detected"
            >
                mdi-check-circle
            </v-icon>
            <v-icon
                v-else
                size="18"
                class="icon-no-detect"
            >
                mdi-alert-circle
            </v-icon>
        </div>
        <div class="thumb-image-wrapper">
            <v-img
                class="thumb-image"
                width="280"
                aspect-ratio="1"
                :src="item.smalldataUrl"
                cover
            />
            <div class="thumb-overlay"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as m from '@/lib'

interface State {
    loaded: boolean
    display: m.Display | null
}

export default defineComponent({
    name: 'Thumb',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data(): State {
        return {
            loaded: false,
            display: null,
        }
    },
    mounted() {
        // @ts-ignore
        this.display = this.item
        m.log.debug('item', this.display)
    },
})
</script>

<style scoped>
.thumb-card {
    background: linear-gradient(135deg, rgba(18, 18, 18, 0.95) 0%, rgba(26, 26, 26, 0.9) 100%);
    border: 1px solid rgba(0, 255, 136, 0.15);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    margin: 8px;
}

.thumb-card:hover {
    border-color: #16FF00;
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
    transform: translateY(-4px) scale(1.02);
}

.thumb-header {
    background: rgba(0, 255, 136, 0.05);
    padding: 10px 12px;
    border-bottom: 1px solid rgba(0, 255, 136, 0.1);
}

.thumb-filename {
    color: #e0e0e0;
    font-size: 0.85rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    max-width: 260px;
}

.thumb-icons {
    padding: 8px 12px;
    background: rgba(10, 10, 10, 0.8);
    display: flex;
    gap: 8px;
    border-bottom: 1px solid rgba(0, 255, 136, 0.05);
}

.icon-gps {
    color: #00bfff !important;
    filter: drop-shadow(0 0 4px rgba(0, 191, 255, 0.5));
}

.icon-detected {
    color: #16FF00 !important;
    filter: drop-shadow(0 0 4px rgba(0, 255, 136, 0.5));
}

.icon-no-detect {
    color: #ff4444 !important;
    filter: drop-shadow(0 0 4px rgba(255, 68, 68, 0.5));
}

.thumb-image-wrapper {
    position: relative;
    overflow: hidden;
}

.thumb-image {
    transition: transform 0.3s ease;
}

.thumb-card:hover .thumb-image {
    transform: scale(1.05);
}

.thumb-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(0, 255, 136, 0.1) 100%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.thumb-card:hover .thumb-overlay {
    opacity: 1;
}
</style>

