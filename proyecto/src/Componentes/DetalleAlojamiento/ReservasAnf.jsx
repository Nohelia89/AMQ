
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';
import NavBarAnfitrion from '../Navbar/NavBarAnfitrion';


export default function ReservasAnf() {

    const [reservas, setReservas] = useState([]);
    const { userId } = useUserContext();
    const [botonType, setBotonType] = useState('sinActualizar');
    const [idReserva, setIdReserva] = useState('');
  


    useEffect(() => {
console.log(userId + "user")
        axios.get("http://localhost:8080/reserva/listarReservasPendientesYAprobadas/" + userId)
            .then(res => {
                const rese = res.data;
                setReservas(rese);
                
console.log(res.data + "data")
         
            })

     
    }, [])




    const Aceptar = (id) => {

                axios.post("http://localhost:8080/reserva/confirmar/" + id)
                
                .then(res => {
             
                 
                  console.log(res.data);
                  
                  setBotonType("actualizado")
                  alert("Reserva Confirmada")
                })
    }


    
    const Cancelar = (id) => {
        axios.post("http://localhost:8080/reserva/cancelarReservaAprobada/" + id)
                
        .then(res => {
     
         
          console.log(res.data);
          
          setBotonType("actualizado")
          alert("Reserva Cancelada")
          
        })

     }
 
 

    const Rechazar = (id) => {

        const onRefund = (data, actions) => {
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
          
          };
          
        axios.get("http://localhost:8080/reserva/cancelarReservaPendiente/" + id)
                
        .then(res => {
     
         
          console.log(res.data);
          
          setBotonType("actualizado")
          alert("Reserva Rechazada")
          
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
                                <th>Aceptar/Rechazar</th>
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
                                <td><Button variant="success" onClick={() => Aceptar(reservas.res_id)}>Aceptar</Button></td> :  
                                 (reservas.res_estado === "APROBADO" ? <td><Button variant="danger" onClick={() => Rechazar(reservas.res_id)}>Rechazar</Button></td> : <td>{reservas.res_estado}</td> )
                                 }
                               {reservas.res_estado === "PENDIENTE" ?   
                                <td><Button variant="danger" onClick={() => Cancelar(reservas.res_id)}>Cancelar</Button></td> :  <td>Cancelada</td> }

                            </tr>

                        </tbody>)}
                    </Table>

                

            </>
          : <ReservasAnf />
            
    )
}
