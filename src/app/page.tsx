import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Spotlight } from "@/components/ui/spotlight-new"

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center pt-64">
      <Spotlight/>
      <InteractiveGridPattern className="top-5 -z-10"/>
      <div>
        <h1 className="text-center text-7xl font-bold tracking-tighter  ">Generate Forms Instantly.<span className="block mt-2">No Code. Just Magic.</span></h1>
      </div>
    </div>
  );
}
