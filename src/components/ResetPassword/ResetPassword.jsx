import React from "react";
import styles from "./ResetPassword.module.css";
import Input from "../../Elements/Input/Input";
import Button from "../../Elements/Button/Button";
import { utils, types } from "./../../Util/util.jsx";
import { useAuthentication } from "../../Hooks/useAuthentication.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(null);
  const [errType, setErrType] = React.useState("");
  const [redefineSent, setRedefineSent] = React.useState(false);
  const navigate = useNavigate();
  const { resetPassword, error: authError, loading } = useAuthentication();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    await resetPassword(email);
    setRedefineSent(true);
  }

  function backToLogin() {
    setRedefineSent(false);
    navigate("/login");
  }

  function checkInputValidity(e, errType) {
    const value = e.target.value;
    if (errType === "email" && !types.email.regex.test(value)) {
      setError(types.email.message);
      setErrType(errType);
      return;
    } else {
      setError("");
      setErrType("");
    }
    if (value.length > 0) {
      setError(null);
    } else {
      setError(utils[errType]);
      setErrType(errType);
    }
  }

  React.useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return !redefineSent ? (
    <section className={`container animate ${styles.loginForm}`}>
      <h2 className="title">Redefinir senha</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email:"
          type="email"
          placeholder="Insira seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => checkInputValidity(e, "email")}
          error={errType === "email" && error ? error : null}
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
