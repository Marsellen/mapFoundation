import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import 'less/board.less';
import ToolIcon from 'src/component/common/toolIcon';
import IconFont from 'src/component/common/iconFont';
import HomeVisiteHistory from 'src/util/visiteHistory/homeVisiteHistory';
import LoginVisiteHistory from 'src/util/visiteHistory/loginVisiteHistory';
import { getAuthentication } from 'src/util/session';
import Avatar from 'src/component/home/avatar';
import logo from 'src/asset/img/logo-x.svg';
import moment from 'moment';
import { Col, Button, Row, Card, Icon } from 'antd';
import AdLocalStorage from 'src/util/adLocalStorage';
import fileStore from 'src/store/home/fileStore';
import img from 'src/asset/img/gis.gif';
import Home from 'src/component/home/toolList/home';

@withRouter
class Board extends React.Component {
    render() {
        const storages = AdLocalStorage.getTaskInfosStorageAll() || {};
        console.log(storages);
        return (
            <div className="board-wrap">
                <div className="board-header">
                    <div className="board-logo" onClick={this.handleClick}>
                        <img className="logo" src={logo} alt="logo" />
                        <Link to={'/'}>
                            <ToolIcon
                                className="gohome"
                                icon="shouye"
                                title="Home"
                                action={this.action}
                            />
                        </Link>
                    </div>
                    <Avatar />
                </div>
                <div className="board-content">
                    <div className="board-slider"></div>
                    <div className="board-main">
                        <div className="name">Ultron</div>
                        <Row gutter={[16, 60]}>
                            <Col className="board-gutter-row" span={12}>
                                <div>
                                    <h2>启动</h2>
                                    <p>
                                        <Button
                                            type="link"
                                            onClick={e => {
                                                e.preventDefault();
                                                this.handleClickNew();
                                            }}
                                        >
                                            <Icon type="file-add" />
                                            新建项目...
                                        </Button>
                                    </p>
                                    <p>
                                        <Button type="link" onClick={this.handleClickOpen}>
                                            <Icon type="folder-open" />
                                            打开...
                                        </Button>
                                    </p>
                                </div>
                                <div>
                                    <h2>最近</h2>
                                    <div className="board-card-wrapper">
                                        <Row gutter={16}>
                                            {Object.keys(storages).map(key => (
                                                <Col key={key} span={8}>
                                                    <Card hoverable title={key} bordered={false}>
                                                        <div
                                                            className="board-history-img"
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                this.handleClickOpen(key);
                                                            }}
                                                            style={{
                                                                backgroundImage: `url(${storages[key]?.imgPath})`
                                                            }}
                                                        ></div>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Col className="board-gutter-row" span={12}>
                                {/* <div className='board-gutter-right'>
                                    <img src={img}></img>
                                </div> */}
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="board-mask"></div>
            </div>
        );
    }

    handleClick = () => {
        HomeVisiteHistory.clearVisitedHistory();
    };

    handleClickNew = () => {
        this.props.history.push('/');
        HomeVisiteHistory.clearVisitedHistory();
        LoginVisiteHistory.clearVisitedHistory();
        window.location.reload();
    };

    handleClickOpen = key => {
        // 导入数据 成功后 跳转到“/”
        const callBack = flag => {
            if (flag) {
                this.props.history.push('/');
                HomeVisiteHistory.clearVisitedHistory();
            }
        };
        if (typeof key == 'string') {
            const nowData = moment(new Date()).format('YYYY-MM-DD');
            const { files } = AdLocalStorage.getTaskInfosStorage(key) || {};
            fileStore.filesViewer(files, callBack);
        } else {
            fileStore.impConfig(null, callBack);
        }
    };
}

export default Board;
