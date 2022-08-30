import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

interface SigInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  // const inputRef = useRef<HTMLInputElement>(null);
  // const testRef = useRef<React.HTMLAttributes<ReactElement>>();

  const { user, signIn } = useAuth();

  const validateFields = useCallback(
    async (data: SigInFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('Digite uma senha'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
      } catch (error) {
        const errors = getValidationErrors(error as Yup.ValidationError);

        formRef.current?.setErrors(errors);
      }
    },
    [],
  );

  const handleSubmit = useCallback(
    async (data: SigInFormData) => {
      await validateFields(data);
      signIn({
        email: data.email,
        password: data.password,
      });
    },
    [signIn, validateFields],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder="E-Mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="criar">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};
export default SignIn;
