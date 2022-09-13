import * as React from 'react';
import { View, Button } from 'react-native';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button color={'#666'} title="Sair" onPress={signOut} />
    </View>
  );
};

export default Dashboard;
