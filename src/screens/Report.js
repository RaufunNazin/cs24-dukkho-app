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
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import React, {useState} from 'react';
import tw from 'twrnc';
import Toast from 'react-native-toast-message';
import api from '../../api';

const Report = ({navigation}) => {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  const report = () => {
    if (!location) {
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
        .post('/ticket/', {
          location: location,
          category: type,
          description: description,
          anonymous: anonymous === true ? 1 : 0,
        })
        .then(res => {
          console.log(res.data);
          Toast.show({
            type: 'success',
            text1: 'Issue Reported!',
            autoHide: true,
            topOffset: 10,
          });
          setAnonymous(false);
          setLocation('');
          setType('');
          setDescription('');
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              marginTop: 20,
            }}>
            <BouncyCheckbox
              size={20}
              fillColor="black"
              unFillColor="#FFFFFF"
              disableText={true}
              onPress={isChecked => {
                setAnonymous(isChecked);
              }}
            />
            <Text>Post as Anonymous</Text>
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
          {/* <Pressable onPress={() => navigation.navigate('My Tickets')}>
            <Text>View my tickets</Text>
          </Pressable> */}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Report;
