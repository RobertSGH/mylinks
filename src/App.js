import './App.css';
import backgroundVideo from './media/dream_ihkcj223z6d.mp4';
import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  PerspectiveCamera,
  OrbitControls,
  Environment,
} from '@react-three/drei';
import { FaTwitter, FaInstagram, FaGithub, FaGlobe } from 'react-icons/fa';
import { Suspense, useRef } from 'react';

const LinkButton = ({ url, Icon }) => {
  return (
    <a
      href={url}
      className='link-button'
      target='_blank'
      rel='noopener noreferrer'
    >
      <Icon />
    </a>
  );
};

const Footer = () => {
  return <div className='footer'>&copy; 2023 by Robert</div>;
};

const App = () => {
  const links = [
    { url: 'https://robertsaban.com/', Icon: FaGlobe },
    { url: 'https://twitter.com/RobertJSSX/', Icon: FaTwitter },
    { url: 'https://github.com/RobertSGH/', Icon: FaGithub },
    { url: 'https://instagram.com/', Icon: FaInstagram },
  ];

  const Avatar = () => {
    const gltf = useGLTF('/avatest.glb');

    const mesh = useRef(null);
    useFrame(({ clock }) => {
      if (mesh.current) {
        const rotationValue = Math.sin(clock.getElapsedTime()) * 0.25;
        mesh.current.rotation.y = rotationValue;
      }
    });

    return (
      <primitive
        object={gltf.scene}
        scale={[3.5, 3.5, 3.5]}
        dispose={null}
        position={[0, -6, 0]}
        ref={mesh}
      />
    );
  };

  return (
    <div className='App'>
      <video autoPlay loop muted playsInline className='background-video'>
        <source src={backgroundVideo} type='video/mp4' />
      </video>
      <div className='link-container'>
        <div className='header'>
          <div className='avatar-wrapper'>
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, -0.3, 2]} fov={40} />
              <Suspense fallback={null}>
                <Avatar />
                <Environment preset='studio' />
              </Suspense>
              <ambientLight intensity={0.02} />
              <pointLight position={[0, 0, 0]} />
              <OrbitControls
                enableRotate={false}
                enablePan={false}
                enableZoom={false}
              />
            </Canvas>
          </div>
          <h1 className='username'>Robert Saban</h1>
          <p className='skills'>| Frontend Dev | React/JS & CSS |</p>
        </div>
        {links.map((link, index) => (
          <LinkButton key={index} url={link.url} Icon={link.Icon} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
