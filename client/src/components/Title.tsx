interface TitleProps {
  text: string;
  className?: string;
}

export default function Title({ text, className = "" }: TitleProps) {
  return <h1 className={`${className} text-2xl font-bold`}>{text}</h1>
}