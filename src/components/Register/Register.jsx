import React from "react";
import styles from "./Register.module.css";
import Input from "../../Elements/Input/Input";
import Button from "../../Elements/Button/Button";
import { NavLink } from "react-router-dom";
import { utils, types } from "./../../Util/util.jsx";
import { useAuthentication } from "../../Hooks/useAuthentication.jsx";

const Register = () => {
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const [errType, setErrType] = React.useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const user = {
      displayName,
      email,
      password,
    };

    if (password != confirmPassword) {
      setError(utils.passwordCheck);
      setErrType("confirm");
      return;
    }

    await createUser(user);
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
    if (value.length > 3) {
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
    <section className={`container animate ${styles.registerForm}`}>
      <h2 className="title">Crie sua conta</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome:"
          type="text"
          placeholder="Nome do Usuário"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          onBlur={(e) => checkInputValidity(e, "name")}
          error={errType === "name" && error ? error : null}
        />
        <Input
          label="Email:"
          type="email"
          placeholder="E-mail do Usuário"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => checkInputValidity(e, "email")}
          error={errType === "email" && error ? error : null}
        />
        <Input
          label="Senha:"
          type="password"
          placeholder="Crie sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => checkInputValidity(e, "password")}
          error={errType === "password" && error ? error : null}
        />
        <Input
          label="Confirme:"
          type="password"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={(e) => {
            setError(null);
            setConfirmPassword(e.target.value);
          }}
          onBlur={() => {
            setError(
              password === confirmPassword && confirmPassword.length > 0
                ? null
                : confirmPassword.length > 0
                ? utils.passwordCheck
                : utils.password
            );
            setErrType("confirm");
          }}
        />
        {error && errType === "auth" && <p className={styles.error}>{error}</p>}
        {error && errType === "confirm" && (
          <p className={styles.error}>{error}</p>
        )}
        {loading ? (
          <Button disabled>Criando...</Button>
        ) : (
          <Button>Criar Conta</Button>
        )}
      </form>
      <p>
        Já tem conta? <NavLink to="/login">Entrar</NavLink>
      </p>
    </section>
  );
};

export default Register;
