import { type RouteConfig, route, index } from "@react-router/dev/routes";

export const routes: RouteConfig = [
  // Guest Routes
  index("./routes/_index.tsx"),

  // layout and prefix examples (commented out)
  // layout("./auth/layout.tsx", [
  //   route("login", "./auth/login.tsx"),
  //   route("register", "./auth/register.tsx"),
  // ]),
  //
  // ...prefix("concerts", [
  //   index("./concerts/home.tsx"),
  //   route(":city", "./concerts/city.tsx"),
  //   route("trending", "./concerts/trending.tsx"),
  // ]),
];

export default routes;
