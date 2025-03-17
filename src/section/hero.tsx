import { Button } from "@/components/ui/button";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-100px)] px-6 flex-col items-center justify-center">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      <h1 className="bg-gradient-to-b from-neutral-700 to-neutral-950 bg-clip-text text-center text-5xl font-bold text-transparent">
        Lets Change the Way of Learning
      </h1>
      <div className="mt-6 flex gap-4">
        <Button>Explore Courses</Button>
        <Button variant="outline">About us</Button>
      </div>
    </section>
  );
}
