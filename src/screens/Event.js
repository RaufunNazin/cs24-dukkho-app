import {View, Text, TextInput, Pressable, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import api from '../../api';
import Toast from 'react-native-toast-message';

const Event = () => {
  const [events, setEvents] = useState([]);
  const getEvents = () => {
    api
      .get('/event/')
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An error occurred',
          autoHide: true,
          topOffset: 10,
        });
        console.log(err);
      });
  };
  const eventss = [
    {
      id: 1,
      name: 'Community Park Cleanup',
      description:
        'Join us for a community park cleanup event where we will be picking up litter, planting trees, and beautifying our neighborhood park.',
      location: 'Central Park',
      start_time: '2024-05-15T10:00:00',
      end_time: '2024-05-15T12:00:00',
      created_at: 1620702000, // May 11, 2021
      followed: false,
    },
    {
      id: 2,
      name: 'Food Drive for Homeless Shelter',
      description:
        'Help us collect non-perishable food items to donate to our local homeless shelter. Every donation makes a difference!',
      location: 'Downtown Community Center',
      start_time: '2024-06-01T09:00:00',
      end_time: '2024-06-01T17:00:00',
      created_at: 1630345200, // September 30, 2021
      followed: true,
    },
    {
      id: 3,
      name: 'Environmental Awareness Workshop',
      description:
        'Learn about the importance of environmental conservation and sustainability in this interactive workshop. Guest speakers and activities included!',
      location: 'Green Earth Institute',
      start_time: '2024-06-10T13:00:00',
      end_time: '2024-06-10T16:00:00',
      created_at: 1634281200, // October 15, 2021
      followed: false,
    },
    {
      id: 4,
      name: 'Blood Donation Camp',
      description:
        'Be a hero and save lives by donating blood! Join us for a blood donation camp where your contribution can make a difference.',
      location: 'City Hospital',
      start_time: '2024-07-05T08:00:00',
      end_time: '2024-07-05T14:00:00',
      created_at: 1638562800, // December 4, 2021
      followed: true,
    },
    {
      id: 5,
      name: 'Tech Conference: Future Trends',
      description:
        'Stay ahead of the curve! Attend our tech conference to learn about the latest trends and innovations shaping the future of technology.',
      location: 'Innovation Center',
      start_time: '2024-08-20T09:30:00',
      end_time: '2024-08-20T17:00:00',
      created_at: 1642777200, // January 21, 2022
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
        {events.map((event, i) => {
          return (
            <View key={i}>
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
                    {event.start_time}PM - {event.end_time}
                    PM
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
