import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/core/sidebar/Sidebar";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import { HomeIcon, MoonIcon, SettingsIcon, SunDimIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function AppSidebar() {
  const [isDark, { setToggleTheme }] = useAppStore(store.toggleTheme, s => s.isDark)

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup title="trang">
          <SidebarMenu>
            <SidebarMenuItem setChild>
              <Link to={"/"}>
                <HomeIcon />
                <span>Trang chủ</span>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarMenu>
          <SidebarMenuItem onClick={setToggleTheme}>
            {isDark ? <SunDimIcon className="text-orange-400" /> : <MoonIcon className="text-blue-700" />}
            <span className={isDark ? "text-orange-400" : "text-blue-700"}>Chế độ {isDark ? "sáng" : "tối"}</span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem tooltip="Thiết lập hệ thống">
            <SettingsIcon />
            <span>Thiết lập hệ thống</span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
