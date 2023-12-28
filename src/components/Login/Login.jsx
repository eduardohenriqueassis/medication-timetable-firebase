import React from "react";
import styles from "./Login.module.css";
import Input from "../../Elements/Input/Input";
import Button from "../../Elements/Button/Button";
import { NavLink } from "react-router-dom";
import { Utils } from "./../../Util/util.jsx";
import { useAuthentication } from "../../Hooks/useAuthentication.jsx";

const Login = () => {
  const [error, setError] = React.useState(null);

  const checkEmail = Utils("email");
  const checkPassword = Utils("password");
  const { login, error: authError, loading } = useAuthentication();
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  // React.useEffect(() => {
  //   emailRef.current.focus();
  // }, []);

  function callOnBlur(e) {
    e.preventDefault();
    setError(null);
    if (e.currentTarget.placeholder === "Insira seu e-mail") {
      checkEmail.onBlur(e);
      if (checkEmail.value.length > 0 && checkEmail.error === null) {
        passwordRef.current.focus();
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (checkEmail.error || checkPassword.error) return;
    if (checkEmail.value.length === 0 || checkPassword.value.length === 0) {
      setError("Preencha os campos");
      return;
    }
    setError(null);
    const user = {
      email: checkEmail.value,
      password: checkPassword.value,
    };

    await login(user);
  }

  React.useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return (
    <section className={`container animate ${styles.loginForm}`}>
      <h2 className="title">Entrar</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email:"
          type="email"
          name="email"
          id="email"
          placeholder="Insira seu e-mail"
          autoComplete="email"
          ref={emailRef}
          {...checkEmail}
          onBlur={(e) => callOnBlur(e)}
          onSelect={() => setError(null)}
        />
        <Input
          label="Senha:"
          type="password"
          name="password"
          id="password"
          placeholder="Insira sua senha"
          showPasswordIcon={true}
          ref={passwordRef}
          {...checkPassword}
          onSelect={() => setError(null)}
        />
        <p>
          <NavLink className={styles.forgot} to="/resetPassword">
            Esqueceu a senha?
          </NavLink>
        </p>

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
      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
};

export default Login;
