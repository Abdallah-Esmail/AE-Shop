import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

function ProductsSliderLoading() {
  return (
    <div className="loading-products-slider">
      <div className="products-slide slide">
        <div className="container">
          <div className="top-slide">
            <h2 className="skeltion"></h2>
            <p className="skeltion"></p>
          </div>
          <Swiper
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
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
            <SwiperSlide>
              <div className="product">
                <div className="product-img"></div>

                <div className="info skeltion"></div>
                <div className="info skeltion"></div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="product">
                <div className="product-img"></div>
                <div className="info skeltion"></div>
                <div className="info skeltion"></div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="product">
                <div className="product-img"></div>
                <div className="info skeltion"></div>
                <div className="info skeltion"></div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="product">
                <div className="product-img"></div>
                <div className="info skeltion"></div>
                <div className="info skeltion"></div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="product">
                <div className="product-img"></div>
                <div className="info skeltion"></div>
                <div className="info skeltion"></div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default ProductsSliderLoading;
