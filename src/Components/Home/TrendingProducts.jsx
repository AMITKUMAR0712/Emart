import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user ? user.id : null;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const response = await fetch("http://localhost:8282/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Products fetched successfully:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    console.log(`Navigating to product details page for product ID: ${productId}`);
    navigate(`/product/${productId}`);
  };

  const addToCart = async (product, event) => {
    event.stopPropagation();
    console.log(`Attempting to add product ID ${product.id} to cart for user ID ${userId}`);
    if (!userId) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }
    const cartData = {
      user: { id: userId },
      product: { id: product.id },
      quantity: 1,
    };
    try {
      const response = await fetch("http://localhost:8282/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartData),
      });
      if (response.ok) {
        console.log(`${product.productname} added to cart successfully.`);
        alert(`${product.productname} added to cart!`);
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        console.error("Failed to add item to cart. Response status:", response.status);
      }
    } catch (error) {
      console.error("Network error while adding to cart:", error);
    }
  };

  return (
    <Container className="py-4">
      <h3 className="text-center mb-4">Trending Products</h3>
      {isLoading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <Row>
          {products.length > 0 ? (
            products.map((product) => (
              <Col key={product.id} md={3} sm={6} xs={12} className="mb-3">
                <ProductCard onClick={() => handleProductClick(product.id)}>
                  <ImageContainer>
                    <ProductImage
                      src={product.image || "https://via.placeholder.com/150"}      //changed imge here by komal
                      alt={product.productname}
                    />
                  </ImageContainer>
                  <Card.Body>
                    <Card.Title>{product.productname}</Card.Title>
                    <PriceRow>
                      <span>₹{product.price.toLocaleString()}</span>
                      <CustomButton onClick={(e) => addToCart(product, e)}>
                        Add to Cart
                      </CustomButton>
                    </PriceRow>
                  </Card.Body>
                </ProductCard>
              </Col>
            ))
          ) : (
            <p className="text-center">No products available.</p>
          )}
        </Row>
      )}
    </Container>
  );
};

const ProductCard = styled(Card)`
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  background: white;
  padding: 15px;
  border: 2px solid #ddd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.5s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
    border-color: #007bff;
  }
`;

const ImageContainer = styled.div`
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 10px;
  border: 1px solid #ddd;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// const ProductImage = styled.img`
//   max-height: 100%;
//   width: auto;
//   object-fit: contain;
//   transition: transform 0.3s ease-in-out;
//   &:hover {
//     transform: scale(1.1);
//   }
// `;
//added this by komal
const PriceRow = styled.div`                       
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-weight: bold;
`;
const ProductImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
`;


const CustomButton = styled(Button)`
  border-radius: 20px;
  font-size: 14px;
  transition: 0.3s ease-in-out;
  padding: 10px 20px;
  background: linear-gradient(135deg, #753370 0%, #298096 100%);
  color: white;
  border: 2px solid #007bff;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  &:hover {
    background: linear-gradient(135deg,rgb(110, 46, 105) 0%,rgb(31, 111, 131) 100%);
    box-shadow: 0 0 15px rgba(0, 123, 255, 0.6);
    transform: translateY(-2px);
  }
`;

export default TrendingProducts;