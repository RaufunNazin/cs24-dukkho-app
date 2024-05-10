import {
  View,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import Toast from 'react-native-toast-message';
import api from '../../api';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signin = () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'This field cannot be empty',
        autoHide: true,
        topOffset: 10,
      });
    } else if (!password) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Password',
        text2: 'This field cannot be empty',
        autoHide: true,
        topOffset: 10,
      });
    } else {
      setLoading(true);
      api
        .post('/auth/login', {
          email: email,
          password: password,
        })
        .then(res => {
          console.log(res.data);
          Toast.show({
            type: 'success',
            text1: 'Welcome back!',
            text2: 'Login Completed',
            autoHide: true,
            topOffset: 10,
          });
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Uh-oh!',
            text2: 'Login Failed',
            autoHide: true,
            topOffset: 10,
          });
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1`}>
      <Toast />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw`mx-5 my-auto`}>
          <Text style={tw`text-left`}>Welcome</Text>
          <Text style={tw`text-left text-3xl font-bold`}>Sign In</Text>
          <View style={tw`flex-col gap-y-5 mt-12`}>
            <TextInput
              style={tw`bg-gray-100 p-4 rounded-lg shadow-sm`}
              placeholder="Email Address"
              onChangeText={setEmail}></TextInput>
            <TextInput
              style={tw`bg-gray-100 p-4 rounded-lg shadow-sm`}
              placeholder="Password"
              onChangeText={setPassword}
              secureTextEntry></TextInput>
          </View>
          <Pressable
            style={tw`bg-black p-4 rounded-2xl mt-10 shadow-md`}
            onPress={() => signin()}>
            {loading ? (
              <View style={tw`flex-1 justify-center p-4`}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            ) : (
              <Text style={tw`text-white font-bold text-lg text-center`}>
                Login
              </Text>
            )}
          </Pressable>
          <View style={tw`flex-row justify-between mt-4 mx-2`}>
            <Text>Need an account?</Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={tw`font-bold text-blue-500`}>Create One!</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
