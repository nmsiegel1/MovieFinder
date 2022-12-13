import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import axios from "axios";

import colors from "../config/colors";
import Screen from "../components/Screen";

function MovieScreen(props) {
  const [data, setData] = useState({
    selectedMovie: null,
  });
  const apiKey = "33a7326d941e6de613d285854b52eb67";
  const apiReq = async () => {
    const resSelectedMovie = await axios(
      `https://api.themoviedb.org/3/movie/200?api_key=${apiKey}`
    );
    setData({
      selectedMovie: resSelectedMovie.data,
    });
    console.log(data.selectedMovie);
  };

  useEffect(() => {
    apiReq();
  }, []);

  return (
    <Screen style={styles.container}>
      <View style={styles.card}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${data.selectedMovie.poster_path}`,
            }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.title}>{data.selectedMovie.title}</Text>
          </View>
          <View>
            <Text style={styles.rating}>
              ★ {Number(data.selectedMovie.vote_average).toFixed(1)} |
              {data.selectedMovie.release_date}
            </Text>
          </View>
          <View>
            <Text style={styles.description}>
              {data.selectedMovie.overview}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={apiReq} style={styles.button}>
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
