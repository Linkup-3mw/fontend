import { OfficeBuilding } from '@/types/office/office';
import { currentBuildingState } from '../../atom/search';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useState } from 'react';
import Image from 'next/image';

interface BuildingItemProps {
  officeBuildings: OfficeBuilding[] | null;
}
export default function BuildingItem({ officeBuildings }: BuildingItemProps) {
  const [showInfo, setShowInfo] = useState(false);
  const setCurrentBuilding = useSetRecoilState<OfficeBuilding | null>(
    currentBuildingState,
  );

  
  return (
    <>
      {officeBuildings?.map((office, index) => (
        <div
          key={index}
          className="flex justify-center p-2 md:rounded-lg mb:rounded-sm z-40 "
          onClick={() => {
            setCurrentBuilding(office);
            setShowInfo(true);
          }}
          
        >
          <div className="md:w-[26.6875rem] md:h-[8.5rem] mb:w-[20.5rem] mb:h-[5.875rem]  
          flex gap-5 p-4 items-center bg-white rounded-md active:bg-blue-500 active:rounded-md active:text-white">
            <div>
              <Image
                src="/images/office/check.png"
                width={88}
                height={88}
                alt={`${office.building.location}`}
              />
            </div>
            <div className="flex flex-col mb:w-[14.125rem] md:w-[16.6875rem] mb:h-[3.875rem] md:h-[5.125rem] justify-between">
              <div className="flex justify-between">
                <p className="font-bold mb:text-[1rem] md:text-lg">{office.building.location}</p>
                {office.reviews &&
                  office.reviews.avg_rating &&
                  office.reviews.review_count && (
                    <div className="flex items-center">
                      <Image
                        src="/svg/map/star.svg"
                        width={18}
                        height={18}
                        alt="별"
                      />
                      {office.reviews.avg_rating}.0 (
                      {office.reviews.review_count})
                    </div>
                  )}
              </div>
              <p className="text-gray-300 mb:text-[0.625rem] md:text-sm">
                {office.building.traffic_info}
              </p>
              <div className="flex gap-4 justify-between mb:text-[0.625rem] md:text-xs">
                <p>
                  {office.building.street} {office.building.adress}
                </p>
                <div>
                  <button className="bg-blue-400 rounded-lg mb:w-[3.375rem] mb:h-[1.4375rem] md:w-[3.8125rem] md:h-[1.6875rem] text-white p-1">
                    바로 예약
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
