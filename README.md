# LeetCode Hot100 刷题网站

AI 智能判题的算法练习平台，支持交互式面试模拟。

## 功能特性

- **21 道 Hot100 精选题**：高频面试题精选
- **5 种语言**：JavaScript / Python / Java / C++ / Go
- **AI 智能判题**：三种面试风格可选
  - 引导提示：指出考点 + 思考方向（**不给答案**）
  - 交互追问：提出关键问题，引导深入思考
  - 直接评分：快速评审
- **多供应商支持**：小米 MiMo、OpenAI、Claude、DeepSeek、自定义 API
- **计时功能**：记录解题时间
- **本地存储**：自动保存代码进度和 AI 配置

## 快速开始

### GitHub Pages 部署

直接访问 GitHub Pages 即可使用，无需本地部署。

### 本地运行

```bash
git clone git@github.com:brave-orange/shuati.git
cd shuati
python3 -m http.server 8080
open http://localhost:8080
```

## 配置说明

**首次使用请点击「⚙️ 设置」填写 API Key**，配置保存在浏览器 localStorage。

支持的供应商：

| 供应商 | API 地址 | 模型 |
|--------|---------|------|
| 小米 MiMo | token-plan-cn.xiaomimimo.com | MiMo-V2.5-Pro、MiMo-V2.5 |
| OpenAI | api.openai.com | GPT-4o、GPT-4 Turbo |
| Claude | api.anthropic.com | Claude Sonnet 4 |
| DeepSeek | api.deepseek.com | DeepSeek Chat |
| 自定义 | 任意 OpenAI 兼容 API | 自定义模型 |

**面试风格：**

| 风格 | 特点 |
|------|------|
| 交互追问 | 提出追问，引导思考 |
| 引导提示 | 给思考方向，不给答案 |
| 直接评分 | 简短评审 |

## AI 判题示例

> **考点**：哈希 O(1) 查找、双指针边界条件  
> **追问**：你为什么用哈希表？时间复杂度是多少？  
> **评分**：75/100  
> **建议**：考虑用双指针优化空间。

## 技术栈

- 纯前端实现，无需后端
- CodeMirror 代码编辑器
- Markdown 渲染（marked.js）
- localStorage 持久化

## 项目结构

```
leetcode-hot100/
├── index.html          # 主页面
├── css/style.css       # 样式
├── js/
│   ├── app.js          # 主逻辑
│   └── ai-interviewer.js  # AI 面试官
├── data/hot100.js      # 题库数据
├── Dockerfile
├── docker-compose.yml
└── nginx.conf
```

## License

MIT