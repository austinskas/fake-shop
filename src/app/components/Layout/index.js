import React from "react";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

const StyledLayout = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Main = styled.main`
  max-width: 1020px;
  width: 100%;
  margin: 0 auto;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Layout({ children }) {
  return (
    <StyledLayout className="Layout">
      <Header />
      <Main className="Main">{children}</Main>
      <Footer />
    </StyledLayout>
  );
}

export default Layout;
