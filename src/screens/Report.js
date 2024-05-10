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

const Report = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const report = () => {
    if (!name) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Name',
        text2: 'This field cannot be empty',
        autoHide: true,
        topOffset: 10,
      });
    } else if (!location) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Location',
        text2: 'This field cannot be empty',
        autoHide: true,
        topOffset: 10,
      });
    } else if (!type) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Type',
        text2: 'This field cannot be empty',
        autoHide: true,
        topOffset: 10,
      });
    } else if (!description) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Description',
        text2: 'This field cannot be empty',
        autoHide: true,
        topOffset: 10,
      });
    } else {
      setLoading(true);
      api
        .post('/users/register', {
            name: name,
            location: location,
            type: type,
            description: description,
        })
        .then(res => {
          console.log(res.data);
          Toast.show({
            type: 'success',
            text1: 'Issue Reported!',
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
            text2: 'Failed to Report Issue',
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
          <Text style={tw`text-left text-3xl font-bold`}>Report an Issue</Text>
          <View style={tw`flex-col gap-y-5 mt-12`}>
            <TextInput
              style={tw`p-3 border-b border-gray-400`}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={tw`p-3 border-b border-gray-400`}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />
            <TextInput
              style={tw`p-3 border-b border-gray-400`}
              placeholder="Type of Issue"
              value={type}
              onChangeText={setType}
            />
            <TextInput
              style={tw`p-3 border-b border-gray-400`}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <Pressable
            style={tw`bg-black p-4 rounded-2xl mt-10 shadow-md`}
            onPress={() => report()}>
            {loading ? (
              <View style={tw`flex-1 justify-center p-4`}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            ) : (
              <Text style={tw`text-white font-bold text-lg text-center`}>
                Send
              </Text>
            )}
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Report;
