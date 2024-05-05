"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverlayColor = void 0;
var three_1 = require("three");
/**
 *
 * @param texture
 * @param color
 * @param opacity
 * @returns
 */
var OverlayColor = function (texture, color, opacity) {
    var vertexShader = /*glsl*/ "\n        varying vec2 vUv;\n        void main() {\n            \n\n            vUv = uv;\n\n            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n    ";
    var fragmentShader = /*glsl*/ "\n        uniform sampler2D texture1;\n        uniform vec4 color;\n\n        varying vec2 vUv;\n\n        void main() {\n            gl_FragColor = mix(texture2D(texture1, vUv), color, color.a);\n        }\n    ";
    var material = new three_1.ShaderMaterial({
        uniforms: {
            texture1: {
                value: texture
            },
            color: {
                value: new three_1.Vector4(color.r, color.g, color.b, opacity)
            }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
    return material;
};
exports.OverlayColor = OverlayColor;
//# sourceMappingURL=OverlayColor.js.map