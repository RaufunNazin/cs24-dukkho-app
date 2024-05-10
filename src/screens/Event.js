import {View, Text, TextInput, Pressable, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import api from '../../api';
import Toast from 'react-native-toast-message';

const Event = () => {
  const [events, setEvents] = useState([]);
  const getEvents = () => {
    api.get('/event/').then(res => {
      setEvents(res.data);
    });
  };
  const eventss = [
    {
      id: 1,
      name: 'Waste Clean',
      description: 'desc',
      location: 'shahbagh',
      start_time: 3,
      end_time: 4,
      created_at: 1715377113,
      followed: false,
    },
  ];
  const follow = id => {
    api
      .get(`/event/${id}/follow`)
      .then(res => {
        if (res.status === 200) {
          Toast.show({
            type: 'success',
            text1: 'Liked',
            text2: 'You have followed the event',
            autoHide: true,
            topOffset: 10,
          });
          getEvents();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getEvents();
  }, []);
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'light',
          padding: 10,
          marginTop: 10,
          marginBottom: -10,
          color: '#666',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        }}>
        Browse Events
      </Text>
      <ScrollView style={{flex: 1}}>
        {eventss.map(event => {
          return (
            <View>
              <View
                key={event.id}
                style={{
                  padding: 10,
                  marginHorizontal: 10,
                  marginTop: 10,
                  borderRadius: 5,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  flex: 1,
                  flexDirection: 'column',
                  gap: 10,
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    color: '#666',
                    fontSize: 12,
                    fontWeight: 'light',
                  }}>
                  {new Date(event.created_at * 1000).toLocaleDateString()}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#666',
                      fontSize: 12,
                      fontWeight: 'light',
                    }}>
                    {event.location}
                  </Text>
                  <Text
                    style={{
                      color: '#666',
                      fontSize: 12,
                      fontWeight: 'light',
                    }}>
                    {event.start_time}PM - {event.end_time}PM
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text style={{fontWeight: '700', fontSize: 20}}>
                      {event.name}
                    </Text>
                  </View>
                  <View></View>
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    color: '#666',
                    marginTop: -2,
                  }}>
                  {event.description}
                </Text>
              </View>
              <View>
                {event.followed === false ? (
                  <Pressable
                    style={{
                      backgroundColor: 'black',
                      padding: 10,
                      marginHorizontal: 10,
                      borderRadius: 5,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                    }}
                    onPress={() => follow(event.id)}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      Follow
                    </Text>
                  </Pressable>
                ) : (
                  <View
                    style={{
                      backgroundColor: '#666',
                      padding: 10,
                      marginHorizontal: 10,
                      borderRadius: 5,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                      }}>
                      Followed
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Event;
