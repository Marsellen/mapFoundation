import React from 'react';
import CheckboxList from 'src/components/CheckboxList';

class ResourceLayer extends React.Component {
    render() {
        let data = [
            { value: 'A', label: '照片' },
            { value: 'B', label: '点云' },
            { value: 'C', label: '轨迹' },
            { value: 'D', label: '高精地图' }
        ];
        let defaultValue = [];
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

export default ResourceLayer;
