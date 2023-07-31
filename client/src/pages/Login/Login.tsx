import styled from "./styled";
import LoginForm from "../../components/LoginForm";
import Footer from "../../layout/Footer";

const Login = () => {
  return (
    <styled.Container>
      <LoginForm />
      <Footer />
    </styled.Container>
  );
};

export default Login;
