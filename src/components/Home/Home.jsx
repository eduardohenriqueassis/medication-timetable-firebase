import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Button from "../../Elements/Button/Button";
import { SuccessContext } from "../../context/CreateUserSuccessContext";

const Home = () => {
  const navigate = useNavigate();
  const { createUserSuccess, toggleSuccess } = useContext(SuccessContext);
  function handleClick(event) {
    event.preventDefault();
    navigate("/add-edit");
  }
  React.useEffect(() => {
    const timer = setTimeout(() => {
      toggleSuccess();
    }, 4000);
    if (createUserSuccess === false) clearTimeout(timer);
  }, [createUserSuccess]);

  return (
    <main className={`container animate`}>
      <h2 className="title">Home - Calcule os horários dos seus remédios</h2>
      <div className={styles.homeText}>
        <p>
          Aqui você pode calcular os horários que você precisa tomar os seus
          remédios sem se preocupar em ter que fazer contas. <br />É{" "}
          <strong>muito importante</strong> que você siga os horários para que
          os medicamentos funcionem corretamente.
        </p>
        <p>
          Jamais tome remédios por conta própria, consulte sempre o seu médico.{" "}
          <br />
          <strong>A auto-medicação pode ser muito perigosa.</strong>
        </p>
        <p style={{ marginTop: "1.5rem" }}>
          <strong>Cadastre-se</strong> e comece a usar a sua calculadora de
          horários.
        </p>
      </div>

      {createUserSuccess && (
        <div className={styles.successWrapper}>
          <div className={styles.success}>
            <h2>Conta criada com Sucesso!</h2>
          </div>
        </div>
      )}
      <div className={styles.btnWrapper}>
        <Button onClick={handleClick}>Cadastrar Medicamento</Button>
      </div>
    </main>
  );
};

export default Home;
