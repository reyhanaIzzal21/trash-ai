<template>
    <div class="uploads-container">
        <!-- Main Content Card -->
        <div class="uploads-card">
            <v-row align="center" justify="center">
                <v-col align="center" justify="center">
                    <!-- 
                    <DragDropTitle /> 
                    -->
                    
                    <!-- Current Processing Item -->
                    <Thumb
                        :item="store.current_save_data"
                        v-if="store.current_save_data != null"
                        class="processing-thumb"
                    />
                    
                    <!-- Image Grid -->
                    <div class="image-grid">
                        <Thumb
                            v-for="(img, idx) in displays"
                            @click="doroute(img.hash)"
                            :key="idx"
                            :item="img"
                        />
                    </div>
                    
                    <!-- Empty State -->
                    <div v-if="displays.length === 0 && !store.current_save_data" class="empty-state">
                        <v-icon size="64" class="empty-icon">mdi-image-off</v-icon>
                        <p class="empty-text">No images uploaded yet</p>
                        <p class="empty-hint">Drop images or use the Actions menu to get started</p>
                    </div>
                </v-col>
            </v-row>
        </div>

        <!-- Pagination -->
        <v-row align="center" class="mb-4">
            <v-col align="center" justify="center">
                <v-pagination
                    v-if="store.hash_ids.length > 0"
                    v-model="vpage"
                    :length="store.nav_length"
                    :total-visible="is_mobile ? 3 : 7"
                    rounded="circle"
                    class="pagination-neon"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as m from '@/lib'
import { toInteger } from 'lodash'

interface State {
    displays: m.Display[]
    nav_idx: number
}

export default defineComponent({
    data(): State {
        return {
            displays: [],
            nav_idx: 0,
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
    watch: {
        nav_idx: {
            async handler(idx: number) {
                if (idx != null) {
                    this.$router.push({
                        name: 'uploads',
                        params: { idx: toInteger(idx) },
                    })
                    this.setDisplays(toInteger(idx))
                }
            },
        },
        'store.hash_ids': {
            async handler(ids: string[]) {
                this.appstore.setTitle(`Uploads (${ids.length})`)
                await this.setDisplays(this.nav_idx)
            },
            deep: true,
        },
        'store.busy': {
            async handler(isbusy: boolean) {
                if (isbusy) {
                    return
                }
                await this.setDisplays(this.nav_idx)
            },
            deep: true,
        },
    },
    computed: {
        vpage: {
            get() {
                return this.nav_idx + 1
            },
            set(newval: number) {
                this.nav_idx = newval - 1
            },
        },
        is_mobile(): boolean {
            return this.$vuetify.display.mobile
        },
    },
    methods: {
        scolor(obj: string | null) {
            if (obj == null) {
                return 'green'
            }
            return 'red'
        },
        async doroute(hash: string) {
            const idx = this.store.hash_ids.indexOf(hash)
            this.$router.push({
                name: 'image',
                params: {
                    idx: idx,
                    tab: 'image',
                },
            })
        },
        async setDisplays(idx: number) {
            const hids = this.store.nav_hash_ids(idx)
            m.log.debug('setDisplays', hids)
            const data = await m.imagedb.savedata.bulkGet(hids)
            this.displays = data.map((d) => d!.display)
        },
    },
    async mounted() {
        this.nav_idx = toInteger(this.$route.params.idx) || 0
        await this.setDisplays(this.nav_idx)
        this.appstore.setTitle(`Uploads (${this.store.hash_ids.length})`)
    },
})
</script>


<style scoped>
.uploads-container {
    min-height: 60vh;
}

.uploads-card {
    background: transparent;
    min-height: 50vh;
    padding: 16px;
}

.pagination-neon :deep(.v-pagination__item) {
    background: rgba(26, 26, 26, 0.9) !important;
    color: #a0a0a0 !important;
    border: 1px solid rgba(0, 255, 136, 0.2);
    transition: all 0.3s ease;
}

.pagination-neon :deep(.v-pagination__item:hover) {
    border-color: #16FF00;
    color: #16FF00 !important;
}

.pagination-neon :deep(.v-pagination__item--is-active) {
    background: linear-gradient(135deg, #16FF00 0%, #00cc6a 100%) !important;
    color: #000 !important;
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
    border-color: #16FF00;
}

.pagination-neon :deep(.v-pagination__prev),
.pagination-neon :deep(.v-pagination__next) {
    background: rgba(26, 26, 26, 0.9) !important;
    border: 1px solid rgba(0, 255, 136, 0.2);
}

.pagination-neon :deep(.v-pagination__prev:hover),
.pagination-neon :deep(.v-pagination__next:hover) {
    border-color: #16FF00;
}

.image-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
}

.processing-thumb {
    animation: pulse-border 2s ease-in-out infinite;
}

@keyframes pulse-border {
    0%, 100% {
        box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
    }
    50% {
        box-shadow: 0 0 25px rgba(0, 255, 136, 0.6);
    }
}

.empty-state {
    padding: 60px 20px;
    text-align: center;
}

.empty-icon {
    color: #333 !important;
    margin-bottom: 16px;
}

.empty-text {
    color: #666;
    font-size: 1.2rem;
    margin-bottom: 8px;
}

.empty-hint {
    color: #444;
    font-size: 0.9rem;
}
</style>

