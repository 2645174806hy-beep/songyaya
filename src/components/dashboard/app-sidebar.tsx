import * as React from "react"
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
        },
        {
          title: "图书信息管理",
          url: "/dashboard",
        },
        {
          title: "图书分类管理",
          url: "/fenlei",
        },
        {
          title: "用户信息管理",
          url: "/user",
        },
        {
          title: "修改密码",
          url: "./updatepsd",
        },
        {
          title: "退出登录",
          url: "/login",
        },
      ],
    },
   
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent >
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title} className="font-color-black text-sm">  
            
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
