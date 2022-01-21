import React, { Component } from 'react';

import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.min.css';

export default class RcViewer extends Component {
    constructor(props) {
        super(props);
        this.container = null;
        this.viewer = null;
    }
    componentDidMount() {
        this.viewerInit();
    }
    getViewer() {
        return {
            viewer: this.viewer,
            container: this.container
        };
    }
    componentDidUpdate() {
        if (!this.viewer) return;
        this.viewerInit();
    }
    componentWillUnmount() {
        if (this.viewer) this.viewer.destroy();
    }

    viewerInit() {
        if (this.viewer) {
            this.viewer.view(0);
            this.viewer.update();
        } else {
            const { options = {}, children } = this.props;

            this.viewer = new Viewer(this.container, {
                navbar: !!(Array.isArray(children) && children.length),
                ...options
            });
        }
    }
    render() {
        const { children, ...others } = this.props;
        return (
            <div
                ref={container => {
                    this.container = container;
                }}
                {...others}>
                {children}
            </div>
        );
    }
}
