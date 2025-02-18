import Image from "next/image";

const reviews = [
  {
    name: "Amit Sharma",
    username: "@amitsharma",
    body: "EchoForms has streamlined my workflow! AI-powered forms save me hours every day.",
    img: "https://avatar.vercel.sh/amit",
  },
  {
    name: "Priya Verma",
    username: "@priyaverma",
    body: "Creating and sharing forms has never been easier. The automation features are top-notch!",
    img: "https://avatar.vercel.sh/priya",
  },
  {
    name: "Rajesh Gupta",
    username: "@rajeshgupta",
    body: "Simple, fast, and efficient! EchoForms helps me manage customer inquiries seamlessly.",
    img: "https://avatar.vercel.sh/rajesh",
  },
  {
    name: "Neha Kapoor",
    username: "@nehakapoor",
    body: "I love how I can customize my forms with ease. The design and UI are fantastic!",
    img: "https://avatar.vercel.sh/neha",
  },
  {
    name: "Arjun Nair",
    username: "@arjunnair",
    body: "Real-time analytics and email notifications have made my data collection so much smoother.",
    img: "https://avatar.vercel.sh/arjun",
  },
  {
    name: "Sanya Mehta",
    username: "@sanyamehta",
    body: "Integration with Google Sheets and Notion has been a game-changer for my business!",
    img: "https://avatar.vercel.sh/sanya",
  },
  {
    name: "Vikram Singh",
    username: "@vikramsingh",
    body: "The AI-generated forms are spot on! I use EchoForms for event registrations all the time.",
    img: "https://avatar.vercel.sh/vikram",
  },
  {
    name: "Pooja Iyer",
    username: "@poojaiyer",
    body: "Form sharing via QR codes is a brilliant feature! Makes data collection super easy.",
    img: "https://avatar.vercel.sh/pooja",
  },
  {
    name: "Rohan Desai",
    username: "@rohandesai",
    body: "Automated response tracking helps me stay on top of my work. Highly recommend!",
    img: "https://avatar.vercel.sh/rohan",
  },
  {
    name: "Ananya Malhotra",
    username: "@ananyamalhotra",
    body: "The best form builder I’ve used so far. AI suggestions make it effortless to create forms!",
    img: "https://avatar.vercel.sh/ananya",
  },
];

export default function Testimonial() {
  return (
    <div className="grid grid-cols-5 gap-3">
      {reviews.map((review) => (
        <figure
          key={review.name}
          className="relative h-full w-64 cursor-pointer overflow-hidden rounded-xl  p-4 bg-zinc-950/[.05] hover:bg-zinc-950/[.05] dark:border-zinc-800/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-50/[.15] transition-colors duration-100"
        >
          <div className="flex flex-row items-center gap-2">
            <Image
              className="rounded-full"
              width="32"
              height="32"
              alt=""
              src={review.img}
            />
            <div className="flex flex-col">
              <figcaption className="text-sm font-medium dark:text-white">
                {review.name}
              </figcaption>
              <p className="text-xs font-medium dark:text-white/40">
                {review.username}
              </p>
            </div>
          </div>
          <blockquote className="mt-2 text-sm">{review.body}</blockquote>
        </figure>
      ))}
    </div>
  );
}
