import React from 'react';
import ToolIcon from 'src/components/ToolIcon';

class AddOutsideRectangle extends React.Component {
    render() {
        return (
            <ToolIcon
                icon="renyiwaijiejuxing"
                title="任意外接立面矩形"
                action={this.action}
            />
        );
    }

    action = () => {
        console.log('任意外接立面矩形半自动绘制开启');
    };
}

export default AddOutsideRectangle;
