import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useUserContext } from "../UserContext/userContext";
import { Table } from "react-bootstrap";
import axios from "axios";

export default function PayPal({cant, fechaDesde, fechaHasta, idHab, precioNoche, descripcion}) {
    const {aloj, userId, setearCompraId} = useUserContext();
 const [show, setShow] = useState(false);
 const [success, setSuccess] = useState(false);
 const [ErrorMessage, setErrorMessage] = useState("");
 const [orderID, setOrderID] = useState(false);
 const [compraID, setCompraID] = useState('');
 const [botonType, setBotonType] = useState('solopagar');


 const Boton = () => {
    
  return(
  <div class="bod">
    <form class="form4" >
  <button class = "log-in" onClick={finalReserva}>Confirmar Reserva</button>
  </form>
  </div> )
 }

 const finalReserva = async (e) => {
  e.preventDefault();

var reserva = {

  idHu: userId,
  idHab: idHab,
  cantDias: cant,
  descuento: 0,
  idPaypal: compraID,
  ffin: fechaHasta,
  finicio: fechaDesde
} ;

      

console.log(reserva+ "SOY RESERVA")    
  axios.post(`http://localhost:8080/reserva/alta` , reserva
  
    )
              
              .then(res => {
                alert("Se realizo la reserva correctamente")
                })
                .catch(error => {
                  alert("ERROR: "+error.response.data.mensaje);
                });
             
                setBotonType("habitacion")      
  }

 // creates a paypal order
 const createOrder = (data, actions) => {
   return actions.order
     .create({
       purchase_units: [
         {
           description: aloj[0].aloj.nombre + "Huesped: " + userId,
           amount: {
             currency_code: "USD",
             value: precioNoche * cant,
           },
         },
       ],
       // not needed if a shipping address is actually needed
       application_context: {
         shipping_preference: "NO_SHIPPING",
       },
     })
     .then((orderID) => {
       setOrderID(orderID);
       return orderID;
     });
 };

 console.log(compraID)
 // check Approval
 const onApprove = (data, actions) => {
   return actions.order.capture().then(function (details) {
    setCompraID(details.id)
    setearCompraId(details.div)
     const { payer } = details;
     console.log(payer);
     setSuccess(true);
     setBotonType('reservar')
   });
 };
 //capture likely error
 const onError = (data, actions) => {
   setErrorMessage("An Error occured with your payment ");
 };

 return (
  botonType === 'solopagar' ?  
  ( <PayPalScriptProvider
     options={{
       "client-id":"test",
     }}
   >
    
    <div className="form21" >
     <div>
       <div className="wrapper">
         <div className="product-img">
         </div>
         <div className="product-info">
           <div className="product-text">
             <h3>Resumen de la Reserva</h3>
             
             <Table striped bordered hover variant="light" style={{ padding: 10 }}>

             {console.log("ALOJ EN PAYPAL: " + aloj)}
<thead>
  <tr>
    <th>Alojamiento</th>
    <th>Cantidad de Noches</th>
    <th>Habitacion</th>
    <th>Precio p/noche (US$)</th>
    <th>Precio Final (US$) </th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>{aloj[0].aloj.nombre}</td>
    <td>{cant}</td>
    <td>{descripcion}</td>
    <td>{parseInt(precioNoche)}</td>
    <td>{parseInt(precioNoche) * cant}</td>
    </tr>
    </tbody>

</Table>
           </div>
 
           <div className="product-price-btn">
           
             <button type="submit" class="log-in" onClick={() => setShow(true)}>
               Pagar
             </button>
           </div>
         </div>
       </div>
 
       {show ? (
         <PayPalButtons
           style={{ layout: "vertical" }}
           createOrder={createOrder}
           onApprove={onApprove}
         />
       ) : null}
     </div>
     </div>
   </PayPalScriptProvider> )
   : <Boton />
 )
}