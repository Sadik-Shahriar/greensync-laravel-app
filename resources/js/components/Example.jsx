import React from 'react';
import ReactDOM from 'react-dom/client';

function Example() {
    return (
        <div style={{ padding: '40px', margin: '20px', textAlign: 'center', backgroundColor: '#eef', border: '2px solid #66f', borderRadius: '10px', fontFamily: 'sans-serif' }}>
            <h1>Hello World from React!</h1>
            <p>If you can see this, Cursor AI has correctly configured the files.</p>
        </div>
    );
}

export default Example;

const container = document.getElementById('example');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <Example />
        </React.StrictMode>
    );
}