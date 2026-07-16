export interface TattooItem {
  src: string;
  alt: string;
  title: string;
  category: string;
  width: number;
  height: number;
  /** Marks a piece to be displayed larger in the editorial grid */
  featured?: boolean;
}

export interface PaintingItem {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
}

export interface CoverUpImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CoverUpPair {
  id: string;
  title: string;
  note: string;
  before: CoverUpImage;
  after: CoverUpImage;
  /** "slider" for an interactive drag comparison, "side-by-side" for two independent frames */
  displayMode: "slider" | "side-by-side";
  /** Marks the pair used as the showcase comparison at the top of the section */
  featured?: boolean;
  imageFit?: "cover" | "contain";
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
}

export const tattoos: TattooItem[] = [
  {
    src: "/images/portfolio/tattoo-lion-courrone01.jpg",
    alt: "Tatouage réaliste d'un lion couronné, création de Lucy Célestattoo",
    title: "Lion couronné",
    category: "Réalisme animalier",
    width: 341,
    height: 629,
  },
  {
    src: "/images/portfolio/tattoo-indienne02.jpg",
    alt: "Tatouage réaliste d'un portrait amérindien",
    title: "Portrait amérindien",
    category: "Portrait",
    width: 341,
    height: 929,
  },
  {
    src: "/images/portfolio/tattoo-tete-de-mort03.jpg",
    alt: "Tatouage réaliste d'une tête de mort",
    title: "Tête de mort",
    category: "Réalisme",
    width: 597,
    height: 946,
  },
  {
    src: "/images/portfolio/tattoo-scorpion04.jpg",
    alt: "Tatouage réaliste d'un scorpion",
    title: "Scorpion",
    category: "Réalisme animalier",
    width: 394,
    height: 861,
  },
  {
    src: "/images/portfolio/tattoo-de-dos05.jpg",
    alt: "Tatouage composé sur l'ensemble du dos",
    title: "Pièce dans le dos",
    category: "Pièce complète",
    width: 422,
    height: 459,
    featured: true,
  },
  {
    src: "/images/portfolio/tattoo-orignale06.jpg",
    alt: "Tatouage réaliste d'un orignal",
    title: "Orignal",
    category: "Réalisme animalier",
    width: 594,
    height: 627,
  },
  {
    src: "/images/portfolio/tattoo-renard07.jpg",
    alt: "Tatouage réaliste d'un renard",
    title: "Renard",
    category: "Réalisme animalier",
    width: 425,
    height: 863,
  },
  {
    src: "/images/portfolio/tattoo-papillon08.jpg",
    alt: "Tatouage délicat d'un papillon",
    title: "Papillon",
    category: "Nature",
    width: 510,
    height: 480,
  },
  {
    src: "/images/portfolio/tattoo-full-manche09.jpg",
    alt: "Tatouage composé sur une manche complète",
    title: "Manche complète",
    category: "Pièce complète",
    width: 345,
    height: 950,
  },
  {
    src: "/images/portfolio/tattoo-jesus10.jpg",
    alt: "Tatouage réaliste d'un portrait de Jésus",
    title: "Jésus",
    category: "Portrait",
    width: 604,
    height: 834,
    featured: true,
  },
  {
    src: "/images/portfolio/tattoo-full-back11.jpg",
    alt: "Tatouage composé sur l'ensemble du dos",
    title: "Dos complet",
    category: "Pièce complète",
    width: 422,
    height: 714,
  },
  {
    src: "/images/portfolio/tattoo-jungle12.jpg",
    alt: "Tatouage réaliste inspiré de la jungle",
    title: "Jungle",
    category: "Nature",
    width: 423,
    height: 945,
  },
  {
    src: "/images/portfolio/tattoo-eagle13.jpg",
    alt: "Tatouage réaliste d'un aigle",
    title: "Aigle",
    category: "Réalisme animalier",
    width: 598,
    height: 698,
  },
  {
    src: "/images/portfolio/tattoo-oiseau14.jpg",
    alt: "Tatouage réaliste d'un oiseau",
    title: "Oiseau",
    category: "Nature",
    width: 471,
    height: 891,
  },
  {
    src: "/images/portfolio/tattoo-fast-money15.jpg",
    alt: "Tatouage de lettrage \"Fast Money\"",
    title: "Fast Money",
    category: "Lettrage",
    width: 300,
    height: 579,
  },
  {
    src: "/images/portfolio/tattoo-hiboux16.jpg",
    alt: "Tatouage réaliste d'un hibou",
    title: "Hibou",
    category: "Réalisme animalier",
    width: 407,
    height: 651,
  },
  {
    src: "/images/portfolio/tattoo-lion-jesus17.jpg",
    alt: "Tatouage réaliste combinant un lion et un portrait de Jésus",
    title: "Lion et Jésus",
    category: "Portrait",
    width: 473,
    height: 940,
  },
  {
    src: "/images/portfolio/tattoo-full-bras18.jpg",
    alt: "Tatouage composé sur un bras complet",
    title: "Bras complet",
    category: "Pièce complète",
    width: 384,
    height: 922,
  },
];

