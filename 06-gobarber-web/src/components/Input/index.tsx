import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import Tooltip from '../Tooltip';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  // eslint-disable-next-line react/require-default-props
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasFocus, setHasFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleContainerClick = useCallback(() => {
    setHasFocus(true);
    // eslint-disable-next-line no-unused-expressions
    inputRef.current?.focus();
  }, []);

  const handleInputFocus = useCallback(() => {
    setHasFocus(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setHasFocus(false);

    setIsFilled(!!inputRef.current?.value);
    // Above we have a shorter version of the same condition as follows
    // if (inputRef.current) {
    //   if (inputRef.current.value) {
    //     setIsFilled(true);
    //   }
    // } else {
    //   setIsFilled(false);
    // }
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      hasError={!!error}
      onClick={handleContainerClick}
      isFilled={isFilled}
      hasFocus={hasFocus}
    >
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
