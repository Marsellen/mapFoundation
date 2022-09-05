import React from 'react';
import ToolIcon from 'src/component/common/toolIcon';
import { observer } from 'mobx-react';
import { Icon } from 'antd';
import AdMessage from 'src/component/common/adMessage';
import 'less/tool-icon.less';
import 'src/asset/less/add-rel.less';
import VectorsStore from 'src/store/home/vectorsStore';

@observer
class ImpTool extends React.Component {
    constructor() {
        super();
    }
    render() {
        let visible = false;
        return (
            <span>
                <ToolIcon
                    id="add-rel-btn"
                    icon="xinzengguanxi"
                    title="导入GeoJSON数据"
                    className="ad-tool-icon"
                    focusClassName="ad-tool-icon-active"
                    visible={visible}
                    action={this.action}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    action = () => {
        let formCreate = document.getElementById("fileName");
        if (formCreate) {
            formCreate.removeChild(document.getElementById("file"));
            document.body.removeChild(formCreate);
        }
        let form = document.createElement('form');
        form.style.display = 'none';
        form.id = "fileName";
        document.body.appendChild(form);
        let fileInput = document.createElement('input');
        fileInput.id = 'file';
        fileInput.multiple = true;
        fileInput.type = 'file';
        fileInput.click();
        fileInput.addEventListener('change', function () {
            let filesName = [];
            let files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader();
                reader.readAsText(files[i]);
                let that = this;
                let name = files[i].name;
                that.name = name;
                reader.onload = (data) => {
                    filesName[that.name] = data.target.result;
                    // alert(data.target.result)
                    VectorsStore.addRecords(null, 'current', JSON.parse(data.target.result));
                };
            }
        });
        form.appendChild(fileInput);
    };
    content = () => {
        return (
            <label>
                <Icon type="info-circle" onClick={this.renderTips} /> 导入GeoJSON数据
            </label>
        );
    };
}

export default ImpTool;
