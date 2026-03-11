# AI Prompt Hub

一个专业的 AI 提示词资源网站，收录各行业优质 AI 提示词，助力你的 AI 创作之旅。

![AI Prompt Hub](https://img.shields.io/badge/AI-Prompt%20Hub-blue)
![Vue 3](https://img.shields.io/badge/Vue-3-green)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan)

## 功能特性

- 收录 80+ 条高质量 AI 提示词
- 覆盖 10 个行业分类：AI写作、AI绘画、AI视频、AI编程、AI营销、AI电商、AI办公、AI教育、AI自媒体、AI短视频
- 三级提示词等级：基础、高级、专业
- 支持关键词搜索、分类筛选、等级筛选
- 一键复制提示词
- 收藏功能（localStorage 持久化）
- 三主题切换：Light / Dark / Cyber 赛博朋克
- 中英文双语支持
- 响应式设计，支持移动端
- SEO 优化

## 技术栈

- **前端框架**: Vue 3 + Composition API
- **构建工具**: Vite 5
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **样式**: TailwindCSS 3
- **国际化**: Vue I18n
- **图标**: SVG

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
cd ai-prompt-hub
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173

### 生产构建

```bash
npm run build
```

构建产物位于 `dist/` 目录

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
ai-prompt-hub/
├── public/                 # 静态资源
│   ├── robots.txt         # SEO: 爬虫规则
│   └── sitemap.xml        # SEO: 站点地图
├── src/
│   ├── components/        # 组件
│   │   ├── Header.vue     # 导航头部
│   │   ├── Footer.vue     # 页脚
│   │   ├── SearchBar.vue  # 搜索栏
│   │   ├── PromptCard.vue # 提示词卡片
│   │   ├── CategoryFilter.vue
│   │   └── LevelFilter.vue
│   ├── pages/             # 页面
│   │   ├── Home.vue       # 首页
│   │   ├── PromptList.vue # 列表页
│   │   └── PromptDetail.vue
│   ├── stores/            # Pinia Store
│   │   ├── theme.js       # 主题管理
│   │   ├── favorites.js   # 收藏管理
│   │   └── prompts.js     # 提示词数据
│   ├── router/            # 路由配置
│   ├── i18n/              # 国际化
│   ├── data/              # 数据文件
│   │   └── prompts.json   # 80+ 条提示词
│   ├── composables/       # 组合式函数
│   ├── utils/             # 工具函数
│   └── styles/            # 全局样式
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 使用指南

### 1. 浏览提示词

- 首页展示分类入口、精选提示词、热门提示词
- 点击分类卡片进入分类页面
- 点击提示词卡片查看详情

### 2. 搜索与筛选

- 使用顶部搜索框输入关键词搜索
- 在列表页使用左侧筛选面板：
  - 按分类筛选（可多选）
  - 按等级筛选（基础/高级/专业）
  - 排序方式（热门/最新/名称）

### 3. 复制提示词

- 在卡片上点击复制按钮
- 在详情页点击"复制"按钮
- 支持一键复制到剪贴板

### 4. 收藏提示词

- 点击卡片上的心形图标收藏
- 在详情页点击"收藏"按钮
- 收藏数据保存在浏览器本地
- 在"我的收藏"页面查看所有收藏

### 5. 切换主题

- 点击顶部导航栏的主题图标
- 支持三种主题：
  - ☀️ Light（浅色）
  - 🌙 Dark（深色）
  - ⚡ Cyber（赛博朋克）

### 6. 切换语言

- 点击顶部导航栏的"中/EN"按钮
- 支持中文和英文切换

## 提示词数据结构

```json
{
  "id": "writing-001",
  "title": "文章大纲生成器",
  "category": "writing",
  "categoryName": "AI写作",
  "level": "basic",
  "model": ["ChatGPT", "Claude", "Gemini"],
  "content": "提示词内容...",
  "description": "功能描述...",
  "example": "示例输出...",
  "tags": ["写作", "大纲", "结构"],
  "views": 1250,
  "featured": true
}
```

## 自定义配置

### 添加新分类

编辑 `src/stores/prompts.js`：

```javascript
const categories = [
  { id: 'newcategory', name: '新分类', nameEn: 'New Category', icon: '🔥' },
  // ...
]
```

### 添加新提示词

编辑 `src/data/prompts.json`，按现有格式添加新条目。

### 修改主题颜色

编辑 `src/styles/variables.css` 中的 CSS 变量。

## 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

- GitHub: https://github.com/Xueweizhe-freedom/ai-prompt-tools
