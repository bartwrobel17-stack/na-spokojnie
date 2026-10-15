export type MenuItem = {
  id: number;
  title: string;
  description: string;
  price: string;
  image?: string;
};

export const heroImage = "https://upload.wikimedia.org/wikipedia/commons/7/77/Gourmet_Hamburger_%28Unsplash%29.jpg";

export const business = {
  name: "Na Spokojnie",
  address: "Grota-Roweckiego 71, 52-218 Wrocław",
  phoneDisplay: "577 722 263",
  phoneHref: "tel:+48577722263",
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=Grota-Roweckiego+71,+52-218+Wroc%C5%82aw",
  mapsEmbed: "https://www.google.com/maps?q=Grota-Roweckiego+71,+Wroc%C5%82aw&output=embed",
  rating: "5,0",
  reviewCount: 451,
  priceRange: "20–40 zł / osoba",
};

export const starterGallery = [
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QJWIsEXmPmLJZ6FUqn3ENs0HH8USBw2CK8Kqu75OXd00ui1aepQyPaguV59XGvdTZifSb2pb4xRy4XpKcgFT0e7uNDzDryOt76W1q3x_mK4ww8JaV_Fx0yuiZNKbVHkh3B3ebJnNeI2uQ=w397-h298-k-no",
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9ThNNKQiv2cxYVrq09vTkvSEAh5SAngTjgzAovMo5yHCI3_KyYSwArpVgthC56ExlIJ7Us5D51Hea-e5hWb1_6Nqy15WDh8Le2xKCfKBJ9HNc9VwHrQTGHkfvVhkvAFAPZIaU97Gp_wQ=w224-h380-k-no",
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Rg_AiHGn0bRbn-HQBUOZKCzOF4MUygvdhDgbGB1W8PcZ3NpPDfrsoXpL-5_9BqKKHkVHM7fc101Fi3TZSxrn-2XFV9eQsrNgBXthrq7j7-PQO5Ar4gzh2vxQzrzvRoatDmSq3ScfP-nIQ=w224-h398-k-no",
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TEFgw1ex6voWHl6B2mRczK15BbTvo_yawE1cZCnARg0ZKxIB630n6yiITw92RctiYPaMZb6oBGdf81CVRbMbOdf2Wt9JlH4bSLU2Ea50euqEeEoMC2x1x_LL8hO01qC1ymbNd4lqeJuWdG=w224-h316-k-no",
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QUIwQsh5HgphXVTX9XZWzRN9hRP7X6SLPm-EyNp3FgCC1TARbv0vy4v9jUnuohVMZPB8fJvTuTJFq0MhviQossgjXq-vdegRCDv1P-tzZDom2OBDUUW2Fhd3nX2i3RXg3IcgYKpxPTJtjm=w224-h398-k-no",
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QNbBDOD9xQ9BEHiO2BxBP0OePzJIRlZOVDXPJ0zo14wXfQtRKz8YTGHECvXcbuohMNOAH1HvoRoxAfHMEwu6902OpXdKJxczax3Rszjv315RK2Pth2aZfSBNTQh9RKg78SYpVqv5USmnY=w396-h298-k-no",
];

export const defaultMenu: MenuItem[] = [
  {
    id: 1,
    title: "Burgery",
    description: "Soczyste, konkretne i bez zbędnych kombinacji.",
    price: "Sprawdź aktualną cenę",
  },
  {
    id: 2,
    title: "Smash Burger z batatami",
    description: "Jedna z pozycji wskazanych w menu restauracji.",
    price: "Sprawdź aktualną cenę",
    image: starterGallery[0],
  },
  {
    id: 3,
    title: "Śniadania",
    description: "Na dobry początek dnia albo spokojny brunch.",
    price: "Sprawdź aktualną cenę",
  },
];

export const reviews = [
  {
    name: "Bartek Kasza",
    text: "Świetne miejsce z mega klimatem! Jedzenie naprawdę pyszne, wszystko świeże i dobrze podane.",
  },
  {
    name: "Bercik",
    text: "Świetne miejsce z klimatem, można w przyjemnej atmosferze zjeść śniadanie i nie tylko :)",
  },
  {
    name: "zukatocm zukato",
    text: "Bardzo smaczne, fajny klimat, wszystko świeże i „na spokojnie”",
  },
];
