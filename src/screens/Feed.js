import {View, Text, TextInput, Pressable, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw, {create} from 'twrnc';
import api from '../../api';
import Toast from 'react-native-toast-message';

const Feed = () => {
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    api
      .get('/post/')
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Liked',
          text2: 'You have liked the post',
          autoHide: true,
          topOffset: 10,
        });
        setPosts(res.data);
        setPost('');
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An error occurred',
          autoHide: true,
          topOffset: 10,
        });
      });
  };
  const postss = [
    {
      id: 1,
      created_by: {
        id: 1,
        name: 'Emma Thompson',
        username: '@EcoWarriorEm',
      },
      content:
        'Reducing waste starts with small changes. Today, I swapped single-use plastic bottles for a reusable one. Every little action counts! ♻️ #WasteReduction #GoGreen',
      like_count: 256,
      created_at: 1715377113,
      liked: false,
    },
    {
      id: 2,
      created_by: {
        name: 'David Attenborough',
        username: '@PlanetProtectorDave',
      },
      content:
        'The Amazon Rainforest is home to millions of species. It is our duty to protect it. 🌳🦜 #SaveTheAmazon #ClimateAction',
      like_count: 1024,
      created_at: 1715377113,
      liked: false,
    },
    {
      id: 3,
      created_by: {
        name: 'Greta Thunberg',
        username: '@FridaysForFuture',
      },
      content:
        'The climate crisis is real. We must act now. Join the movement. 🌍💚 #ClimateEmergency #ActNow',
      like_count: 4096,
      created_at: 1715377113,
      liked: true,
    },
    {
      id: 4,
      created_by: {
        name: 'Leonardo DiCaprio',
        username: '@LeoDiCaprio',
      },
      content:
        'The time is now. We must transition to renewable energy sources to combat climate change. ☀️🌬️ #RenewableEnergy #ClimateAction',
      like_count: 2048,
      created_at: 1715377113,
      liked: false,
    },
    {
      id: 5,
      created_by: {
        name: 'Jane Goodall',
        username: '@JaneGoodallInst',
      },
      content:
        'Every individual matters. Every individual has a role to play. 🌍🐒 #Conservation #Biodiversity',
      like_count: 512,
      created_at: 1715377113,
      liked: true,
    },
  ];
  const like = id => {
    api
      .get(`/post/${id}/like`)
      .then(res => {
        if (res.status === 200) {
          Toast.show({
            type: 'success',
            text1: 'Liked',
            text2: 'You have liked the post',
            autoHide: true,
            topOffset: 10,
          });
          getPosts();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const share = () => {
    api
      .post('/post/', {content: post})
      .then(res => {
        if (res.status === 201) {
          getPosts();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <View style={{flex: 1}}>
      <View>
        <TextInput
          placeholder="Share what's on your mind..."
          multiline={true}
          numberOfLines={4}
          value={post}
          onChangeText={setPost}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            padding: 10,
            margin: 10,
          }}
        />
        <Pressable
          style={tw`bg-black p-2 mx-[10px] rounded-md shadow-md`}
          onPress={() => share()}>
          <Text style={tw`text-white font-bold text-lg text-center`}>
            Share
          </Text>
        </Pressable>
      </View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'light',
          padding: 10,
          marginTop: 20,
          marginBottom: -10,
          color: '#666',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        }}>
        Browse Posts By Others
      </Text>
      <ScrollView style={{flex: 1}}>
        {posts.map(post => {
          return (
            <View
              key={post.id}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                flex: 1,
                flexDirection: 'column',
                gap: 5,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={{fontWeight: '700', fontSize: 16}}>
                    {post.created_by.name}
                  </Text>
                  <Text style={{color: '#666', marginTop: -2}}>
                    {post.created_by.username
                      ? `${post.created_by.username}`
                      : '@Anonymous'}
                  </Text>
                </View>
                <View>
                  {post.liked === false ? (
                    <Pressable>
                      <Text
                        style={{
                          color: 'blue',
                        }}
                        onPress={() => like(post.id)}>
                        Like
                      </Text>
                    </Pressable>
                  ) : (
                    <Text
                      style={{
                        color: '#666',
                      }}>
                      Liked
                    </Text>
                  )}
                </View>
              </View>

              <Text style={{
                color: 'black',
                fontSize: 18,
                marginTop: 5,
                marginBottom: 5,
              
              }}>{post.content}</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#666'}}>{post.like_count} Likes</Text>
                <Text style={{color: '#666'}}>
                  {new Date(post.created_at * 1000).toLocaleDateString()}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Feed;
