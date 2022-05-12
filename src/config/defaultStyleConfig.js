export default {
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
    },
    AD_Pole_Geo: {
        type: 'Line',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(32,52,240)', linewidth: 1 }
                }
            ]
        }
    }
};
