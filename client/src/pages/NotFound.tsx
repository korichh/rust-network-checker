import Title from "../components/Title";

export default function NotFound() {
  return (
    <main className="flex-grow py-8 px-4">
      <Title text="Not Found 404" className="mb-4" />
      <p>It seems like this page does not exist.</p>
    </main>
  );
}
