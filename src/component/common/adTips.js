import React from 'react';
import 'less/ad-tips.less';

export default function AdTips(props) {
    let { visible, content, position } = props;
    let style = {
        top: position && position.y + 10,
        left: position && position.x + 10
    };
    return visible && content ? (
        <div className="ad-tips" style={style}>
            {content}
        </div>
    ) : (
        <span />
    );
}
