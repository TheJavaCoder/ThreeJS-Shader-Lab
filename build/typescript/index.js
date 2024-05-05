"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var OverlayColor_1 = require("./TextureTools/OverlayColor");
var three_1 = require("three");
var scene = new three_1.Scene();
var Camera = new three_1.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
Camera.position.z = 2;
var Renderer = new three_1.WebGLRenderer();
var Controls = new OrbitControls_1.OrbitControls(Camera, Renderer.domElement);
var Geometry = new three_1.BoxGeometry();
var map = new three_1.TextureLoader().load('./images/testTexture.png');
var CurrentMaterial = (0, OverlayColor_1.OverlayColor)(map);
var Cube = new three_1.Mesh(Geometry, CurrentMaterial);
scene.add(Cube);
window.onload = function () {
    BuildScene();
};
var BuildScene = function () {
    Renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("ThreeJSCanvas").appendChild(Renderer.domElement);
    Update();
    Render();
};
var Update = function () {
    requestAnimationFrame(Update);
    Cube.rotation.x += 0.001;
    Cube.rotation.y += 0.001;
    Controls.update();
    Render();
};
var onWindowResize = function () {
    Camera.aspect = window.innerWidth / window.innerHeight;
    Camera.updateProjectionMatrix();
    Renderer.setSize(window.innerWidth, window.innerHeight);
    Render();
};
function Render() {
    Renderer.render(scene, Camera);
}
window.addEventListener('resize', onWindowResize, false);
//# sourceMappingURL=index.js.map