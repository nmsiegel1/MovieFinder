import React, { useState } from "react";
import axios from "axios";

import colors from "../config/colors";
import { TMDB_API_KEY } from "@env";

function HomeScreen() {
  const [data, setData] = useState({
    searchedMovies: null,
    nowPlaying: null,
    topRatedMovies: null,
  });
  const [loading, setLoading] = useState(true);
  const apiKey = TMDB_API_KEY;
  const apiReq = async () => {
    const resSearchedMovies = await axios(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=batman`
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
}

const styles = StyleSheet.create({});

export default HomeScreen;
