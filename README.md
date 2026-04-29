# 🔥 LeetCode Hot100 刷题训练

一个用于随机练习 LeetCode Hot100 题目的本地网站，支持 AI 判题和面试模式模拟。

## 功能特性

- ✅ **随机刷题** - 从 Hot100 中随机抽取题目
- ⏱️ **计时挑战** - 设置时间限制，模拟面试压力
- 🤖 **AI 判题** - 使用 MiMo-V2.5-Pro 进行代码评审和评分
- 💼 **面试模式** - 隐藏提示，真实模拟面试场景
- 📊 **历史记录** - 本地保存训练记录
- 🔄 **多语言支持** - JavaScript / Python / Java / C++ / Go

## 快速启动

### 方式一：直接打开

```bash
# 进入项目目录
cd ~/projects/leetcode-hot100

# 用浏览器打开
open index.html  # macOS
# 或
xdg-open index.html  # Linux
```

### 方式二：本地服务器

```bash
# 使用 Python 启动简单服务器
cd ~/projects/leetcode-hot100
python3 -m http.server 8080

# 然后访问 http://localhost:8080
```

### 方式三：Docker 部署

```bash
# 构建并启动
cd ~/projects/leetcode-hot100
docker-compose up -d

# 访问 http://localhost:8080
```

## AI 判题配置

支持多种 AI 供应商，可在设置面板中选择：

### 内置配置（可直接使用）

- **小米 MiMo** - MiMo-V2.5-Pro (1T 参数，推荐)
  - 已内置 API Key，开箱即用
  - 支持交互式追问，模拟真实面试

### 需配置 API Key

- **OpenAI** - GPT-4o / GPT-4 Turbo
- **Anthropic Claude** - Claude Sonnet 4
- **DeepSeek** - DeepSeek Chat
- **自定义 API** - 支持任何兼容 OpenAI 格式的 API

### 面试风格

- **交互式追问** (推荐) - AI 会分析题目考查重点，针对代码提出追问
- **直接评分** - 直接给出评分结果
- **引导提示** - 给出解题提示和改进建议

### 评审维度（每项 20 分，总分 100）

1. 正确性 - 代码是否正确解决问题
2. 时间复杂度 - 算法效率
3. 空间复杂度 - 内存使用优化
4. 代码风格 - 命名规范、可读性、注释
5. 边界处理 - 特殊情况处理

### AI 追问示例

```
🎯 面试官追问：
> 你为什么选择使用哈希表来解决这个问题？
> 如果输入数据规模变为 10^8，你的代码性能会如何变化？
> 有没有考虑过其他解法？比如双指针？
```

考生可以回答追问，AI 会根据回答调整评分并给出进一步反馈。

## 面试模式

开启面试模式后：
- 🚫 隐藏题目提示
- ⏱️ 强制计时（时间到自动结束）
- 📝 模拟真实面试压力

## 项目结构

```
leetcode-hot100/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └ app.js            # 应用逻辑
├── data/
│   └ hot100.js         # 题目数据（20道精选）
├── Dockerfile          # Docker 配置
├── docker-compose.yml  # Docker Compose
├── nginx.conf          # Nginx 配置（含API代理）
└── README.md           # 说明文档
```

## 扩展题目

编辑 `data/hot100.js` 文件，添加更多题目：

```javascript
{
    id: 题目编号,
    title: "题目名称",
    difficulty: "easy/medium/hard",
    tags: ["标签1", "标签2"],
    description: `题目描述`,
    examples: [
        { input: "输入示例", output: "输出示例" }
    ],
    hint: "解题提示",
    templates: {
        javascript: `// JavaScript 模板`,
        python: `# Python 模板`,
        java: `// Java 模板`,
        cpp: `// C++ 模板`
    }
}
```

## 技术栈

- **前端**: 纯 HTML/CSS/JavaScript（无框架依赖）
- **编辑器**: CodeMirror 5（代码高亮和编辑）
- **AI**: MiMo-V2.5-Pro（小米万亿参数模型）
- **部署**: Docker + Nginx

## 注意事项

1. AI 判题需要网络连接
2. 历史记录保存在浏览器 localStorage
3. Docker 方式通过 Nginx 代理解决 API 跨域问题
4. 题目数据为精选 20 道，可根据需要扩展

## License

MIT