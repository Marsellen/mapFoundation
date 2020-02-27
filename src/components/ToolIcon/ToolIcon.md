## 图标字体组件

实例 1：

```javascript
<ToolIcon icon="bianji" />
```

实例 2：

```javascript
<ToolIcon
    icon="bianji" //图标名
    title="设置编辑图层" //hover提示
    className="ad-tool-icon" //样式名，定义图标大小，宽高
/>
```

实例 3：

```javascript
<ToolIcon
    icon="bianji" //图标名
    title="设置编辑图层" //hover提示
    className="ad-tool-icon" //样式名，定义图标大小，宽高
    visible={visible} //值为true变蓝，为false变白
    disabled={disabled} //图标按钮是否可用
    action={this.action} //按钮触发事件
/>
```

实例 4：

```javascript
<ToolIcon
    id="id"
    icon="bianji" //图标名
    title="设置编辑图层" //hover提示
    placement="right" //hover位置
    className="ad-tool-icon" //样式名，定义图标大小，宽高
    focusColor={true} //focus时是否变色，默认变色
    focusBg={false} //focus时是否变背景色，默认不变色
    visible={visible} //值为true变蓝，为false变白
    disabled={disabled} //图标按钮是否可用
    action={this.action} //按钮触发事件
/>
```

实例 5：

```javascript
<ToolIcon
    id="id"
    icon="bianji" //图标名
    title="设置编辑图层" //hover提示
    placement="right" //hover位置
    className="ad-tool-icon" //样式名，定义图标大小，宽高
    focusColor={true} //focus时是否变色，默认变色
    focusBg={false} //focus时是否变背景色，默认不变色
    visible={visible} //值为true变蓝，为false变白
    disabled={disabled} //图标按钮是否可用
    action={this.action} //按钮触发事件
    //设置气泡提示，与antd <Popover/>配置相同
    popover={{
        placement: 'bottom',
        visible: this.state.clicked,
        onVisibleChange: this.handleClickChange,
        content: this._renderContent(),
        trigger: 'click'
    }}
/>
```

实例 6：

```javascript
<ToolIcon
    id="id"
    icon="bianji" //图标名
    title="设置编辑图层" //hover提示
    placement="right" //hover位置
    className="ad-tool-icon" //样式名，定义图标大小，宽高
    focusColor={true} //focus时是否变色，默认变色
    focusBg={false} //focus时是否变背景色，默认不变色
    visible={visible} //值为true变蓝，为false变白
    disabled={disabled} //图标按钮是否可用
    action={this.action} //按钮触发事件
    //设置气泡提示，与antd <Popover/>配置相同
    popover={{
        placement: 'bottom',
        visible: this.state.clicked,
        onVisibleChange: this.handleClickChange,
        content: this._renderContent(),
        trigger: 'click'
    }}
    //设置hover提示，与antd <Tooltip/>配置相同
    tooltip={{
        overlayStyle: {},
        overlayClassName: '',
        arrowPointAtCenter: true
    }}
/>
```
