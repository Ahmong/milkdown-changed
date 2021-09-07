export default"# 编写主题插件\n\n## 概览\n\n```typescript\nimport { themeFactory } from '@milkdown/core';\n\nconst customTheme = themeFactory({\n    font: {\n        typography: ['Roboto', 'Helvetica', 'Arial'],\n        code: ['Monaco', 'Fira Code'],\n    },\n    size: {\n        radius: '2px',\n        lineWidth: '1px',\n    },\n    color: {\n        primary: '#ff79c6',\n        secondary: '#bd93f9',\n        neutral: '#000',\n        background: '#fff',\n    },\n});\n```\n\n---\n\n## 属性\n\n### font\n\nFont 定义了编辑器中的字体。\n\n-   typography\n    编辑器中的文本的字体，例如标题，段落，引用。\n\n-   code\n    编辑器中的代码的字体，例如代码块和行内代码。\n\n### size\n\n-   radius\n    圆角的大小。\n\n-   lineWidth\n    线的宽度，例如 border 和分割线。\n\n### color\n\n编辑器的色板。\n\n-   primary\n    编辑器的主色。通常被用在大色块上，例如引用区的色块。\n-   secondary\n    编辑器的副色，用在提示区域，例如链接。\n-   solid\n    编辑器中控件的颜色，例如按钮和输入框。\n-   shadow\n    阴影的颜色。\n-   line\n    线的颜色。\n-   surface\n    编辑器的背景色。\n-   background\n    编辑器其它区块的背景色，例如代码块和数学公式输入区。\n\n### mixin\n\nMixin 定义了一些预设样式，方便其它插件重用。\n\n-   scrollbar\n    滚动条的样式。\n-   shadow\n    阴影的样式。\n-   border\n    边框的样式。\n\n### slots\n\nSlots 不仅定义了样式，还定义了对应的 dom 元素。\n\n-   icon\n    定义了对于不同 id，如何实现对应的图标。\n\n需要实现的图标 id:\n\n| 类型 | Ids                                           |\n| ---- | --------------------------------------------- |\n| 段落 | h1, h2, h3, quote, code, table, divider       |\n| 图片 | image, brokenImage                            |\n| 列表 | bulletList, orderedList, taskList             |\n| 箭头 | leftArrow, rightArrow, upArrow, downArrow     |\n| 对齐 | alignLeft, alignRight, alignCenter            |\n| 编辑 | delete, select                                |\n| 行内 | bold, italic, inlineCode, strikeThrough, link |\n| 状态 | checked, unchecked, loading                   |\n\n### global\n\n为编辑器注入的全局样式。\n\n## 示例: NES 主题\n\n> 暂时只支持英文，因为没有找到合适的中文字体 CDN。\n\n!CodeSandBox{milkdown-theme-nes-b0zmy?fontsize=14&hidenavigation=1&theme=dark&view=preview}\n";