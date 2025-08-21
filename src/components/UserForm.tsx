import { createForm, valiForm, SubmitHandler, setValues, setValue } from "@modular-forms/solid";
import { JSX, createSignal, onMount } from "solid-js";
import * as v from 'valibot';
import { User } from "../pages/users";

const UserSchema = v.object({
    firstname: v.pipe(
        v.string(),
        v.nonEmpty('Por favor introduzca el nombre.'),
        v.minLength(4, 'El nombre debe tener al menos 3 caracteres.')
    ),
    lastname: v.pipe(
        v.string(),
        v.nonEmpty('Por favor introduzca el apellido.'),
        v.minLength(4, 'El apellido debe tener al menos 4 caracteres.')
    ),
    age: v.pipe(
        v.number(),
        v.integer(),
        v.minValue(1, 'La edad debe de ser positiva'),
        v.maxValue(150, 'La edad debe de ser menor a 150')
    ),
    role: v.pipe(
        v.string(),
        v.nonEmpty('Por favor introduzca el rol.'),
        v.minLength(3, 'El rol debe tener al menos 3 caracteres.')
    ),
    phone: v.pipe(
        v.string(),
        v.nonEmpty('Por favor introduzca el telefono.'),
        v.minLength(5, 'El telefono debe tener al menos 3 caracteres.')
    ),
});

type TuserForm = v.InferInput<typeof UserSchema>;

type FormProps = {
    onClickClose?: () => void,
    id?: number
}

