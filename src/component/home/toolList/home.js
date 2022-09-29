import React from 'react';
import ToolIcon from 'src/component/common/toolIcon';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { logDecorator, editLock } from 'src/util/decorator';

@observer
class Home extends React.Component {
    render() {
        return (
            <Link to={'/board'}>
                <ToolIcon
                    id="home-btn"
                    className="goboard"
                    icon="shouye"
                    title=""
                    action={this.action}
                />
            </Link>
        );
    }

    action = () => {};
}

export default Home;
