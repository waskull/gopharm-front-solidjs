import { Accessor, Component, For, JSX } from "solid-js";
import { FiHome } from 'solid-icons/fi'
import { RiSystemDashboardFill } from 'solid-icons/ri';
import { FaSolidUserGroup } from 'solid-icons/fa'
import { IconTypes } from "solid-icons";
import { useLocation } from "@solidjs/router";

interface AppRoutes {
    pathname: string;
    icon: IconTypes;
    name: string;
    role: string;
    style: string;
    style2?: string;
}

export const routes: AppRoutes[] = [
    {
        pathname: "/dashboard",
        icon: FiHome,
        name: "Inicio",
        role: "user,admin",
        style: "",
    },
    {
        pathname: "/products",
        icon: RiSystemDashboardFill,
        name: "Productos",
        role: "user,admin",
        style: "",
    },
    {
        pathname: "/users",
        icon: FaSolidUserGroup,
        name: "Usuarios",
        role: "user,admin",
        style: "",
    },
]

export default function Sidebar({ toggleSidebar }: { toggleSidebar: Accessor<boolean> }): JSX.Element {
    const { pathname } = useLocation();
    return (
        <div class={`${toggleSidebar() ? " hidden " : " block "} w-64 bg-gray-800 fixed h-full border-r border-gray-600 px-4 overflow-y-auto z-10`}>
            <div class="my-2 mb-4">
                <h1 class="text-2xl text-white tiktok-font text-center border-b-2 pb-3 mt-5 font-bold">GOPHARM</h1>
            </div>
            <div>
                <ul class="mt-4 text-white font-semibold">
                    <For each={routes}>
                        {(route) => (
                            <li class={` mb-2  rounded-lg hover:shadow`}>
                        
                                <a href={route.pathname} class={`${route.pathname === pathname ? "bg-gray-600 rounded-lg hover:bg-gray-700" : "bg-gray-800 rounded-lg "} flex items-center px-4 py-2.5  text-sm font-medium  text-white group transition-all duration-200 hover:bg-gray-600`}>
                                    <route.icon class="h-5 w-5 mr-3" />
                                    <span>{route.name}</span>
                                </a>
                            </li>
                        )}
                    </For>
                </ul>
            </div>
        </div>
    );
}
