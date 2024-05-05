
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OverlayColor } from "./Shaders/OverlayColor";
import { PerspectiveCamera, Scene, WebGLRenderer, BoxGeometry, TextureLoader, Mesh, Color } from "three";
import { ReplaceColor } from './Shaders/ReplaceColor';

let scene = new Scene();
let Camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
Camera.position.z = 2

let Renderer = new WebGLRenderer();
let Controls = new OrbitControls(Camera, Renderer.domElement);
let Geometry = new BoxGeometry()

let map = new TextureLoader().load('./images/testTexture.png');

let CurrentMaterial = ReplaceColor(map,  new Color( 0x969696 ),new Color( 255,0,1 ), 0.1);

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