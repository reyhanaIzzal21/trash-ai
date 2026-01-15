<template>
    <Busy v-if="!loaded" />
    <div v-if="loaded" class="image-container">
        <!-- Pagination and Tabs -->
        <v-row align="center" class="mb-4">
            <v-col align="center" justify="center">
                <v-pagination
                    v-if="store.hash_ids.length > 0"
                    v-model="vpage"
                    :length="store.hash_ids.length"
                    :total-visible="is_mobile ? 3 : 7"
                    rounded="circle"
                    class="pagination-neon mb-4"
                />
                <v-tabs
                    v-model="selected_tab"
                    class="image-tabs"
                    grow
                >
                    <v-tab value="image" :class="tclass('image')">
                        <v-icon start>mdi-image</v-icon>
                        <span v-if="!is_mobile">Image</span>
                    </v-tab>
                    <v-tab value="meta" v-if="meta_has.meta" :class="tclass('meta')">
                        <v-icon start>mdi-code-json</v-icon>
                        <span v-if="!is_mobile">Metadata</span>
                    </v-tab>
                    <v-tab value="map" v-if="display?.gps != null" :class="tclass('map')">
                        <v-icon start>mdi-map</v-icon>
                        <span v-if="!is_mobile">Map</span>
                    </v-tab>
                </v-tabs>
            </v-col>
        </v-row>
        
        <!-- Image Info Header -->
        <v-row align="center" class="mb-4">
            <v-col align="center" justify="center">
                <div class="image-header">
                    <Download v-if="sdata != null" :sdata="sdata" class="download-btn" />
                    <h2 class="filename">{{ sdata?.filename }}</h2>
                    <span class="page-indicator">({{ x_of_y }})</span>
                </div>
                
                <!-- Thumbnail when not on image tab -->
                <Thumb
                    :item="sdata"
                    v-if="selected_tab != 'image' && sdata != null"
                    class="preview-thumb my-3"
                />
                
                <!-- Detection Tags -->
                <div class="detection-tags" v-if="sdata?.detectedObjects.length > 0">
                    <v-chip
                        v-for="(obj, idx) in sdata?.detectedObjects"
                        :key="'dobj' + idx"
                        class="detection-chip"
                    >
                        <router-link :to="{ name: 'detection', params: { name: obj } }">
                            {{ obj }}
                        </router-link>
                    </v-chip>
                </div>
                
                <div class="no-detection-notice" v-if="sdata?.detectedObjects.length === 0">
                    <v-icon class="mr-2" color="warning">mdi-alert</v-icon>
                    <span>No objects detected in this image</span>
                </div>
            </v-col>
        </v-row>
        
        <!-- Content Area -->
        <div class="image-content">
            <v-window v-model="selected_tab">
                <!-- Image View -->
                <v-window-item value="image">
                    <v-row>
                        <v-col align="center" justify="center" v-if="sdata != null">
                            <div class="image-viewer">
                                <InnerImageZoom
                                    :src="sdata?.smalldataUrl"
                                    :zoomSrc="sdata?.processeddataUrl"
                                />
                            </div>
                        </v-col>
                    </v-row>
                </v-window-item>
                
                <!-- Metadata View -->
                <v-window-item value="meta" v-if="meta_has.meta">
                    <v-container>
                        <v-row v-if="meta_has.exif" class="meta-section">
                            <v-col cols="12" md="3">
                                <div class="meta-header">
                                    <h3>EXIF Data</h3>
                                    <CopyButton :text="sdata?.prettyExif ?? ''" />
                                </div>
                            </v-col>
                            <v-col cols="12" md="9">
                                <pre class="meta-content">{{ sdata?.prettyExif }}</pre>
                            </v-col>
                        </v-row>
                        
                        <div class="meta-divider" v-if="meta_has.tfmeta && meta_has.exif"></div>
                        
                        <v-row v-if="meta_has.tfmeta" class="meta-section">
                            <v-col cols="12" md="3">
                                <div class="meta-header">
                                    <h3>Detection Data</h3>
                                    <CopyButton :text="sdata?.prettyTFMeta ?? ''" />
                                </div>
                            </v-col>
                            <v-col cols="12" md="9">
                                <pre class="meta-content">{{ sdata?.prettyTFMeta }}</pre>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-window-item>
                
                <!-- Map View -->
                <v-window-item value="map" v-if="display.gps != null">
                    <v-row align="center">
                        <v-col align="center" justify="center">
                            <div class="map-container">
                                <GMap v-if="display.gps != null" :gps="display.gps" />
                            </div>
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
import { toInteger } from 'lodash'

