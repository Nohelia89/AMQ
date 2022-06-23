import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useUserContext } from "../UserContext/userContext";
import { Table } from "react-bootstrap";
import axios from "axios";
import {Buffer} from 'buffer';

export default function PayPal({cant, fechaDesde, fechaHasta, idHab, precioNoche, descripcion}) {
    const {aloj, userId} = useUserContext();
 const [show, setShow] = useState(false);
 const [success, setSuccess] = useState(false);
 const [ErrorMessage, setErrorMessage] = useState("");
 const [orderID, setOrderID] = useState(false);
 const [compraID, setCompraID] = useState('');
 const [auth, setAuth] = useState();
 const [botonType, setBotonType] = useState('solopagar');

 const Boton = () => {
    
  return(
  <div class="bod">
    <form class="form4" >
  <button class = "log-in" onClick={FinalReserva}>Confirmar Reserva</button>
  </form>
  </div> )
 }

 const FinalReserva = async (e) => {
e.preventDefault();

var reserva = {

  idHu: userId,
  idHab: idHab,
  cantDias: cant,
  descuento: 0,
  idPaypal: auth,
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
  /*           
    axios.post("https://api-m.sandbox.paypal.com/v2/payments/authorizations/"+auth+"/capture", {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer A21AAKTtXghoyV325RmsGznbMbVNPQTLcw6XZVlCwqBqv2DUi7CjhmHrcBc6rW1yD5yAhJued1OftZkOLyleHWnELalyTin1g'

        }
        
       })
       .then(response => {
        console.log("captura exitosa");
     })
 */
    
  }

/*const onRefund = (data, actions) => {
  axios.post("https://api-m.sandbox.paypal.com/v2/payments/captures/7JL19132VC198042F/refund", {
    "amount": {
      "value": "10.99",
      "currency_code": "USD"
    },
    "invoice_id": "INVOICE-123",
    "note_to_payer": "Defective product"
  }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic <ASu47G1hfMPmgXVkUg_rJPqszc9fVr6k37EzdzW4H7pviHpb6DE71Slpqtxx3hH91aM8r_5YUTd3-J1W>:<ECwSAIslaCPkTqSTXiL6hAcCbiX5kDQBBC6c6xL2kdpOU40uLLcRmgJFDyYLTRx7RJp3llm708B2SWT7>`,
        "PayPal-Request-Id": "123e4567-e89b-12d3-a456-426655440020" 
      }
  })
*/
//};

function onApprove (data, actions) {
 
  // Authorize the transaction

  actions.order.authorize().then(function(authorization) {

    // Get the authorization id

    var authorizationID = authorization.purchase_units[0].payments.authorizations[0].id
    setAuth(authorizationID)
    console.log(authorizationID)
    alert('You have authorized this transaction. Order ID:  ' + data.orderID + ', Authorization ID: ' + authorizationID); // Optional message given to purchaser
    setBotonType("habitacion")  

  });
console.log("fuera "+auth)
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
          }
        },
      ],
      intent: "AUTHORIZE",
      // not needed if a shipping address is actually needed
      application_context: {
        shipping_preference: "NO_SHIPPING",
      }
    })
    .then((orderID) => {
      setOrderID(orderID);
      return orderID;
    });
};

const initialOptions = {
  "client-id": "AaDJ6_EQjWrVxLQBV78NuolnYrHG8MQYOoNmbLkP-NB6g1UWGyH8JvPh0btTUliGIqxVbo9vZd_SqqWK",
  currency: "USD",
  intent: "authorize"
};
 return (

  botonType === 'solopagar' ?  
  (  
  <PayPalScriptProvider options={initialOptions}>
    
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