import { useEffect } from "react";
import * as THREE from "three";
import { Reflector, GLTFLoader, EffectComposer, RenderPass, BloomPass, ShaderPass, OutputPass } from "three/examples/jsm/Addons.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

const w = 800;
const h = 600;

const main = async () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x42395d);

  const camera = new THREE.PerspectiveCamera(
    45,
    w / h,
    1,
    100
  );
  camera.position.set(0, 1, -50);
  camera.lookAt(0, 0, 0);

  scene.add(
    (() => {
      const light = new THREE.DirectionalLight(0xff5500, 2);
      light.position.set(20, 1, 1);
      light.lookAt(0, 0, 0);
      light.castShadow = true;
      return light;
    })()
  );
  scene.add(
    (() => {
      const light = new THREE.DirectionalLight(0xff11cc, 3);
      light.position.set(3, 0, 10);
      light.lookAt(0, 0, 0);
      light.castShadow = true;
      return light;
    })()
  );
  scene.add(
    (() => {
      const light = new THREE.DirectionalLight(0xbb0000, 4);
      light.position.set(-3, 1, -1);
      light.lookAt(0, 0, 0);
      light.castShadow = true;
      return light;
    })()
  );

  scene.add(
    (() => {
      const light = new THREE.DirectionalLight(0x4400ff, 3);
      light.position.set(-9, 3, -10);
      light.lookAt(0, 0, 0);
      light.castShadow = true;
      return light;
    })()
  );

  // Pink light
  scene.add(
    (() => {
      const light = new THREE.DirectionalLight(0xcc91a4, 3);
      light.position.set(20, 3, 1);
      light.lookAt(0, 0, 0);
      light.castShadow = true;
      return light;
    })()
  );

  // Blue light
  scene.add(
    (() => {
      const light = new THREE.DirectionalLight(0x00a2ff, 3);
      light.position.set(-10, 1, -1);
      light.lookAt(0, 0, 0);
      light.castShadow = true;
      return light;
    })()
  );

  // Purple light
  scene.add(
    (() => {
      const light = new THREE.DirectionalLight(0x912dff, 3);
      light.position.set(-10, 3, -1);
      light.lookAt(0, 0, 0);
      light.castShadow = true;
      return light;
    })()
  );

  // Create a reflector
  const geometry = new THREE.PlaneGeometry(40, 40);
  const reflector = (() => {
    const reflector = new Reflector(geometry, {
      color: new THREE.Color(0xbfbfbf),
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
    });
    reflector.position.y = 0;
    reflector.position.z = 10; // Adjust this value to move the reflector forward or backward
    reflector.position.x = -20;
    reflector.rotateX(Math.PI); // Rotate the reflector
    reflector.rotateY(0.21 * Math.PI);
    return reflector;
  })(); // Rotate the reflector
  scene.add(reflector);
  const reflector2 = (() => {
    const reflector = new Reflector(geometry, {
      color: new THREE.Color(0xbfbfbf),
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
    });
    reflector.position.y = 0;
    reflector.position.z = 9; // Adjust this value to move the reflector forward or backward
    reflector.position.x = 20;
    reflector.rotateX(Math.PI); // Rotate the reflector
    //  if it 0.3 on both its add 2 more to 5 actually figure
    reflector.rotateY(-0.21 * Math.PI);
    return reflector;
  })(); // Rotate the reflector
  scene.add(reflector2);

  const metal = new THREE.MeshStandardMaterial({
    color: 0xafafaf,

    roughness: 0.35,
    metalness: 0.65,

    emissive: 0xffffff,
    emissiveIntensity: 0.001,
  });

  const c = await (async () => {
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    const gltf = await loader.loadAsync("Actaeon-05.glb");

    gltf.scene.rotateY(0.8 * Math.PI);
    gltf.scene.traverse((object) => {
      if ((object as any).isMesh) (object as any).material = metal;
    });

    return gltf.scene;
  })();
  scene.add(c);

  const renderer = (() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w,h);
    renderer.shadowMap.enabled = true;
    return renderer;
  })();

  const container = document.getElementById("container")!;
  container.appendChild(renderer.domElement);

  const {
    composer,
    uniforms: { },
  } = (() => {
    const composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new BloomPass(1, 25, 0.2);
    composer.addPass(bloomPass);

    const vertexShader = `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `;
    const chromaticAberration = (() => {
      // Fragment shader code
      const fragmentShader = `
      varying vec2 vUv;
      uniform sampler2D tDiffuse;
      uniform float amount;
      
      void main() {
        vec2 uv = vUv;
        vec2 offset = amount * (vUv - 0.5); // Adjust amount for the strength of chromatic aberration
        
        vec4 red = texture2D(tDiffuse, uv - offset); // Red channel
        vec4 green = texture2D(tDiffuse, uv + 0.5 * vec2(offset.x,-offset.y)  );       // Green channel
        vec4 blue = texture2D(tDiffuse, uv + offset);// Blue channel
        
        gl_FragColor = vec4(red.r, green.g, blue.b, 1.0);
      }
      `;

      // Create a basic material and attach the shaders
      const uniforms = {
        tDiffuse: { value: null as null | HTMLCanvasElement },
        amount: { value: 0.03 }, // Adjust this value for the strength of chromatic aberration
      };

      return new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
      });
    })();
    const chromaticAberrationShaderPass = new ShaderPass(chromaticAberration);
    composer.addPass(chromaticAberrationShaderPass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    return { composer, uniforms: {} };
  })();

  const animate = () => {
    requestAnimationFrame(animate);

    c?.rotateY(0.015);

    composer.render();
  };
  animate();
};


export function Figure({ }: {}) {
  useEffect(() => {
    main().catch(console.error);
  }, []);
  return (
    <div id="container" style={{maxWidth:"100px"}}></div>

  )
}

