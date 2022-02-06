import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #96a5a4;
  padding: 30px;
`;

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  height: 80vh;
`;

export const ProviderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  padding-bottom: 20px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: gray;
  height: 10%;
  width: 80%;
  margin: 20px 10px;
`;

export const DashboardContainer = styled.div`
  display: flex;
  background-color: blue;
  height: 100%;
  width: 80%;
`;
