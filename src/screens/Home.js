import * as React from 'react';
import { Button, View, Text } from 'react-native';

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')} // Updated navigation action
      />
    </View>
  );
}

export default Home;
