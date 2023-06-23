import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Html, useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center className="loader">
      <div className="loader-circle"></div>
    </Html>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Canvas shadows>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </Canvas>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
