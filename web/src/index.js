import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.less';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const root = createRoot(document.getElementById('root'));
root.render(<App tab="home" />);

registerServiceWorker();
