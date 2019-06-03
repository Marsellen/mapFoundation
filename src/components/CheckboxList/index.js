import React from 'react';
import { Checkbox, List } from 'antd';

class CheckboxList extends React.Component {
    render() {
        const { dataSource, defaultValue, onChange } = this.props;
        return (
            <Checkbox.Group
                style={Styles.group}
                //defaultValue={defaultValue}
                onChange={onChange}>
                <List
                    dataSource={dataSource}
                    renderItem={item => (
                        <div>
                            <Checkbox value={item.value} checked={item.checked}>{item.label}</Checkbox>
                        </div>
                    )}
                />
            </Checkbox.Group>
        );
    }
}

const Styles = {
    group: {
        display: 'flex',
        flexDirection: 'column'
    }
};

export default CheckboxList;
