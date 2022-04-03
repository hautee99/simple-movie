import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { apiKey, fetcher, tmdbApi } from "../config";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbApi.getMovieSetails(movieId), fetcher);
  if (!data) return;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bottom-0  bg-black bg-opacity-70 "></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbApi.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={tmdbApi.imageOriginal(poster_path)}
          className="w-full h-full object-cover rounded-xl"
          alt=""
        />
      </div>
      <h1 className="text-center text-4xl mb-10 font-bold text-white">
        {title}
      </h1>

      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              className="py-2 px-4 border-primary text-primary border rounded"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieCreadits></MovieCreadits>
      <MovieVideo></MovieVideo>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};

function MovieCreadits() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbApi.getMovieInfo(movieId, "credits"),
    fetcher
  );
  if (!data) return;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-center text-3xl mb-10">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={tmdbApi.imageOriginal(item.profile_path)}
              className="w-full h-[350px] object-cover rounded-lg mb-5"
              alt=""
            />
            <h3 className="text-xl font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieVideo() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbApi.getMovieInfo(movieId, "videos"),
    fetcher
  );
  if (!data) return null;
  console.log(data);
  const { results } = data;
  if (!results || results.length < 0) return null;
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 3).map((item) => (
          <div key={item.id}>
            <h3 className="mb-5 text-xl font-medium">{item.name}</h3>
            <div key={item.id} className="w-full aspect-video">
              <iframe
                width="840"
                height="473"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                className="w-full h-full object-fill"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function MovieSimilar() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbApi.getMovieInfo(movieId, "similar"),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length < 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
      <div className="movie-list">
        <Swiper grapCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
