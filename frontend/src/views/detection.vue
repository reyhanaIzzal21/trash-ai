<template>
    <Busy v-if="summary == null" />
    <div class="detection-container" v-else>
        <!-- Pagination -->
        <v-row align="center" class="mb-4">
            <v-col align="center" justify="center">
                <v-pagination
                    v-model="vpage"
                    :length="summary?.detected_objects.length"
                    :total-visible="is_mobile ? 3 : 7"
                    rounded="circle"
                    class="pagination-neon"
                />
            </v-col>
        </v-row>
        
        <!-- Detection Header -->
        <div class="detection-header">
            <h1 class="detection-title">
                <v-icon class="mr-2 title-icon">mdi-tag-check</v-icon>
                {{ obj?.name }}
            </h1>
            <div class="detection-badge">
                <span class="badge-value">{{ obj?.count }}</span>
                <span class="badge-label">items</span>
            </div>
        </div>
        
        <!-- Image Grid -->
        <div class="detection-grid" v-if="displays.length > 0">
            <Thumb
                v-for="(img, idx) in displays"
                @click="doroute(img.hash)"
                :key="idx"
                :item="img"
            />
        </div>
        
        <!-- Empty State -->
        <div v-else class="empty-state">
            <v-icon size="64" class="empty-icon">mdi-image-off</v-icon>
            <p class="empty-text">No images found for this detection</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as m from '@/lib'
import { toInteger } from 'lodash'

interface State {
    summary: m.Summary | null
    obj: m.TrashObject | null
    displays: m.Display[]
    selected_name: string
    selected_idx: number | null
}

export default defineComponent({
    data(): State {
        return {
            selected_name: '',
            selected_idx: null,
            summary: null,
            obj: null,
            displays: [],
        }
    },
    setup() {
        const appstore = m.useAppStore()
        const imgstore = m.useImageStore()
        return {
            appstore,
            imgstore,
        }
    },
    watch: {
        selected_idx: {
            async handler(idx: number | null) {
                if (idx != null) {
                    const name = this.summary?.detected_objects[idx].name
                    if (name != null) {
                        await this.setupObjects(name)
                    }
                }
            },
            deep: true,
        },
        selected_name: {
            async handler(val: string | null) {
                if (val != null) {
                    await this.$router.push({
                        name: 'detection',
                        params: { name: val },
                    })
                    await this.setupObjects(val)
                }
            },
            deep: true,
        },
        'imgstore.hash_ids': {
            async handler(val: string[]) {
                if (val.length === 0) {
                    this.$router.push({
                        name: 'uploads',
                        params: { idx: 0 },
                    })
                }
            },
            deep: true,
        },
    },
    computed: {
        vpage: {
            get() {
                return this.selected_idx! + 1
            },
            async set(v: number) {
                m.log.debug('set', v, this.selected_idx)
                this.selected_idx = toInteger(v) - 1
            },
        },
        is_mobile(): boolean {
            return this.$vuetify.display.mobile
        },
    },
    async mounted() {
        this.summary = this.imgstore.summary
        // @ts-ignore
        await this.setupObjects(this.$route.params.name)
    },
    methods: {
        async doroute(hash_id: string) {
            const idx = this.imgstore.hash_ids.indexOf(hash_id)
            this.$router.push({
                name: 'image',
                params: { idx: toInteger(idx), tab: 'image' },
            })
        },
        async setupObjects(name: string | null) {
            const sum: m.Summary = this.summary!
            this.selected_name = name!
            const idx = sum.detected_objects.findIndex(
                (obj) => obj.name === name,
            )
            if (idx < 0) {
                this.obj = null
                this.displays = []
                return
            }
            this.selected_idx = idx
            this.obj = sum.detection_by_name(this.selected_name) ?? null
            const tmp = await m.imagedb.savedata.bulkGet(this.obj!.hashes)
            this.displays = tmp?.map((x) => x!.display)
            m.log.debug('detection mounted', this.displays)
            this.appstore.setTitle(
                `Detections: ${this.obj?.name} (${this.obj?.count})`,
            )
        },
    },
})
</script>

<style scoped>
.detection-container {
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

.detection-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 24px;
    padding: 20px;
    background: rgba(18, 18, 18, 0.6);
    border: 1px solid rgba(0, 255, 136, 0.15);
    border-radius: 12px;
    flex-wrap: wrap;
}

.detection-title {
    color: #e0e0e0;
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: capitalize;
    display: flex;
    align-items: center;
}

.title-icon {
    color: #16FF00 !important;
    filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));
}

.detection-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 255, 136, 0.1) 100%);
    border: 1px solid #16FF00;
    border-radius: 12px;
    padding: 12px 24px;
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.2);
}

.badge-value {
    color: #16FF00;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.badge-label {
    color: #a0a0a0;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 4px;
}

.detection-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
}

.empty-state {
    text-align: center;
    padding: 60px 20px;
}

.empty-icon {
    color: #333 !important;
    margin-bottom: 16px;
}

.empty-text {
    color: #666;
    font-size: 1.1rem;
}
</style>

