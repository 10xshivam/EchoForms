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
import UpgradePlan from "./UpgradePlan";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserInterface{
  createdForms: number;
  totalSubmissions: number;
  plan: string;
}

export default function User() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [usage, setUsage] = useState<UserInterface | null>();

  useEffect(() => {
    async function fetchUsage() {
      try {
        if (!user) return; 
        const res = await axios.get(`/api/getUsage`);
        const data = await res.data;
        setUsage(data);
      } catch (error) {
        console.error("Error fetching usage data:", error);
        setUsage(null); 
      }
    }

    fetchUsage();
  }, [user]);

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
        <DropdownMenuLabel className="text-black/50 dark:text-zinc-100/50 text-sm pt-0.5 font-normal">
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
          {usage?.plan === "Basic" ?
          <UpgradePlan/>:
          <Button className="w-full">Pro Plan</Button>
          }
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
