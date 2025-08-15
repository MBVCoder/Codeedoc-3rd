import Loader from "./Loader";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const generating = useSelector((state: any) => state.productAi.generating);
  return (
    <>
    <div className="flex justify-center items-center w-full h-full">
      <div className="px-5 pt-20 max-w-[1600px] max-h-[1000px]">
        <Navbar />
        <main>{children}</main>
        {generating && (
          <div className="absolute top-0 left-0 w-full h-screen bg-black/50 z-50">
            <Loader />
          </div>
        )}
      </div>
    </div>
    </>
  );
}
