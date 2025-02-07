import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useClerk, useUser } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

export default function User() {
  const { user } = useUser();
  const { signOut } = useClerk();
  if (!user) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        {" "}
        <Avatar>
          <AvatarImage src={user.imageUrl} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="pb-0">{user.fullName}</DropdownMenuLabel>
        <DropdownMenuLabel className="text-zinc-100/50 text-sm pt-0.5 font-normal">
          {user.primaryEmailAddress?.emailAddress}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex justify-between items-center font-normal">
          Theme
          <ThemeToggle />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ redirectUrl: "/login" })}>
          Log Out
          <DropdownMenuShortcut>
            <LogOut size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button className="w-full">Upgrade to Pro</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
