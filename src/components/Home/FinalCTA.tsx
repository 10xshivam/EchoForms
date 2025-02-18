import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="flex flex-col items-center justify-center px-10 pb-36 rounded-xl">
      <h4 className="text-zinc-400 font-semibold text-sm uppercase tracking-wide">
        Let’s Get Started!
      </h4>
      <h2 className="text-4xl font-bold dark:text-white mt-2">
        Effortless Form Building
      </h2>
      <p className="text-zinc-500 mt-4 max-w-2xl mx-auto">
        Create AI-powered forms in seconds, share instantly, and collect
        responses effortlessly.
      </p>
      <Link href={"/sign-up"}>
        <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
          Get Started →
        </button>
      </Link>
    </section>
  );
}
