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
      <div className="relative h-screen px-5">
        <Navbar />
        <main>{children}</main>
        {generating && (
          <div className="absolute top-0 left-0 w-full h-screen bg-black/50 z-20">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
}
