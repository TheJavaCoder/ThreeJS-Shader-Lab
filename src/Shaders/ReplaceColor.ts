import { Color, ShaderMaterial, Texture, Vector4 } from "three";

export const ReplaceColor = ( texture: Texture, replaceing: Color, newColor: Color, threshold: number) : ShaderMaterial => {
    const vertexShader = /*glsl*/`
        varying vec2 vUv;
        void main() {
            
            vUv = uv;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = /*glsl*/`
        uniform sampler2D texture1;
        uniform vec4 replacing;
        uniform vec4 newColor;
        uniform float threshold;

        varying vec2 vUv;

        void main() {

            vec4 texture = texture2D(texture1, vUv);

            if( abs(texture.r - replacing.r) < threshold 
             && abs(texture.g - replacing.g) < threshold
             && abs(texture.b - replacing.b) < threshold  ) 
            {
                gl_FragColor = newColor;
            }else {
                gl_FragColor = texture;
            }
        }
    `;

    const material = new ShaderMaterial( { 
        uniforms: {
        texture1: {
                value: texture
        },
        replacing: {
                value: new Vector4(replaceing.r, replaceing.g, replaceing.b, 1)
        },
        newColor: {
            value: new Vector4(newColor.r, newColor.g, newColor.b, 1)
        },
        threshold: {
            value: threshold
        }
    }, 
    vertexShader: vertexShader, 
    fragmentShader: fragmentShader,
    });

    return material;
}