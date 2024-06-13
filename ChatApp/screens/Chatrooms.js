import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';

const chatrooms = [
  { id: '1', name: 'General Chat', description: 'A place for general discussions.', avatar: 'https://i.pravatar.cc/100?img=1', lastSeen: '10:30 AM' },
  { id: '2', name: 'Tech Talk', description: 'Discuss the latest in technology.', avatar: 'https://i.pravatar.cc/100?img=2', lastSeen: '9:00 AM' },
  { id: '3', name: 'Sports', description: 'Talk about sports and games.', avatar: 'https://i.pravatar.cc/100?img=3', lastSeen: 'Yesterday' },
  { id: '4', name: 'Music Lovers', description: 'Share and discuss your favorite music.', avatar: 'https://i.pravatar.cc/100?img=4', lastSeen: '2:00 PM' },
  { id: '5', name: 'Movies & TV', description: 'Discuss the latest movies and TV shows.', avatar: 'https://i.pravatar.cc/100?img=5', lastSeen: '3 days ago' },
];

const Chatrooms = () => {
  const navigation = useNavigation();
  const [chatrooms, setChatrooms] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome name="search" size={24} color={colors.gray} style={{ marginLeft: 15 }} />
      ),
      headerRight: () => (
        <FontAwesome name="circle" size={24} color={colors.gray} style={{ marginLeft: 15 }} />
      ),
    });
    setChatrooms(chatrooms);
  }, [navigation]);

  const handleChatroomPress = (chatroom) => {
    navigation.navigate('Chat', { chatroom });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chatroomItem} onPress={() => handleChatroomPress(item)}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatroomInfo}>
        <Text style={styles.chatroomName}>{item.name}</Text>
        <Text style={styles.chatroomDescription}>{item.description}</Text>
        <Text style={styles.chatroomLastSeen}>Last seen: {item.lastSeen}</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredChatrooms = chatrooms.filter(chatroom =>
    chatroom.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "" || chatroom.name.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search chatrooms..."
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilter("")}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilter("tech")}>
          <Text style={styles.filterText}>Tech</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilter("sports")}>
          <Text style={styles.filterText}>Sports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilter("music")}>
          <Text style={styles.filterText}>Music</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredChatrooms}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() => (
          <View style={styles.emptyList}>
            <Text style={styles.emptyText}>No chatrooms found.</Text>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat")}
        style={styles.chatButton}
      >
        <Entypo name="chat" size={24} color={colors.lightGray} />
      </TouchableOpacity>
    </View>
  );
};

export default Chatrooms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    margin: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  filterText: {
    color: '#fff',
  },
  list: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  chatroomItem: {
    flexDirection: 'row',
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatroomInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatroomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatroomDescription: {
    fontSize: 14,
    color: 'gray',
  },
  chatroomLastSeen: {
    fontSize: 12,
    color: 'darkgray',
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: .9,
    shadowRadius: 8,
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});
