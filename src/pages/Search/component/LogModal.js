import React, { useState, useContext } from 'react';
import { Modal } from 'antd';
import JsonHtml from 'json-pretty-html';
import { LogStore } from 'src/pages/Search/store/LogStore';
import { getLogDetail } from 'src/pages/Search/request/LogRequest';

function LogModal(props) {
    const [visible, setVisible] = useState(false);
    const {
        state: { logDetailData },
        dispatch
    } = useContext(LogStore);
    const { type, label, record } = props;
    const detailJsonIndex = `${record.userName}:${record.taskId}:${record.saveTime}`;
    const totalData = logDetailData[detailJsonIndex];

    const handleClick = async () => {
        const logDetailData = await getLogDetail({
            userName: record.userName,
            taskId: record.taskId,
            saveTime: record.saveTime,
            dataType: type
        });
        dispatch({ type: 'setLogDetail', logDetailData });
        setVisible(true);
    };

    return (
        <span>
            <a onClick={handleClick}>{label}</a>
            <Modal
                width="50vw"
                title={label}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
            >
                <div
                    className="log-content"
                    dangerouslySetInnerHTML={{ __html: JsonHtml(totalData) }}
                />
            </Modal>
        </span>
    );
}

export default LogModal;
