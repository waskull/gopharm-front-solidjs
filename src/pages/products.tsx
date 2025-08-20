import { Accessor, Component, createEffect, createSignal, For, JSX, Show } from "solid-js";
import DashboardLayout from "../layouts/dashboard-layout";
import Pagination from "../components/pagination";


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
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    tags: string[]
    brand: string
    sku: string
    weight: number
    dimensions: Dimensions
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    reviews: Review[]
    returnPolicy: string
    minimumOrderQuantity: number
    meta: Meta
    images: string[]
    thumbnail: string
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
                        <button class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out">
                            Agregar Producto
                        </button>
                    </div>
                </div>


                <div class="mt-6 flex flex-col sm:flex-row gap-4">
                    <div class="relative flex-grow">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input onChange={(e) => setSearchText(e.currentTarget.value)} value={searchText()} type="text" class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full " placeholder="Buscar producto..." />
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
                    <For each={filteredProducts(products)}>
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
                                <td class="px-6 rounded-lg py-1.5 whitespace-nowrap text-sm    text-center flex justify-center items-center h-full gap-2">
                                    <div class="relative inline-block text-left select-none ">
                                        <div class="rounded-lg py-4 hover:bg-gray-100 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:hover:bg-gray-800 cursor-pointer "><svg
                                            xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                                            <path fill="currentColor"
                                                d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2">
                                            </path>
                                        </svg></div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </For>
                </tbody>
            </table>
        </div>
    );
}

export default function Posts(): JSX.Element {
    const [currentPage, setCurrentPage] = createSignal<number>(1);
    const [products, setProducts] = createSignal<Root>({ products: [], total: 1, skip: 0, limit: 0 });
    const getProducts = () => {
        fetch(`https://dummyjson.com/products?limit=10&skip=${(10 * (currentPage() - 1))}`, { method: "GET", headers: { "Content-Type": "application/json" } })
            .then((res) => res.json())
            .then((data) => setProducts(data)).catch((err) => console.log(err));
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
                                <ProductList products={products} />
                            </div>
                        </div>
                    </div>
                </div>
                <Show when={Math.ceil(products().total / 10) > 1}>
                    <div class="flex flex-col items-center w-full pt-4 fixed bottom-0 border border-gray-200 bg-white justify-center dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between pb-3.5">
                        <Pagination total={Math.ceil(products().total / 10)} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </Show>
            </div>

        </DashboardLayout>
    );
}