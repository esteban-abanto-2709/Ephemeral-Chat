import { useState } from 'react'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-indigo-400 text-center p-10">
      <div className="flex justify-center gap-8 mb-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="h-16 hover:scale-110 transition" alt="Vite logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">Vite + React + Tailwind</h1>
      <div className="bg-white p-6 rounded-xl shadow-lg inline-block">
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-600">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default App
