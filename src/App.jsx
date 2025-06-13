// import './App.css'
import AboutMe from "./components/AboutMe.jsx";
import { Routes, Route } from 'react-router-dom';
import CareerPortfolio from "./components/CareerPortfolio.jsx";

function App() {
    return (
        <Routes>
            {/* 기본 경로(/)일 때 AboutMe 컴포넌트를 보여줍니다. */}
            <Route path="/" element={<AboutMe />} />

            {/* /projects 경로일 때 CareerPortfolio 컴포넌트를 보여줍니다. */}
            <Route path="/projects" element={<CareerPortfolio />} />
        </Routes>
    )
}

export default App
