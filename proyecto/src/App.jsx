import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Componentes/Login/Login';
import Main from './Componentes/Main/Main';
import NavBarInvitado from './Componentes/Navbar/NavbarInvitado';
import Registro from './Componentes/Registro/Registro';
import 'bootstrap/dist/css/bootstrap.min.css';
import Forgot from './Componentes/Forgot/Forgot';
import UserList from './Componentes/UserList/UserList';
import FormHuesped from './Componentes/FormHuesped/FormHuesped';
import FormAnfitrion from './Componentes/FormAnfitrion/FormAnfitrion';
import FormAdmin from './Componentes/FormAdmin/FormAdmin';
import AltaAlojamiento from './Componentes/Alojamiento/AltaAlojamiento';
import UserProfile from './Componentes/UserProfile/UserProfile';

import Search from './Componentes/Search/Search';
import UserContextProvider from './Componentes/UserContext/userContext';
import DetalleAlojamiento from './Componentes/DetalleAlojamiento/DetalleAlojamiento';
import ListadoAnfitrion from './Componentes/UserList/ListadoAnfitrion';

import MainAdministrador from './Componentes/Main/MainAdministrador';
import Item from './Componentes/Item/Item';


function App() {
  return (
    <BrowserRouter>
     <UserContextProvider>
    <div className="App">
 
     <Routes>
     <Route
            path = "/" element = { <Main /> }  
        />
           <Route
            path = "/item" element = { <Item /> }  
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
            path = "/listadoAnfitrion" element = { <ListadoAnfitrion /> }  
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
         <Route
            path = "/detalleAlojamiento" element = { <DetalleAlojamiento /> }  
        />
            <Route
            path = "/mainAdministrador" element = { <MainAdministrador /> }  
        />


     </Routes>
     </div>
     </UserContextProvider>
    </BrowserRouter>
  );
}

export default App
