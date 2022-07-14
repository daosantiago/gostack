import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

// Elementos do React-native, diferente do HTML,  não tem valor semântico
// Não possuem estilização própria. Tudo deve ser feito com CSS
// Todos os componentes possuem "display: flex" por padrão

// View: um container como div, footer, header, main, aside, section
// Text: p, span, strong, h1, h2, h3

export default function App() {
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#7159c1' translucent={true}/>
      <View style={styles.container}>
        <Text style={styles.title}>Hello</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignContent: 'center',
  },

  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
