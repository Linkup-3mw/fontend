/*global kakao*/
'use client';
import Script from 'next/script';
import { useSetRecoilState } from 'recoil';
import { mapState } from '../../atom/search';
declare global {
  interface Window {
    kakao: any;
  }
}
const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

interface MapProps {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}
export default function ComponentMap({ lat, lng, zoom }: MapProps) {
  const setMap = useSetRecoilState(mapState);

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: 2,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
    });
  };
  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full relative h-screen"></div>
    </>
  );
}
