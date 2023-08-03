import type { MenuItem } from "./types";

const getMenuItemsByStep = (step: string, menu: MenuItem[]): MenuItem[] => {
  if (step === "DONE") {
    return menu.filter((item) => !["pause", "finish"].includes(item.key));
  } else if (step === "TODO") {
    return menu.filter((item) => item.key !== "pause");
  } else if (step === "IN_PROGRESS") {
    return menu.filter((item) => item.key !== "start");
  } else {
    return menu;
  }
};

export default getMenuItemsByStep;
