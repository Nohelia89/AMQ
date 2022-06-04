import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { Link } from "react-router-dom";



function Item({ aloj }) {


 
  return (

    <div>
     
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title>{aloj.aloj_nombre}</Card.Title>
          <Card.Text>

          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>  {aloj.aloj_pais}</ListGroupItem>

        </ListGroup>
       
       
          <Card.Body>

            <Button variant="dark" >Reservar</Button>

          </Card.Body>

      </Card>

    </div>

  )

}
export default Item;
