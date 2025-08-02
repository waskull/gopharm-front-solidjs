import { createSignal, JSX } from "solid-js";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function DashboardLayout({ children }: { children }): JSX.Element {
    const [toggleSidebar, setToggleSidebar] = createSignal<boolean>(false);
    return (
        <div class="min-h-screen w-full">
            <div aria-hidden="true" class="absolute inset-y-16 inset-x-0 w-16 rounded-full rotate-45 bg-gradient-to-b from-blue-500 to-teal-600  blur-3xl mx-auto scale-y-100 opacity-75">
                </div>
            <aside id="sidebar" class="flex">
                <Sidebar toggleSidebar={toggleSidebar} />
                
            </aside>
            <div class={`${toggleSidebar() ? " ml-0 " : " ml-64 "} h-screen max-w-screen content overflow-y-auto text-white bg-gray-900 min-h-screen`}>
                <div class={`w-full flex flex-col`}>
                    <Navbar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
                </div>
                {children}
            </div>

        </div>
    );
}