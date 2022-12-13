import React, { useState, useEffect } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

import colors from "../config/colors";
// import { TMDB_API_KEY } from "@env";
import Screen from "../components/Screen";

function HomeScreen() {
  const [data, setData] = useState({
    searchedMovies: null,
    nowPlaying: null,
    topRatedMovies: null,
  });
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState();
  const apiKey = "33a7326d941e6de613d285854b52eb67";
  const apiReq = async () => {
    const resSearchedMovies = await axios(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`
    );
    const respNowPlaying = await axios(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    );
    const respTopRatedMovies = await axios(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`
    );

    setData({
      searchedMovies: resSearchedMovies.data.results,
      nowPlaying: respNowPlaying.data.results,
      topRatedMovies: respTopRatedMovies.data.results,
    });

    if (loading) {
      setLoading(false);
    }
  };
  useEffect(() => {
    apiReq();
  }, []);

  return (
    <Screen style={styles.container}>
      <View>
        <Text style={styles.title}>Movie Finder</Text>
      </View>

      <View style={styles.input}>
        <FontAwesome
          name="search"
          size={24}
          color={colors.black}
          style={styles.icon}
        />
        <TextInput
          placeholder="Find a movie..."
          style={styles.inputText}
          onChangeText={(text) => setSearchInput(text)}
          name="search"
        ></TextInput>
      </View>
      <TouchableOpacity onPress={apiReq} style={styles.button}>
        <Text style={styles.buttontText}>Submit</Text>
      </TouchableOpacity>
      <View>
        {loading ? (
          <Text>Loading</Text>
        ) : (
          <View>
            <Text style={styles.subtitle}>
              Searched
              <Text style={styles.hightlight}> Movies</Text>
            </Text>
            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.imageMargin}
                data={data.searchedMovies}
                horizontal
                renderItem={(element) => {
                  return (
                    <TouchableOpacity>
                      <Image
                        style={styles.image}
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500${element.item.poster_path}`,
                        }}
                      />
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            </View>
            <View>
              <Text style={styles.subtitle}>
                In
                <Text style={styles.hightlight}> Theaters</Text>
              </Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.imageMargin}
                data={data.nowPlaying}
                horizontal
                renderItem={(element) => {
                  return (
                    <TouchableOpacity>
                      <Image
                        style={styles.image}
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500${element.item.poster_path}`,
                        }}
                      />
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <Text style={styles.subtitle}>
                Top
                <Text style={styles.hightlight}> Movies</Text>
              </Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.imageMargin}
                data={data.topRatedMovies}
                horizontal
                renderItem={(element) => {
                  return (
                    <TouchableOpacity>
                      <Image
                        style={styles.image}
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500${element.item.poster_path}`,
                        }}
                      />
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
    marginVertical: 5,
  },
  buttontText: {
    color: colors.white,
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  hightlight: {
    color: colors.secondary,
  },
  icon: {
    marginRight: 10,
  },
  image: {
    width: 120,
    height: 180,
    resizeMode: "cover",
    borderRadius: 5,
    marginRight: 8,
  },
  imageMargin: {
    marginTop: 20,
    marginLeft: 20,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  inputText: {
    fontSize: 18,
    color: colors.black,
  },
  subtitle: {
    fontSize: 20,
    color: colors.white,
    marginTop: 30,
    marginLeft: 20,
    fontWeight: "bold",
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default HomeScreen;
