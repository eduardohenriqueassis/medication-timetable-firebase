import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../Hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { Utils } from "../../Util/util";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const [greeting, setGreeting] = React.useState("");
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const util = Utils();
  const { isDarkMode, toggleTheme } = useTheme();
  console.log(isDarkMode);
  React.useEffect(() => {
    toggleTheme();
  }, []);
  const navigationRoutes = [
    {
      name: "home",
      route: "/",
      linkName: "Home",
      isHidden: false,
    },
    {
      name: "table",
      route: "/table",
      linkName: "Tabela de Horários",
      isHidden: !user ? true : false,
    },
    {
      name: "login",
      route: "/login",
      linkName: "Entrar",
      isHidden: !user ? false : true,
    },
    {
      name: "register",
      route: "/register",
      linkName: "Criar conta",
      isHidden: !user ? false : true,
    },
    {
      name: "add-edit",
      route: "/add-edit",
      linkName: "Adicionar",
      isHidden: user ? false : true,
    },

    // {
    //   name: "calculate",
    //   route: "/calculate",
    //   linkName: "Cadastrar Medicamento",
    // },
  ];

  React.useEffect(() => {
    setGreeting(util.message);
  }, [user]);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <div className={styles.left}>
          <NavLink className={styles.link} to="/">
            <div className={styles.logo}></div>
          </NavLink>
        </div>
        {user && user.displayName && (
          <div className={styles.welcome}>
            <p>
              Olá {user.displayName.toUpperCase()}, {greeting}!
            </p>
          </div>
        )}
        <div className={styles.right}>
          {navigationRoutes.map((item) => (
            <NavLink
              key={item.name}
              to={item.route}
              className={({ isActive }) => {
                return `${styles.link} ${
                  item.isHidden ? styles.isHidden : ""
                } ${isActive ? styles.active : ""}`;
              }}
            >
              {item.linkName}
            </NavLink>
          ))}
          {user && (
            <button className={styles.logout} onClick={logout}>
              Sair
            </button>
          )}
          <button className={styles.mode} onClick={toggleTheme}>
            {!isDarkMode ? "Escuro" : "Claro"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
