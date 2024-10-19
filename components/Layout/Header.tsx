import DeployButton from "@/components/DeployButton";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <nav className="w-full flex-center gap-2 border-b border-b-foreground/10 h-16">
          

          <Link className="font-semibold text-sm" href={"/"}><Button size={'sm'}>🍒 cherrydub</Button></Link>
            <DeployButton />

    </nav>
  );
}
