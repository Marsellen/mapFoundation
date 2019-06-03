import React from 'react';
import { Checkbox, List } from 'antd';

class DataLayer extends React.Component {
    render() {
        let data = [
            { value: 'A', label: '车道线', checked: true },
            { value: 'B', label: '交通灯', checked: true },
            { value: 'C', label: '交通牌' }
        ];
        //let defaultValue = ['A'];
        return (
            <List
                dataSource={data}
                renderItem={item => (
                    <div>
                        <Checkbox value={item.value} checked={item.checked} onChange={this.changeEvent(item)}>
                            {item.label}
                        </Checkbox>
                    </div>
                )}
            />
        );
    }

    changeEvent = item => {
        let onChange = e => {
            console.log(e, item);
        };
        return onChange
    }

    
}

export default DataLayer;
