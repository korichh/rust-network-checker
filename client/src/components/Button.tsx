interface ButtonProps {
  type: "submit" | "reset";
  text: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Button({ type, text, className = "", onClick }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className} w-full h-[40px] px-3 bg-secondary-main text-white hover:opacity-80 rounded-lg transition-all`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}