export const paintings: PaintingItem[] = [
  {
    src: "/images/paintings/cheval-brun01.jpg",
    alt: "Peinture réaliste d'un cheval brun",
    title: "Cheval brun",
    width: 769,
    height: 949,
  },
  {
    src: "/images/paintings/chien-noir-blanc02.png",
    alt: "Peinture réaliste d'un chien en noir et blanc",
    title: "Chien noir et blanc",
    width: 431,
    height: 798,
  },
  {
    src: "/images/paintings/girrafe-bleu03.jpg",
    alt: "Peinture d'une girafe aux teintes bleues",
    title: "Girafe bleue",
    width: 383,
    height: 751,
  },
  {
    src: "/images/paintings/leopard-orange04.jpg",
    alt: "Peinture réaliste d'un léopard aux teintes orangées",
    title: "Léopard orange",
    width: 557,
    height: 846,
  },
  {
    src: "/images/paintings/lion-blanc-rouge05.png",
    alt: "Peinture d'un lion en blanc et rouge",
    title: "Lion blanc et rouge",
    width: 344,
    height: 409,
  },
  {
    src: "/images/paintings/lion-moitier06.png",
    alt: "Peinture d'un lion à la composition mi-figurative",
    title: "Mi-lion",
    width: 471,
    height: 805,
  },
  {
    src: "/images/paintings/panda-bamboo07.png",
    alt: "Peinture réaliste d'un panda dans du bambou",
    title: "Panda et bambou",
    width: 927,
    height: 928,
  },
  {
    src: "/images/paintings/panthere-noir08.jpg",
    alt: "Peinture réaliste d'une panthère noire",
    title: "Panthère noire",
    width: 458,
    height: 945,
  },
  {
    src: "/images/paintings/pirate-caraîbe09.jpg",
    alt: "Peinture réaliste d'un pirate caribéen",
    title: "Pirate caribéen",
    width: 533,
    height: 946,
  },
  {
    src: "/images/paintings/tigre-blanc-orange-jungle10.jpg",
    alt: "Peinture d'un tigre blanc et orange dans la jungle",
    title: "Tigre blanc, jungle",
    width: 424,
    height: 426,
  },
  {
    src: "/images/paintings/tigre-blanc11.jpg",
    alt: "Peinture réaliste d'un tigre blanc",
    title: "Tigre blanc",
    width: 624,
    height: 641,
  },
  {
    src: "/images/paintings/tigre-jungle12.jpg",
    alt: "Peinture d'un tigre dans la jungle",
    title: "Tigre dans la jungle",
    width: 1266,
    height: 863,
  },
  {
    src: "/images/paintings/tigre-moitier-lion13.jpg",
    alt: "Peinture d'une composition mi-tigre, mi-lion",
    title: "Mi-tigre, mi-lion",
    width: 1167,
    height: 945,
  },
  {
    src: "/images/paintings/tigre-regard-profond14.jpg",
    alt: "Peinture réaliste d'un tigre au regard profond",
    title: "Tigre au regard profond",
    width: 952,
    height: 949,
  },
  {
    src: "/images/paintings/vache-beige15.png",
    alt: "Peinture d'une vache aux teintes beiges",
    title: "Vache beige",
    width: 459,
    height: 949,
  },
  {
    src: "/images/paintings/zebre-wow16.jpg",
    alt: "Peinture réaliste d'un zèbre",
    title: "Zèbre",
    width: 462,
    height: 949,
  },
];

