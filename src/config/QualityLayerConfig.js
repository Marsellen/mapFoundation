export const QualityLayerConfig = {
    AD_Suspect: {
        type: 'Polygon',
        showFields: ['TYPE'],
        order: 10,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            TYPE: [
                {
                    style: {
                        color: 'rgb(100,255,320)',
                        linewidth: 1,
                        lineStyle: 'dashed',
                        dashSize: 0.5,
                        gapSize: 0.5
                    }
                }
            ]
        }
    },
    AD_Wrong: {
        type: 'Polygon',
        showFields: ['TYPE'],
        order: 11,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            TYPE: [
                {
                    style: {
                        color: 'rgb(255,130,200)',
                        linewidth: 1,
                        lineStyle: 'dashed',
                        dashSize: 0.5,
                        gapSize: 0.5
                    }
                }
            ]
        }
    }
};
