export const QualityLayerConfig = {
    AD_Suspect: {
        type: 'Polygon',
        showFields: ['TYPE'],
        order: 10,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            TYPE: [
                {
                    style: { color: 'rgb(0,0,255)', linewidth: 1 }
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
                    style: { color: 'rgb(255,0,0)', linewidth: 1 }
                }
            ]
        }
    }
};
