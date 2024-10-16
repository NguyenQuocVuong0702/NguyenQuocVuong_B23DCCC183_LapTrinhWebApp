import React from 'react';
import './App.css';
import Counter2 from './Counter2'; // Đảm bảo import đúng

function App() {
  return (
    <div className="App">
      <h1>Welcome to my App</h1>
      <Counter2 /> {/* Đảm bảo component Counter2 được sử dụng */}
    </div>
  );
}

export default App;



