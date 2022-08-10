import React from "react";
import { FiChevronRight } from "react-icons/fi";

import logoImg from "../../assets/logo.svg";

import { Title, Form, Repositories } from "./styles";

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer logo" />
      <Title>Explore Repositórios do Github</Title>
      <Form>
        <input type="text" placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="#">
          <img
            src="https://avatars.githubusercontent.com/u/25793311?v=4"
            alt="Anderson Santiago"
          />
          <div>
            <strong>Casteljau</strong>
            <p>Curva de Casteljau</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="#">
          <img
            src="https://avatars.githubusercontent.com/u/25793311?v=4"
            alt="Anderson Santiago"
          />
          <div>
            <strong>Casteljau</strong>
            <p>Curva de Casteljau</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="#">
          <img
            src="https://avatars.githubusercontent.com/u/25793311?v=4"
            alt="Anderson Santiago"
          />
          <div>
            <strong>Casteljau</strong>
            <p>Curva de Casteljau</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};
export default Dashboard;
