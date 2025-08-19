import * as React from "react"

import { SearchForm } from "@/components/dashboard/search-form"
import { VersionSwitcher } from "@/components/dashboard/version-switcher"
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
  SidebarRail,
} from "@/components/ui/sidebar"
import { 
  Cat, 
  Home, 
  Book, 
  List, 
  Users, 
  Key, 
  LogOut 
} from 'lucide-react'; //

// This is sample data.
const data = {
  navMain: [
    {
      title: "图书管理系统",
      url: "#",
      items: [
        {
          title: "首页",
          url: "/index",
            icon: "Home",
        },
        {
          title: "图书信息管理",
          url: "/dashboard",
          icon: "Book",
        },
        {
          title: "图书分类管理",
          url: "/fenlei",
          icon: "List",
        },
        {
          title: "用户信息管理",
          url: "/user",
          icon: "User",
        },
        {
          title: "修改密码",
          url: "./updatepsd",
          icon: "Key",
        },
        {
          title: "退出登录",
          url: "/login",
          icon: "LogOut",
        },
      ],
    },
   
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent className="bg-blue-100">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            
            <SidebarGroupLabel className="text-2xl flex items-center gap-2" >
              <Cat className="w-10 h-10" />{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="my-6">
                {item.items.map((item) => (

                  <SidebarMenuItem key={item.title}  className="my-1">
                   
                    <SidebarMenuButton asChild  className="justify-center w-full ">
                      <a href={item.url} className="text-lg font-medium">{item.title}</a>
                    </SidebarMenuButton>
                    
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
