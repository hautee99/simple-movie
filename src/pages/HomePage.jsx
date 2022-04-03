import React, { Fragment } from "react";
import Banners from "../components/banner/Banners";
import MoiveList from "../components/movie/MoiveList";

const HomePage = () => {
  return (
    <Fragment>
      <Banners></Banners>
      <section className="movie-layout page-container mb-20">
        <h2 className="capitalize text-white mb-10 text-2xl font-bold">
          Now playing
        </h2>
        <MoiveList></MoiveList>
      </section>
      <section className="movie-layout page-container mb-20">
        <h2 className="capitalize text-white mb-10 text-2xl font-bold">
          Top Rated
        </h2>
        <MoiveList type="top_rated"></MoiveList>
      </section>
      <section className="movie-layout page-container mb-10">
        <h2 className="capitalize text-white mb-10 text-2xl font-bold">
          Trending
        </h2>
        <MoiveList type="popular"></MoiveList>
      </section>
    </Fragment>
  );
};

export default HomePage;
