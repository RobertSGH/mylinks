import './App.css';
import backgroundVideo from './media/dream_ihkcj223z6d.mp4';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  PerspectiveCamera,
  OrbitControls,
  Environment,
} from '@react-three/drei';
import {
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaGlobe,
  FaLinkedin,
} from 'react-icons/fa';
import { React, Suspense, useRef } from 'react';
import firebaseConfig from './fire';
import { initializeApp } from 'firebase/app';

export const app = initializeApp(firebaseConfig);

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
    { url: 'https://www.linkedin.com/in/robertsaban/', Icon: FaLinkedin },
    { url: 'https://twitter.com/RobertJSSX/', Icon: FaTwitter },
    { url: 'https://github.com/RobertSGH/', Icon: FaGithub },
    { url: 'https://www.instagram.com/robwebdev/', Icon: FaInstagram },
  ];

  const Avatar = () => {
    const gltf = useGLTF('/avatest.glb');

    const mesh = useRef(null);
    useFrame(({ clock }) => {
      if (mesh.current) {
        const rotationValue = Math.sin(clock.getElapsedTime()) * 0.1;
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
          <h2 className='skills'>| Frontend Dev | React | JS & CSS |</h2>
          <p className='description'>
            I'm a Frontend Developer with experience in building modern and
            responsive websites using JS/React & CSS.
          </p>
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
