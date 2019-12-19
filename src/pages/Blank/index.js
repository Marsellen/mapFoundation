import React from 'react';
import 'less/blank.less';
import IconFont from 'src/components/IconFont';

class Blank extends React.Component {
    render() {
        return (
            <div className="blank-wrap">
                <IconFont type="icon-jinzhi " className="icon" />
                <span className="txt">已经打开编辑平台了</span>
            </div>
        );
    }
}

export default Blank;
