const markerIcon = require('src/assets/img/biaojituceng.png');

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
                        size: 128
                    }
                },
                {
                    value: 1,
                    label: '待修正',
                    style: {
                        showMode: 'first-point',
                        url: markerIcon,
                        size: 128
                    }
                },
                {
                    value: 2,
                    label: '无需修正',
                    style: {
                        showMode: 'first-point',
                        url: markerIcon,
                        size: 128
                    }
                },
                {
                    value: 3,
                    label: '已修正',
                    style: {
                        showMode: 'first-point',
                        url: markerIcon,
                        size: 128
                    }
                }
            ]
        }
    }
};
