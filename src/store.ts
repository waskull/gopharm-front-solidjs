import { createStore } from "solid-js/store";
import { Root as TProduct } from "./pages/products";
import { Root as TUser } from "./pages/users";

type User = {
  isAuthenticated: boolean;
  name: string | null;
  image: string | null;
  role: string | null;
};

const initialUser: User = {
  isAuthenticated: false,
  name: null,
  image: null,
  role: null
};

const [user, setUser] = createStore<User>(initialUser);

export const authStore = {
  user,
  login: (name: string, role: string, image: string): void => {
    setUser({ isAuthenticated: true, name: name, role: role, image: image });
  },
  logout: (): void => {
    setUser({ isAuthenticated: false, name: null, role: null, image: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};

const [products, setProducts] = createStore<TProduct>({ products: [], total: 1, skip: 0, limit: 0 });

export const productStore = {
  products,
  addProducts: (product: TProduct): void => {
    setProducts(product);
  },
  addProduct: (product: { id: number; title: string; description: string; price: number; stock: number; thumbnail?: string; }): void => {
    product.thumbnail = "https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/thumbnail.webp";
    setProducts(state => ({
      ...state,
      products: [...state.products, product],
    }));
  },
  resetProducts: (): void => {
    setProducts({ products: [], total: 1, skip: 0, limit: 0 });
  },
  updateProduct: (updatedProduct: { id: number; title: string; description: string; price: number; stock: number; }): any => {
    setProducts(state => ({
      ...state,
      products: state.products.map(p => {
        if (p.id === updatedProduct.id) {
          return {
            ...p,
            title: updatedProduct.title,
            description: updatedProduct.description,
            price: updatedProduct.price,
            stock: updatedProduct.stock
          };
        }
        return p;
      }),
    }));
  },
  deleteProduct: (id: number): void => {
    setProducts(state => ({
      ...state,
      products: state.products.filter(p => p.id !== id),
    }));
  },

};


const [users, setUsers] = createStore<TUser>({ users: [], total: 1, skip: 0, limit: 0 });

export const userStore = {
  users,
  addUsers: (users: TProduct): void => {
    setUsers(users);
  },
  addUser: (newUser: { id: number, firstName: string, lastName: string, age: number, phone: string, role: string, image?: string, username: string }): void => {
    newUser.image = "https://dummyjson.com/icon/emilys/128";
    setUsers(state => ({
      ...state,
      users: [...state.users, newUser],
    }));
  },
  resetUsers: (): void => {
    setUsers({ users: [], total: 1, skip: 0, limit: 0 });
  },
  updateUser: (updatedUser: any): void => {
    setUsers(state => ({
      ...state,
      users: state.users.map(p =>
        p.id === updatedUser.id ? updatedUser : p
      ),
    }));
  },
  deleteUser: (id: number): void => {
    setUsers(state => ({
      ...state,
      users: state.users.filter(p => p.id !== id),
    }));
  },
};