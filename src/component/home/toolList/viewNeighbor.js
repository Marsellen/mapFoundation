import React from 'react';
import { inject, observer } from 'mobx-react';
import { message, Menu, Modal } from 'antd';
import ToolIcon from 'src/component/common/toolIcon';
import { IFDEntry, VectorLayer } from '@ad/xmap';
import AdEmitter from 'src/util/event';
import CheckButton from 'src/component/common/checkButton';

import VectorsStore from 'src/store/home/vectorsStore';
import RelStore from 'src/store/home/relStore';
import AttrStore from 'src/store/home/attrStore';

import {
    completeTitleUrl,
    filePathTitleUrl
} from 'src/util/taskUtils';
@inject('TaskStore')
@inject('mapStore')

@observer
class ViewNeighbor extends React.Component {
    regions = [];
    state = { active: false };
    // 切片名称
    titleName = [];
    // 判断是否已经加载切片
    selecteTitleName = [];

    componentDidMount() {
        AdEmitter.on('taskChanged', () => {
            this.regions = [];
            this.setState({ active: false });
        });
    }

    render() {
        // 暂存边框图层
        this.regionLayer = null;
        this.titleName = [];
        this.selecteTitleName = [];
        const { TaskStore } = this.props;
        const { active } = this.state;
        const { activeTaskId } = TaskStore;
        if (typeof (TaskStore.activeTask.referTileIds) !== 'undefined') {
            const titles = TaskStore.activeTask.referTileIds.substring(1, TaskStore.activeTask.referTileIds.length - 1).split(',');
            titles.forEach(item => {
                this.titleName.push(item.trim());
            });
        }
        const isDesc = TaskStore.activeTask?.nodeDesc === "人工检修" ? true : false;
        return (!isDesc ?
            <ToolIcon
                id="neighbor"
                icon="block"
                title="获取周边任务信息"
                action={this.action}
                visible={active}
                disabled={!activeTaskId}
            />
            : <CheckButton
                icon="limianjuxing"
                key={['sdfs']}
                defaultOption={{
                    key: 'block',
                    title: '获取周边任务信息',
                    actionid: 'redo-btn'
                }}
                handleClickFlag={true}
                handleClick={this.addlayerRegion}
                contentTitle="获取周边任务信息"
                renderContent={this.renderCon}
                onRef={ref => (this.checkButton = ref)}
            />

        );
    }
    renderCon = selecteName => {
        return (
            <Menu className="menu" >
                {this.titleName?.map((item, index) => (
                    <Menu.Item key={item} onClick={this.menuAction}>
                        <p className="menu-item-box">
                            {item}
                        </p>
                    </Menu.Item>
                ))}
            </Menu>

        );
    };
    menuAction = async (e) => {

        let content = "加载周边任务" + e.key + "会影响当前任务性能，是否确定加载！";

        const name = this.selecteTitleName.find((item) => {
            return item === e.key;
        })
        if (!name) {
            this.selecteTitleName.push(e.key);
            // 加载数据
            Modal.confirm({
                title: '加载提示',
                content,
                okText: '确定',
                cancelText: '取消',
                autoFocusButton: null,
                onOk: () => {
                    this.loadTitle(e.key)
                },
                onCancel: () => {
                    // this.props.QualityCheckStore.cancelPolling();
                    // this.setState({ visible: false });
                }
            });
        }
        else {
            message.error("当前任务已经加载！");
        }


    };

