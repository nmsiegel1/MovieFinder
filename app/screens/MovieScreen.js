import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import axios from "axios";

import colors from "../config/colors";
import Screen from "../components/Screen";

function MovieScreen({ route, navigation }) {
  const id = "300";
  const [selectedMovie, setSelectedMovie] = useState();
  const [loading, setLoading] = useState(true);

  const apiKey = "33a7326d941e6de613d285854b52eb67";

  const apiReq = async () => {
    const respSelectedMovie = await axios(
      `https://api.themoviedb.org/3/movie/329?api_key=33a7326d941e6de613d285854b52eb67&language=en-US`
    );
    console.log("response", respSelectedMovie.data.title);
    setSelectedMovie(respSelectedMovie.data);

    if (loading) {
      setLoading(false);
    }
  };
  // console.log("selectedMovie", selectedMovie.title);

  useEffect(() => {
    apiReq();
  }, []);

  return (
    <Screen style={styles.container}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <View style={styles.card}>
          <View>
            <Image
              style={styles.image}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`,
              }}
            />
          </View>
          <View style={styles.detailsContainer}>
            <View>
              <Text style={styles.title}>{selectedMovie.title}</Text>
            </View>
            <View>
              <Text style={styles.rating}>
                ★ {Number(selectedMovie.vote_average).toFixed(1)} | (
                {selectedMovie.release_date.substr(0, 4)})
              </Text>
            </View>
            <View>
              <Text style={styles.description}>{selectedMovie.overview}</Text>
            </View>
          </View>
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={styles.button}
      >
        <Text style={styles.buttontText}>Back</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.medium,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
    marginVertical: 5,
  },
  buttontText: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: colors.secondary,
    width: 350,
    height: 350,
    flex: 1,
    borderRadius: 15,
    margin: 10,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  description: {
    color: colors.white,
    fontSize: 18,
    padding: 10,
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 400,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    padding: 10,
    fontWeight: "bold",
    alignSelf: "center",
  },
  rating: {
    alignSelf: "center",
    color: colors.white,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default MovieScreen;
