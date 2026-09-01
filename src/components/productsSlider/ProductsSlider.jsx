// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";

// Product Imports
import Product from "../product/Product";
import "./productsSlider.css";
import { useGetProductsQuery } from "../../api/productApi";
import ProductsSliderLoading from "./ProductsSliderLoading";
import PageTransition from "../PageTransition";

function ProductsSlider({ category, currentProductId }) {
  const { data, isLoading } = useGetProductsQuery({
    category: category?.slug,
  });
  const products = currentProductId
    ? data?.data?.filter((ele) => ele._id !== currentProductId)
    : data?.data;
  if (isLoading) {
    return <ProductsSliderLoading />;
  }
  if (!products || products.length === 0) {
    return null;
  }
  return (
    <PageTransition>
      <div className="products-slide slide">
        <div className="container">
          <div className="top-slide">
            <h2>{category?.name}</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam,
              perspiciatis.
            </p>
          </div>
          <Swiper
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              500: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 5,
              },
            }}
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {products?.map((product) => (
              <SwiperSlide key={product?._id}>
                <Product {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </PageTransition>
  );
}

export default ProductsSlider;
