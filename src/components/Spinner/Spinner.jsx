import styled from "styled-components";

import { Rings } from "react-loader-spinner";

const Spinner = () => {
  return (
    <Container>
      <Rings
        height="80"
        width="80"
        color="black"
        radius="8"
        visible={true}
        ariaLabel="rings-loading"
      />
    </Container>
  );
};

export default Spinner;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(235, 232, 232, 0.8);
`;
