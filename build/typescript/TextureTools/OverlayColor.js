"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverlayColor = void 0;
var three_1 = require("three");
/**
 * TODO use a shader material instead.
 * @param color
 */
// export const OverlayColor = (CurrentMaterial: ShaderMaterial,color: Color) : void => {
// }
var OverlayColor = function (texture) {
    var vertexShader = /*glsl*/ "\n        varying vec2 vUv;\n        void main() {\n            \n\n            vUv = uv;\n\n            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n    ";
    var fragmentShader = /*glsl*/ "\n        uniform sampler2D texture1;\n\n        varying vec2 vUv;\n\n        void main() {\n            gl_FragColor = texture2D(texture1, vUv);\n        }\n    ";
    var material = new three_1.ShaderMaterial({
        uniforms: {
            texture1: {
                value: texture
            }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
    return material;
};
exports.OverlayColor = OverlayColor;
//# sourceMappingURL=OverlayColor.js.map