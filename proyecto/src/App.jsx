import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Componentes/Login/Login';
import Main from './Componentes/Main/Main';
import NavBarInvitado from './Componentes/Navbar/NavbarInvitado';
import Registro from './Componentes/Registro/Registro';
import 'bootstrap/dist/css/bootstrap.min.css';
import Forgot from './Componentes/Forgot/Forgot';
import Forgot2 from './Componentes/Forgot/Forgot2';
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
import ListadoHuesped from './Componentes/UserList/ListadoHuesped';
import MainAnfitrion from './Componentes/Main/MainAnfitrion';
import ListadoAlojamientosAnf from './Componentes/UserList/ListadoAlojamientosAnf';
import AgregarHabitacion from './Componentes/Alojamiento/AgregarHabitacion';
import ListadoReseñas from './Componentes/UserList/ListadoReseñas';
import ModificarAlojamiento from './Componentes/Modificar/ModificarAlojamiento';
import ListadoAlojamientosPorHuesped from './Componentes/UserList/ListadoAlojamientosPorHuesped';
import MainHuesped from './Componentes/Main/MainHuesped';
import AgregarAlojamiento from './Componentes/Alojamiento/AgregarAlojamiento';
import AltaHabitacionAlojamiento from './Componentes/Alojamiento/AltaHabitacionAlojamiento';


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
            <Route
            path = "/mainAnfitrion" element = { <MainAnfitrion /> }  
        />

<Route
            path = "/savePassword" element = { <Forgot2 /> }  
        />

<Route
            path = "/listarHuesped" element = { <ListadoHuesped /> }  
        />
        
<Route
            path = "/listadoAlojamientos" element = { <ListadoAlojamientosAnf /> }  
        />

<Route
            path = "/agregarHabitacion" element = { <AgregarHabitacion /> }  
        />
        <Route
            path = "/listadoReseñas" element = { <ListadoReseñas /> }  
        />
         <Route
            path = "/modificarAlojamiento" element = { <ModificarAlojamiento /> }  
        />
            <Route
            path = "/perfil" element = { <UserProfile /> }  
        />
           <Route
            path = "/mainHuesped" element = { <MainHuesped /> }  
        />
           <Route
            path = "/ListadoAlojamientosPorHuesped" element = { <ListadoAlojamientosPorHuesped /> }  
        />

<Route
            path = "/AgregarAlojamiento" element = { <AgregarAlojamiento /> }  
        />
     
     <Route
            path = "/AltaHabitacionAlojamiento" element = { <AltaHabitacionAlojamiento /> }  
        />
     </Routes>
     </div>
     </UserContextProvider>
    </BrowserRouter>
  );
}

export default App
