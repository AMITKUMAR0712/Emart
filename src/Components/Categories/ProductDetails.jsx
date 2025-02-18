import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const [selectedSupercoin, setSupercoin] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user ? user.id : null;
  const isLoyaltyMember = user ? user.loyalty : false;
  let supercoinBalance = user ? user.supercoin : 0;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8282/api/products/${productId}`);
        if (!response.ok) {
          throw new Error("HTTP error! Status: ${response.status}");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const calculatePriceOptions = () => {
    if (!product) return [];
    let finalPrice = product.price;
    const priceOptions = [{ label: "Original Price", amount: finalPrice}];

    if (isLoyaltyMember) {
      let loyaltyPrice = finalPrice - finalPrice * 0.1;
      priceOptions.push({ label: "Loyalty Member Price", amount: loyaltyPrice });

      if (supercoinBalance * 2 >= loyaltyPrice) {
        priceOptions.push({ label: "SuperCoin Payment (0 Balance)", amount: 0 });
        let newsupercoin = supercoinBalance * 0.5;
      }
      
      let newsupercoin = loyaltyPrice*0.3;
      console.log(newsupercoin);
      let price = loyaltyPrice - newsupercoin;
      priceOptions.push({ label: "Loyalty Price + SuperCoins", amount:price });
    } else {
      if (supercoinBalance * 2 >= finalPrice) {
        priceOptions.push({ label: "SuperCoin Payment (0 Balance)", amount: 0});
      }
      
      let newsupercoin = finalPrice*0.3;
      let price = finalPrice - newsupercoin;
      priceOptions.push({ label: "Loyalty Price + SuperCoins", amount: price });
    }

    return priceOptions;
  };

  const handleBuyNow = () => {
    // Redirect to the payment details page
    navigate('/payment');
  };


  const handleAddToCart = async () => {
    if (!userId) {
        console.log("User not logged in");
        navigate("/login"); 
        return;
    }
  
    if (product) {
        
        let usedSuperCoins = 0;
        let finalPrice = selectedPrice !== null ? selectedPrice : product.price;
  
        if (selectedPrice === 0) {
            
            usedSuperCoins = finalPrice * 2;
        } else if (selectedPrice < product.price) {
            
            if(isLoyaltyMember){
              let loyaltyPrice = product.price - (product.price * 0.1);
              usedSuperCoins = (loyaltyPrice*0.3) ;
              console.log(usedSuperCoins);
            }
            else{
              usedSuperCoins = (finalPrice*0.3) ;
            }
            
        }
        console.log(usedSuperCoins);
        
        const cartData = {
            user: { id: userId },
            product: { id: product.id },
            quantity: 1,
            finalPrice: finalPrice, 
            usedSuperCoins: usedSuperCoins
        };
  
        
        console.log("🛒 Cart Data Sent to API:", JSON.stringify(cartData, null, 2));


        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        cart.push(cartData);
        sessionStorage.setItem("cart", JSON.stringify(cart));
  
        try {
            const response = await fetch("http://localhost:8282/api/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cartData),
            });
  
            if (response.ok) {
                console.log(" Product added to cart!");
  
                
                window.dispatchEvent(new Event("cartUpdated"));
  
                navigate("/cart");
            } else {
                const errorData = await response.text();
                console.error(" Error adding product:", errorData);
                alert(errorData);
            }
        } catch (error) {
            console.error(" Network error:", error);
        }
    }
  };

  const handlePriceSelection = (amount) => {
    setSelectedPrice(amount);
  };


  
  return (
    <div className="container mt-5">
      {isLoading ? (
        <p className="text-center text-muted">Loading product details...</p>
      ) : product ? (
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card shadow-lg border rounded p-3">
              <div className="border p-3 rounded bg-light">
                <img
                  src={product.image|| "https://via.placeholder.com/400"}
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-4 shadow-lg border rounded">
              <h2 className="fw-bold">{product.productname}</h2>
              <p className="text-muted">{product.description}</p>

              <h4 className="fw-bold">Available Pricing Options:</h4>
              <ul className="list-group mb-3">
                {calculatePriceOptions().map((option, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      {option.label !== "Original Price" && (
                        <input
                          type="radio"
                          name="priceOption"
                          checked={selectedPrice === option.amount}
                          onChange={() => handlePriceSelection(option.amount)}
                          // onChange={() => handleSuperSelection(option.supercoin)}
                          className="me-2"
                        />
                      )}
                      {option.label}
                    </div>
                    <strong>
                      {option.label === "Original Price" ? (
                        <del>₹{option.amount.toLocaleString()}</del>
                      ) : (
                        `₹${option.amount.toLocaleString()}`
                      )}
                    </strong>
                  </li>
                ))}
              </ul>

              {selectedPrice !== null && selectedPrice !== product.price && (
                <div className="alert alert-success text-center">
                  🎉 You saved ₹{(product.price - selectedPrice).toLocaleString()}!
                </div>
              )}

              <div className="d-flex gap-3 mt-3">
                <button className="btn btn-success btn-lg w-50"  onClick={handleBuyNow}>Buy Now</button>
                <button className="btn btn-warning btn-lg w-50" onClick={handleAddToCart}>
                  {userId ? "Add to Cart" : "Login to Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-muted">Product not found</p>
      )}
    </div>
  );
};

export default ProductDetails;



// =============================================================================



