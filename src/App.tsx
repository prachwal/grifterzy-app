import React from 'react';
import Counter from './components/Counter';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Hello World!</h1>
        <p>Welcome to your React 18 application with TypeScript & Redux</p>
      </header>
      <main>
        <p>This is a simple example of a React 18 app bundled with Webpack and TypeScript</p>
        <Counter />
      </main>
    </div>
  );
};

export default App;