import React from 'react';
import { withRouter } from 'react-router-dom';
import 'less/blank.less';
import IconFont from 'src/component/common/iconFont';
import HomeVisiteHistory from 'src/util/visiteHistory/homeVisiteHistory';
import LoginVisiteHistory from 'src/util/visiteHistory/loginVisiteHistory';
import { getAuthentication, logout } from 'src/util/session';

@withRouter
class Blank extends React.Component {
    render() {
        return (
            <div className="blank-wrap">
                <div>
                    <p>
                        <IconFont type="icon-jinzhi" className="big-icon" />
                        <span className="big-font">已经打开编辑平台了。</span>
                    </p>
                    <div className="jump-tips-wrap">
                        <IconFont
                            type="icon-dianjilv1"
                            className="small-icon"
                            onClick={this.handleClick}
                        />
                        <div className="small-font">
                            <p>点击此处可在本页打开编辑平台，并关闭其它编辑平台页面。</p>
                            <p>页面切换，注意保存~</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleClick = () => {
        HomeVisiteHistory.clearVisitedHistory();
        LoginVisiteHistory.clearVisitedHistory();

        const { token } = getAuthentication() || {};
        window.location.href = token ? '/' : '/login';
    };
}

export default Blank;