export const coverUps: CoverUpPair[] = [
  {
    id: "01",
    title: "Transformation 01",
    note: "Cover-up personnalisé",
    before: {
      src: "/images/coverups/coverup-01-before.jpg",
      alt: "Ancien tatouage avant le cover-up, transformation 01",
      width: 180,
      height: 505,
    },
    after: {
      src: "/images/coverups/coverup-01-after.jpg",
      alt: "Résultat du cover-up personnalisé, transformation 01",
      width: 199,
      height: 505,
    },
    displayMode: "side-by-side",
  },
  {
    id: "02",
    title: "Transformation 02",
    note: "Cover-up personnalisé",
    before: {
      src: "/images/coverups/coverup-02-before.jpg",
      alt: "Ancien tatouage avant le cover-up, transformation 02",
      width: 432,
      height: 811,
    },
    after: {
      src: "/images/coverups/coverup-02-after.jpg",
      alt: "Résultat du cover-up personnalisé, transformation 02",
      width: 470,
      height: 812,
    },
    displayMode: "side-by-side",
  },
  {
    id: "03",
    title: "Transformation 03",
    note: "Cover-up personnalisé",
    before: {
      src: "/images/coverups/coverup-03-before.jpg",
      alt: "Ancien tatouage avant le cover-up, transformation 03",
      width: 514,
      height: 406,
    },
    after: {
      src: "/images/coverups/coverup-03-after.jpg",
      alt: "Résultat du cover-up personnalisé, transformation 03",
      width: 632,
      height: 407,
    },
    displayMode: "side-by-side",
  },
  {
    id: "04",
    title: "Transformation 04",
    note: "Cover-up personnalisé",
    before: {
      src: "/images/coverups/coverup-04-before.jpg",
      alt: "Ancien tatouage avant le cover-up, transformation 04",
      width: 681,
      height: 846,
    },
    after: {
      src: "/images/coverups/coverup-04-after.jpg",
      alt: "Résultat du cover-up personnalisé, transformation 04",
      width: 531,
      height: 638,
    },
    displayMode: "slider",
    featured: true,
    imageFit: "contain",
    beforeObjectPosition: "center",
    afterObjectPosition: "center",
  },
  {
    id: "05",
    title: "Transformation 05",
    note: "Cover-up personnalisé",
    before: {
      src: "/images/coverups/coverup-05-before.jpg",
      alt: "Ancien tatouage avant le cover-up, transformation 05",
      width: 505,
      height: 592,
    },
    after: {
      src: "/images/coverups/coverup-05-after.jpg",
      alt: "Résultat du cover-up personnalisé, transformation 05",
      width: 636,
      height: 590,
    },
    displayMode: "side-by-side",
  },
  {
    id: "06",
    title: "Transformation 06",
    note: "Cover-up personnalisé",
    before: {
      src: "/images/coverups/coverup-06-before.jpg",
      alt: "Ancien tatouage avant le cover-up, transformation 06",
      width: 436,
      height: 809,
    },
    after: {
      src: "/images/coverups/coverup-06-after.jpg",
      alt: "Résultat du cover-up personnalisé, transformation 06",
      width: 593,
      height: 809,
    },
    displayMode: "side-by-side",
  },
  {
    id: "07",
    title: "Transformation 07",
    note: "Cover-up personnalisé",
    before: {
      src: "/images/coverups/coverup-07-before.jpg",
      alt: "Ancien tatouage avant le cover-up, transformation 07",
      width: 490,
      height: 707,
    },
    after: {
      src: "/images/coverups/coverup-07-after.jpg",
      alt: "Résultat du cover-up personnalisé, transformation 07",
      width: 534,
      height: 706,
    },
    displayMode: "side-by-side",
  },
  {
    id: "08",
    title: "Transformation 08",
    note: "Cover-up personnalisé",
    before: {
      src: "/images/coverups/coverup-08-before.jpg",
      alt: "Ancien tatouage avant le cover-up, transformation 08",
      width: 492,
      height: 516,
    },
    after: {
      src: "/images/coverups/coverup-08-after.jpg",
      alt: "Résultat du cover-up personnalisé, transformation 08",
      width: 594,
      height: 515,
    },
    displayMode: "side-by-side",
  },
];
