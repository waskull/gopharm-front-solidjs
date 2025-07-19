import { useLocation, useNavigate } from "@solidjs/router";
import { FaSolidBell, FaSolidUser, FaSolidBars } from "solid-icons/fa";
import { FiSearch } from 'solid-icons/fi'
import { Accessor, JSX, Match, Switch } from "solid-js";
import { routes } from "./sidebar";

export default function NavBar({ toggleSidebar, setToggleSidebar }: { toggleSidebar: Accessor<boolean>, setToggleSidebar: Function }): JSX.Element {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    return (
        <nav class={`${toggleSidebar() ? " ml-0 " : " "} px-3 py-4 z-10 flex sticky justify-between bg-gray-800 border-b border-gray-600`}>
            <div class="flex items-center text-xl">
                <FaSolidBars class="me-4 cursor-pointer" onClick={() => setToggleSidebar(!toggleSidebar())} />

                <span class="text-white font-semibold">{routes.find((route) => route.pathname === pathname)?.name.toUpperCase()}</span>

            </div>
            <div class="flex items-center gap-x-5">
                <div class="relative md:w-65">
                    <span class="relative md:absolute inset-y-0 left-0 flex pl-2 items-center">
                        <button class="p-1 focus:outline-none text-white md:text-white"><FiSearch /></button>
                    </span>
                    <input placeholder="Buscar..." class="w-full px-4 py-1 pl-12 rounded dark:bg-gray-700 text-white shadow outline-none hidden md:block" type="text" />
                </div>
                <div class="text-white"> <FaSolidBell class="w-6 h-6" /> </div>
                <div class="relative">
                    <button class="text-white flex items-center justify-center group">
                        <div class="h-8 w-8 flex-shrink-0">
                            <img class="h-8 w-8 rounded-full object-cover" src="https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt={localStorage.getItem("image")} />
                        </div>
                        <div class="z-10 hidden absolute rounded-lg shadow w-32 group-focus:block top-full right-0">
                            <div
                                role="menu"
                                class="absolute end-0 z-auto sm:w-45 md:w-52 lg:w-56 max-w-56 divide-y divide-gray-200 overflow-hidden rounded border border-gray-300 bg-white shadow-sm dark:divide-gray-700 dark:border-gray-600 dark:bg-gray-800"
                            >
                                <div>
                                    <a
                                        href="#"
                                        class="block px-3 py-2 text-sm text-left font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                                        role="menuitem"
                                        onclick={() => navigate("/profile")}
                                    >
                                        Perfil
                                    </a>

                                    <a
                                        href="#"
                                        class="block px-3 py-2 text-sm text-left font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                                        role="menuitem"
                                        onclick={() => navigate("/password")}
                                    >
                                        Cambiar contraseña
                                    </a>

                                    <a
                                        href="#"
                                        class="block px-3 py-2 text-sm  border-b border-b-gray-700 text-left font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                                        role="menuitem"
                                        onclick={() => navigate("/conf")}
                                    >
                                        Configuración
                                    </a>
                                </div>
                            </div>
                        </div>

                <a href="#"
                    class="block rounded-lg ml-2 px-3 py-2 text-left text-sm font-medium text-red-700 transition-colors hover:bg-red-50 dark:text-red-600 dark:hover:bg-red-700/20"
                    onClick={async () => {
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        localStorage.removeItem("fullname");
                        localStorage.removeItem("image");
                        localStorage.removeItem("id");
                        navigate("/");
                    }}>
                    Salir
                </a>
                    </button>
                    
                </div>
            </div >
        </nav >
    );
}