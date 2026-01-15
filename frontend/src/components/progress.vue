<template>
    <div class="progress-wrapper" v-if="progress.total > 0">
        <v-progress-linear
            v-model="progress.percent"
            color="success"
            striped
            height="32"
            class="progress-bar-neon"
        >
            <template v-slot:default>
                <span class="progress-text">
                    <strong class="progress-name">{{ progress.name }}</strong>
                    <span class="progress-count">
                        ({{ progress.complete }} / {{ progress.total }})
                    </span>
                    <span class="progress-current text-truncate">
                        {{ progress.current }}
                    </span>
                </span>
            </template>
        </v-progress-linear>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as m from '@/lib'

export default defineComponent({
    name: 'Progress',
    props: {
        progress: {
            type: m.Progress,
            required: true,
        },
    },
})
</script>

<style scoped>
.progress-wrapper {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background: rgba(26, 26, 26, 0.8);
    border: 1px solid rgba(0, 255, 136, 0.2);
}

.progress-bar-neon {
    border-radius: 8px;
}

.progress-bar-neon :deep(.v-progress-linear__determinate) {
    background: linear-gradient(90deg, #00cc6a, #16FF00, #00ffaa) !important;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
    animation: progress-glow 1.5s ease-in-out infinite;
}

@keyframes progress-glow {
    0%, 100% {
        filter: brightness(1);
        box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
    }
    50% {
        filter: brightness(1.15);
        box-shadow: 0 0 25px rgba(0, 255, 136, 0.7);
    }
}

.progress-text {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    color: #000;
    font-size: 0.85rem;
}

.progress-name {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.progress-count {
    opacity: 0.8;
}

.progress-current {
    max-width: 150px;
    opacity: 0.7;
    font-size: 0.8rem;
}
</style>

