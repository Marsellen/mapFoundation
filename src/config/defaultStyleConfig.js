// 新增图层配置  - 图层初始化样式
import {DEFAULT_STYLE} from 'src/config/adMapLayerConfig';

export const DefaultStyleConfig= {
    AD_Road: {
        type: 'Line',
        //符号配置按什么类别展示，当前支持一个
        showFields: ['NOKEY'],
        order: 2,
        //要展示的样式，['vectorStyle','textStyle','pointFLStyle','arrowStyle']
        showStyles: ['vectorStyle'],
        //符号样式配置
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(30,170,106)', linewidth: 1 }
                }
            ]
        },
        level:0,
        tocLevel:true
    },
    AD_LaneDivider: {
        type: 'Line',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        },
        level:14,
        tocLevel:true
    },
    AD_Lane: {
        type: 'Line',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(255,237,37)', linewidth: 1 }
                }
            ]
        },
        level:14,
        tocLevel:true
    },
    AD_LaneAttrPoint: {
        type: 'Point',
        showFields: ['NOKEY'],
        order: 2,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(102,255,102)', radius: 0.15, size: 80 }
                }
            ]
        },
        level:15,
        tocLevel:true
    },
    AD_Arrow: {
        type: 'Polygon',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(255,255,255)', linewidth: 1 }
                }
            ]
        },
        level:16,
        tocLevel:true
    },
    AD_Junction: {
        type: 'Polygon',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(248,15,243)', linewidth: 1 }
                }
            ]
        },
        level:16,
        tocLevel:true
    },
    AD_Lane_Overlap: {
        type: 'Line',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(255,110,100)', linewidth: 1 }
                }
            ]
        },
        level:16,
        tocLevel:true
    }, 

    AD_StopLocation: {
        type: 'Line',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(255,150,150)', linewidth: 1 }
                }
            ]
        },
        level:16,
        tocLevel:true
    },
    AD_Text: {
        type: 'Polygon',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(255,234,149)', linewidth: 1 }
                }
            ]
        },
        level:16,
        tocLevel:true
    },
    AD_TrafficSign: {
        type: 'Polygon',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(70,109,255)', linewidth: 1, colorFill: 'rgb(250,250,250)' }
                }
            ]
        },
        level:15,
        tocLevel:true
    },
    AD_TrafficLight: {
        type: 'Polygon',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(231,120,0)', linewidth: 1, colorFill: 'rgb(243,5,5)' }
                }
            ]
        },
        level:15,
        tocLevel:true
    },
    AD_RS_Barrier: {
        type: 'Line',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(70,109,255)', linewidth: 1 }
                }
            ]
        },
        level:16,
        tocLevel:true
    },
    AD_LaneDivider_Plg: {
        type: 'Polygon',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(0,255,160)', linewidth: 1 }
                }
            ]
        },
        level:15,
        tocLevel:true
    },
    AD_StopLocation_Geo: {
        type: 'Polygon',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(137,195,255)', linewidth: 1 }
                }
            ]
        },
        level:16,
        tocLevel:true
    },
    AD_LaneMark_Geo: {
        type: 'Polygon',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(147,112,219)', linewidth: 1 }
                }
            ]
        },
        level:16,
        tocLevel:true
    },
    AD_Pole_Geo: {
        type: 'Line',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(238,209,11)', linewidth: 1 }
                }
            ]
        },
        level:16,
        tocLevel:true
    }
};
Object.assign(DefaultStyleConfig,DEFAULT_STYLE);
