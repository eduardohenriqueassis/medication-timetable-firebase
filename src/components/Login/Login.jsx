import React from "react";
import styles from "./Login.module.css";
import Input from "../../Elements/Input/Input";
import Button from "../../Elements/Button/Button";
import { NavLink } from "react-router-dom";
import { utils, types, checkInputValidity } from "./../../Util/util.jsx";
import { useAuthentication } from "../../Hooks/useAuthentication.jsx";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const [errType, setErrType] = React.useState("");
  const { login, error: authError, loading } = useAuthentication();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const user = {
      email,
      password,
    };

    await login(user);
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
      setErrType("auth");
    }
  }, [authError]);
  return (
    <section className={`container animate ${styles.loginForm}`}>
      <h2 className="title">Entrar</h2>
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
        <Input
          label="Senha:"
          type="password"
          placeholder="Insira sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => checkInputValidity(e, "passwordLogin")}
          error={errType === "passwordLogin" && error ? error : null}
        />
        <p>
          <NavLink className={styles.forgot} to="/resetPassword">
            Esqueceu a senha?
          </NavLink>
        </p>

        {error && errType === "auth" && <p className={styles.error}>{error}</p>}

        {loading ? (
          <Button disabled>Entrando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
      </form>
      <p>
        Não tem conta?{" "}
        <NavLink className={styles.forgot} to="/register">
          Cadastre-se
        </NavLink>
      </p>
    </section>
  );
};

export default Login;
