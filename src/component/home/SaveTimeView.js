import React from 'react';
import { observer, inject } from 'mobx-react';

const SaveTimeView = inject('TaskStore')(
    observer(({ TaskStore }) => (
        <div className="save-time-view">
            {TaskStore.taskSaveTime &&
                `最后保存时间: ${TaskStore.taskSaveTime}`}
        </div>
    ))
);

export default SaveTimeView;
