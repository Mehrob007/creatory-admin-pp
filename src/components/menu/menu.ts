interface NavBar {
  title: string;
  path: string;
}

export const navBar: NavBar[] = [
  {
    title: "Главная страница",
    path: "/",
  },
  {
    title: "Услуги",
    path: "/service",
  },
  {
    title: "Оферта",
    path: "/offer",
  },
  {
    title: "Правила паркинга",
    path: "/parking-rules",
  },
];
