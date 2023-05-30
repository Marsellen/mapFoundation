import React from 'react';
import IconFont from 'src/components/iconFont';
import { Col, Button, Row, Card, Icon } from 'antd';
import 'less/board.less';

class Board extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentWillMount = () => {};

    render() {
        return <div className="board-wrap">board</div>;
    }
}

export default Board;
