import React from 'react';
import CheckboxList from 'src/components/CheckboxList';

class DataLayer extends React.Component {
    render() {
        let data = [
            { value: 'A', label: '车道线' },
            { value: 'B', label: '交通灯' },
            { value: 'C', label: '交通牌' }
        ];
        let defaultValue = ['A'];
        return (
            <CheckboxList
                dataSource={data}
                defaultValue={defaultValue}
                onChange={this.onChange}
            />
        );
    }

    onChange = checkedValue => {
        console.log(checkedValue);
    };
}

export default DataLayer;
