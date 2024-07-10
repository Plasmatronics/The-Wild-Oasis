import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMiniDashboard = styled(BiLoaderAlt)`
  width: 4rem;
  height: 4rem;
  animation: ${rotate} 1.5s infinite linear;
  align-self: center;
  justify-self: center;
`;

export default SpinnerMiniDashboard;
