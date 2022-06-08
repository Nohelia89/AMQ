import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap"




function Item({ aloj }) {


 
  return (

    <div>
     
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title>Nombre:{aloj.nombre}</Card.Title>
          <Card.Text>

          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem> Pais: {aloj.direcion.pais.nombre}</ListGroupItem>

        </ListGroup>
       
       
          <Card.Body>

            <Button variant="dark" >Reservar</Button>

          </Card.Body>

      </Card>

    </div>

  )

}
export default Item;
