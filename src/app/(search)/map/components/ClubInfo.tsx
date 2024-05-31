import 'swiper/swiper-bundle.css';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentBuildingState } from '../../atom/search';
import { useFormattedDate } from '../hooks/getCreateAt';

export default function ClubInfo() {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentBuilding = useRecoilValue(currentBuildingState);
  const club = currentBuilding?.clubs;

  const handleNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };
  return (
    <div className="flex flex-col items-center relative mb-4">
      <div className="flex justify-between items-center w-full mb-4 px-3">
        <p className="text-[20px] leading-7 font-bold">소모임</p>
      </div>
      <div className="flex w-full overflow-hidden relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={-110}
          loop={true}
          initialSlide={currentIndex}
          onSwiper={setSwiper}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        >
          {club?.map((club, index) => (
            <SwiperSlide key={index}>
              {/* 나중에 소모임 이미지 들어감 */}
              <div className="bg-gray-300 w-[18.75rem] h-[9.375rem] rounded-t-lg"></div>
              <div className="p-3 w-[18.75rem] h-[9.625rem] relative bg-white rounded-b-lg shadow-lg">
                <div className="flex flex-col w-[16.75rem] gap-2 mb-2">
                  <span className="font-bold leading-[1.375rem]">
                    {club.title}
                  </span>
                  <div className="flex flex-col gap-1">
                    {/* TODO : 오버되는 글씨 ... 추가하기 */}
                    <span className="text-sm leading-[1.25rem]">
                      안녕하세요 음악을 사랑하는 사람들이 모인 모임입니다.
                    </span>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/svg/map/location.svg"
                          width={24}
                          height={24}
                          alt="위치 이미지"
                        />
                        <p className="text-xs font-medium leading-5">
                          {currentBuilding?.building.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image
                          src="/svg/map/freind.svg"
                          width={24}
                          height={24}
                          alt="친구 이미지"
                        />
                        <p className="text-xs font-medium leading-5">5/10</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-[0.9rem] p-2 font-bold rounded-lg bg-[#F9D91B] h-[1.5rem] leading-3 inline-block">
                  {club.category}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="absolute flex justify-between items-center top-1/2 transform -translate-y-1/2 w-[110%] px-2 z-50">
        <button onClick={handlePrev} className="focus:outline-none">
          <Image
            src="/svg/map/review_arrow_left.svg"
            alt="arrow_left"
            width={40}
            height={40}
          />
        </button>
        <button onClick={handleNext} className="focus:outline-none">
          <Image
            src="/svg/map/review_arrow_right.svg"
            alt="arrow_right"
            width={40}
            height={40}
          />
        </button>
      </div>
    </div>
  );
}
