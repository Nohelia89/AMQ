
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';
import NavBarAnfitrion from '../Navbar/NavBarAnfitrion';


export default function ReservasHu() {

    const [reservas, setReservas] = useState([]);
    const { userId, userToken } = useUserContext();
    const [botonType, setBotonType] = useState('sinActualizar');
    const [idReserva, setIdReserva] = useState('');
  


    useEffect(() => {
console.log(userId + "user")
        axios.post("http://localhost:8080/reserva/reservasXHuespXEstado/", {
          "idHu": userId,
          "resEstado": [
            "APROBADO"
          ]
        },{
          headers: {
            'Authorization': `token ${userToken}`
          }
        })
            .then(res => {
              console.log(res.data)
                const rese = res.data;
                setReservas(rese);
                

         
            })
            .catch(error => {
              alert("ERROR: " + error.response.data.mensaje); 
            });
     
    }, [])


    
    const Cancelar = (idRes, idPayPal) => {
      var factura = {
        id: idRes,
        estado: "CANCELADO",
        monto: 0,
        fecha: {
          dia: 0,
          mes: 0,
          anio: 0
        },
        descuento: false,
        montoDescuento: 0,
        idPaypal: idPayPal
    };

      axios.post("https://api-m.sandbox.paypal.com/v2/payments/captures/"+idPayPal+"/refund", {
        amount: {
        value: "10",
        currency_code: "USD"
      },
      note_to_payer: "MULTA POR CANCELAR RESERVA APROBADA"
    }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer A21AAJlLHvZt3hrqp5TF4FYXEbnisc6IZBhAiQli-4-fFJRe7xKSz1qV2nhZ5us1AxH_1qqRHqeDxMIGWEPmY0Mw1USTIAIjg'

        }
      }).then(response => {
      
        axios.post("http://localhost:8080/reserva/cancelarReservaAprobada/" + idRes, {factura},{
          headers: {
            'Authorization': `token ${userToken}`
          }
        })
        
                
        .then(res => {
     
         
       
          
          setBotonType("actualizado")
          alert("Reserva Cancelada con una multa por haber cancelado una reserva aprobada. La multa equivale al 50% de lo abonado por la reserva")
          
        })

      })
      .catch(error => {
        alert("ERROR: " + error.response.data.mensaje); 
      });

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
                                {reservas.res_estado === "APROBADO" ?   
                                <td><Button variant="danger" onClick={() => Cancelar(reservas.res_id,reservas.facturas[0].idPaypal )}>Cancelar</Button></td> : <td>CANCELADA</td>
                                 }
            
                            </tr>

                        </tbody>)}
                    </Table>

                

            </>
          : <ReservasHu />
            
    )
}
