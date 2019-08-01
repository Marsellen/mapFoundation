import React from 'react';

class AdMessage extends React.Component {
    render() {
        const { visible, content } = this.props;
        return (
            <div
                style={{ display: visible ? 'block' : 'none' }}
                className="ant-message">
                <div className="ant-message-notice">
                    <div className="ant-message-notice-content">
                        <div className="ant-message-custom-content">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdMessage;
