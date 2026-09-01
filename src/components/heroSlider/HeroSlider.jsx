import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { useGetCategoriesQuery } from "../../api/categoriesApi";
import PageTransition from "../PageTransition";
import HeroSliderLoading from "./HeroSliderLoading";

function HeroSlider({ choosenCategories }) {
  const { data, isLoading } = useGetCategoriesQuery();
  const categories = data?.data;
  if (isLoading) return <HeroSliderLoading />;
  return (
    <>
      <PageTransition>
        <div className="hero">
          <div className="container">
            <Swiper
              pagination={true}
              loop={true}
              modules={[Pagination, Autoplay]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
              className="mySwiper"
            >
              {categories?.map((category) => {
                return choosenCategories.includes(category?.name) ? (
                  <SwiperSlide key={category?._id}>
                    <div className="content">
                      <h4>Discover Our New Collection</h4>
                      <h3>{category?.name}</h3>
                      <p>Upgrade your lifestyle with our premium selection.</p>
                      <Link
                        to={`/categories/${category?.slug}`}
                        className="btn"
                      >
                        Shop Now
                      </Link>
                    </div>
                    <img
                      src={category?.image}
                      alt={`${category?.title} slider`}
                    />
                  </SwiperSlide>
                ) : (
                  ""
                );
              })}
            </Swiper>
          </div>
        </div>
      </PageTransition>
    </>
  );
}

export default HeroSlider;
