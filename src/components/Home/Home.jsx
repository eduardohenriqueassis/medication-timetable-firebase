import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Button from "../../Elements/Button/Button";
import { SuccessContext } from "../../context/CreateUserSuccessContext";
import { useAuthValue } from "../../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthValue();
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
        <div className={styles.tips}>
          <h3 style={{ marginTop: "1.5rem" }}>Dicas:</h3>
          <ul>
            <li>
              verifique sempre o prazo de validade dos medicamentos antes de
              usá-los;
            </li>
            <li>
              não use medicamentos com embalagens estragadas, sem rótulo ou
              bula;
            </li>
            <li>
              não utilize a mesma receita médica mais de uma vez, pois um
              medicamento que foi usado antigamente pode não ser o correto hoje;
            </li>
            <li>
              não compre medicamentos que foram indicados por vizinhos ou
              amigos; fale primeiro com seu médico;
            </li>
            <li>não misture medicamentos sem a devida orientação;</li>
            <li>
              se apresentar algum sintoma diferente ao tomar um medicamento,
              procure seu médico;
            </li>
            <li>
              bebês, mulheres grávidas ou que estejam amamentando não devem
              tomar medicamentos sem orientação médica;
            </li>
            <li>
              Jamais tome remédios por conta própria, consulte sempre o seu
              médico.
            </li>
            <li>
              <strong>A auto-medicação pode ser muito perigosa.</strong>
            </li>
          </ul>
        </div>
        {user ? (
          <p style={{ marginTop: "1.5rem" }}>
            <strong>Comece</strong> usar a sua calculadora de horários e tenha a
            comodidade que você merece.
          </p>
        ) : (
          <p style={{ marginTop: "1.5rem" }}>
            <strong>Cadastre-se</strong> e comece a usar a sua calculadora de
            horários.
          </p>
        )}
      </div>
      {createUserSuccess && (
        <div className={styles.successWrapper}>
          <div className={styles.success}>
            <h2>Conta criada com Sucesso!</h2>
          </div>
        </div>
      )}

      <div className={styles.btnWrapper}>
        {user ? (
          <Button onClick={handleClick}>Cadastrar Medicamento</Button>
        ) : (
          <Button onClick={() => navigate("/register")}>Criar Conta</Button>
        )}
      </div>
    </main>
  );
};

export default Home;
