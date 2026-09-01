import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

function HeroSliderLoading() {
  return (
    <>
      <div className="hero-slider-loading">
        <div className="hero">
          <div className="container">
            <Swiper
              pagination={true}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="content">
                  <h4 className="skeltion"></h4>
                  <h3 className="skeltion"></h3>
                  <p className="skeltion"></p>
                  <p className="link skeltion"></p>
                </div>
                <div className="image skeltion"></div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSliderLoading;
