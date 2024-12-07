interface IconProps {
  name: string;
  className?: string;
}

export default function Icon({ name, className = "" }: IconProps) {
  return (
    <svg className={className}>
      <use href={`/img/sprite.svg#${name}`} />
    </svg>
  );
};
