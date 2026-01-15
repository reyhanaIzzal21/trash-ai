<template>
    <v-app class="futuristic-app">
        <v-card
            v-cloak
            id="droparea"
            ref="droparea"
            class="main-container"
            @drop.prevent="imgstore.doupload($event.dataTransfer?.files)"
            @dragover.prevent
        >
            <Snack ref="snack" />
            <v-layout>
                <!-- Futuristic App Bar -->
                <v-app-bar class="appbar-futuristic" prominent>
                    <v-app-bar-nav-icon
                        v-if="is_mobile"
                        variant="text"
                        class="nav-icon-glow"
                        @click.stop="drawer = !drawer"
                    />

                    <v-toolbar-title class="ml-5 d-flex align-center">
                        <v-icon class="mr-3 logo-icon icon-pulse" size="32">
                            mdi-delete-variant
                        </v-icon>
                        <span class="app-title">{{ appstore.title }}</span>
                    </v-toolbar-title>
                    
                    <v-spacer />
                    
                    <h2 class="brand-name ml-2 pa-2" v-if="!is_mobile">
                        <span class="text-neon-glow">Trashformers</span>
                    </h2>
                    
                    <v-menu auto>
                        <template v-slot:activator="menu">
                            <v-tooltip location="bottom">
                                <template v-slot:activator="tt">
                                    <span v-bind="tt.props">
                                        <v-btn
                                            text
                                            v-bind="menu.props"
                                            class="settings-btn"
                                        >
                                            <v-icon>
                                                mdi-application-cog-outline
                                            </v-icon>
                                        </v-btn>
                                    </span>
                                </template>
                                <span>Show Web Settings</span>
                            </v-tooltip>
                        </template>
                        <v-list class="settings-menu">
                            <v-list-item>
                                <v-btn
                                    @click="toggleTheme"
                                    class="btn-neon-outline"
                                    block
                                >
                                    <v-icon size="20" class="mr-2">
                                        mdi-theme-light-dark
                                    </v-icon>
                                    Toggle Theme
                                </v-btn>
                            </v-list-item>
                            <v-list-item>
                                <v-btn
                                    @click="goToLanding"
                                    class="btn-neon-outline"
                                    block
                                >
                                    <v-icon size="20" class="mr-2">
                                        mdi-home
                                    </v-icon>
                                    Back to Home
                                </v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-app-bar>
                
                <!-- Futuristic Navigation Drawer -->
                <v-navigation-drawer
                    v-model="display_drawer"
                    class="nav-futuristic"
                    bottom
                >
                    <div class="nav-header pa-4">
                        <v-icon class="text-neon" size="28">mdi-robot</v-icon>
                        <span class="nav-title ml-2">AI Navigation</span>
                    </div>
                    <v-divider class="divider-neon" style="margin: 0;" />
                    
                    <v-list class="nav-list">
                        <v-list-item
                            @click="$router.push({ name: 'dashboard-about' })"
                            :active="isactive('dashboard-about')"
                            class="nav-item"
                        >
                            <v-list-item-title class="d-flex align-center">
                                <v-icon class="mr-4 nav-icon">mdi-information</v-icon>
                                <span>About</span>
                            </v-list-item-title>
                        </v-list-item>
                        
                        <v-list-item
                            @click="$router.push({ name: 'uploads', params: { idx: '0' } })"
                            :active="isactive('uploads')"
                            class="nav-item"
                        >
                            <v-list-item-title class="d-flex align-center">
                                <v-icon class="mr-4 nav-icon">mdi-image</v-icon>
                                <span>Uploads</span>
                            </v-list-item-title>
                        </v-list-item>
                        
                        <v-list-item
                            @click="$router.push({ name: 'summary', params: { tab: 'detections' } })"
                            :active="isactive('summary')"
                            class="nav-item"
                        >
                            <v-list-item-title class="d-flex align-center">
                                <v-icon class="mr-4 nav-icon">mdi-book-open-variant</v-icon>
                                <span>Summary</span>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                    
                    <template v-slot:append>
                        <div class="nav-footer pa-4">
                            <small class="text-secondary">Powered by AI</small>
                        </div>
                    </template>
                </v-navigation-drawer>

                <!-- Main Content -->
                <v-main class="main-content">
                    <v-container class="pa-6 pa-md-10">
                        <!-- Progress Indicators -->
                        <div class="progress-container mb-7" v-if="imgstore.is_processing || imgstore.zip_busy">
                            <Progress
                                :progress="imgstore.upload"
                                v-if="imgstore.is_processing"
                                class="progress-neon mb-2"
                            />
                            <Progress
                                :progress="imgstore.process"
                                v-if="imgstore.is_processing"
                                class="progress-neon mb-2"
                            />
                            <Progress
                                :progress="imgstore.zip"
                                v-if="imgstore.zip_busy"
                                class="progress-neon"
                            />
                        </div>
                        
                        <!-- Stats Summary -->
                        <TrashSummary class="mb-6" />
                        
                        <!-- Router View with transition -->
                        <div class="content-wrapper glass-card pa-4">
                            <router-view />
                        </div>
                    </v-container>
                </v-main>
            </v-layout>
        </v-card>
    </v-app>
