import { createForm, SubmitHandler, valiForm, setValue } from '@modular-forms/solid';
import { createSignal, JSX, onMount } from 'solid-js';
import * as v from 'valibot';
import { productStore } from "../store";

const ProductSchema = v.object({
    title: v.pipe(
        v.string(),
        v.nonEmpty('Por favor introduzca el titulo.'),
        v.minLength(4, 'El titulo debe tener al menos 3 caracteres.')
    ),
    description: v.pipe(
        v.string(),
        v.nonEmpty('Por favor introduzca la descripción.'),
        v.minLength(4, 'El titulo debe tener al menos 4 caracteres.')
    ),
    price: v.pipe(
        v.number(),
        v.minValue(0, 'El precio debe de ser positivo')
    ),
    stock: v.pipe(
        v.number(),
        v.integer(),
        v.minValue(0, 'La cantidad inicial del producto en el inventario debe de ser positivo')
    ),
});

type TproductForm = v.InferInput<typeof ProductSchema>;

type FormProps = {
    btnSaveEl?: any,
    onClickClose?: () => void,
    id?: number
}

export default function ProductForm({ onClickClose, id }: FormProps): JSX.Element {
    const [loading, setLoading] = createSignal<boolean>(false);
    const [productForm, { Form, Field }] = createForm<TproductForm>({
        validate: valiForm(ProductSchema),
    });
    onMount(() => {
        if (id) {
            fetch(`https://dummyjson.com/products/${id}`)
                .then(res => res.json())
                .then((data: any) => {
                    setValue(productForm, 'title', data.title);
                    setValue(productForm, 'description', data.description);
                    setValue(productForm, 'price', data.price);
                    setValue(productForm, 'stock', data.stock);
                }).catch(err => {
                    console.log(err);
                });
        }
    });

    const handleSubmit: SubmitHandler<TproductForm> = async (values, event) => {
        event.preventDefault();
        setLoading(true);
        let res;
        if (!id) {
            res = await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: values.title,
                    description: values.description,
                    price: values.price,
                    stock: values.stock,
                })
            });
            const randId = Math.floor(Math.random() * 1000);
            productStore.addProduct({ id: randId, title: values.title, description: values.description, price: values.price, stock: values.stock });
        } else {
            res = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: values.title,
                    description: values.description,
                    price: values.price,
                    stock: values.stock,
                })
            });
        }
        const data = await res.json();
        setLoading(false);
        console.log(id ? "Editado " : "Agregado ", data.id);
        if (data?.id) onClickClose();
    };
    return (
        <div>
            <Form onSubmit={handleSubmit} class="space-y-4">
                <div class="container mx-auto px-8 py-3">
                    <h3 class="text-start font-medium  mb-3 text-md dark:text-gray-100 text-gray-800">Rellene los campos para {id ? "editar" : "agregar"} el producto</h3>
                    <div class="flex justify-evenly flex-row">
                        <Field name="title">
                            {(field, props) => (
                                <div class="w-full">
                                    <label for="title" class="block py-2 text-sm font-medium text-gray-900 dark:text-white">Nombre:</label>
                                    <input {...props} type="text"
                                        required
                                        placeholder="Coca-Cola"
                                        value={field.value}
                                        id="title"
                                        class="w-full px-3 py-2 text-gray-500 dark:text-gray-200 bg-transparent outline-none  transition duration-150 ease-in-out border focus:border-green-600 shadow-sm rounded-lg" />
                                    {field.error && <div class="text-red-500">{field.error}</div>}
                                </div>
                            )}
                        </Field>
                        <Field name="description">
                            {(field, props) => (
                                <div class="w-full ml-2">
                                    <label for="description" class="block py-2 text-sm font-medium text-gray-900 dark:text-white">Descripción:</label>
                                    <input {...props} type="text"
                                        required
                                        value={field.value}
                                        id="description"
                                        placeholder="Una refrescante bebida azucarada"
                                        class="w-full px-3 py-2 text-gray-500 dark:text-gray-200 bg-transparent outline-none  transition duration-150 ease-in-out border focus:border-green-600 shadow-sm rounded-lg"
                                    />
                                    {field.error && <div class="text-red-500">{field.error}</div>}
                                </div>
                            )}
                        </Field>
                    </div>
                    <div class="flex justify-evenly flex-row">
                        <Field name="price" type="number">
                            {(field, props) => (
                                <div class="w-full">
                                    <label for="price" class="block py-1 mt-1 text-sm font-medium text-gray-900 dark:text-white">Precio:</label>
                                    <input {...props} type="number"
                                        required
                                        value={field.value}
                                        placeholder="120.43"
                                        onChange={(e) => {
                                            const regex = /^[0-9]*(\.[0-9]{0,2})?$/;
                                            if (regex.test(e.target.value) && e.target.value.length > 0) {
                                                setValue(productForm, 'price', Number(e.target.value));
                                            }
                                        }}
                                        id="price"
                                        class="w-full mt-2 px-3 py-2 text-gray-500 dark:text-gray-200 bg-transparent outline-none  transition duration-150 ease-in-out border focus:border-green-600 shadow-sm rounded-lg"
                                    />
                                    {field.error && <div class="text-red-500">{field.error}</div>}
                                </div>
                            )}
                        </Field>
                        <Field name="stock" type="number">
                            {(field, props) => (
                                <div class="w-full  ml-2">
                                    <label for="stock" class="block py-1 mt-1 text-sm font-medium text-gray-900 dark:text-white">Stock inicial:</label>
                                    <input {...props} type="number"
                                        required
                                        value={field.value}
                                        placeholder="100"
                                        onChange={(e) => {
                                            const regex = /^[0-9]*$/;
                                            if (regex.test(e.target.value) && e.target.value.length > 0 && isNaN(Number(e.target.value))) {
                                                setValue(productForm, 'stock', Number(e.target.value));
                                            }
                                        }}
                                        id="stock"
                                        class="w-full mt-2 px-3 py-2 text-gray-500 dark:text-gray-200 bg-transparent outline-none  transition duration-150 ease-in-out border focus:border-green-600 shadow-sm rounded-lg"
                                    />
                                    {field.error && <div class="text-red-500">{field.error}</div>}
                                </div>
                            )}
                        </Field>
                    </div>
                    <div>{productForm.response.message}</div>

                </div>
                <div class="flex justify-between items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button onClick={onClickClose} data-modal-hide="default-modal" type="button" class="flex mr-3 py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cerrar</button>
                    <button
                        type="submit"
                        disabled={productForm.invalid || loading()}
                        class={`w-50 flex px-4 py-2 items-center justify-center text-white font-medium bg-gray-900 hover:bg-gray-800 active:bg-gray-600 dark:bg-gray-100 dark:hover:bg-gray-200 dark:active:bg-gray-300 dark:text-gray-800 rounded-lg duration-150 ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <div class={"h-5 w-5 rounded-full border-2 mr-4 border-white dark:border-gray-100 border-t-transparent animate-spin" + (loading() ? '' : ' hidden')}></div>
                        {loading() ? 'Cargando...' : id ? 'Actualizar Producto' : 'Registrar Producto'}
                    </button>
                </div>
            </Form >

        </div>
    )
}