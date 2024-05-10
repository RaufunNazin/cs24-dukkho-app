import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './src/components/CustomDrawer';
import {View} from 'react-native';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Report from './src/screens/Report';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          drawerActiveBackgroundColor: '#151515',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
        }}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Details" component={Details} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Register" component={Register} />
        <Drawer.Screen name="Report" component={Report} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