</template>

<script lang="ts">
import Snack from '@/components/snack.vue'
import { defineComponent, ref } from 'vue'
import { useTheme } from 'vuetify'
import * as m from '@/lib'

interface Data {
    drawer: boolean
}

export default defineComponent({
    name: 'DashboardLayout',
    components: {
        Snack,
    },
    setup() {
        const imgstore = m.useImageStore()
        const appstore = m.useAppStore()
        const theme = useTheme()
        const snackbar = ref<typeof Snack>()
        return {
            snackbar,
            imgstore,
            appstore,
            theme,
        }
    },
    created() {
        m.TensorFlow.getInstance()
    },
    mounted() {
        window.onpopstate = () => {
            // @ts-ignore
            this.preloader = false
        }
        this.theme.global.name.value = this.appstore.theme
        this.imgstore.doinit()
        m.log.debug('veutify', this.$vuetify)
        m.log.debug('mounted', this)
        m.log.debug(navigator.storage.estimate())
    },
    data(): Data {
        return {
            drawer: false,
        }
    },
    computed: {
        is_mobile(): boolean {
            return this.$vuetify.display.mobile
        },
        display_drawer: {
            get() {
                return this.is_mobile ? this.drawer : true
            },
            set(val: boolean) {
                this.drawer = val
            },
        },
        img_cnt() {
            return this.imgstore.hash_ids.length
        },
    },
    methods: {
        isactive(name: string) {
            return this.$route.name === name
        },
        toggleTheme() {
            this.appstore.setTheme(
                this.appstore.theme == 'dark' ? 'light' : 'dark',
            )
            this.theme.global.name.value = this.appstore.theme
        },
        goToLanding() {
            this.$router.push({ name: 'home' })
        },
    },
})
</script>

<style scoped>
.futuristic-app {
    background: #0a0a0a !important;
}

.main-container {
    background: transparent !important;
    min-height: 100vh;
}

.appbar-futuristic {
    background: linear-gradient(90deg, #121212 0%, #0a0a0a 50%, #121212 100%) !important;
    border-bottom: 1px solid rgba(0, 255, 136, 0.3) !important;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 255, 136, 0.1) !important;
}

.logo-icon {
    color: #16FF00 !important;
    filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.6));
}

.app-title {
    color: #e0e0e0;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.brand-name {
    font-weight: 700;
    letter-spacing: 1px;
}

.nav-icon-glow {
    color: #16FF00 !important;
}

.settings-btn {
    color: #a0a0a0 !important;
    transition: all 0.3s ease;
}

.settings-btn:hover {
    color: #16FF00 !important;
}

.settings-menu {
    background: #1a1a1a !important;
    border: 1px solid rgba(0, 255, 136, 0.2);
    border-radius: 8px;
}

.nav-futuristic {
    background: linear-gradient(180deg, #121212 0%, #0a0a0a 100%) !important;
    border-right: 1px solid rgba(0, 255, 136, 0.2) !important;
}

.nav-header {
    display: flex;
    align-items: center;
    background: rgba(0, 255, 136, 0.05);
}

.nav-title {
    color: #16FF00;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9rem;
}

.nav-list {
    padding: 8px;
}

.nav-item {
    margin: 4px 0;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.nav-item:hover {
    background: rgba(0, 255, 136, 0.1) !important;
}

.nav-item:hover .nav-icon {
    color: #16FF00 !important;
}

.nav-item.v-list-item--active {
    background: rgba(0, 255, 136, 0.15) !important;
    border-left: 3px solid #16FF00;
}

.nav-item.v-list-item--active .nav-icon {
    color: #16FF00 !important;
}

.nav-icon {
    color: #a0a0a0;
    transition: color 0.3s ease;
}

.nav-footer {
    border-top: 1px solid rgba(0, 255, 136, 0.1);
    text-align: center;
}

.text-secondary {
    color: #666;
}

.main-content {
    background: #0a0a0a;
}

.progress-container {
    position: relative;
}

.content-wrapper {
    min-height: 60vh;
}
</style>
