'use client';

import { LogOut, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { useLogout } from '../../auth/hooks/useLogin';
import { useAppDispatch } from '@/lib/core/hooks';
import { redirect } from 'next/navigation';
import { logout } from '../../auth/store/slice';

export interface UserNavProps {
  avatarImage?: string;
  fallback?: string;
  name: string;
  email: string;
}

export function UserNav({ avatarImage, fallback, email, name }: UserNavProps) {
  const dispatch = useAppDispatch();

  return (
    <>
      {/* {open ? (
        <ProfileModal open={open} onClose={() => setOpen(false)} />
      ) : null} */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatarImage} alt="avatar image" />
              <AvatarFallback>{fallback ?? <User />}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuGroup>
             <DropdownMenuItem onClick={() => setOpen(true)}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem> 
            <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem> 
          </DropdownMenuGroup>*/}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              localStorage.clear();
              dispatch(logout());
              redirect('/');
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
