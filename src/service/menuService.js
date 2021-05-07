import service from 'src/service';

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
