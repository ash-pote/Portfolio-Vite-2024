const frag = `
uniform float time;
uniform float u_intensity;

varying vec2 vUv;
varying float vDisplacement;

uniform sampler2D cat;
uniform samplerCube cube;

varying vec3 v_position;
varying vec3 v_normal;
varying vec2 v_uv;

vec3 addLight(vec3 lightColor, vec3 lightPosition) {
    // ambient color
    float ambientStrength = 0.1;
    vec3 ambientColor = ambientStrength * lightColor;

    // diffuse color - matte color
    vec3 lightDirection = normalize(lightPosition - v_position);
    float diffuseStrength = 1.5;
    float diffuseScore = max(dot(lightDirection, v_normal), 0.0);
    vec3 diffuseColor = diffuseStrength * diffuseScore * lightColor;

    // Specular color - gloss
    vec3 cameraDirection = normalize(cameraPosition - v_position);
    vec3 reflectionDirection = normalize(lightDirection + cameraDirection);
    float specularStrength = 10.0;
    float shininess = 150.0;
    float specularScore = pow(max(dot(reflectionDirection, v_normal), 0.0), shininess);
    vec3 specularColor = specularStrength * specularScore * lightColor;

    return (ambientColor + diffuseColor + specularColor);
}

void main() {
    float distort = 2.0 * vDisplacement * u_intensity * sin(vUv.y * 10.0 + time);

    vec4 objectColor = texture2D(cat, v_uv);
    // vec3 lightColor = vec3(0.9, 0.8, 0.8);
    // vec3 lightPosition = vec3(50.0 * sin(time), 0.0, 300.0);

    vec3 light1 = addLight(
        vec3(1.0, 1.0, 1.0),
        vec3(60.0 * cos(time), 60.0 * sin(time), 200.0)
    );

    vec3 light2 = addLight(
        vec3(1.0, 1.0, 1.0),
        vec3(-60.0 * cos(time), 60.0 * sin(time), 100.0)
    );

    vec3 light3 = addLight(
        vec3(1.0, 1.0, 1.0),
        vec3(30.0 * cos(time), 60.0 * sin(time), 300.0)
    );

    // Final Color
    vec4 color = vec4(
        (light1) * objectColor.rgb
        , 1.0);

    gl_FragColor = color;
}

`;
