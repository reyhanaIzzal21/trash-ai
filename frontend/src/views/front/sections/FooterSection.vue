<template>
    <footer class="footer-section">
        <div class="footer-content">
            <div class="footer-brand">
                <div class="brand-logo">
                    <v-icon color="#16FF00">mdi-recycle</v-icon>
                    <span>ECOSCAN AI</span>
                </div>
                <p>Reinventing the future of environmental preservation through autonomous robotics and artificial intelligence.</p>
            </div>
            
            <div class="footer-links">
                <h4>PLATFORM</h4>
                <ul>
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Drone Fleet</a></li>
                    <li><a href="#">AI Models</a></li>
                    <li><a href="#">Security</a></li>
                </ul>
            </div>
            
            <div class="footer-links">
                <h4>CONNECT</h4>
                <ul>
                    <li><a href="#">camera@ecoscan.ai</a></li>
                    <li><a href="#">+1 (555) 012-3456</a></li>
                    <li class="social-icons">
                        <v-icon size="small">mdi-twitter</v-icon>
                        <v-icon size="small">mdi-github</v-icon>
                        <v-icon size="small">mdi-linkedin</v-icon>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2026 EcoScan Systems. All rights reserved.</p>
            <div class="legal-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'FooterSection'
})
</script>

<style scoped>
.footer-section {
    background: #000;
    padding: 6rem 5% 2rem;
    border-top: 1px solid #111;
     font-size: 0.9rem;
}

.footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto 4rem;
}

.footer-brand {
    flex: 2;
    min-width: 300px;
}

.brand-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 1.5rem;
    font-family: 'Michroma', sans-serif;
}

.footer-brand p {
    color: #666;
    max-width: 400px;
    line-height: 1.6;
}

.footer-links {
    flex: 1;
    min-width: 150px;
}

.footer-links h4 {
    color: #fff;
    font-weight: 700;
    margin-bottom: 1.5rem;
    font-size: 0.8rem;
    letter-spacing: 1px;
}

.footer-links ul {
    list-style: none;
    padding: 0;
}

.footer-links li {
    margin-bottom: 1rem;
}

.footer-links a {
    color: #666;
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-links a:hover {
    color: var(--neon-green);
}

.social-icons {
    display: flex;
    gap: 15px;
    margin-top: 1rem;
}

.social-icons .v-icon {
    color: #666;
    cursor: pointer;
    transition: color 0.3s ease;
}

.social-icons .v-icon:hover {
    color: var(--neon-green);
}

.footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 2rem;
    border-top: 1px solid #111;
    display: flex;
    justify-content: space-between;
    color: #444;
    font-size: 0.8rem;
}

.legal-links {
    display: flex;
    gap: 2rem;
}

.legal-links a {
    color: #444;
    text-decoration: none;
}

.legal-links a:hover {
    color: #666;
}

@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
        gap: 2rem;
    }
    
    .footer-bottom {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
}
</style>
