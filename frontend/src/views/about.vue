<template>
    <div class="about-container">
        <div class="about-header">
            <v-icon class="header-icon" size="48">mdi-robot</v-icon>
            <h1 class="header-title">About Trashformers</h1>
        </div>
        
        <div class="about-content">
            <div class="about-section">
                <h2 class="section-title">
                    <v-icon class="section-icon">mdi-hand-wave</v-icon>
                    Welcome to Trashformers!
                </h2>
                <p>
                    This is an
                    <a href="https://github.com/code4sac/trash-ai" target="_blank">open source project</a>
                    developed and maintained by
                    <a href="https://codeforsacramento.org" target="_blank">Code For Sacramento</a> in
                    partnership with Win Cowger from
                    <a href="https://mooreplasticresearch.org/" target="_blank">The Moore Institute for Plastic Pollution Research</a>
                    and Walter Yu from <a href="https://dot.ca.gov/" target="_blank">CALTRANS</a>.
                    <a href="https://github.com/shollingsworth" target="_blank">Steven Hollingsworth</a>
                    is the lead developer and contributor to the code base.
                </p>
                <p class="cta-text">
                    To get started, visit the Upload Tab or
                    <router-link :to="{ name: 'uploads', params: { idx: '0' } }">click here</router-link>.
                </p>
            </div>
            
            <div class="section-divider"></div>
            
            <div class="about-section">
                <h2 class="section-title">
                    <v-icon class="section-icon">mdi-help-circle</v-icon>
                    What is it?
                </h2>
                <p>
                    Trashformers allows you to upload an image containing trash and get back
                    data about the trash in the image, including the classification of
                    trash and bounding box of where the trash is in the image.
                </p>
            </div>
            
            <div class="section-divider"></div>
            
            <div class="about-section">
                <h2 class="section-title">
                    <v-icon class="section-icon">mdi-cog</v-icon>
                    How does it work?
                </h2>
                <p>
                    Trashformers builds a model using the
                    <a href="https://github.com/ultralytics/yolov5" target="_blank">YoloV5 toolset</a>
                    trained on the <a href="http://tacodataset.org/" target="_blank">TACO dataset</a>.
                    The model takes an image containing trash and returns a list of
                    annotations and bounding boxes of trash within the image. The model
                    is imported into the front-end
                    <a href="https://vuejs.org/" target="_blank">Vue.js</a> application where it is
                    invoked when an image is uploaded. The Vue application then displays
                    the results of the model on the image.
                </p>
            </div>
            
            <div class="section-divider"></div>
            
            <div class="about-section">
                <h2 class="section-title">
                    <v-icon class="section-icon">mdi-account-check</v-icon>
                    How can I use Trashformers?
                </h2>
                <p>
                    Trashformers is open source and free to use however you see fit. You may
                    classify images and download the data. You may copy and modify the
                    code for your own use.
                </p>
            </div>
            
            <div class="section-divider"></div>
            
            <div class="about-section warning-section">
                <h2 class="section-title">
                    <v-icon class="section-icon warning-icon">mdi-alert</v-icon>
                    Disclaimer about uploaded images
                </h2>
                <p>
                    The current version of Trashformers and the model we are using is just a
                    start! When you upload an image, we are storing the image and the
                    classification in an effort to expand the trash dataset and improve
                    the model over time.
                </p>
            </div>
            
            <div class="section-divider"></div>
            
            <div class="about-section">
                <h2 class="section-title">
                    <v-icon class="section-icon">mdi-bug</v-icon>
                    Reporting issues and improvements
                </h2>
                <p>
                    If you would like to report an issue or request a feature, please
                    <a href="https://github.com/code4sac/trash-ai/issues/new" target="_blank">open a Github Issue</a>
                    in our repository.
                    If you would like to provide more general feedback, please fill out
                    our <a href="https://forms.gle/CwZvegq1oCUYLRjM7" target="_blank">feedback form here</a>.
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as m from '@/lib'

export default defineComponent({
    setup() {
        const appstore = m.useAppStore()
        return {
            appstore,
        }
    },
    mounted() {
        this.appstore.setTitle('About')
    },
})
</script>

<style scoped>
.about-container {
    max-width: 900px;
    margin: 0 auto;
}

.about-header {
    text-align: center;
    margin-bottom: 32px;
    padding: 32px;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(18, 18, 18, 0.9) 100%);
    border: 1px solid rgba(0, 255, 136, 0.2);
    border-radius: 16px;
}

.header-icon {
    color: #16FF00 !important;
    filter: drop-shadow(0 0 15px rgba(0, 255, 136, 0.5));
    margin-bottom: 16px;
}

.header-title {
    color: #e0e0e0;
    font-size: 2rem;
    font-weight: 700;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}

.about-content {
    background: rgba(18, 18, 18, 0.6);
    border: 1px solid rgba(0, 255, 136, 0.1);
    border-radius: 12px;
    padding: 32px;
}

.about-section {
    margin-bottom: 8px;
}

.section-title {
    display: flex;
    align-items: center;
    color: #e0e0e0;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 12px;
}

.section-icon {
    color: #16FF00 !important;
    margin-right: 12px;
}

.warning-icon {
    color: #ffaa00 !important;
}

.about-section p {
    color: #a0a0a0;
    line-height: 1.7;
    margin-bottom: 12px;
}

.about-section a {
    color: #16FF00;
    text-decoration: none;
    transition: all 0.3s ease;
}

.about-section a:hover {
    color: #00ffaa;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.cta-text {
    padding: 12px 16px;
    background: rgba(0, 255, 136, 0.05);
    border-left: 3px solid #16FF00;
    border-radius: 0 8px 8px 0;
    margin-top: 16px;
}

.section-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.2), transparent);
    margin: 24px 0;
}

.warning-section {
    background: rgba(255, 170, 0, 0.05);
    border-left: 3px solid #ffaa00;
    padding: 16px;
    border-radius: 0 8px 8px 0;
}
</style>

