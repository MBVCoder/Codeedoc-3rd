export const Title = ({ text }: { text: string }) => {
  return (
    <div className="text-center text-4xl font-bold flex gap-4 justify-center items-center my-10 ">
      <div className="flex flex-col gap-2 justify-start max-[778px]:hidden">
        <div className="h-1 bg-black w-20" />
        <div className="w-10 h-1 bg-black" />
				<div className="w-5 h-1 bg-black" />
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <h1 className="xl:tracking-wider bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent text-3xl md:text-4xl xl:text-5xl">
          {text}
        </h1>
        <div className="h-1 bg-black" />
      </div>
      <div className="flex flex-col gap-2 items-end max-[778px]:hidden">
        <div className="h-1 bg-black w-20" />
        <div className="w-10 h-1 bg-black" />
				<div className="w-5 h-1 bg-black" />
      </div>
    </div>
  );
};
