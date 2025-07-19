import { Accessor, createSignal, Show } from "solid-js";

const Pagination = ({ total, currentPage, setCurrentPage }: { total: number, currentPage: Accessor<number>, setCurrentPage: Function }) => {
    return (
        <nav aria-label="Page navigation example">
            <ul class="flex items-center -space-x-px h-10 text-base">
                <li>
                    <button onClick={() => setCurrentPage(currentPage() - 1)} disabled={currentPage() <= 1} class={`${currentPage() <= 1 && "cursor-not-allowed dark:hover:bg-gray-800"} flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                        <span class="sr-only">Siguiente</span>
                        <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                        </svg>
                    </button>
                </li>
                <Show when={currentPage() > 2}>
                    <li>
                        <button onClick={() => setCurrentPage(currentPage() - 2)} class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{currentPage() - 2}</button>
                    </li>
                </Show>
                <Show when={currentPage() > 1}>
                    <li>
                        <button onClick={() => setCurrentPage(currentPage() - 1)} class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{currentPage() - 1}</button>
                    </li>
                </Show>
                <li>
                    <button aria-current="page" class="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{currentPage()}</button>
                </li>
                <Show when={currentPage() < total}>
                    <li>
                        <button onClick={() => setCurrentPage(currentPage() + 1)} class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{currentPage() + 1}</button>
                    </li>
                </Show>
                <Show when={currentPage() < total - 1}>
                    <li>
                        <button onClick={() => setCurrentPage(currentPage() + 2)} class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{currentPage() + 2}</button>
                    </li>
                </Show>
                <li>
                    <button type="button" disabled={currentPage() >= total} onClick={() => { setCurrentPage(currentPage() + 1) }} class={`${currentPage() >= total && "cursor-not-allowed dark:hover:bg-gray-800"} flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                        <span class="sr-only">Adelante</span>
                        <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
}
export default Pagination;