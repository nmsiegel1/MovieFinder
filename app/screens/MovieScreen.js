import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { TMDB_API_KEY } from "@env";

import colors from "../config/colors";
import Loader from "../components/Loader";
import Screen from "../components/Screen";

function MovieScreen({ route, navigation }) {
  const { id } = route.params;

  const [selectedMovie, setSelectedMovie] = useState();
  const [loading, setLoading] = useState(true);

  const apiKey = TMDB_API_KEY;

  const apiReq = async () => {
    try {
      const respSelectedMovie = await axios(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      );
      setSelectedMovie(respSelectedMovie.data);
    } catch (err) {
      console.log(err);
    }
    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiReq();
  }, []);

  return (
    <Screen style={styles.container}>
      {loading ? (
        <Loader />
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
            <ScrollView>
              <Text style={styles.description}>{selectedMovie.overview}</Text>
            </ScrollView>
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
