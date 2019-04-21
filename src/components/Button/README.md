## Button(按钮)

#### 属性

| 属性名    | 类型     | 默认值 | 说明                      | 其他值                                                   |
| :-------- | :------- | :----- | :------------------------ | :------------------------------------------------------- |
| type      | string   | normal | 按钮颜色                  | `primary`, `primary-text`, `success`, `warning`, `error` |
| mode      | string   |        | 按钮的模式                | `text`                                                   |
| size      | string   | large  | 按钮尺寸                  | `mini`                                                   |
| block     | bool     | false  | 是否方角按钮              | `true`                                                   |
| disabled  | bool     | false  | 是否禁用                  | `true`                                                   |
| inline    | bool     | false  | 行内按钮                  |                                                          |
| ghost     | bool     | false  | 是否空心按钮              |                                                          |
| icon      | string   | --     | 按钮左侧允许配置一个 icon | 参考 Icon 组件                                           |
| iconColor | string   | --     | icon 的颜色               | 类似: #000                                               |
| className | string   | --     | 自定义 class              |
| onClick   | function | --     | 按钮点击事件              |

#### 例子

```
<Button type="primary">按钮</Button>
```
