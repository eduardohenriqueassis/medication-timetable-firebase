import React from "react";
import styles from "./ResetPassword.module.css";
import Input from "../../Elements/Input/Input";
import Button from "../../Elements/Button/Button";
import { Utils } from "./../../Util/util.jsx";
import { useAuthentication } from "../../Hooks/useAuthentication.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [redefineSent, setRedefineSent] = React.useState(false);
  const navigate = useNavigate();
  const email = Utils("email");
  const { resetPassword, error: authError, loading } = useAuthentication();

  async function handleSubmit(e) {
    e.preventDefault();

    await resetPassword(email.value);
    setRedefineSent(true);
  }

  function backToLogin() {
    setRedefineSent(false);
    navigate("/login");
  }

  return !redefineSent ? (
    <section className={`container animate ${styles.loginForm}`}>
      <h2 className="title">Redefinir senha</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email:"
          type="email"
          placeholder="Insira seu e-mail"
          {...email}
        />

        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar link</Button>
        )}
      </form>
    </section>
  ) : (
    <section className={`container animate ${styles.loginForm}`}>
      <h2>Link enviado</h2>
      <p>Um link de redefinição de senha foi enviado para o seu email.</p>
      <Button onClick={backToLogin}>Entrar</Button>
    </section>
  );
};

export default Login;
