import { Accessor, createEffect, createSignal, For, JSX, Show } from "solid-js";
import DashboardLayout from "../layouts/dashboard-layout";
import Pagination from "../components/pagination";
import ProductModal from "../components/ProductModal";
import { FiTrash } from "solid-icons/fi";
import { productStore } from "../store";


export interface Root {
    products: Product[]
    total: number
    skip: number
    limit: number
}

export interface Product {
    id: number
    title: string
    description: string
    category?: string
    price: number
    discountPercentage?: number
    rating?: number
    stock: number
    tags?: string[]
    brand?: string
    sku?: string
    weight?: number
    dimensions?: Dimensions
    warrantyInformation?: string
    shippingInformation?: string
    availabilityStatus?: string
    reviews?: Review[]
    returnPolicy?: string
    minimumOrderQuantity?: number
    meta?: Meta
    images?: string[]
    thumbnail?: string
}

export interface Dimensions {
    width: number
    height: number
    depth: number
}

export interface Review {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
}

export interface Meta {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
}


function ProductList({ products }: { products: Accessor<Root> }): JSX.Element {
    const [searchText, setSearchText] = createSignal<string>("");
    const filteredProducts = (products: Accessor<Root>) => products().products.filter((product) => {
        return Object.values(product)
            .join('')
            .toLowerCase()
            .includes(searchText().toLowerCase())
    });
    return (
        <div class={`${Math.ceil(products().total / 10) > 1 ? " pb-20 " : ""} relative mx-auto max-w-screen-2xl shadow-md sm:rounded-lg flex flex-col text-gray-500 overflow-y-auto h-full`}>
            <div class="p-6 border-b border-gray-200 bg-gray-100 dark:bg-gray-800 shadow-md overflow-hidden">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">Productos Registrados</h2>
                        <p class="text-gray-500 mt-1">Aqui podras ver todos nuestros productos.</p>
                    </div>
                    <div class="mt-4 md:mt-0">
                        <ProductModal />
                    </div>
                </div>


                <div class="mt-6 flex flex-col sm:flex-row gap-4">
                    <div class="relative flex-grow">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input id="table-search" onChange={(e) => setSearchText(e.currentTarget.value)} value={searchText()} type="text" class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full " placeholder="Buscar producto..." />
                    </div>
                    {/* <div>
                        <select class="border border-gray-400 text-gray-500 dark:text-gray-50 focus:text-gray-900 focus:dark:text-gray-100 rounded-lg px-4 py-2 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 hover:dark:text-gray-200  w-full sm:w-auto">
                            <option value="">Todos los roles</option>
                            <option value="admin">Administrador</option>
                            <option value="moderator">Moderador</option>
                            <option value="marketing">Marketing</option>
                            <option value="sales">Ventas</option>
                        </select>
                    </div> */}
                </div>
            </div>
            <table class="min-w-full dark:bg-gray-800 border-gray-700 undefined rounded-lg">
                <thead class="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                            Producto
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                            Precio
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                            Estado
                        </th>
                        <th scope="col" class="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody class="undefined select-none">
                    <For fallback={
                        <tr>
                            <td colSpan={5} class="py-4 text-center">
                                <div class="flex items-center justify-center">
                                    <svg aria-hidden="true" class="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span class="sr-only">Cargando...</span>
                                </div>
                            </td>
                        </tr>
                    } each={filteredProducts(products)}>
                        {(product) => (
                            <tr class="hover:bg-gray-100 font-semibold inter-font dark:hover:bg-gray-700 text-gray-900 dark:text-gray-50">
                                <td class="px-6 py-1.5 whitespace-nowrap text-sm">
                                    <div class="flex items-center gap-2"><img src={product.thumbnail} alt="image" class="aspect-square rounded-lg object-cover h-16" />
                                        <p class="font-bold">{product.title}</p>
                                    </div>
                                </td>
                                <td class="px-6 py-1.5 whitespace-nowrap text-sm ">{product.price}</td>
                                <td class="px-6 py-1.5 whitespace-nowrap text-sm">
                                    <span class={`${product.stock > 0 ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"} text-xs font-bold me-2 px-2.5 shadow py-2 rounded-lg`}>{product.stock > 0 ? "Disponible" : "Agotado"}</span>
                                </td>
                                <td class="flex justify-end px-6 py-4 whitespace-nowrap text-right text-sm font-semibold">
                                    <ProductModal id={product.id}></ProductModal>
                                    <a onClick={() => {
                                        fetch(`https://dummyjson.com/products/${product.id}`, { method: "DELETE", headers: { "Content-Type": "application/json" } }).then(() => {
                                            if (confirm("Estas seguro de eliminar el producto: " + product.title + "?")) {
                                                productStore.deleteProduct(product.id)
                                            }
                                        });
                                    }} class="cursor-pointer text-red-600 hover:text-red-900"><FiTrash class="w-5 h-5" /></a>
                                </td>
                            </tr>
                        )}
                    </For>
                </tbody>
            </table>
        </div>
    );
}

export default function Products(): JSX.Element {
    const [currentPage, setCurrentPage] = createSignal<number>(1);
    const getProducts = () => {
        fetch(`https://dummyjson.com/products?limit=10&skip=${(10 * (currentPage() - 1))}`, { method: "GET", headers: { "Content-Type": "application/json" } })
            .then((res) => res.json())
            .then((data) => { productStore.addProducts(data) }).catch((err) => console.log(err));
    };
    createEffect(() => {
        getProducts();
    });
    return (
        <DashboardLayout>
            <div>
                <div class="flex flex-col mx-4 mt-4">
                    <div class="overflow-x-auto">
                        <div class="inline-block min-w-full align-middle bg-gray-50 dark:bg-gray-700">
                            <div class="overflow-hidden min-h-screen bg-gray-50 dark:bg-gray-900  shadow ">
                                <ProductList products={() => productStore.products} />
                            </div>
                        </div>
                    </div>
                </div>
                <Show when={Math.ceil(productStore.products.total / 10) > 1}>
                    <div class="flex flex-col items-center w-full pt-4 fixed bottom-0 border border-gray-200 bg-white justify-center dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between pb-3.5">
                        <Pagination total={Math.ceil(productStore.products.total / 10)} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </Show>
            </div>

        </DashboardLayout>
    );
}