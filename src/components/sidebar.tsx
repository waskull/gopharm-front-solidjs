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
        <div class={`${toggleSidebar() ? " hidden " : " block "} w-64 bg-gray-100 dark:bg-gray-800 fixed h-full border-r border-gray-500 dark:border-gray-600 px-4 overflow-y-auto z-10`}>
            <div class="my-2 mb-4">
                <h1 class="text-2xl dark:text-gray-100 text-gray-800 tiktok-font text-center border-b-2 pb-3 mt-5 font-bold">SOLIDJS-CRUD-TS</h1>
            </div>
            <div>
                <ul class="mt-4 text-white font-semibold">
                    <For each={routes}>
                        {(route) => (
                            <li class={` mb-2  rounded-lg hover:shadow`}>
                        
                                <a href={route.pathname} class={`${route.pathname === pathname ? "bg-gray-300 font-semibold text-gray-800 dark:text-gray-200 rounded-lg dark:hover:bg-gray-700 " : "dark:bg-gray-800 bg-gray-100 rounded-lg font-medium "}  flex items-center px-4 py-2.5  text-md dark:text-gray-100 text-gray-400 group transition-all duration-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 hover:shadow dark:hover:bg-gray-600`}>
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
