import { Color, IUniform, ImageUtils, ShaderMaterial, Texture, TextureLoader, UniformsUtils  } from "three";

/**
 * TODO use a shader material instead.
 * @param color 
 */
export const OverlayColor = (texture: Texture) : ShaderMaterial => {

    const vertexShader = /*glsl*/`
        varying vec2 vUv;
        void main() {
            

            vUv = uv;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = /*glsl*/`
        uniform sampler2D texture1;

        varying vec2 vUv;

        void main() {
            gl_FragColor = texture2D(texture1, vUv);
        }
    `;


	const material = new ShaderMaterial( { 
        uniforms: {
           texture1: {
                value: texture
           }
        }, 
    vertexShader: vertexShader, 
    fragmentShader: fragmentShader } );
	
	return material;
}