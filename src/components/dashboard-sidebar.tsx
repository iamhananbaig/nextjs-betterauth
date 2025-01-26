"use client"
import { usePathname } from "next/navigation"; // Import usePathname

import {
  ChevronRight,
  LayoutDashboard,
  Signature,
  UserCog,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { NavMain } from "@/components/nav-main"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Define the sidebar data
const data = {
  single: [{ title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" }],
  navMain: [
    {
      title: "User Management",
      icon: Users,
      items: [
        {
          title: "Users",
          url: "/users",
          icon: UserCog,
        },
        {
          title: "Permissions",
          url: "/permissions",
          icon: Signature,
        },
      ],
    },
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname(); // Get the current path
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader >
        <h1 className="mt-4 ml-4 font-bold text-black">Next Secure</h1>
        <NavMain
          items={data.single.map((item) => ({
            ...item,
            isActive: pathname === item.url, // Add isActive inside each item
          }))}
        />
        <SidebarContent className="gap-0">
          {data.navMain.map((item) => (
            <Collapsible
              key={item.title}
              title={item.title}
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <CollapsibleTrigger>
                    <item.icon className="mr-2 inline" />
                    {item.title}{" "}
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {item.items.map((item) => (
                        <SidebarMenuItem key={item.title} >
                          <SidebarMenuButton asChild isActive={pathname === item.url}>
                            <a href={item.url}><item.icon className="mr-2 inline" />{" "}{item.title}</a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        </SidebarContent>

      </SidebarHeader>
    </Sidebar>
  )
}
