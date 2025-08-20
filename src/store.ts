import { createStore } from "solid-js/store";

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