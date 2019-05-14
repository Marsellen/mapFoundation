import resource from "src/utils/resource";

export default (function() {
    let service = resource("/mock/menu.json", {}, {});

    return service;
})();
