import React, { useContext } from "react";
import styles from "./Register.module.css";
import Input from "../../Elements/Input/Input";
import Button from "../../Elements/Button/Button";
import { NavLink } from "react-router-dom";
import { Utils } from "./../../Util/util.jsx";
import { useAuthentication } from "../../Hooks/useAuthentication.jsx";
import { SuccessContext } from "../../context/CreateUserSuccessContext.jsx";

const Register = () => {
  const displayName = Utils("name");
  const email = Utils("email");
  const password = Utils("password");
  const confirmPassword = Utils("confirm");
  const [error, setError] = React.useState(null);
  const { toggleSuccess } = useContext(SuccessContext);

  const { createUser, error: authError, loading } = useAuthentication();

  async function handleSubmit(e) {
    if (
      displayName.value.length === 0 ||
      email.value.length === 0 ||
      password.value.length === 0 ||
      confirmPassword.value.length === 0
    )
      return;
    e.preventDefault();
    if (
      displayName.value.length === 0 ||
      email.value.length === 0 ||
      password.value.length === 0 ||
      confirmPassword.value.length === 0
    ) {
      setError("Preencha o formulário");
      return;
    }
    setError(null);
    const user = {
      displayName: displayName.value,
      email: email.value,
      password: password.value,
    };

    await createUser(user);
    toggleSuccess();
    localStorage.removeItem("password");
  }

  React.useEffect(() => {
    if (authError) {
      setError(authError);
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
          {...displayName}
          onSelect={() => setError(null)}
        />
        <Input
          label="Email:"
          type="email"
          placeholder="E-mail do Usuário"
          {...email}
          onSelect={() => setError(null)}
        />
        <Input
          label="Senha:"
          type="password"
          placeholder="Crie sua senha"
          {...password}
          onSelect={() => setError(null)}
          showPasswordIcon={true}
        />
        <Input
          label="Confirme:"
          type="password"
          placeholder="Confirme sua senha"
          {...confirmPassword}
          onSelect={() => setError(null)}
          showPasswordIcon={true}
        />
        {loading ? (
          <Button disabled>Criando...</Button>
        ) : (
          <Button>Criar Conta</Button>
        )}
      </form>
      <p>
        Já tem conta? <NavLink to="/login">Entrar</NavLink>
      </p>
      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
};

export default Register;
