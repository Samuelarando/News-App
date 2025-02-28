import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const API_KEY = '59af897be1ed44e4821cd9f1693081d6';
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const HomeScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setNews(data.articles))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detail', { article: item })}>
            <View style={styles.card}>
              <Image source={{ uri: item.urlToImage }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const DetailScreen = ({ route }) => {
  const { article } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: article.urlToImage }} style={styles.detailImage} />
      <Text style={styles.title}>{article.title}</Text>
      <Text>{article.description}</Text>
    </View>
  );
};

const AboutScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>About</Text>
    <Text>Developed by [samuel arando purba]</Text>
  </View>
);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { marginBottom: 10, padding: 10, backgroundColor: '#fff', borderRadius: 8 },
  image: { width: '100%', height: 150, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 5 },
  detailImage: { width: '100%', height: 250, borderRadius: 8 },
});
