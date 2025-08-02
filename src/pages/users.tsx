import { Accessor, createEffect, createSignal, For, JSX, Show } from "solid-js";
import DashboardLayout from "../layouts/dashboard-layout";
import Pagination from "../components/pagination";
import { FiEdit, FiTrash } from 'solid-icons/fi'
import Modal from "../components/modal";

export interface Root {
    users: User[]
    total: number
    skip: number
    limit: number
}

export interface User {
    id: number
    firstName: string
    lastName: string
    maidenName: string
    age: number
    gender: string
    email: string
    phone: string
    username: string
    password: string
    birthDate: string
    image: string
    bloodGroup: string
    height: number
    weight: number
    eyeColor: string
    hair: Hair
    ip: string
    address: Address
    macAddress: string
    university: string
    bank: Bank
    company: Company
    ein: string
    ssn: string
    userAgent: string
    crypto: Crypto
    role: string
}

export interface Hair {
    color: string
    type: string
}

export interface Address {
    address: string
    city: string
    state: string
    stateCode: string
    postalCode: string
    coordinates: Coordinates
    country: string
}

export interface Coordinates {
    lat: number
    lng: number
}

export interface Bank {
    cardExpire: string
    cardNumber: string
    cardType: string
    currency: string
    iban: string
}

export interface Company {
    department: string
    name: string
    title: string
    address: Address2
}

export interface Address2 {
    address: string
    city: string
    state: string
    stateCode: string
    postalCode: string
    coordinates: Coordinates2
    country: string
}

export interface Coordinates2 {
    lat: number
    lng: number
}

export interface Crypto {
    coin: string
    wallet: string
    network: string
}

function UserList({ users }: { users: Accessor<Root> }): JSX.Element {
    const [searchText, setSearchText] = createSignal<string>("");
    const [isOpen, setIsOpen] = createSignal(false);
    const [data, setData] = createSignal<User>({} as User);

    const openModal = (user: User) => {
        setData(user);
        setIsOpen(true);
    };
    const filteredUsers = (users: Accessor<Root>) => users().users.filter((user) => {
        return Object.values(user)
            .join('')
            .toLowerCase()
            .includes(searchText().toLowerCase())
    });
    return (
        <div class={`${Math.ceil(users().total / 10) > 1 ? " pb-20 " : ""} relative mx-auto max-w-screen-2xl shadow-md sm:rounded-lg flex flex-col text-gray-500 overflow-y-auto h-full`}>
            <div class="p-6 border-b border-gray-200 bg-gray-100 dark:bg-gray-800 shadow-md overflow-hidden">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 class="text-xl font-bold text-gray-100">Usuarios Registrados</h2>
                        <p class="text-gray-500 mt-1">Aqui podras ver todos nuestros useros.</p>
                    </div>
                    <div class="mt-4 md:mt-0">
                        <button class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out">
                            Agregar usuario
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
                        <input value={searchText()} onChange={(e: any) => setSearchText(e.target.value)} type="text" class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full " placeholder="Buscar usuario..." />
                    </div>
                    <div>
                        <select class="border border-gray-400 text-gray-50 dark:gray-50 focus:text-gray-900 focus:dark:text-gray-50 rounded-lg px-4 py-2 hover:text-gray-900 hover:bg-gray-800 hover:dark:text-gray-50  w-full sm:w-auto">
                            <option value="">Todos los roles</option>
                            <option value="admin">Administrador</option>
                            <option value="moderator">Moderador</option>
                            <option value="marketing">Marketing</option>
                            <option value="sales">Ventas</option>
                        </select>
                    </div>
                </div>
            </div>
            <table class="min-w-full dark:bg-gray-800 border-gray-700 undefined rounded-lg">
                <thead class="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                            Nombre
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                            Rol
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                            Telefono
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                            Usuario
                        </th>
                        <th scope="col" class="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody class="undefined select-none">
                    <For each={filteredUsers(users)}>
                        {(user) => (
                            <tr class="hover:bg-gray-100 font-semibold inter-font dark:hover:bg-gray-700 text-gray-900 dark:text-gray-50">
                                <td class="px-6 py-4 text-gray-900 dark:text-gray-50 whitespace-nowrap text-sm">
                                    <div class="flex items-center">
                                        <div class="h-10 w-10 flex-shrink-0">
                                            <img class="h-10 w-10 rounded-full object-cover" src={user.image} alt="" />
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium">{user.firstName} {user.lastName}</div>
                                            <div class="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-1.5 whitespace-nowrap text-sm ">{user.role}</td>
                                <td class="px-6 py-1.5 whitespace-nowrap text-sm">
                                    <span class={`text-sm font-bold me-2 px-2.5 py-2`}>{user.phone}</span>
                                </td>
                                <td class="px-6 py-1.5 whitespace-nowrap text-sm">{user.username}</td>
                                <td class="flex justify-end px-6 py-4 whitespace-nowrap text-right text-sm font-semibold">
                                    <Modal title="Editar Usuario">
                                        <div class="p-4 md:p-5 space-y-4">
                                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                                            </p>
                                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                                            </p>
                                        </div>
                                        <div class="p-4 md:p-5 space-y-4">
                                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                                            </p>
                                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                                            </p>
                                        </div>
                                    </Modal>
                                    <a class="cursor-pointer text-red-600 hover:text-red-900"><FiTrash class="w-5 h-5" /></a>
                                </td>
                            </tr>
                        )}
                    </For>
                </tbody>
            </table>
        </div>
    );
}


export default function Users(): JSX.Element {
    const [currentPage, setCurrentPage] = createSignal<number>(1);
    const [users, setUsers] = createSignal<Root>({ users: [], total: 1, skip: 0, limit: 0 });
    const getUsers = () => {
        fetch(`https://dummyjson.com/users?limit=10&skip=${(10 * (currentPage() - 1))}`, { method: "GET", headers: { "Content-Type": "application/json" } })
            .then((res) => res.json())
            .then((data) => setUsers(data)).catch((err) => console.log(err));
    };
    createEffect(() => {
        getUsers();
    });
    return (
        <DashboardLayout>
            <div>
                <div class="flex flex-col mx-4 mt-4">
                    <div class="overflow-x-auto">
                        <div class="inline-block min-w-full align-middle bg-gray-50 dark:bg-gray-700">
                            <div class="overflow-hidden min-h-screen bg-gray-50 dark:bg-gray-900  shadow ">
                                <UserList users={users} /></div>
                        </div>
                    </div>
                </div>
                <Show when={users().total > 10}>
                    <div class="flex flex-col items-center w-full pt-4 fixed bottom-0 border border-gray-200 bg-white justify-center dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between pb-3.5">
                        <Pagination total={Math.ceil(users().total / 10)} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </Show>
            </div>

        </DashboardLayout>
    );
}