
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';
import NavBarAnfitrion from '../Navbar/NavBarAnfitrion';


export default function ReservasHu() {

    const [reservas, setReservas] = useState([]);
    const { userId } = useUserContext();
    const [botonType, setBotonType] = useState('sinActualizar');
    const [idReserva, setIdReserva] = useState('');
  


    useEffect(() => {
console.log(userId + "user")
        axios.post("http://localhost:8080/reserva/reservasXHuespXEstado/", {
          "idHu": userId,
          "resEstado": [
            "PENDIENTE"
          ]
        })
            .then(res => {
                const rese = res.data;
                setReservas(rese);
                
console.log(res.data + "data")
         
            })

     
    }, [])


    
    const Cancelar = (id) => {
/*
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
        'Authorization': 'Bearer <A21AAL35zV5o8eBE4iWiXKD0CKHPy9901VuKqvX8QaXD6vlbHdsggSuppy6acAu8S4AOkoJC3OoABnfBhIzFXxVI4p-zRjNVA>',
        "PayPal-Request-Id": "123e4567-e89b-12d3-a456-426655440020" 
      }
  })
*/
        axios.post("http://localhost:8080/reserva/cancelarReservaAprobada/" + id)
                
        .then(res => {
     
         
          console.log(res.data);
          
          setBotonType("actualizado")
          alert("Reserva Cancelada")
          
        })

     }
 
 

    return (

        botonType === "sinActualizar" ?

    
            <>

{console.log(botonType+"SOY BOTONTYPE")}
                <NavBarAnfitrion />

                    <Table striped bordered hover variant="light" style={{ padding: 10 }}>

                        <thead>
                            <tr>
                                <th>Alojamiento</th>
                                <th>Habitacion</th>
                                <th>Fecha Inicio</th>
                                <th>Fecha Fin</th>
                                <th>Cancelar</th>

                            </tr>
                        </thead>
                        {reservas.map(reservas => <tbody key={reservas.res_id} >
                            <tr>

                                <td>{reservas.aloj_nombre}</td>
                                <td>{reservas.hab_descripcion}</td>
                                <td>{reservas.res_fechaInicio}</td>
                                <td>{reservas.res_fechaFin}</td>
                                {reservas.res_estado === "PENDIENTE" ?   
                                <td><Button variant="danger" onClick={() => Cancelar(reservas.res_id)}>Cancelar</Button></td> : <td>CANCELADA</td>
                                 }
            
                            </tr>

                        </tbody>)}
                    </Table>

                

            </>
          : <ReservasHu />
            
    )
}
