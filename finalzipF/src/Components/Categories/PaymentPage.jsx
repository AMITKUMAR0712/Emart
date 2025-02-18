import React, { useState } from "react";
import styled from "styled-components";
 import QRCode from "qrcode.react";
import toast, { Toaster } from "react-hot-toast";
import Payimage from "../Categories/Payimage.jpg"; // Add an appropriate image

const MainScreen = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #dfdbe5;
  background-image: url("https://wallpaperaccess.com/full/3063067.png");
  color: #963e7b;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 60rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 4px 3px 20px rgba(53, 53, 53, 0.55);
  display: flex;
  flex-direction: row;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  transform-style: preserve-3d;

  &:hover {
    transform: scale(1.05);
    box-shadow: 6px 6px 25px rgba(53, 53, 53, 0.7);
  }
`;

const LeftSide = styled.div`
  background: rgb(247, 244, 244);
  width: 25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
`;

const PaymentImage = styled.img`
  width: 360px;
  height: 360px;
  border-radius: 50%;
  object-fit: cover;
`;

const RightSide = styled.div`
  background-color: #ffffff;
  width: 35rem;
  border-bottom-right-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  padding: 1rem 2rem 3rem 3rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-bottom: 1.5px solid #ccc;
  margin-bottom: 1rem;
  border-radius: 0.3rem;
  font-size: 1.1rem;
  font-weight: 500;
  outline: none;
  transition: all 0.3s ease-in-out;
  &:focus {
    border-bottom: 1.5px solid #753370;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #753370 0%, #298096 100%);
  padding: 15px;
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 400;
  font-size: 1.2rem;
  margin-top: 10px;
  width: 100%;
  letter-spacing: 0.11rem;
  outline: none;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05) translateY(-3px);
    box-shadow: 3px 3px 6px rgba(56, 55, 55, 0.52);
  }
`;

const QRCodeContainer = styled.div`
  margin-top: 20px;
`;

const PaymentPage = () => {
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState(null);

  const generateQRCode = () => {
    if (!amount || !upiId) {
      toast.error("Please enter UPI ID and amount");
      return;
    }
    const upiUrl = `upi://pay?pa=${upiId}&pn=Merchant&mc=&tid=&tr=&tn=Payment&am=${amount}&cu=INR`;
    setQrCodeValue(upiUrl);
  };

  return (
    <MainScreen>
      <Card>
        <LeftSide>
          <PaymentImage src={Payimage} alt="Payimage" />
        </LeftSide>
        <RightSide>
          <h2>UPI Payment</h2>
          <Input
            type="text"
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button onClick={generateQRCode}>Generate QR Code</Button>
          {qrCodeValue && (
            <QRCodeContainer>
              <QRCode value={qrCodeValue} size={200} />
            </QRCodeContainer>
          )}
          <Toaster position="top-right" />
        </RightSide>
      </Card>
    </MainScreen>
  );
};

export default PaymentPage;
