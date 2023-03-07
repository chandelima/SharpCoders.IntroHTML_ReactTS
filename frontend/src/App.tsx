import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sidebar from "./components/sidebar";
import Home from './pages/home/index';
import Calculator from './pages/calculator/index';
import Todo from './pages/todo/index';
import Stopwatch from './pages/stopwatch/stopwatch';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Sidebar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/calculator" element={<Calculator  />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/stopwatch" element={<Stopwatch />} />
          </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App
