import { Home } from "../../pages/Home";
import { Results } from "../../pages/Results";
import { UpdateTables } from "../../pages/UpdateTables";
import { WeightsTables } from "../../pages/WeightsTables";
import { Today } from "../../pages/Today";
import { Tomorrow } from "../../pages/Tomorrow";

export const routes = [
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-diamond",
    component: Home,
    layout: "",
  },
  {
    path: "/today",
    name: "Today",
    icon: "nc-icon nc-diamond",
    component: Today,
    layout: "",
  },
  {
    path: "/tomorrow",
    name: "Tomorrow",
    icon: "nc-icon nc-diamond",
    component: Tomorrow,
    layout: "",
  },
  {
    path: "/results",
    name: "Results",
    icon: "nc-icon nc-bank",
    component: Results,
    layout: "",
  },
  {
    path: "/updaters",
    name: "Updaters",
    icon: "nc-icon nc-pin-3",
    component: UpdateTables,
    layout: "",
  },
  {
    path: "/weights",
    name: "Weights",
    icon: "nc-icon nc-pin-3",
    component: WeightsTables,
    layout: "",
  }
];