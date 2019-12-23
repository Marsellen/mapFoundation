export default {
    params: {
        SCALE_FACTOR_ADD: 1,     //新增形状点时的比例系数
        SCALE_FACTOR_DELETE: 1.2,//删除形状点的比例系数
        SCALE_FACTOR_DRAGE: 1.0, //拖拽的形状点比例系数

        //下面三个参数涉及点大小的实时计算，不建议修改
        INIT_SIZE_NODE: 0.3,     //节点初始化大小
        INIT_SIZE_FACTOR: 1,     //默认点大小比例
        SCALE_SIZE_VALUE: 15,    //实时计算点大小比例的一个参数 
    },
    style: {
        featureSelectedStyle: { color: 'rgb(255,134,237)' },       //要素被选中时的样式
        // featureCreatedStyle: { color:'rgb(238,68,80)' },         //要素被创建时的样式
        featureBasePointStyle: { color: 'rgb(109,85,255)' },      //编辑时，要素基本形状点的样式
        featureAddPointStyle: { color: 'rgb(235,45,19)' },      //编辑时，要素新增形状点的样式
        //featureChangePointStyle:{ color: 'rgb(109,85,255)' },    //编辑时，要素拖拽形状点的样式
        featureDeletePointStyle: { color: 'rgb(235,45,19)' },   //编辑时，要素删除形状点的样式
        featureAdsorbSideStyle: { color: 'rgb(255,160,76)' },      //编辑时，吸附到要素边时的样式
        featureAdsorbEndPointStyle: { color: 'rgb(235,45,19)' }, //编辑时，吸附到首尾点时的样式
        featureAuxiliarySolidLineStyle: { color: 'rgb(238,65,80)' },  //辅助实线
        featureAuxiliaryDashedLineStyle: { color: 'rgb(238,68,80)', linewidth: 1, scale: 1, dashSize: 0.3, gapSize: 0.3 },//辅助虚线
    },
}