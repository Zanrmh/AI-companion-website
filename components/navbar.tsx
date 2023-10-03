'use client';

import { cn } from '@/lib/utils';

import { UserButton } from '@clerk/nextjs';
import { Menu, Sparkles } from 'lucide-react';
import Link from 'next/dist/client/link';
import { Poppins } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { MobileSidebar } from '@/components/mobile-sidebar';

const font = Poppins({
  weight: '600',
  subsets: ['latin'],
});
const Navbar = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        {/* <Menu className="block md:hidden" /> */}
        <MobileSidebar />
        <Link href="/">
          <h1
            className={cn(
              'hidden md:block text-xl md:text-3xl font-bold text-primary',
              font.className
            )}
          >
            companion.ai
          </h1>
        </Link>
      </div>

      {/* dark mode đó hịn không?- shadcn ui */}
      <div className="flex items-center gap-x-3">
        <Button variant="premium" size="sm">
          Upgrade
          <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
        </Button>
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
