// store/productAiSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const lastSuccessfulData = {
  title: "Gold & Aquamarine Ring",
  description: {
    summary:
      "Elegant gold ring featuring aquamarine gemstones. A unique design for a sophisticated look.",
    detailed:
      "This stunning ring showcases a unique design with a slender band of gold that appears to be intersected by two separate gold bars. The primary band is fully encrusted with beautiful, light blue aquamarine gemstones that provide a subtle sparkle. The gold has a soft, brushed appearance. This piece provides a blend of modern design and classic elegance.",
  },
  hashtags: [
    "#goldring",
    "#aquamarinering",
    "#jewelry",
    "#fashionring",
    "#gemstonering",
    "#luxurydesign",
    "#statementring",
    "#finejewelry",
  ],
  translations: {
    es: {
      title: "Anillo de Oro y Aguamarinas",
      description: {
        summary:
          "Elegante anillo de oro con gemas de aguamarina. Un diseño único para un look sofisticado.",
        detailed:
          "Este impresionante anillo presenta un diseño único con una delgada banda de oro que parece estar intersectada por dos barras de oro separadas. La banda principal está completamente incrustada con hermosas gemas de aguamarina azul claro que brindan un brillo sutil. El oro tiene un aspecto suave y cepillado. Esta pieza proporciona una combinación de diseño moderno y elegancia clásica.",
      },
      hashtags: [
        "#anillodeoro",
        "#anillodeaguamarina",
        "#joyería",
        "#anillodemoda",
        "#anillodegemas",
        "#diseñodelujo",
        "#anillodeclaración",
        "#joyasfinas",
      ],
    },
    fr: {
      title: "Bague en Or et Aigue-marine",
      description: {
        summary:
          "Élégante bague en or ornée de pierres précieuses aigue-marine. Un design unique pour un look sophistiqué.",
        detailed:
          "Cette magnifique bague présente un design unique avec un fin anneau en or qui semble être croisé par deux barres d'or distinctes. L'anneau principal est entièrement incrusté de magnifiques pierres précieuses aigue-marine bleu clair qui offrent un éclat subtil. L'or a un aspect doux et brossé. Cette pièce offre un mélange de design moderne et d'élégance classique.",
      },
      hashtags: [
        "#bagueenor",
        "#bagueaigue-marine",
        "#bijoux",
        "#baguefantaisie",
        "#baguepierresprécieuses",
        "#designluxe",
        "#baguedeclaration",
        "#joaillerie",
      ],
    },
    日本語: {
      title: "ゴールド＆アクアマリンリング",
      description: {
        summary:
          "アクアマリンの宝石をあしらったエレガントなゴールドリング。洗練された外観のためのユニークなデザイン。",
        detailed:
          "この見事なリングは、2本の別々のゴールドバーが交差しているように見える細身のゴールドバンドを備えたユニークなデザインが特徴です。 主な土台には、美しい水色の宝石がちりばめられており、繊細な輝きを放っています。 ゴールドはソフトでブラシをかけたような外観です。 この作品は、モダンなデザインとクラシックなエレガンスを兼ね備えています。",
      },
      hashtags: [
        "#ゴールドリング",
        "#アクアマリンリング",
        "#ジュエリー",
        "#ファッションリング",
        "#宝石リング",
        "#高級デザイン",
        "#ステートメントリング",
        "#高級ジュエリー",
      ],
    },
  },
};

const selectedMedia = localStorage.getItem("selectedMedia");

interface ProductAiState {
  lastGeneratedData: any | null;
  generating: boolean;
  selectedMedia: any[];
}

const initialState: ProductAiState = {
  lastGeneratedData: lastSuccessfulData ? lastSuccessfulData : null,
  generating: false,
  selectedMedia: selectedMedia ? JSON.parse(selectedMedia) : [],
};

const productAiSlice = createSlice({
  name: "productAi",
  initialState,
  reducers: {
    setLastGeneratedData: (state, action: PayloadAction<any>) => {
      state.lastGeneratedData = action.payload;
    },
    setGenerating: (state, action: PayloadAction<boolean>) => {
      state.generating = action.payload;
    },
    setSelectedMedia: (state, action: PayloadAction<any[]>) => {
      state.selectedMedia = action.payload;
    },
  },
});

export const { setLastGeneratedData , setGenerating , setSelectedMedia} = productAiSlice.actions;
export default productAiSlice.reducer;
