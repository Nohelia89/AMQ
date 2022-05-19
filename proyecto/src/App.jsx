import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Componentes/Login/Login';
import Main from './Componentes/Main/Main';
import Nabvar from './Componentes/Navbar/Navbar';
import Registro from './Componentes/Registro/Registro';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Nabvar/>
     <Routes>
     <Route
            path = "/" element = { <Main /> }  
        />
        <Route
            path = "/login" element = { <Login /> }  
        />
        <Route
            path = "/registro" element = { <Registro /> }  
        />
        
        <Route
            path = "/*" element = { <Navigate to = '/' /> }  
        />

     </Routes>
     </div>
    </BrowserRouter>
  );
}

export default App;
