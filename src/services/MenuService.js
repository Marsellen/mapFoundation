import service from 'src/services';

const MenuService = {
    getMenu: params => {
        const config = {
            url: '/config/menu.json',
            method: 'get',
            params
        };
        return service({ config });
    }
};

export default MenuService;
