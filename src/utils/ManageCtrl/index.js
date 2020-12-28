import { message } from 'antd';
import EditorService from 'src/services/EditorService';

class ManageCtrl {
    config = null;

    saveConfig = async data => {
        try {
            //检查数据能不能成功转化成json对象
            const res = JSON.parse(JSON.parse(JSON.stringify(data)));
            if (typeof res !== 'object') throw new Error('格式不正确');
            //保存质检标注配置
            await EditorService.setQcMarkerConfig(data);
            message.success('更新成功');
        } catch (error) {
            console.log('质检标注配置保存失败' + error?.message);
            message.error('保存失败 ' + error?.message);
        }
    };

    queryConfig = async () => {
        try {
            if (this.config) return this.config;
            const { data } = await EditorService.getQcMarkerConfig();
            this.config = data;
            return data;
        } catch (error) {
            console.log('质检标注配置获取失败' + error?.message);
        }
    };

    getConfig = key => {
        return this.config?.[key];
    };
}

export default new ManageCtrl();