export default function UserForm({ onClickClose, id }: FormProps): JSX.Element {
    const [loading, setLoading] = createSignal<boolean>(false);
    const [userForm, { Form, Field }] = createForm<TuserForm>({
        validate: valiForm(UserSchema),
    });

    onMount(() => {
        setValue(userForm, 'firstname', "ASDASDASd");
        console.log(id)
        if (id) {
            fetch(`https://dummyjson.com/users/${id}`).then(res => res.json()).then((data: User) => {
                console.log("ID: ", id, data);
                setValues(userForm, {
                    firstname: data.firstName,
                    lastname: data.lastName,
                    age: data.age,
                    role: data.role,
                    phone: data.phone
                });
            }).catch(err => {
                console.log(err);
            });
        }
    });

    const handleSubmit: SubmitHandler<TuserForm> = async (values, event) => {
        console.log(values);
        event.preventDefault();
        setLoading(true);
        let res;

        if (!id) {
            res = await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: values.firstname,
                    lastName: values.lastname,
                    age: values.age,
                    role: values.role,
                    phone: values.phone
                })
            });
        } else {
            res = await fetch(`https://dummyjson.com/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: values.firstname,
                    lastName: values.lastname,
                    age: values.age,
                    role: values.role,
                    phone: values.phone
                })
            });
        }
        const data = await res.json();
        setLoading(false);
        console.log(data);
        if (data.id) onClickClose();
    };
    return (
        <div>
            <Form onSubmit={handleSubmit} class="space-y-4">
                <div class="container mx-auto px-8 py-6">
                    <h3 class="text-start font-medium  mb-3 text-md dark:text-gray-100 text-gray-800">Rellene los campos para {id ? "editar" : "agregar"} el usuario</h3>
                    <div class="flex justify-evenly flex-row">
                        <Field name="firstname">
                            {(field, props) => (
                                <div class="w-full">
                                    <label for="firstname" class="block py-2 text-sm font-medium text-gray-900 dark:text-white">Nombre:</label>
                                    <input {...props} type="text"
                                        required
                                        placeholder="Juan"
                                        value={field.value}
                                        id="firstname"
                                        class="w-full px-3 py-2 text-gray-500 dark:text-gray-200 bg-transparent outline-none  transition duration-150 ease-in-out border focus:border-green-600 shadow-sm rounded-lg" />
                                    {field.error && <div class="text-red-500">{field.error}</div>}
                                </div>
                            )}
                        </Field>
                        <Field name="lastname">
                            {(field, props) => (
                                <div class="w-full ml-2">
                                    <label for="lastname" class="block py-2 text-sm font-medium text-gray-900 dark:text-white">Apellido:</label>
                                    <input {...props} type="text"
                                        required
                                        value={field.value}
                                        id="lastname"
                                        placeholder="Perez"
                                        class="w-full px-3 py-2 text-gray-500 dark:text-gray-200 bg-transparent outline-none  transition duration-150 ease-in-out border focus:border-green-600 shadow-sm rounded-lg"
                                    />
                                    {field.error && <div class="text-red-500">{field.error}</div>}
                                </div>
                            )}
                        </Field>
                    </div>
                    <div class="flex justify-evenly flex-row">
                        <Field name="age" type="number">
                            {(field, props) => (
                                <div class="w-full">
                                    <label for="age" class="block py-1 mt-1 text-sm font-medium text-gray-900 dark:text-white">Edad:</label>
                                    <input {...props} type="number"
                                        required
                                        value={field.value}
                                        placeholder="21"
                                        onChange={(e) => {
                                            const regex = /^[0-9]*$/;
                                            if (regex.test(e.target.value) && e.target.value.length > 0 && isNaN(Number(e.target.value))) {
                                                setValue(userForm, 'age', Number(e.target.value));
                                            }
                                        }}
                                        id="age"
                                        class="w-full mt-2 px-3 py-2 text-gray-500 dark:text-gray-200 bg-transparent outline-none  transition duration-150 ease-in-out border focus:border-green-600 shadow-sm rounded-lg"
                                    />
                                    {field.error && <div class="text-red-500">{field.error}</div>}
                                </div>
                            )}
                        </Field>
                        <Field name="role">
                            {(field, props) => (
                                <div class="w-full ml-2">
                                    <label for="role" class="block py-1 mt-1 text-sm font-medium text-gray-900 dark:text-white">Rol:</label>
                                    <input {...props} type="text"
                                        required
                                        value={field.value}
                                        id="role"
                                        placeholder="user"
                                        class="w-full mt-2 px-3 py-2 text-gray-500 dark:text-gray-200 bg-transparent outline-none  transition duration-150 ease-in-out border focus:border-green-600 shadow-sm rounded-lg"
                                    />
                                    {field.error && <div class="text-red-500">{field.error}</div>}
                                </div>
                            )}
                        </Field>
                    </div>
                    <div class="flex justify-evenly flex-row">
                        <Field name="phone">
                            {(field, props) => (
                                <div class="w-full">
                                    <label for="phone" class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Telefono:</label>
                                    <input {...props} type="text"
                                        required
                                        value={field.value}
                                        placeholder="+58424943235"
                                        id="phone"
                                        class="w-full mt-2 px-3 py-2 text-gray-500 dark:text-gray-200 bg-transparent outline-none  transition duration-150 ease-in-out border focus:border-green-600 shadow-sm rounded-lg"
                                    />
                                    {field.error && <div class="text-red-500">{field.error}</div>}
                                </div>
                            )}
                        </Field>
                    </div>
                    <div>{userForm.response.message}</div>

                </div>
                <div class="flex justify-between items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button onClick={onClickClose} data-modal-hide="default-modal" type="button" class="flex mr-3 py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cerrar</button>
                    <button
                        type="submit"
                        disabled={userForm.invalid || loading()}
                        class={`w-50 flex px-4 py-2 items-center justify-center text-white font-medium bg-gray-900 hover:bg-gray-800 active:bg-gray-600 dark:bg-gray-100 dark:hover:bg-gray-200 dark:active:bg-gray-300 dark:text-gray-800 rounded-lg duration-150 ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <div class={"h-5 w-5 rounded-full border-2 mr-4 border-white dark:border-gray-100 border-t-transparent animate-spin" + (loading() ? '' : ' hidden')}></div>
                        {loading() ? 'Cargando...' : id ? 'Actualizar Usuario' : 'Registrar Usuario'}
                    </button>
                </div>
            </Form >

        </div>
    )
}