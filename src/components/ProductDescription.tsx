import { useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@store/index";
import { Title } from "./stylingComponents/Title";
import LanguageMenu from "./stylingComponents/LanguageMenu";
import useViewport from "@customHooks/useViewport";

const ProductDescription = ({ data }: { data: any }) => {
  const selectedMedia = useSelector(
    (state: RootState) => state.productAi.selectedMedia,
  );
  console.log(data);
  const [language, setLanguage] = useState("en");
  const viewportSize = useViewport();

  // console.log(selectedMedia);

  if (!data) {
    return <p>No product data available.</p>;
  }

  // Prepare language mapping
  const languages = {
    en: {
      title: data.data.title,
      description: data.data.description,
      hashtags: data.data.hashtags,
    },
    ...data.data.translations,
  };

  const selectedLangData = languages[language];

  return (
    <div
      className={`${
        viewportSize.height < 813 ? "h-screen" : "h-[813px]"
      } relative mb-10`}
    >
      <div className="flex justify-center items-center">
        <Title text="Product Ai Description" />
      </div>
      <div className=" p-6 bg-black/10 rounded-xl shadow-md max-w-3xl mx-auto flex flex-col gap-5 border-[1px] border-black relative z-30">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <LanguageMenu
            language={language}
            setLanguage={setLanguage}
            data={data}
          />
        </div>
        <div>
          <div className="flex flex-col gap-4 my-5">
            <h1 className="text-3xl font-semibold text-center underline tracking-wide">
              Selected Model Images
            </h1>
            <div className="grid grid-cols-2 min-[395px]:grid-cols-3 min-[800px]:grid-cols-4 gap-4 ">
              {selectedMedia.length > 0 &&
                selectedMedia.map((media) => (
                  <div
                    key={media._id}
                    className="object-contain border-2 bg-white rounded-2xl"
                  >
                    <img
                      src={`${import.meta.env.VITE_MODEL_BASE_URL}/${
                        media.thumbnail
                      }`}
                      alt="model media"
                      className="rounded-2xl w-full h-full"
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="my-5">
            <h2 className="text-3xl font-bold my-3 font-roboto">
              {selectedLangData?.title}
            </h2>

            <p className="text-gray-400 my-4 font-outfit">
              {selectedLangData?.description?.summary}
            </p>

            <p className="text-gray-900 my-4 font-outfit">
              {selectedLangData?.description?.detailed}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {selectedLangData.hashtags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gradient-to-r from-orange-200 to-purple-200 text-gray-900 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute max-2xl:hidden bottom-30 right-75 size-40 rounded-full bg-gradient-to-tr from-orange-600 to-purple-600 blur-2xl animate-pulse opacity-70 duration-100 transition-all z-0"></div>
      <div className="absolute max-2xl:hidden top-20 left-75 size-40 rounded-full bg-gradient-to-tr from-orange-600 to-purple-600 blur-2xl animate-pulse opacity-70 duration-100 transition-all z-0"></div>
      <div className="absolute max-2xl:hidden bottom-10 left-95 size-20 rounded-full bg-gradient-to-tr from-orange-600 to-purple-600 blur-2xl animate-pulse opacity-70 duration-100 transition-all z-0"></div>
      <div className="absolute max-2xl:hidden bottom-50 right-185 size-20 rounded-full bg-gradient-to-tr from-orange-600 to-purple-600 blur-2xl animate-pulse opacity-70 duration-100 transition-all z-0"></div>
    </div>
  );
};

export default ProductDescription;
