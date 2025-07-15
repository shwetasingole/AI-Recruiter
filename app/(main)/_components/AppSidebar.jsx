"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus, LogOut } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SideBarOptions } from "@/services/Constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";

export function AppSidebar() {
  const path = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("User signed out successfully");
      router.push("/");
    }
  };

  return (
    <Sidebar className="bg-gradient-to-b from-black to-gray-800 border-r border-slate-200 shadow-lg">
      <SidebarHeader className="border-b border-slate-100 bg-black/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-6 py-8 px-6">
          <div className="relative">
            <Image
              src="/logo-new1.svg"
              alt="Company Logo"
              width={160}
              height={60}
              className="object-contain drop-shadow-sm"
            />
          </div>

          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Interview
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-6 bg-black/80 backdrop-blur-sm">
        <SidebarGroup>
          <SidebarMenu className="px-3 space-y-1">
            {SideBarOptions.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  className="group relative overflow-hidden rounded-lg px-4 py-4 text-white hover:bg-white/20 transition-all duration-200 border border-transparent hover:py-5"
                >
                  <Link href={item.path} className="flex items-center gap-3 w-full">
                    <div className="flex-shrink-0 p-2 rounded-md bg-gray-900-100 group-hover:bg-blue-50 transition-colors duration-200">
                      <item.icon
                        className={`w-4 h-4 group-hover:text-blue-600 transition-colors duration-200 ${
                          path === item.path && "text-blue-600"
                        }`}
                      />
                    </div>
                    <span
                      className={`font-medium text-sm group-hover:translate-x-0.5 transition-transform duration-200 ${
                        path === item.path && "text-blue-600"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            {/* Logout Button */}
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                className="group relative overflow-hidden rounded-lg px-4 py-4 text-white hover:bg-white/20 transition-all duration-200 border border-transparent flex items-center gap-3"
              >
                <LogOut className="w-4 h-4 group-hover:text-red-500 transition-colors duration-200" />
                <span className="font-medium text-sm group-hover:text-red-500">
                  Logout
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-black/80 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="text-center">
            <p className="text-xs text-slate-500 font-medium">© 2025 Shweta Ingole</p>
            <p className="text-xs text-slate-400 mt-1">All rights reserved</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
