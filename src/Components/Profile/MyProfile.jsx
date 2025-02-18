import React from "react";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import styled from "styled-components"; // Import styled-components

const StyledContainer = styled(Container)`
  margin-top: 60px;
`;

const StyledCard = styled(Card)`
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledCardHeader = styled(Card.Header)`
  background-color: #007bff;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const StyledCardBody = styled(Card.Body)`
  padding: 20px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const StyledListGroupItem = styled(ListGroup.Item)`
  padding: 15px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f8ff;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .col-md-6,
  .col-md-3 {
    text-align: left;
    font-size: 0.9rem;
    color: #555;
  }

  .col-md-3 {
    font-weight: bold;
  }
`;

const ProfilePage = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St, Springfield, USA",
    orders: [
      { id: 1, date: "2025-01-01", total: "$100.00" },
      { id: 2, date: "2025-02-01", total: "$150.00" },
    ],
  };

  return (
    <StyledContainer>
      <Row>
        <Col md={4}>
          <StyledCard>
            <StyledCardHeader>Profile Information</StyledCardHeader>
            <StyledCardBody>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {user.email}
              </Card.Text>
              <Card.Text>
                <strong>Address:</strong> {user.address}
              </Card.Text>
              <StyledButton variant="primary">Edit Profile</StyledButton>
            </StyledCardBody>
          </StyledCard>
        </Col>
        <Col md={8}>
          <StyledCard>
            <StyledCardHeader>Order History</StyledCardHeader>
            <ListGroup variant="flush">
              {user.orders.map((order) => (
                <StyledListGroupItem key={order.id}>
                  <Row>
                    <Col md={6}>
                      <strong>Order ID:</strong> {order.id}
                    </Col>
                    <Col md={3}>
                      <strong>Date:</strong> {order.date}
                    </Col>
                    <Col md={3}>
                      <strong>Total:</strong> {order.total}
                    </Col>
                  </Row>
                </StyledListGroupItem>
              ))}
            </ListGroup>
          </StyledCard>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default ProfilePage;
