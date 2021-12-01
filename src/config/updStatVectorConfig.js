import {
    GEOMETRY_ADD,
    GEOMETRY_MOD,
    RELATION_MOD,
    AD_ROAD_ATTRIBUTE_MOD,
    AD_LANEDIVIDER_ATTRIBUTE_MOD,
    AD_LANE_ATTRIBUTE_MOD,
    AD_ARROW_ATTRIBUTE_MOD,
    AD_STOPLOCATION_ATTRIBUTE_MOD,
    AD_TEXT_ATTRIBUTE_MOD,
    AD_TRAFFICSIGN_ATTRIBUTE_MOD,
    AD_TRAFFICLIGHT_ATTRIBUTE_MOD,
    AD_LANEDIVIDER_PLG_ATTRIBUTE_MOD,
    AD_STOPLOCATION_GEO_ATTRIBUTE_MOD,
    AD_LANEMARK_GEO_ATTRIBUTE_MOD,
    AD_POLE_GEO_ATTRIBUTE_MOD
} from 'src/config/renderModeConfig';
const jihexinzeng = require('src/asset/img/jihexinzeng.png');
const jihexiugai = require('src/asset/img/jihexiugai.png');
const shuxingxiugai = require('src/asset/img/shuxingxiugai.png');
const guanxixiugai = require('src/asset/img/guanxixiugai.png');

