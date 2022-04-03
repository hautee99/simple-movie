import React from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const Banners = () => {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=75e30f6866b92ab202d7564db5ca81ce`,
    fetcher
  );
  const movies = data?.results || [];

  return (
    <section className="banner h-[500px] mb-20 page-container overflow-hidden">
      <Swiper grabCursor={true} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

const BannerItem = ({ item }) => {
  const navigate = useNavigate();
  const { title, vote_average, release_date, poster_path, id } = item;

  return (
    <div className="w-full h-full rounded-lg b relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(37,34,34,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-3 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-3 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-3 px-4 border border-white rounded-md">
            Adventure
          </span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)} className="w-auto">
          Watch now
        </Button>
      </div>
    </div>
  );
};
export default Banners;
