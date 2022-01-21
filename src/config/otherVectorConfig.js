const checkIcon = require('src/asset/img/cuowuweizhi.png');
const markerIcon = require('src/asset/img/zhijianbiaozhu.png');
const markerIconBlue = require('src/asset/img/wuxuxiugai.png');
const markerIconGreen = require('src/asset/img/yixiugai.png');

export default {
    AD_Marker_QC: {
        type: 'Line',
        iconFields: ['qcStatus'],
        showFields: ['qcStatus'],
        order: 1,
        showStyles: ['vectorStyle', 'iconStyle'],
        vectorStyle: {
            qcStatus: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        color: 'rgb(255,155,0)',
                        linewidth: 1
                    }
                },
                {
                    value: 1,
                    label: '待修正',
                    style: {
                        color: 'rgb(255,155,0)',
                        linewidth: 1
                    }
                },
                {
                    value: 2,
                    label: '无需修正',
                    style: {
                        color: 'rgb(255,155,0)',
                        linewidth: 1
                    }
                },
                {
                    value: 3,
                    label: '已修正',
                    style: {
                        color: 'rgb(255,155,0)',
                        linewidth: 1
                    }
                }
            ]
        },
        iconStyle: {
            qcStatus: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        showMode: 'first-point',
                        url: markerIcon,
                        size: 80
                    }
                },
                {
                    value: 1,
                    label: '待修正',
                    style: {
                        showMode: 'first-point',
                        url: markerIcon,
                        size: 80
                    }
                },
                {
                    value: 2,
                    label: '无需修正',
                    style: {
                        showMode: 'first-point',
                        url: markerIconBlue,
                        size: 80
                    }
                },
                {
                    value: 3,
                    label: '已修正',
                    style: {
                        showMode: 'first-point',
                        url: markerIconGreen,
                        size: 80
                    }
                }
            ]
        }
    },
    AD_Marker: {
        type: 'Line',
        iconFields: ['fixStatus'],
        showFields: ['fixStatus'],
        order: 1,
        showStyles: ['vectorStyle', 'iconStyle'],
        vectorStyle: {
            fixStatus: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        color: 'rgb(255,155,0)',
                        linewidth: 1
                    }
                },
                {
                    value: 1,
                    label: '待修正',
                    style: {
                        color: 'rgb(255,155,0)',
                        linewidth: 1
                    }
                },
                {
                    value: 2,
                    label: '无需修正',
                    style: {
                        color: 'rgb(255,155,0)',
                        linewidth: 1
                    }
                },
                {
                    value: 3,
                    label: '已修正',
                    style: {
                        color: 'rgb(255,155,0)',
                        linewidth: 1
                    }
                }
            ]
        },
        iconStyle: {
            fixStatus: [
                {
                    value: 0,
                    label: '未定义',
                    style: {
                        showMode: 'first-point',
                        url: markerIcon,
                        size: 80
                    }
                },
                {
                    value: 1,
                    label: '待修正',
                    style: {
                        showMode: 'first-point',
                        url: markerIcon,
                        size: 80
                    }
                },
                {
                    value: 2,
                    label: '无需修正',
                    style: {
                        showMode: 'first-point',
                        url: markerIconBlue,
                        size: 80
                    }
                },
                {
                    value: 3,
                    label: '已修正',
                    style: {
                        showMode: 'first-point',
                        url: markerIconGreen,
                        size: 80
                    }
                }
            ]
        }
    },
    AD_Check: {
        type: 'Point',
        iconFields: ['NOKEY'],
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle', 'iconStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: {
                        color: 'rgb(255,0,0)',
                        radius: 0.05,
                        opacity: 0.6
                    }
                }
            ]
        },
        iconStyle: {
            NOKEY: [
                {
                    style: {
                        color: 'rgb(255,0,0)',
                        radius: 0.05,
                        opacity: 0.6,
                        showMode: 'first-point',
                        url: checkIcon,
                        size: 80
                    }
                }
            ]
        }
    },
    AD_Horizontal: {
        type: 'Line',
        showStyles: ['vectorStyle', 'arrowStyle'],
        showFields: ['NOKEY'],
        arrowFields: ['NOKEY'],
        order: 1,
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(255,0,0)', linewidth: 1 }
                }
            ]
        },
        arrowStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(255,0,0)', linewidth: 1 }
                }
            ]
        }
    }
};