export const UPD_STAT_VECTOR_CONFIG = {
    AD_Road: {
        type: 'Line',
        iconFields: ['UPD_STAT'],
        showStyles: ['iconStyle'],
        key: 'AD_Road',
        order: 1,
        iconStyle: {
            UPD_STAT: [
                {
                    value: GEOMETRY_ADD,
                    style: {
                        showMode: 'center-point',
                        url: jihexinzeng,
                        size: 30
                    }
                },
                {
                    value: GEOMETRY_MOD,
                    style: {
                        showMode: 'center-point',
                        url: jihexiugai,
                        size: 30
                    }
                },
                {
                    value: AD_ROAD_ATTRIBUTE_MOD,
                    style: {
                        showMode: 'center-point',
                        url: shuxingxiugai,
                        size: 30
                    }
                },
                {
                    value: RELATION_MOD,
                    style: {
                        showMode: 'center-point',
                        url: guanxixiugai,
                        size: 30
                    }
                }
            ]
        }
    },
    AD_LaneDivider: {
        type: 'Line',
        iconFields: ['UPD_STAT'],
        showStyles: ['iconStyle'],
        key: 'AD_LaneDivider',
        order: 1,
        iconStyle: {
            UPD_STAT: [
                {
                    value: GEOMETRY_ADD,
                    style: {
                        showMode: 'center-point',
                        url: jihexinzeng,
                        size: 30
                    }
                },
                {
                    value: GEOMETRY_MOD,
                    style: {
                        showMode: 'center-point',
                        url: jihexiugai,
                        size: 30
                    }
                },
                {
                    value: AD_LANEDIVIDER_ATTRIBUTE_MOD,
                    style: {
                        showMode: 'center-point',
                        url: shuxingxiugai,
                        size: 30
                    }
                },
                {
                    value: RELATION_MOD,
                    style: {
                        showMode: 'center-point',
                        url: guanxixiugai,
                        size: 30
                    }
                }
            ]
        }
    },
    AD_Lane: {
        type: 'Line',
        iconFields: ['UPD_STAT'],
        showStyles: ['iconStyle'],
        key: 'AD_Lane',
        order: 1,
        iconStyle: {
            UPD_STAT: [
                {
                    value: GEOMETRY_ADD,
                    style: {
                        showMode: 'center-point',
                        url: jihexinzeng,
                        size: 30
                    }
                },
                {
                    value: GEOMETRY_MOD,
                    style: {
                        showMode: 'center-point',
                        url: jihexiugai,
                        size: 30
                    }
                },
                {
                    value: AD_LANE_ATTRIBUTE_MOD,
                    style: {
                        showMode: 'center-point',
                        url: shuxingxiugai,
                        size: 30
                    }
                },
                {
                    value: RELATION_MOD,
                    style: {
                        showMode: 'center-point',
                        url: guanxixiugai,
                        size: 30
                    }
                }
            ]
        }
    },
    AD_Arrow: {
        type: 'Line',
        iconFields: ['UPD_STAT'],
        showStyles: ['iconStyle'],
        key: 'AD_Arrow',
        order: 1,
        iconStyle: {
            UPD_STAT: [
                {
                    value: GEOMETRY_ADD,
                    style: {
                        showMode: 'center-point',
                        url: jihexinzeng,
                        size: 30
                    }
                },
                {
                    value: GEOMETRY_MOD,
                    style: {
                        showMode: 'center-point',
                        url: jihexiugai,
                        size: 30
                    }
                },
                {
                    value: AD_ARROW_ATTRIBUTE_MOD,
                    style: {
                        showMode: 'center-point',
                        url: shuxingxiugai,
                        size: 30
                    }
                },
                {
                    value: RELATION_MOD,
                    style: {
                        showMode: 'center-point',
                        url: guanxixiugai,
                        size: 30
                    }
                }
            ]
        }
    },
    AD_StopLocation: {
        type: 'Line',
        iconFields: ['UPD_STAT'],
        showStyles: ['iconStyle'],
        key: 'AD_StopLocation',
        order: 1,
        iconStyle: {
            UPD_STAT: [
                {
                    value: GEOMETRY_ADD,
                    style: {
                        showMode: 'center-point',
                        url: jihexinzeng,
                        size: 30
                    }
                },
                {
                    value: GEOMETRY_MOD,
                    style: {
                        showMode: 'center-point',
                        url: jihexiugai,
                        size: 30
                    }
                },
                {
                    value: AD_STOPLOCATION_ATTRIBUTE_MOD,
                    style: {
                        showMode: 'center-point',
                        url: shuxingxiugai,
                        size: 30
                    }
                },
                {
                    value: RELATION_MOD,
                    style: {
                        showMode: 'center-point',
                        url: guanxixiugai,
                        size: 30
                    }
                }
            ]
        }
    },
    AD_Text: {
        type: 'Line',
        iconFields: ['UPD_STAT'],
        showStyles: ['iconStyle'],
        key: 'AD_Text',
        order: 1,
        iconStyle: {
            UPD_STAT: [
                {
                    value: GEOMETRY_ADD,
                    style: {
                        showMode: 'center-point',
                        url: jihexinzeng,
                        size: 30
                    }
                },
                {
                    value: GEOMETRY_MOD,
                    style: {
                        showMode: 'center-point',
                        url: jihexiugai,
                        size: 30
                    }
                },
                {
                    value: AD_TEXT_ATTRIBUTE_MOD,
                    style: {
                        showMode: 'center-point',
                        url: shuxingxiugai,
                        size: 30
                    }
                },
                {
                    value: RELATION_MOD,
                    style: {
                        showMode: 'center-point',
                        url: guanxixiugai,
                        size: 30
                    }
                }
            ]
        }
    },
    AD_TrafficSign: {
        type: 'Line',
        iconFields: ['UPD_STAT'],
        showStyles: ['iconStyle'],
        key: 'AD_TrafficSign',
        order: 1,
        iconStyle: {
            UPD_STAT: [
                {
                    value: GEOMETRY_ADD,
                    style: {
                        showMode: 'center-point',
                        url: jihexinzeng,
                        size: 30
                    }
                },
                {
                    value: GEOMETRY_MOD,
                    style: {
                        showMode: 'center-point',
                        url: jihexiugai,
                        size: 30
                    }
                },
                {
                    value: AD_TRAFFICSIGN_ATTRIBUTE_MOD,
                    style: {
                        showMode: 'center-point',
                        url: shuxingxiugai,
                        size: 30
                    }
                },
                {
                    value: RELATION_MOD,
                    style: {
                        showMode: 'center-point',
                        url: guanxixiugai,
                        size: 30
                    }
                }
            ]
        }
    },
    AD_TrafficLight: {
        type: 'Line',
        iconFields: ['UPD_STAT'],
        showStyles: ['iconStyle'],
        key: 'AD_TrafficLight',
        order: 1,
        iconStyle: {
            UPD_STAT: [
                {
                    value: GEOMETRY_ADD,
                    style: {
                        showMode: 'center-point',
                        url: jihexinzeng,
                        size: 30
                    }
                },
                {
                    value: GEOMETRY_MOD,
                    style: {
                        showMode: 'center-point',
                        url: jihexiugai,
                        size: 30
                    }
                },
                {
                    value: AD_TRAFFICLIGHT_ATTRIBUTE_MOD,
                    style: {
                        showMode: 'center-point',
                        url: shuxingxiugai,
                        size: 30
                    }
                },
                {
                    value: RELATION_MOD,
                    style: {
                        showMode: 'center-point',
                        url: guanxixiugai,
                        size: 30
                    }
                }
            ]
        }
    },
    AD_LaneDivider_Plg: {
        type: 'Line',
        iconFields: ['UPD_STAT'],
        showStyles: ['iconStyle'],
        key: 'AD_LaneDivider_Plg',
        order: 1,
        iconStyle: {
            UPD_STAT: [
                {
                    value: GEOMETRY_ADD,
                    style: {
                        showMode: 'center-point',
                        url: jihexinzeng,
                        size: 30
                    }
                },
                {
                    value: GEOMETRY_MOD,
                    style: {
                        showMode: 'center-point',
                        url: jihexiugai,
                        size: 30
                    }
                },
                {
                    value: AD_LANEDIVIDER_PLG_ATTRIBUTE_MOD,
                    style: {
                        showMode: 'center-point',
                        url: shuxingxiugai,
                        size: 30
                    }
                },
                {
                    value: RELATION_MOD,
                    style: {
                        showMode: 'center-point',
                        url: guanxixiugai,
                        size: 30
                    }
                }
            ]
        }
    },
    AD_StopLocation_Geo: {
        type: 'Line',
        iconFields: ['UPD_STAT'],
        showStyles: ['iconStyle'],
        key: 'AD_StopLocation_Geo',
        order: 1,
        iconStyle: {
            UPD_STAT: [
                {
                    value: GEOMETRY_ADD,
                    style: {
                        showMode: 'center-point',
                        url: jihexinzeng,
                        size: 30
                    }
                },
                {
                    value: GEOMETRY_MOD,
                    style: {
                        showMode: 'center-point',
                        url: jihexiugai,
                        size: 30
                    }
                },
                {
                    value: AD_STOPLOCATION_GEO_ATTRIBUTE_MOD,
                    style: {
                        showMode: 'center-point',
                        url: shuxingxiugai,
                        size: 30
                    }
                },
                {
                    value: RELATION_MOD,
                    style: {
                        showMode: 'center-point',
                        url: guanxixiugai,
                        size: 30
                    }
                }
            ]
        }
    },
    AD_LaneMark_Geo: {
        type: 'Line',
        iconFields: ['UPD_STAT'],
        showStyles: ['iconStyle'],
        key: 'AD_LaneMark_Geo',
        order: 1,
        iconStyle: {
            UPD_STAT: [
                {
                    value: GEOMETRY_ADD,
                    style: {
                        showMode: 'center-point',
                        url: jihexinzeng,
                        size: 30
                    }
                },
                {
                    value: GEOMETRY_MOD,
                    style: {
                        showMode: 'center-point',
                        url: jihexiugai,
                        size: 30
                    }
                },
                {
                    value: AD_LANEMARK_GEO_ATTRIBUTE_MOD,
                    style: {
                        showMode: 'center-point',
                        url: shuxingxiugai,
                        size: 30
                    }
                },
                {
                    value: RELATION_MOD,
                    style: {
                        showMode: 'center-point',
                        url: guanxixiugai,
                        size: 30
                    }
                }
            ]
        }
    },
    AD_Pole_Geo: {
        type: 'Line',
        iconFields: ['UPD_STAT'],
        showStyles: ['iconStyle'],
        key: 'AD_Pole_Geo',
        order: 1,
        iconStyle: {
            UPD_STAT: [
                {
                    value: GEOMETRY_ADD,
                    style: {
                        showMode: 'center-point',
                        url: jihexinzeng,
                        size: 30
                    }
                },
                {
                    value: GEOMETRY_MOD,
                    style: {
                        showMode: 'center-point',
                        url: jihexiugai,
                        size: 30
                    }
                },
                {
                    value: AD_POLE_GEO_ATTRIBUTE_MOD,
                    style: {
                        showMode: 'center-point',
                        url: shuxingxiugai,
                        size: 30
                    }
                },
                {
                    value: RELATION_MOD,
                    style: {
                        showMode: 'center-point',
                        url: guanxixiugai,
                        size: 30
                    }
                }
            ]
        }
    }
};
