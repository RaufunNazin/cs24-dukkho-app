import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './src/components/CustomDrawer';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Report from './src/screens/Report';
import Feed from './src/screens/Feed';
import Map from './src/screens/Map';
import Event from './src/screens/Event';
import Myticket from './src/screens/Myticket';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        // drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          drawerActiveBackgroundColor: '#151515',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
        }}
        initialRouteName="Social Feed">
        <Drawer.Screen name="Social Feed" component={Feed} />
        <Drawer.Screen name="Events" component={Event} />
        <Drawer.Screen name="Map" component={Map} />
        <Drawer.Screen name="Report" component={Report} />
        {/* <Drawer.Screen name="My Tickets" component={Myticket} /> */}
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Register" component={Register} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
