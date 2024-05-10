import {View, Text, TextInput, Pressable, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import api from '../../api';
import Toast from 'react-native-toast-message';

const Feed = () => {
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    api.get('/post/').then(res => {
      setPosts(res.data);
    });
  };
  const postss = [
    {
      id: 1,
      name: 'Emma Thompson',
      username: '@EcoWarriorEm',
      post: 'Reducing waste starts with small changes. Today, I swapped single-use plastic bottles for a reusable one. Every little action counts! ♻️ #WasteReduction #GoGreen',
      likes: 256,
    },
    {
      id: 2,
      name: 'David Attenborough',
      username: '@PlanetProtectorDave',
      post: 'The Amazon Rainforest is home to millions of species. It is our duty to protect it. 🌳🦜 #SaveTheAmazon #ClimateAction',
      likes: 1024,
    },
    {
      id: 3,
      name: 'Greta Thunberg',
      username: '@FridaysForFuture',
      post: 'The climate crisis is real. We must act now. Join the movement. 🌍💚 #ClimateEmergency #ActNow',
      likes: 4096,
    },
    {
      id: 4,
      name: 'Leonardo DiCaprio',
      username: '@LeoDiCaprio',
      post: 'The time is now. We must transition to renewable energy sources to combat climate change. ☀️🌬️ #RenewableEnergy #ClimateAction',
      likes: 2048,
    },
    {
      id: 5,
      name: 'Jane Goodall',
      username: '@JaneGoodallInst',
      post: 'Every individual matters. Every individual has a role to play. 🌍🐒 #Conservation #Biodiversity',
      likes: 512,
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
                  <Text style={{fontWeight: '700', fontSize: 20}}>
                    {post.created_by.name}
                  </Text>
                  <Text style={{color: '#666', marginTop: -2}}>
                    {post.created_by.username
                      ? `@${post.created_by.username}`
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
                        color: 'blue',
                      }}>
                      Liked
                    </Text>
                  )}
                </View>
              </View>

              <Text>{post.content}</Text>
              <View
                style={{
                  flex: 1,
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
