import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import 'less/board.less';
import IconFont from 'src/component/common/iconFont';
import HomeVisiteHistory from 'src/util/visiteHistory/homeVisiteHistory';
import LoginVisiteHistory from 'src/util/visiteHistory/loginVisiteHistory';
import { getAuthentication } from 'src/util/session';
import logo from 'src/asset/img/logo-x.svg';
import { Col, Button, Row, Card, Icon } from 'antd';

@withRouter
class Board extends React.Component {
    render() {
        return (
            <div className="board-wrap">
                <div className="board-header">
                    <div className="board-logo" onClick={this.handleClick}>
                        <Link to={'/'}>
                            <img className="logo" src={logo} alt="logo" />
                        </Link>
                        <span className="name">Ultron</span>
                    </div>
                </div>
                <div className="board-content">
                    <Row gutter={[16, 60]}>
                        <Col className="board-gutter-row" span={12}>
                            <div>
                                <h2>启动</h2>
                                <p>
                                    <Button type="link">
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
                        </Col>
                        <Col className="board-gutter-row" span={12}>
                            <div></div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="board-gutter-row" span={12}>
                            <div>
                                <h2>最近</h2>
                                <div className="site-card-wrapper">
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <Card title="2022-09-16" bordered={false}>
                                                Card content
                                            </Card>
                                        </Col>
                                        <Col span={8}>
                                            <Card title="2022-09-16" bordered={false}>
                                                Card content
                                            </Card>
                                        </Col>
                                        <Col span={8}>
                                            <Card title="2022-09-16" bordered={false}>
                                                Card content
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col className="board-gutter-row" span={12}>
                            <div></div>
                        </Col>
                    </Row>
                </div>
                <div className="board-mask"></div>
            </div>
        );
    }

    handleClick = () => {
        HomeVisiteHistory.clearVisitedHistory();
        LoginVisiteHistory.clearVisitedHistory();
    };

    handleClickOpen = () => {
        // 导入数据 成功后 跳转到“/”

        this.props.history.push('/');
        HomeVisiteHistory.clearVisitedHistory();
        LoginVisiteHistory.clearVisitedHistory();
    };
}

export default Board;
