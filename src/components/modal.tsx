import Dismiss from "solid-dismiss";
import { FiEdit } from "solid-icons/fi";
import { createSignal, JSX, onMount } from "solid-js";

type ModalProps = {
    children: JSX.Element;
    title: string;
}

const Modal = ({ title, children }: ModalProps) => {
    const [open, setOpen] = createSignal(false);
    let btnEl;
    let containerEl;
    let dialogEl;
    let rootApp;

    let prevScrollY = 0;

    let btnSaveEl;

    const onClickClose = () => {
        setOpen(false);
    };

    const onClickOverlay = (e) => {
        if (e.target !== e.currentTarget) return;
        setOpen(false);
    };

    const changePageLayout = () => {
        const rootAppBCR = rootApp.getBoundingClientRect();
        const { scrollY } = window;

        rootApp.style.position = "fixed";
        rootApp.style.top = `${rootAppBCR.top}px`;
        rootApp.style.left = "0";
        rootApp.style.right = "0";
        rootApp.style.height = "100%";
        prevScrollY = scrollY;
        window.scrollTo({ top: 1 });
    };

    const restorePageLayout = () => {
        rootApp.style.position = "";
        rootApp.style.top = "";
        rootApp.style.left = "";
        rootApp.style.right = "";
        rootApp.style.height = "";
        window.scrollTo({ top: prevScrollY });
    };

    const getScrollPercentage = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        return scrollPercent;
    };

    // This is used to determine on animation exit, whether modal slides down or up
    const updateModalSlideExitDirectionCSSVariable = () => {
        const scrollPercent = getScrollPercentage();
        const innerHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const dialogBCR = dialogEl.getBoundingClientRect();
        const bottomShadowHeight = 20;
        const position = innerHeight + scrollY - (dialogBCR.top + scrollY);
        const value =
            scrollPercent < 0.5 ? position : -dialogBCR.bottom - bottomShadowHeight;

        // update css variable --slide-exit-y that is used in "slide-modal-exit-to" class
        document.documentElement.style.setProperty("--slide-exit-y", `${value}px`);
    };

    onMount(() => {
        rootApp = document.getElementById("root")!;
        const handleKey = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    });

    return (
        <>
            <a ref={btnEl} onClick={() => setOpen(true)} class="cursor-pointer text-orange-500 hover:text-orange-600 mr-2"><FiEdit class="w-5 h-5" /></a>
            <Dismiss
                menuButton={btnEl}
                open={open}
                setOpen={setOpen}
                removeScrollbar={false}
                closeWhenClickingOutside={false}
                modal
                overlayElement={{
                    class: "overlay",
                    animation: { name: "fade-overlay" },
                }}
                animation={{
                    name: "slide-modal",
                    onEnter() {
                        changePageLayout();
                    },
                    onBeforeExit: () => {
                        updateModalSlideExitDirectionCSSVariable();
                    },
                    onAfterExit: () => {
                        restorePageLayout();
                    },
                }}
                ref={containerEl}
            >
                <div
                    class="modal-container"
                    onClick={onClickOverlay}
                    role="presentation"
                >
                    <div ref={dialogEl} class="modal" role="dialog" aria-modal="true" tabindex="-1">
                        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    {title || 0}
                                </h3>
                                <button aria-label="close modal" onClick={onClickClose} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Cerrar modal</span>
                                </button>
                            </div>

                            {children}
                            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button ref={btnSaveEl} data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Aceptar</button>
                                <button onClick={onClickClose} data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>




            </Dismiss>
        </>
    );
};

export default Modal;