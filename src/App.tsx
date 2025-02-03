import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex justify-center space-x-6 mt-10">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="w-24 h-24" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="w-24 h-24" alt="React logo" />
        </a>
      </div>
      
      <h1 className="text-4xl text-center mt-6">Vite + React</h1>

      <div className="mt-6 text-center">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code className="font-mono text-sm bg-black-200 p-1 rounded">src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App
