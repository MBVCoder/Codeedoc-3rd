interface GradientButtonProps {
  text: string;
  onClick?: () => void;
}

const GradientButton = ({ text , onClick }: GradientButtonProps) => {
  return (
    <span
      className={`rounded-2xl bg-gradient-to-r from-orange-500 to-purple-500 p-0.5 shadow-lg hover:scale-105 duration-500 cursor-pointer `}
    >
      <button
        type="button"
        onClick={onClick}
        className={`font-bold text-lg  px-3 py-2 rounded-2xl text-white hover:cursor-pointer`}
      >
        {text}
      </button>
    </span>
  );
};

export default GradientButton;
