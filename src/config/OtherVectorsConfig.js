const markerIcon = require('src/assets/img/zhijianbiaozhu.png');

export default {
    AD_Marker: {
        type: 'Line',
        iconFields: ['qcStatus'],
        showFields: ['qcStatus'],
        order: 16,
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
                        url: markerIcon,
                        size: 80
                    }
                },
                {
                    value: 3,
                    label: '已修正',
                    style: {
                        showMode: 'first-point',
                        url: markerIcon,
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
        order: 17,
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
                        url: markerIcon,
                        size: 80
                    }
                }
            ]
        }
    }
};
