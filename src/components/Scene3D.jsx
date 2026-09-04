import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scene3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    scene.fog = new THREE.FogExp2(0x0b3049, 0.028);

    const ambient = new THREE.AmbientLight(0x9ad4ce, 0.7);
    scene.add(ambient);

    const key = new THREE.PointLight(0xd3a34c, 1.4, 40);
    key.position.set(6, 8, 10);
    scene.add(key);

    const rim = new THREE.PointLight(0x5fadb9, 1.1, 40);
    rim.position.set(-8, -4, 6);
    scene.add(rim);

    const bubbles = new THREE.Group();
    const bubbleGeo = new THREE.SphereGeometry(1, 20, 20);
    const bubbleCount = 26;
    const bubbleData = [];

    for (let i = 0; i < bubbleCount; i++) {
      const scale = 0.12 + Math.random() * 0.42;
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0xeaf6f4,
        transparent: true,
        opacity: 0.28 + Math.random() * 0.22,
        roughness: 0.15,
        metalness: 0,
        transmission: 0.5,
        thickness: 0.6,
      });
      const mesh = new THREE.Mesh(bubbleGeo, mat);
      const x = (Math.random() - 0.5) * 16;
      const y = -8 - Math.random() * 10;
      const z = (Math.random() - 0.5) * 10 - 2;
      mesh.position.set(x, y, z);
      mesh.scale.setScalar(scale);
      bubbles.add(mesh);
      bubbleData.push({
        mesh,
        speed: 0.008 + Math.random() * 0.018,
        driftSpeed: 0.4 + Math.random() * 0.6,
        driftAmp: 0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        baseX: x,
      });
    }
    scene.add(bubbles);

    const corals = new THREE.Group();
    const coralPalette = [0xe2603d, 0xd3a34c, 0x1c7c93, 0x9ad4ce];
    const coralCount = 7;
    const coralData = [];

    for (let i = 0; i < coralCount; i++) {
      const paletteColor = coralPalette[i % coralPalette.length];
      const kind = i % 3;
      let geo;
      if (kind === 0) geo = new THREE.ConeGeometry(0.5 + Math.random() * 0.4, 1.6 + Math.random() * 1.2, 6, 1, true);
      else if (kind === 1) geo = new THREE.TorusKnotGeometry(0.5, 0.16, 80, 10, 2, 3);
      else geo = new THREE.IcosahedronGeometry(0.6 + Math.random() * 0.3, 0);

      const mat = new THREE.MeshStandardMaterial({
        color: paletteColor,
        roughness: 0.5,
        metalness: 0.1,
        flatShading: kind !== 1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const x = (Math.random() - 0.5) * 13;
      const y = -3.6 - Math.random() * 2.4;
      const z = (Math.random() - 0.5) * 8 - 3;
      mesh.position.set(x, y, z);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      corals.add(mesh);
      coralData.push({
        mesh,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        bobSpeed: 0.3 + Math.random() * 0.4,
        bobAmp: 0.15 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
        baseY: y,
      });
    }
    scene.add(corals);

    let frameId;
    let clockStart = performance.now();

    function renderStatic() {
      renderer.render(scene, camera);
    }

    function animate() {
      const t = (performance.now() - clockStart) / 1000;

      bubbleData.forEach((b) => {
        b.mesh.position.y += b.speed;
        b.mesh.position.x = b.baseX + Math.sin(t * b.driftSpeed + b.phase) * b.driftAmp;
        if (b.mesh.position.y > 9) {
          b.mesh.position.y = -9 - Math.random() * 4;
        }
      });

      coralData.forEach((c) => {
        c.mesh.rotation.y += c.rotSpeed;
        c.mesh.position.y = c.baseY + Math.sin(t * c.bobSpeed + c.phase) * c.bobAmp;
      });

      camera.position.x = Math.sin(t * 0.06) * 0.6;
      camera.lookAt(0, -1, 0);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    if (reduced) {
      renderStatic();
    } else {
      animate();
    }

    function handleResize() {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      if (reduced) renderStatic();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameId) cancelAnimationFrame(frameId);
      bubbleGeo.dispose();
      bubbleData.forEach((b) => b.mesh.material.dispose());
      coralData.forEach((c) => {
        c.mesh.geometry.dispose();
        c.mesh.material.dispose();
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />;
}