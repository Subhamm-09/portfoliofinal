const fs = require('fs');
const THREE = require('three');
const { OBJLoader, GLTFExporter } = require('three-stdlib');

const objLoader = new OBJLoader();
const exporter = new GLTFExporter();

function convert(objPath, outPath) {
    console.log('Reading ' + objPath + '...');
    const data = fs.readFileSync(objPath, 'utf8');
    const group = objLoader.parse(data);
    console.log('Parsed mesh. Exporting to GLB...');
    exporter.parse(
        group,
        (gltf) => {
            fs.writeFileSync(outPath, Buffer.from(gltf));
            const sizeMB = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);
            console.log('Successfully saved ' + outPath + ' (' + sizeMB + ' MB)');
        },
        (error) => {
            console.error('Error:', error);
        },
        { binary: true }
    );
}

try {
    convert('public/Meshy_AI_Fragmented_Apollo_0816202446_texture.obj', 'public/apollo_dark.glb');
    convert('public/Meshy_AI_Fragmented_Apollo_0816230746_texture.obj', 'public/apollo_light.glb');
} catch (e) {
    console.error('Failure:', e);
}