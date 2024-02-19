import Card from 'react-bootstrap/Card';

function Box() {
  return (
    <Card
      text="white"
      style={{ width: '18rem', height: '13rem', backgroundColor: '#0A233F',alignItems: 'center' }}
      className=""
    >
      <Card.Header style={{fontSize:"1.5rem"}}>Number Of Category</Card.Header>
      <Card.Body>
        <Card.Title style={{fontSize:'5rem'}}>5</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default Box;
