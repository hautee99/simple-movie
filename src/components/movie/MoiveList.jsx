import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbApi } from "../../config";

// https://api.themoviedb.org/3/movie/now_playing?api_key=75e30f6866b92ab202d7564db5ca81ce
const MoiveList = ({ type = "now_playing" }) => {
  const [movies, setMovie] = useState([]);
  const { data, error } = useSWR(tmdbApi.getMovieList(type), fetcher);

  useEffect(() => {
    if (data && data.results) setMovie(data.results);
  }, [data]);

  return (
    <div className="movie-list">
      <Swiper grapCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MoiveList;
