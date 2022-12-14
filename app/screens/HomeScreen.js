import React, { useState, useEffect } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

import colors from "../config/colors";
import { TMDB_API_KEY } from "@env";
import Screen from "../components/Screen";

function HomeScreen({ navigation }) {
  const [data, setData] = useState({
    searchedMovies: null,
    nowPlaying: null,
    topRatedMovies: null,
  });
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState();
  const [showSearch, setShowSearch] = useState(false);

  const apiKey = TMDB_API_KEY;
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

  // const displaySearch = () => {
  //   apiReq();
  //   setShowSearch(true);
  // };

  return (
    <Screen style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <TouchableOpacity
          onPress={() => {
            apiReq();
            setShowSearch(true);
          }}
          style={styles.button}
        >
          <Text style={styles.buttontText}>Submit</Text>
        </TouchableOpacity>
        <View>
          {loading ? (
            <Text>Loading</Text>
          ) : (
            <View>
              {showSearch == true ? (
                <View>
                  <Text style={styles.subtitle}>
                    Search
                    <Text style={styles.hightlight}> Results</Text>
                  </Text>
                  <View>
                    {data.searchedMovies.length == 0 ? (
                      <Text style={styles.notFound}>
                        Sorry, we couldn't find that movie. Try again.
                      </Text>
                    ) : (
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        style={styles.imageMargin}
                        data={data.searchedMovies}
                        horizontal
                        renderItem={(element) => {
                          return (
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("MovieScreen", {
                                  id: element.item.id,
                                })
                              }
                            >
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
                    )}
                  </View>
                </View>
              ) : (
                <View></View>
              )}
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
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("MovieScreen", {
                            id: element.item.id,
                          })
                        }
                      >
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
                  Top Rated
                  <Text style={styles.hightlight}> Movies</Text>
                </Text>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  style={styles.imageMargin}
                  data={data.topRatedMovies}
                  horizontal
                  renderItem={(element) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("MovieScreen", {
                            id: element.item.id,
                          })
                        }
                      >
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
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 15,
    width: "95%",
    marginVertical: 5,
  },
  buttontText: {
    color: colors.white,
    fontSize: 18,
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
    width: "95%",
    padding: 15,
    marginVertical: 10,
    alignSelf: "center",
  },
  inputText: {
    fontSize: 18,
    color: colors.black,
  },
  notFound: {
    alignSelf: "center",
    paddingTop: 25,
    color: colors.white,
    fontSize: 16,
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
