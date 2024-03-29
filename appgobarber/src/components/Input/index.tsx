import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [hasFocus, setHasFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setHasFocus(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setHasFocus(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      focus() {
        inputElementRef.current.focus();
      },
    }),
    [],
  );

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container hasFocus={hasFocus} hasError={!!error}>
      <Icon
        name={icon}
        size={20}
        color={hasFocus || isFilled ? '#ff9000' : '#666360'}
      />
      <TextInput
        ref={inputElementRef}
        onChangeText={(value: string) => {
          inputValueRef.current.value = value;
        }}
        defaulValue={defaultValue}
        placeholderTextColor="#666360"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      ></TextInput>
    </Container>
  );
};

export default forwardRef(Input);
