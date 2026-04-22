export type LifeAtYaanaGalleryImage = {
  src: string;
  width: number;
  height: number;
};

export type LifeAtYaanaGallery = {
  id: string;
  title: string;
  images: LifeAtYaanaGalleryImage[];
};

export const LIFE_GALLERIES: LifeAtYaanaGallery[] = [
  {
    id: "yaana-signature",
    title: "YAANA Signature",
    images: [
      { src: "/assets/gallery/yaana-signature/yaana-signature-01.jpeg", width: 853, height: 1280 },
      // { src: "/assets/gallery/yaana-signature/yaana-signature-02.jpeg", width: 853, height: 1280 },
      { src: "/assets/gallery/yaana-signature/yaana-signature-03.jpeg", width: 853, height: 1280 },
      { src: "/assets/gallery/yaana-signature/yaana-signature-04.jpeg", width: 1205, height: 880 },
      { src: "/assets/gallery/yaana-signature/yaana-signature-05.jpeg", width: 471, height: 703 },
      { src: "/assets/gallery/yaana-signature/yaana-signature-06.jpeg", width: 853, height: 1280 },
      { src: "/assets/gallery/yaana-signature/yaana-signature-07.jpeg", width: 853, height: 1280 },
      { src: "/assets/gallery/yaana-signature/yaana-signature-08.jpeg", width: 1280, height: 853 },
      { src: "/assets/gallery/yaana-signature/yaana-signature-09.jpeg", width: 1030, height: 734 },
      { src: "/assets/gallery/yaana-signature/yaana-signature-10.jpeg", width: 1075, height: 1280 },
      { src: "/assets/gallery/yaana-signature/yaana-signature-11.jpeg", width: 1280, height: 720 },
      { src: "/assets/gallery/yaana-signature/yaana-signature-12.jpeg", width: 853, height: 1280 },
      { src: "/assets/gallery/yaana-signature/yaana-signature-13.jpeg", width: 470, height: 696 },
      { src: "/assets/gallery/yaana-signature/yaana-signature-14.jpeg", width: 1214, height: 880 },
      { src: "/assets/gallery/yaana-signature/yaana-signature-15.jpeg", width: 844, height: 1264 },
    ],
  },
  {
    id: "yaana-livings",
    title: "YAANA Living",
    images: [
      { src: "/assets/gallery/yaana-livings/yaana-livings-01.jpeg", width: 1195, height: 896 },
      { src: "/assets/gallery/yaana-livings/yaana-livings-02.jpeg", width: 1264, height: 841 },
      { src: "/assets/gallery/yaana-livings/yaana-livings-03.jpeg", width: 1264, height: 841 },
      { src: "/assets/gallery/yaana-livings/yaana-livings-04.jpeg", width: 1264, height: 841 },
      { src: "/assets/gallery/yaana-livings/yaana-livings-05.jpeg", width: 1195, height: 896 },
      { src: "/assets/gallery/yaana-livings/yaana-livings-06.jpeg", width: 1195, height: 896 },
      { src: "/assets/gallery/yaana-livings/yaana-livings-07.jpeg", width: 1192, height: 896 },
      { src: "/assets/gallery/yaana-livings/yaana-livings-08.jpeg", width: 1264, height: 841 },
      { src: "/assets/gallery/yaana-livings/yaana-livings-09.jpeg", width: 1264, height: 841 },
      { src: "/assets/gallery/yaana-livings/yaana-livings-10.jpeg", width: 1264, height: 841 },
    ],
  },
  {
    id: "yaana-comforts",
    title: "YAANA Comforts",
    images: [
      { src: "/assets/gallery/yaana-comforts/yaana-comforts-01.jpeg", width: 896, height: 1192 },
      { src: "/assets/gallery/yaana-comforts/yaana-comforts-02.jpeg", width: 1195, height: 896 },
      { src: "/assets/gallery/yaana-comforts/yaana-comforts-03.jpeg", width: 1081, height: 992 },
      { src: "/assets/gallery/yaana-comforts/yaana-comforts-04.jpeg", width: 720, height: 1280 },
      { src: "/assets/gallery/yaana-comforts/yaana-comforts-05.jpeg", width: 1192, height: 896 },
      { src: "/assets/gallery/yaana-comforts/yaana-comforts-06.jpeg", width: 896, height: 1192 },
      { src: "/assets/gallery/yaana-comforts/yaana-comforts-07.jpeg", width: 896, height: 1192 },
    ],
  },
  {
    id: "yaana-homes",
    title: "YAANA Home",
    images: [
      { src: "/assets/gallery/yaana-homes/yaana-homes-01.jpeg", width: 1192, height: 896 },
      { src: "/assets/gallery/yaana-homes/yaana-homes-02.jpeg", width: 896, height: 1195 },
      { src: "/assets/gallery/yaana-homes/yaana-homes-03.jpeg", width: 896, height: 1195 },
      { src: "/assets/gallery/yaana-homes/yaana-homes-04.jpeg", width: 1195, height: 896 },
    ],
  },
];

