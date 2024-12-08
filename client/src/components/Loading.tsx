interface LoadingProps {
  isLoading: boolean;
  text?: string;
}

export default function Loading({ isLoading, text = "" }: LoadingProps) {
  return (
    <section
      className={`fixed z-20 top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.4)] text-white transition-opacity duration-300
      ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <p>{text || "Loading..."}</p>
    </section>
  )
}