import styles from './styles.module.css';
import {Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

export const Banner = () => {
  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={1}
        className={styles.swiper}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        <SwiperSlide className={styles.slide}><div className={styles.slideImg}>1</div></SwiperSlide>
        <SwiperSlide className={styles.slide}><div className={styles.slideImg}>2</div></SwiperSlide>
      </Swiper>
    </div>
  );
}