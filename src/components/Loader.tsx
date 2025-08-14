

const Loader = () => {
  
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full">
        <div className="rounded-full h-full w-full bg-slate-100 dark:bg-black background-blur-md"></div>
      </div>
      <h1 className="text-center text-white text-2xl font-bold">Loading...</h1>
    </div>
  );
};

export default Loader;
