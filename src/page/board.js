import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import 'less/board.less';
import IconFont from 'src/component/common/iconFont';
import HomeVisiteHistory from 'src/util/visiteHistory/homeVisiteHistory';
import LoginVisiteHistory from 'src/util/visiteHistory/loginVisiteHistory';
import { getAuthentication } from 'src/util/session';
import logo from 'src/asset/img/logo-x.svg';

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
                <div className="board-content">新建项目 导入项目 浏览历史</div>
                <div className="board-mask"></div>
            </div>
        );
    }

    handleClick = () => {
        HomeVisiteHistory.clearVisitedHistory();
        LoginVisiteHistory.clearVisitedHistory();
    };
}

export default Board;
