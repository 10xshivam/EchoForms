import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";

const reviews = [
    {
      name: "Alex Carter",
      username: "@alexcarter",
      body: "EchoForms has completely changed the way we collect data. AI-powered forms in seconds—just brilliant!",
      img: "https://avatar.vercel.sh/alex",
    },
    {
      name: "Samantha Lee",
      username: "@samanthalee",
      body: "I created a fully functional, shareable form in minutes. The automation features are top-notch!",
      img: "https://avatar.vercel.sh/samantha",
    },
    {
      name: "Michael Chen",
      username: "@michaelchen",
      body: "Simple, fast, and efficient! EchoForms saves me hours of manual form-building.",
      img: "https://avatar.vercel.sh/michael",
    },
    {
      name: "Jessica Rivera",
      username: "@jessicarivera",
      body: "The customization options are fantastic. I can brand my forms exactly the way I want.",
      img: "https://avatar.vercel.sh/jessica",
    },
    {
      name: "David Johnson",
      username: "@davidjohnson",
      body: "Real-time analytics and email alerts? Game changer! EchoForms makes tracking responses effortless.",
      img: "https://avatar.vercel.sh/david",
    },
    {
      name: "Emily Foster",
      username: "@emilyfoster",
      body: "Seamless integrations with Google Sheets and Notion make my workflow so much smoother.",
      img: "https://avatar.vercel.sh/emily",
    },
  ];
  

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl  p-4",
        // light styles
        " bg-zinc-950/[.01] hover:bg-zinc-950/[.05]",
        // dark styles
        "dark:border-zinc-800/50 dark:bg-zinc-50/[.10] dark:hover:bg-zinc-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Testimonial() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
