interface LoadingProps {
  children?: React.ReactNode;
  isLoading: boolean;
}

export default function Loading({ children, isLoading }: LoadingProps) {
  return (
    <section
      className={`fixed w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.3)] text-white transition-opacity duration-300
      ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {children || <p>Loading...</p>}
    </section>
  )
}