import React from "react";
import styled from "styled-components";

const Container = styled.div`
  min-width: 1145px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Mulish', sans-serif;
  background-color: #202035;
  color: #bbb;
`;

const SearchSectionWrapper = styled.div`
  padding: 40px;
  min-width: 700px;
  margin: 0 auto;
  background-color: #1B1B30;
  border-radius: 5px;
  text-align: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 15px 15px 50px;
  border-radius: 5px;
  border: 1px solid #454564;
  background-color: #2a2a42;
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  transition: border-color 250ms;

  &:focus {
    border-color: #fff;
    outline: none;
  }
`;

const MenuWrapper = styled.div`
  width: 280px;
  padding: 30px;
  background-color: #1b1b30;
  border-radius: 10px;
`;

const MenuLink = styled.a`
  display: block;
  padding: 10px 0;
  color: #786cd5;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }
`;

const SupportSection = styled.div`
  margin-top: 25px;
  padding: 20px;
  background-color: #1b1b30;
  border-radius: 5px;
`;

const SupportButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background-color: #786cd5;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #5a4dbd;
  }
`;

const ContentWrapper = styled.div`
  max-width: 735px;
  margin: 10px auto;
  padding: 30px;
  background-color: #1b1b30;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const SearchSection = () => {
  return (
    <SearchSectionWrapper>
      <h1>How can we help?</h1>
      <form>
        <SearchInput type="text" placeholder="Search help articles" />
      </form>
    </SearchSectionWrapper>
  );
};

const Menu = () => {
  return (
    <MenuWrapper>
      <h1>Popular topics</h1>
      <nav>
        {["Account", "Billing", "Privacy", "Refunds", "Verification", "Integrations"].map(
          (item) => (
            <MenuLink key={item} href="#">
              {item}
            </MenuLink>
          )
        )}
      </nav>
      <SupportSection>
        <h2>Contact support</h2>
        <p>24/7 help from our support staff</p>
        <SupportButton href="#">Contact</SupportButton>
      </SupportSection>
    </MenuWrapper>
  );
};

const ContentItem = ({ title, badge, description }) => {
  return (
    <ContentWrapper>
      <h3>
        {title} <span>{badge}</span>
      </h3>
      <p>{description}</p>
    </ContentWrapper>
  );
};

const ContentSection = () => {
  const contentData = [
    {
      title: "Waiting period for first payout",
      badge: "Payment",
      description: "Learn about the waiting period for your first payout.",
    },
    {
      title: "E Banks That Accept US Casino Players",
      badge: "Privacy",
      description: "Find out which banks accept casino-related transactions.",
    },
    {
      title: "How To Protect Your Computer",
      badge: "API",
      description: "Tips to enhance your computer's security.",
    },
  ];

  return (
    <div>
      {contentData.map((item, index) => (
        <ContentItem key={index} {...item} />
      ))}
    </div>
  );
};

const SupportPage = () => {
  return (
    <Container>
      <SearchSection />
      <div style={{ display: "flex", gap: "20px" }}>
        <Menu />
        <ContentSection />
      </div>
    </Container>
  );
};

export default SupportPage;
