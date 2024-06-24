import { InputForm } from "@/components/input-form";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
      <div className="w-[300px]">
        <InputForm />
      </div>
    </main>
  );
}
