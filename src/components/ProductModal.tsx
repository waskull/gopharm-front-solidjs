import Dismiss from "solid-dismiss";
import { createSignal, JSX, onMount } from "solid-js";


import { FiEdit } from "solid-icons/fi";
import ProductForm from "./ProductForm";

type ModalProps = {
    id?: number;
}

const ProductModal = ({ id }: ModalProps) => {
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
            {id ? (
                            <a ref={btnEl} onClick={() => setOpen(true)} class="cursor-pointer text-orange-500 hover:text-orange-600 mr-2"><FiEdit class="w-5 h-5" /></a>
                        ) :
                            (
                                <a ref={btnEl} onClick={() => setOpen(true)} class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out cursor-pointer">Agregar producto</a >
                            )}
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
                        <div class="relative bg-gray-100 rounded-lg shadow-sm dark:bg-gray-700">

                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <h3 class="text-3xl font-semibold text-gray-900 dark:text-white">
                                    {id ? "Editar producto" : "Agregar producto"}
                                </h3>
                                <button aria-label="close modal" onClick={onClickClose} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Cerrar modal</span>
                                </button>
                            </div>

                            <ProductForm id={id} onClickClose={onClickClose} />

                        </div>
                    </div>
                </div>




            </Dismiss>
        </>
    );
};



export default ProductModal;

