<template>
    <div class="drop-zone-container" v-if="!store.upload_busy">
        <div class="drop-zone">
            <v-icon class="drop-icon" size="48">mdi-cloud-upload</v-icon>
            <p class="drop-text" v-if="!$vuetify.display.mobile">
                Drag and drop images here to detect trash
            </p>
            <p class="drop-hint">Supported: JPG, PNG, JPEG</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as m from '@/lib'

export default defineComponent({
    name: 'DragDropTitle',
    setup() {
        const store = m.useImageStore()
        return {
            store,
        }
    },
})
</script>

<style scoped>
.drop-zone-container {
    padding: 16px 0;
}

.drop-zone {
    border: 2px dashed rgba(0, 255, 136, 0.4);
    border-radius: 16px;
    padding: 40px 24px;
    text-align: center;
    transition: all 0.3s ease;
    background: rgba(0, 255, 136, 0.02);
}

.drop-zone:hover {
    border-color: #16FF00;
    background: rgba(0, 255, 136, 0.05);
    box-shadow: inset 0 0 40px rgba(0, 255, 136, 0.08);
}

.drop-icon {
    color: #16FF00 !important;
    animation: float 3s ease-in-out infinite;
    filter: drop-shadow(0 0 15px rgba(0, 255, 136, 0.5));
}

@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.drop-text {
    color: #e0e0e0;
    margin-top: 16px;
    font-size: 1.1rem;
    font-weight: 500;
}

.drop-hint {
    color: #666;
    margin-top: 8px;
    font-size: 0.85rem;
}
</style>