interface Data {
    sdata: m.SaveData | null
    display: m.Display | null
    loaded: boolean
    selected_tab: string
    selected_idx: number
}

interface MetaOK {
    meta: boolean
    tfmeta: boolean
    exif: boolean
}

export default defineComponent({
    data(): Data {
        return {
            sdata: null,
            display: null,
            loaded: false,
            selected_tab: 'image',
            selected_idx: 0,
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
    async mounted() {
        await this.setSdata()
    },
    watch: {
        selected_tab: {
            async handler(val: string | null) {
                if (val != null) {
                    await this.$router.push({
                        name: 'image',
                        params: {
                            tab: val,
                            idx: this.selected_idx,
                        },
                    })
                    this.setSdata()
                }
            },
            deep: true,
        },
        selected_idx: {
            async handler(idx: number | null) {
                if (idx != null) {
                    await this.$router.push({
                        name: 'image',
                        params: {
                            tab: this.selected_tab,
                            idx: idx,
                        },
                    })
                    this.setSdata()
                }
            },
            deep: true,
        },
    },
    computed: {
        vpage: {
            get() {
                return this.selected_idx + 1
            },
            set(newval: number) {
                this.selected_idx = newval - 1
            },
        },
        meta_has(): MetaOK {
            return {
                meta:
                    this.sdata?.prettyExif != '{}' ||
                    this.sdata?.prettyTFMeta != '[]',
                exif: this.sdata?.prettyExif != '{}',
                tfmeta: this.sdata?.prettyTFMeta != '[]',
            }
        },
        x_of_y() {
            return `${this.selected_idx + 1} of ${this.store.hash_ids.length}`
        },
        is_mobile(): boolean {
            return this.$vuetify.display.mobile
        },
    },
    methods: {
        async setSdata() {
            this.loaded = false
            // @ts-ignore
            this.selected_tab = this.$route.params.tab
            this.selected_idx = toInteger(this.$route.params.idx)
            const hid = this.store.hash_ids[this.selected_idx]
            this.sdata = (await m.imagedb.savedata.get(hid)) ?? null
            this.display = this.sdata!.display
            this.appstore.setTitle(`${this.sdata?.filename}`)
            this.loaded = true
        },
        tclass(tab: string) {
            return this.$route.params.tab == tab ? 'thightlight' : 'tbg'
        },
    },
})
</script>

<style scoped>
.image-container {
    min-height: 50vh;
}

.pagination-neon :deep(.v-pagination__item) {
    background: rgba(26, 26, 26, 0.9) !important;
    color: #a0a0a0 !important;
    border: 1px solid rgba(0, 255, 136, 0.2);
    transition: all 0.3s ease;
}

.pagination-neon :deep(.v-pagination__item--is-active) {
    background: linear-gradient(135deg, #16FF00 0%, #00cc6a 100%) !important;
    color: #000 !important;
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
}

.image-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
}

.download-btn {
    margin-right: 8px;
}

.filename {
    color: #e0e0e0;
    font-size: 1.2rem;
    font-weight: 600;
}

.page-indicator {
    color: #666;
    font-size: 0.9rem;
}

.detection-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;
}

.detection-chip {
    background: rgba(0, 255, 136, 0.15) !important;
    border: 1px solid rgba(0, 255, 136, 0.3) !important;
}

.detection-chip a {
    color: #16FF00;
    text-decoration: none;
    font-weight: 500;
}

.detection-chip a:hover {
    color: #00ffaa;
}

.no-detection-notice {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    color: #ffaa00;
    margin-top: 12px;
}

.image-content {
    background: rgba(18, 18, 18, 0.6);
    border: 1px solid rgba(0, 255, 136, 0.1);
    border-radius: 12px;
    padding: 24px;
    min-height: 300px;
}

.image-viewer {
    border: 2px solid rgba(0, 255, 136, 0.2);
    border-radius: 8px;
    overflow: hidden;
    max-width: 100%;
}

.image-viewer:hover {
    border-color: rgba(0, 255, 136, 0.4);
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.1);
}

.meta-section {
    margin-bottom: 24px;
}

.meta-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}

.meta-header h3 {
    color: #16FF00;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.meta-content {
    background: rgba(10, 10, 10, 0.8);
    border: 1px solid rgba(0, 255, 136, 0.1);
    border-radius: 8px;
    padding: 16px;
    color: #a0a0a0;
    font-size: 0.85rem;
    overflow-x: auto;
    max-height: 300px;
}

.meta-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.3), transparent);
    margin: 24px 0;
}

.map-container {
    border: 2px solid rgba(0, 255, 136, 0.2);
    border-radius: 8px;
    overflow: hidden;
}

.preview-thumb {
    max-width: 200px;
}
</style>

