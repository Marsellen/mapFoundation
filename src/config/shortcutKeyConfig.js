import {
    RESOURCE_LAYER_VECTOR,
    RESOURCE_LAYER_BOUNDARY,
    RESOURCE_LAYER_CHECK,
    RESOURCE_LAYER_MARKER
} from 'src/config/dataLayerConfig';
import ResourceLayerStore from 'src/store/home/resourceLayerStore';
import VectorsStore from 'src/store/home/vectorsStore';

export const SHORTCUT_KEYS = [
    {
        id: 'save-btn',
        ctrl: true,
        alt: false,
        shift: false,
        keyCode: 83,
        preventDefault: true,
        describe: '保存 Ctrl+S'
    },
    {
        id: 'undo-btn',
        ctrl: true,
        alt: false,
        shift: false,
        keyCode: 90,
        describe: '撤销 Ctrl+Z'
    },
    {
        id: 'redo-btn',
        ctrl: true,
        alt: false,
        shift: false,
        keyCode: 89,
        describe: '恢复 Ctrl+Y'
    },
    {
        id: 'ceju-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 76,
        describe: '测距 L'
    },
    // {
    //     id: 'search-btn',
    //     ctrl: true,
    //     alt: false,
    //     shift: false,
    //     keyCode: 70,
    //     preventDefault: true,
    //     describe: 'ID查询/坐标查询 Ctrl+f'
    // },
    // {
    //     id: 'read-coordinate-btn',
    //     ctrl: true,
    //     alt: false,
    //     shift: false,
    //     keyCode: 80,
    //     preventDefault: true,
    //     describe: '坐标拾取 Ctrl+P'
    // },
    {
        id: 'under-view-btn',
        ctrl: true,
        alt: false,
        shift: false,
        keyCode: 71,
        preventDefault: true,
        describe: '缩放至全图 Ctrl+G'
    },
    {
        id: 'top-view-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 88,
        describe: '俯视图模式 X'
    },
    {
        id: 'add-line-btn',
        ctrl: false,
        alt: true,
        shift: false,
        keyCode: 49,
        describe: '添加线要素 Alt+1'
    },
    {
        id: 'add-curved-line-btn',
        ctrl: false,
        alt: true,
        shift: false,
        keyCode: 50,
        describe: '添加曲线 Alt+2'
    },
    {
        id: 'add-polygon-btn',
        ctrl: false,
        alt: true,
        shift: false,
        keyCode: 49,
        describe: '添加面要素 Alt+1'
    },
    {
        id: 'add-point-btn',
        ctrl: false,
        alt: true,
        shift: false,
        keyCode: 49,
        describe: '添加点要素 Alt+1'
    },
    {
        id: 'add-template-arrow-btn',
        ctrl: false,
        alt: true,
        shift: false,
        keyCode: 50,
        describe: '绘制模板箭头 Alt+2'
    },
    {
        id: 'add-facade-rectangle-btn',
        ctrl: false,
        alt: true,
        shift: false,
        keyCode: 50,
        describe: '添加两点立面矩形 Alt+2'
    },
    {
        id: 'add-outside-rectangle-btn',
        ctrl: false,
        alt: true,
        shift: false,
        keyCode: 51,
        describe: '添加立面矩形 Alt+3'
    },
    {
        id: 'add-ground-rectangle-btn',
        ctrl: false,
        alt: true,
        shift: false,
        keyCode: 52,
        describe: '添加地面矩形 Alt+4'
    },
    {
        id: 'add-circle-btn',
        ctrl: false,
        alt: true,
        shift: false,
        keyCode: 53,
        describe: '添加三点画圆 Alt+5'
    },
    {
        id: 'delete-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 46,
        describe: '删除要素 Delete'
    },
    {
        id: 'force-delete-btn',
        ctrl: true,
        alt: false,
        shift: false,
        keyCode: 46,
        describe: '强制删除要素 Delete'
    },
    {
        id: 'add-rel-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 82,
        describe: '新建关联关系 R'
    },
    {
        id: 'del-rel-btn',
        ctrl: false,
        alt: true,
        shift: false,
        keyCode: 82,
        describe: '删除关联关系 Alt+R'
    },
    {
        id: 'break-line-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 66,
        describe: '打断 B'
    },
    {
        id: 'break-group-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 66,
        describe: '齐打断 B'
    },
    {
        id: 'merge-line-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 77,
        describe: '合并 M'
    },
    {
        id: 'batch-merge-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 77,
        describe: '合并 M'
    },
    {
        id: 'change-points-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 86,
        describe: '修改形状点 V'
    },
    {
        id: 'reverse-order-line-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 73,
        describe: '线要素逆序 I'
    },
    {
        id: 'picture-icon',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 52,
        describe: '开关照片窗口 4'
    },
    {
        id: 'view-attribute-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 53,
        describe: '开关属性列表 5'
    },
    {
        id: 'check-result-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 54,
        describe: '开关检查列表 6'
    },
    {
        id: 'marker-list-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 55,
        describe: '开关质检标注列表 7'
    },
    {
        id: 'copy-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 67,
        describe: '复制线要素 C'
    },
    {
        id: 'translation-point-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 84,
        describe: '平移点要素 T'
    },
    {
        id: 'break-by-line-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 78,
        describe: '拉线齐打断线要素 N'
    },
    {
        id: 'attribute-brush-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 89,
        describe: '属性刷 Y'
    },
    {
        id: 'trim-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 74,
        describe: '修整线要素 J'
    },
    {
        id: 'posture-adjust-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 85,
        describe: '位姿调整 U'
    },
    {
        id: 'batch-assign-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 75,
        describe: '批量赋值 K'
    },
    {
        id: 'group-move-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 84,
        describe: '批量平移 T'
    },
    {
        id: 'union-break',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 72,
        describe: '联合打断 H'
    },
    {
        id: 'batch-build-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 79,
        describe: '批量生成车道线'
    },
    {
        id: 'buffer-btn',
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 80,
        describe: 'buffer渲染 P'
    },
    {
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 49,
        callback: () => {
            ResourceLayerStore.layerToggle('point_clouds');
        },
        describe: '开关点云图层 1'
    },
    {
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 50,
        callback: () => {
            ResourceLayerStore.switchToggle(RESOURCE_LAYER_VECTOR, true, true);
            VectorsStore.switchToggle(true, 'vector', true);
        },
        describe: '开关高精地图图层 2'
    },
    {
        ctrl: true,
        alt: false,
        shift: false,
        keyCode: 50,
        callback: () => {
            ResourceLayerStore.switchToggle(RESOURCE_LAYER_BOUNDARY, true, true);
            VectorsStore.switchToggle(true, 'boundary', true);
        },
        describe: '开关周边底图图层 Ctrl+2'
    },
    {
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 51,
        callback: () => {
            ResourceLayerStore.layerToggle('track');
        },
        describe: '开关轨迹图层 3'
    },
    {
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 56,
        callback: () => {
            ResourceLayerStore.toggleConfidenceLayer();
        },
        describe: '开关置信度分区图层 8'
    },
    {
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 48,
        callback: () => {
            ResourceLayerStore.toggle(RESOURCE_LAYER_CHECK, true, true);
        },
        describe: '开关检查结果图层 0'
    },
    {
        ctrl: false,
        alt: false,
        shift: false,
        keyCode: 57,
        callback: () => {
            ResourceLayerStore.toggle(RESOURCE_LAYER_MARKER, true, true);
        },
        describe: '开关质检标注图层 9'
    },
    {
        id: 'add-quality-mark',
        ctrl: false,
        alt: true,
        shift: false,
        keyCode: 49,
        describe: '新建质检标注 Alt+1'
    },
    {
        id: 'pick-element',
        ctrl: false,
        alt: true,
        shift: false,
        keyCode: 50,
        describe: '拾取要素ID Alt+2'
    }
];
