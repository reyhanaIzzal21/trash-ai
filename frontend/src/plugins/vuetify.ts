// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import type { ThemeDefinition } from 'vuetify'
import { createVuetify } from 'vuetify'
import 'vuetify/styles' // Global CSS has to be imported
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Futuristic Light Theme (for toggle compatibility)
const LightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#f0f4f0',
        surface: '#ffffff',
        primary: '#00cc6a',
        secondary: '#1a3a1a',
        accent: '#00ffaa',
        accent2: '#39ff14',
        success: '#00ff88',
        error: '#ff4444',
        warning: '#ffaa00',
        info: '#00bfff',
    },
}

// Futuristic Dark Theme - Cyberpunk inspired
const DarkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        background: '#0a0a0a',
        surface: '#121212',
        'surface-variant': '#1a1a1a',
        'surface-bright': '#1e1e1e',
        primary: '#00ff88',
        'primary-darken-1': '#00cc6a',
        secondary: '#1a1a1a',
        'secondary-darken-1': '#0f0f0f',
        accent: '#00ffff',
        accent2: '#39ff14',
        success: '#00ff88',
        error: '#ff4444',
        warning: '#ffaa00',
        info: '#00bfff',
        'on-background': '#e0e0e0',
        'on-surface': '#e0e0e0',
        'on-primary': '#000000',
        'on-secondary': '#00ff88',
    },
}

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
        themes: {
            light: LightTheme,
            dark: DarkTheme,
        },
    },
})

export default vuetify
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
