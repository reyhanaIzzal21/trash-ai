<template>
    <div class="upload-control">
        <input
            type="file"
            multiple
            ref="form"
            style="display: none"
            @input="doupload($event)"
        />
        <v-menu
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
        >
            <template v-slot:activator="menu">
                <v-btn
                    class="action-btn"
                    v-bind="menu.props"
                    block
                >
                    <v-icon class="mr-2">mdi-lightning-bolt</v-icon>
                    <span class="btn-text">Actions</span>
                </v-btn>
            </template>

            <v-card class="action-menu">
                <div class="menu-header">
                    <v-icon size="18" class="text-neon mr-2">mdi-cog</v-icon>
                    <span>Quick Actions</span>
                </div>
                
                <div class="menu-content">
                    <div
                        class="menu-item upload-item"
                        @click="form.click()"
                    >
                        <v-icon class="item-icon">mdi-cloud-upload</v-icon>
                        <span>Upload Images</span>
                        <v-icon size="16" class="arrow-icon">mdi-chevron-right</v-icon>
                    </div>
                    
                    <div
                        class="menu-item sample-item"
                        v-if="!store.hash_ids.length > 0"
                        @click="store.do_sampleupload"
                    >
                        <v-icon class="item-icon">mdi-image-multiple</v-icon>
                        <span>Load Samples</span>
                        <v-icon size="16" class="arrow-icon">mdi-chevron-right</v-icon>
                    </div>
                    
                    <div
                        class="menu-item download-item"
                        v-if="store.hash_ids.length > 0"
                        @click="store.download_all"
                    >
                        <v-icon class="item-icon">mdi-folder-zip</v-icon>
                        <span>Download All ({{ store.hash_ids.length }})</span>
                        <v-icon size="16" class="arrow-icon">mdi-chevron-right</v-icon>
                    </div>
                    
                    <div
                        class="menu-item clear-item"
                        v-if="store.hash_ids.length > 0"
                        @click="store.clear"
                    >
                        <v-icon class="item-icon">mdi-trash-can</v-icon>
                        <span>Clear All Data</span>
                        <v-icon size="16" class="arrow-icon">mdi-chevron-right</v-icon>
                    </div>
                </div>
            </v-card>
        </v-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import * as m from '@/lib'

export default defineComponent({
    name: 'UploadControl',
    setup() {
        const store = m.useImageStore()
        const file = ref<FileList | File[]>()
        const form = ref<HTMLInputElement>()
        return {
            store,
            file,
            form,
        }
    },
    methods: {
        doupload(evt: Event) {
            const target = evt.target as HTMLInputElement
            if (target.files) {
                this.store.doupload(target.files)
            } else {
                m.log.debug('No files selected')
            }
        },
    },
    mounted() {
        m.log.debug('UploadControl mounted', this.file)
    },
})
</script>

<style scoped>
.upload-control {
    width: 100%;
}

.action-btn {
    background: linear-gradient(135deg, #16FF00 0%, #00cc6a 100%) !important;
    color: #000 !important;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 8px;
    height: 44px !important;
    transition: all 0.3s ease;
}

.action-btn:hover {
    box-shadow: 0 0 25px rgba(0, 255, 136, 0.5);
    transform: translateY(-1px);
}

.btn-text {
    font-size: 0.85rem;
}

.action-menu {
    background: #1a1a1a !important;
    border: 1px solid rgba(0, 255, 136, 0.25);
    border-radius: 12px;
    overflow: hidden;
    min-width: 220px;
}

.menu-header {
    background: rgba(0, 255, 136, 0.1);
    padding: 12px 16px;
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #e0e0e0;
    border-bottom: 1px solid rgba(0, 255, 136, 0.15);
}

.menu-content {
    padding: 8px;
}

.menu-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 4px;
    color: #e0e0e0;
}

.menu-item:last-child {
    margin-bottom: 0;
}

.menu-item:hover {
    background: rgba(0, 255, 136, 0.1);
}

.menu-item:hover .item-icon {
    color: #16FF00;
}

.menu-item:hover .arrow-icon {
    opacity: 1;
    transform: translateX(2px);
}

.item-icon {
    margin-right: 12px;
    color: #a0a0a0;
    transition: color 0.2s ease;
}

.arrow-icon {
    margin-left: auto;
    color: #16FF00;
    opacity: 0;
    transition: all 0.2s ease;
}

/* Item type specific colors */
.upload-item:hover {
    background: rgba(0, 255, 136, 0.15);
}

.sample-item:hover {
    background: rgba(0, 191, 255, 0.15);
}

.sample-item:hover .item-icon {
    color: #00bfff;
}

.sample-item:hover .arrow-icon {
    color: #00bfff;
}

.download-item:hover {
    background: rgba(255, 170, 0, 0.15);
}

.download-item:hover .item-icon {
    color: #ffaa00;
}

.download-item:hover .arrow-icon {
    color: #ffaa00;
}

.clear-item:hover {
    background: rgba(255, 68, 68, 0.15);
}

.clear-item:hover .item-icon {
    color: #ff4444;
}

.clear-item:hover .arrow-icon {
    color: #ff4444;
}
</style>

