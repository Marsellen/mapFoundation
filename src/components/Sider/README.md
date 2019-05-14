### Sider使用文档

#### 使用代码样例
```javascript
let menus = [{
        "label": "工具栏",  //菜单tips及视图title
        "icon": "tool",  //菜单icon，对应antd的<Icon type={icon} />
        "type": "tool"  //菜单类型，对应视图的<div siderIndex={type} />
    },
    {
        "label": "图层管理",
        "icon": "layout",
        "type": "layer"
    }]

<Sider menus={menus}>
    <div siderIndex='tool'>tool 视图</div>
    <div siderIndex='layer'>layer 视图</div>
</Sider>
```

> Sider会根据menus的数据渲染出两个菜单栏，分别对应munes数组的两个对象：{"label": "工具栏", "icon": "tool", "type": "tool"}和{"label": "图层管理", "icon": "layer", "type": "layer"}。
