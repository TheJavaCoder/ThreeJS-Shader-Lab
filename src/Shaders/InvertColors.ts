import { Color, IUniform, ImageUtils, ShaderMaterial, Texture, TextureLoader, UniformsUtils, Vector4  } from "three";

/**
 * 
 * @param texture
 * @returns ShaderMaterial
 */
export const InvertColor = (texture: Texture) : ShaderMaterial => {
    const vertexShader = /*glsl*/`
        varying vec2 vUv;
        void main() {
            
            vUv = uv;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = /*glsl*/`
        uniform sampler2D texture1;
        uniform vec4 color;

        varying vec2 vUv;

        void main() {
            gl_FragColor = vec4(vec3(1) - texture2D(texture1, vUv).rgb, 1);
        }
    `;


	const material = new ShaderMaterial( { 
        uniforms: {
           texture1: {
                value: texture
           },
        }, 
    vertexShader: vertexShader, 
    fragmentShader: fragmentShader,
    });
	
	return material;
}