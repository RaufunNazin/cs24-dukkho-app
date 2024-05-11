import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import api from '../../api';

const Myticket = () => {
  const [posts, setPosts] = useState([]);
  const getTickets = () => {
    api
      .get('/ticket/my')
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  [
    {
      id: 1,
      location: 'farmgate',
      category: 'dustbin',
      description: 'overflow',
      anonymous: 1,
      created_at: 1715378824,
      reply: null,
    },
  ];
  useEffect(() => {
    getTickets();
  }, []);
  return (
    <View>
      {posts.map((post,i) => {
        return (
          <View key={i}>
            <View
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
              }}>
              <Text>{post.location}</Text>
              <Text>{post.category}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Myticket;
