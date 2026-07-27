const fs = require('fs');
const path = require('path');

const ui = ["CustomCursor", "SmoothScroll", "ScrollToTop", "PageTransition", "ScrambleText"];
const layout = ["Preloader", "Navigation", "TopBar", "Socials"];
const sections = ["Hero", "Contact", "Overview", "TechMatrix", "CaseStudySections", "StackedProjects"];
const visuals = ["KineticTunnel", "GoldenTrail", "IconCloud", "ScrollLogo", "GithubGraph", "TunnelOverlay"];

const allFiles = [];

function getFiles(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            getFiles(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            allFiles.push(fullPath);
        }
    }
}

getFiles(path.join(__dirname, 'src'));

for (const file of allFiles) {
    const originalContent = fs.readFileSync(file, 'utf8');
    let content = originalContent;

    // fix the app/Preloader import
    content = content.replace(/@\/app\/Preloader/g, '@/components/layout/Preloader');
    content = content.replace(/from\s+['"](?:\.\/|\.\.\/)*Preloader['"]/g, 'from "@/components/layout/Preloader"');

    // Replace relative components paths
    content = content.replace(/from\s+['"](?:\.\/|\.\.\/)*components\/([^'"]+)['"]/g, 'from "@/components/$1"');

    for (const c of ui) {
        const regex = new RegExp(`@/components/${c}`, 'g');
        content = content.replace(regex, `@/components/ui/${c}`);
    }
    for (const c of layout) {
        const regex = new RegExp(`@/components/${c}`, 'g');
        content = content.replace(regex, `@/components/layout/${c}`);
    }
    for (const c of sections) {
        const regex = new RegExp(`@/components/${c}`, 'g');
        content = content.replace(regex, `@/components/sections/${c}`);
    }
    for (const c of visuals) {
        const regex = new RegExp(`@/components/${c}`, 'g');
        content = content.replace(regex, `@/components/visuals/${c}`);
    }

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
}
