import React from 'react';
import { observer, inject } from 'mobx-react';

const taskVersion = inject('TaskStore')(
    observer(({ TaskStore }) => (
        <div className="save-version-view">
            {TaskStore.taskVersionTime &&
                `SPEC_VERSION ${TaskStore.taskVersionTime}`}
        </div>
    ))
);

export default taskVersion;
