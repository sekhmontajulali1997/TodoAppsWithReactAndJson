import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  FormControl,
  FormSelect,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import "./Todos.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { getDataStatus } from "../../Helpers/Helper";

const Todos = () => {
  const [Todos, setTodos] = useState([]);
  const [input, setInput] = useState({
    tittle: "",
    type: "",
  });

  const handleinputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlerAddTodos = async() =>{

    await axios.post("http://localhost:7000/todos", input);
    setInput({
        tittle: "",
        type: "",
      })
    handelGetTodos();

  }

  // get Todos Form json db

  const handelGetTodos = async () => {
    const response = await axios.get("http://localhost:7000/todos");

    setTodos(response.data);
  };


  useEffect(() => {
    handelGetTodos();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col xxl={2}></Col>
          <Col xxl={8}>
            <Card className="mt-5">
              <CardHeader>
                <CardTitle> Todo App</CardTitle>
              </CardHeader>
              <CardBody>
                <InputGroup className="mb-5" >
                  <InputGroupText
                   
                  >
                    <FormControl  name="tittle"
                    value={input.tittle}
                    onChange={handleinputChange} placeholder=" Do Todoos" />
                  </InputGroupText>

                  <FormSelect name='type' onChange={handleinputChange} >
                    <option value={''}>select status</option>
                    <option value={'Complated'}>Complated</option>
                    <option value={'Pending'}>Pending</option>
                    <option value={'Deleted'}>Deleted</option>
                  </FormSelect>

                  <Button onClick={handlerAddTodos} variant="outline-secondary">add</Button>
                </InputGroup>

                <ListGroup as="ul">
                  {Todos?.length > 0 ? (
                    Todos.map((item, index) => {
                      return (
                        <ListGroupItem  style={{
                            backgroundColor: getDataStatus(item.type),
                            color: "white",
                            textAlign: "center",
                          }} className="" as="li" key={index}>
                          {" "}
                          {item.tittle}
                        </ListGroupItem>
                      );
                    })
                  ) : (
                    <ListGroupItem
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      No todos found
                    </ListGroupItem>
                  )}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col xxl={2}></Col>
        </Row>
      </Container>
    </>
  );
};

export default Todos;
