import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Componentes/Login/Login';
import Main from './Componentes/Main/Main';
import NavBar from './Componentes/Navbar/Navbar';
import Registro from './Componentes/Registro/Registro';
import 'bootstrap/dist/css/bootstrap.min.css';
import Forgot from './Componentes/Forgot/Forgot';
import UserList from './Componentes/UserList/UserList';
import FormHuesped from './Componentes/FormHuesped/FormHuesped';
import FormAnfitrion from './Componentes/FormAnfitrion/FormAnfitrion';
import FormAdmin from './Componentes/FormAdmin/FormAdmin';
import AltaAlojamiento from './Componentes/Alojamiento/AltaAlojamiento';
import UserProfile from './Componentes/UserProfile/UserProfile';
import ItemListContainer from './Componentes/ItemListContainer/ItemListContainer';
import Search from './Componentes/Search/Search';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <NavBar/>
     <Routes>
     <Route
            path = "/" element = { <Main /> }  
        />
         <Route
            path = "/userList" element = { <UserList /> }  
        />
           <Route
            path = "/forgot" element = { <Forgot /> }  
        />
        <Route
            path = "/login" element = { <Login /> }  
        />
        <Route
            path = "/registro" element = { <Registro /> }  
        />
          <Route
            path = "/anfitrion" element = { <FormAnfitrion /> }  
        />
            <Route
            path = "/huesped" element = { <FormHuesped /> }  
        />

            <Route
            path = "/admin" element = { <FormAdmin /> }  
        />
     <Route
            path = "/profile" element = { <UserProfile /> }  
        />

        <Route
            path = "/altaAlojamiento" element = { <AltaAlojamiento /> }  
        />
     <Route
            path = "/listarAlojamientos" element = { <Search /> }  
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
