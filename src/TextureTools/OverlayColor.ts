import { Color, IUniform, ImageUtils, ShaderMaterial, Texture, TextureLoader, UniformsUtils, Vector4  } from "three";

/**
 * 
 * @param texture 
 * @param color 
 * @param opacity 
 * @returns 
 */
export const OverlayColor = (texture: Texture, color: Color, opacity: number) : ShaderMaterial => {
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
            gl_FragColor = mix(texture2D(texture1, vUv), color, color.a);
        }
    `;


	const material = new ShaderMaterial( { 
        uniforms: {
           texture1: {
                value: texture
           },
           color: {
                value: new Vector4(color.r, color.g, color.b, opacity)
           }
        }, 
    vertexShader: vertexShader, 
    fragmentShader: fragmentShader,
    });
	
	return material;
}