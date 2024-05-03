import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "../node_modules/react-tooltip/dist/react-tooltip.css";
import { ThemeProvider } from './Theme';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