    // 加载title 数据
    loadTitle = async (name) => {
        // 获取矢量列表
        try {
            let urls = [];

            const { TaskStore } = this.props;
            const { activeTask } = TaskStore;
            activeTask.titlePath = name;
            // 加载矢量图层 
            const file = filePathTitleUrl(activeTask);
            urls = JSON.parse(JSON.stringify(await TaskStore.getTitleFileList(
                {
                    taskId: activeTask.taskId,
                    filePath: file + name
                }
            )));

            if (urls.length > 0) {
                let taskFileMap = TaskStore.getTaskFileMap(urls, completeTitleUrl);
                const { vectors, rels, attrs, regions } = taskFileMap;

                AttrStore.addRecords(attrs, 'titleMap'),
                    RelStore.addRecords(rels, 'titleMap')
                await VectorsStore.addRecordsTitle(vectors, 'titleMap');


            }

        } catch (e) {
            console.log(`task file list 请求失败：${e.message || e}`);
        }

    };
    addlayerRegion = async () => {
        if (this.titleName.length > 0) {
            const { TaskStore, mapStore } = this.props;
            const { activeTask } = TaskStore;
            if (!this.regionLayer) {
                // this.regionLayer = mapStore.addVectorLayer({ color: 'rgb(16,201,133)', opacity: 0.5 });
                this.regionLayer = mapStore.addVectorLayer({
                    color: 'rgb(16,201,133)', opacity: 0.5,
                    layerConfig: {
                        textStyle: {
                            showMode: 'polygon-center',
                            defaultStyle: {
                                textFields: ['titleId'],
                                interval: 10,
                                showMode: 'polygon-center',
                                fontSize: 40,
                                strokeColor: 'rgba(0,0,0,1)',
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                textColor: 'rgba(255,255,255,1)'
                            },
                            titleId: []
                        },
                        textFields: ['titleId',],
                        showStyles: ['vectorStyle', 'textStyle']
                    }
                });
                this.titleName.forEach((item, index) => {
                    // 查询所在目录
                    activeTask.titlePath = item;
                    const url = completeTitleUrl("region.geojson", activeTask);
                    // 新增要素 
                    mapStore.addGeoToFeature(this.regionLayer, url, {
                        titleId: item
                    });
                });
            }
            else {
                if (this.regionLayer.visible) {
                    this.regionLayer.show()
                }
                else {
                    this.regionLayer.hide();
                }
                this.regionLayer.visible = !this.regionLayer.visible;
            }
        }


    };
    action = async () => {
        const { active } = this.state;
        if (active) {
            const layerManager = window.map.getLayerManager();
            for (let layer of this.regions) {
                layerManager.removeVectorLayer(layer);
                layer = null;
            }
            this.regions = [];
            this.setState({ active: false });
        } else {
            const { TaskStore } = this.props;
            const { activeTask } = TaskStore;
            const { Input_imp_data_path, taskId } = activeTask;
            const res = await TaskStore.getNeighbor();
            const { data } = res || {};
            if (!data || !data.taskList) return;
            for (let regionItem of data.taskList) {
                const { region, ...info } = regionItem;
                const regionUrl = Input_imp_data_path.replace(taskId, region);
                let vectorLayer = new VectorLayer(regionUrl, {
                    layerConfig: {
                        textStyle: {
                            showMode: 'polygon-center',
                            defaultStyle: {
                                textFields: ['taskId', 'status', 'user'],
                                interval: 10,
                                showMode: 'polygon-center',
                                fontSize: 40,
                                strokeColor: 'rgba(0,0,0,1)',
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                textColor: 'rgba(255,255,255,1)'
                            },
                            taskId: [],
                            status: [],
                            user: []
                        },
                        textFields: ['taskId', 'status', 'user'],
                        showStyles: ['vectorStyle', 'textStyle']
                    }
                });
                vectorLayer.setDefaultStyle({ color: 'rgb(16,201,133)', opacity: 0.5 });
                this.regions.push(vectorLayer);
                await window.map.getLayerManager().addLayer('VectorLayer', vectorLayer);
                for (let feature of vectorLayer.shapeNode.children) {
                    feature.properties.data.properties = info;
                }
                vectorLayer.updateFeatures(vectorLayer.shapeNode.children.map(i => i.properties));
            }
            this.setState({ active: true });
        }
    };

}

export default ViewNeighbor;
