import appStore from "./appStore";
import pageStore from "src/pages/store";
import demoStore from "demo/store";

export default {
    appStore,
    ...pageStore,
    ...demoStore
};
