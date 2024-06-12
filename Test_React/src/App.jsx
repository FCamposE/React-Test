/*import React from 'react';
import UserController from './controllers/UserController';
import UserView from './views/UserView';
import './App.css';

const App = () => {
  const userController = new UserController();
  const user = userController.getUser();

  return (
    <div className="App">
      <UserView user={user} />
    </div>
  );
};

export default App;*/

import React from 'react';
import AppRoutes from './routes';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

export default App;


/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App*/
