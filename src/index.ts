
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OverlayColor } from "./TextureTools/OverlayColor";
import { PerspectiveCamera, ShaderMaterial, Scene, WebGLRenderer, BoxGeometry, TextureLoader, Mesh } from "three";

let scene = new Scene();
let Camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
Camera.position.z = 2

let Renderer = new WebGLRenderer();
let Controls = new OrbitControls(Camera, Renderer.domElement);
let Geometry = new BoxGeometry()

let map = new TextureLoader().load('./images/testTexture.png');

let CurrentMaterial = OverlayColor(map);

let Cube = new Mesh(Geometry, CurrentMaterial)
scene.add(Cube)


window.onload = () => {
    BuildScene();    
}

const BuildScene = () => {
    Renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("ThreeJSCanvas").appendChild(Renderer.domElement);


    Update();
    Render();
}

const Update = () => {
    requestAnimationFrame(Update);

    Cube.rotation.x += 0.001;
    Cube.rotation.y += 0.001;

    Controls.update();

    Render();
}


const onWindowResize = () => {
    Camera.aspect = window.innerWidth / window.innerHeight;
    Camera.updateProjectionMatrix();
    Renderer.setSize(window.innerWidth, window.innerHeight);
    Render();
}

function Render() {
    Renderer.render(scene, Camera);
}

window.addEventListener('resize', onWindowResize, false);