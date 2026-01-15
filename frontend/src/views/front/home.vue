<template>
    <LandingLayout />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LandingLayout from './LandingLayout.vue'

export default defineComponent({
    name: 'Home',
    components: {
        LandingLayout,
    },
})
</script>