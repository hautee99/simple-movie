import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbApi } from "../../config";
import Button from "../button/Button";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
      <img
        src={tmdbApi.image500(poster_path)}
        alt=""
        className="object-cover w-full h-[250px] rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className=" text-xl mb-3 font-bold">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch Now</Button>
        {/* <button
          onClick={() => navigate(`/movie/${id}`)}
          className="py-3 px-6 rounded-lg capitalize bg-primary w-full mt-auto"
        >
          Watch Now
        </button> */}
      </div>
    </div>
  );
};

export default MovieCard;
