import Title from "../components/Title";
import OptionsForm from "../components/options/OptionsForm";

export default function Options() {
  return (
    <main className="flex-grow py-8 px-4">
      <Title text="Edit Options" />
      <OptionsForm />
    </main>
  );
}
