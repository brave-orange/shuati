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
- **本地存储**：自动保存代码进度

## 快速开始

### 本地运行

```bash
# 1. 克隆项目
git clone git@github.com:brave-orange/shuati.git
cd shuati

# 2. 配置 API Key
cp config.example.json config.json
# 编辑 config.json，填写你的 API Key

# 3. 启动本地服务器
python3 -m http.server 8080

# 4. 打开浏览器
open http://localhost:8080
```

### Docker 部署

```bash
docker compose up -d --build
# 访问 http://localhost:8080
```

## 配置说明

编辑 `config.json`：

```json
{
    "ai": {
        "provider": "xiaomi",
        "model": "mimo-v2.5-pro"
    },
    "providers": {
        "xiaomi": {
            "apiKey": "YOUR_API_KEY_HERE"
        }
    },
    "interview": {
        "style": "interactive"  // interactive | hint | direct
    }
}
```

**面试风格说明：**

| 风格 | 特点 |
|------|------|
| `interactive` | 提出追问，引导思考 |
| `hint` | 给思考方向，不给答案 |
| `direct` | 直接评分，简短反馈 |

## AI 判题示例

> **考点**：哈希 O(1) 查找、双指针边界条件  
> **追问**：你为什么用哈希表？时间复杂度是多少？  
> **评分**：75/100  
> **建议**：考虑用双指针优化空间。

## 技术栈

- 纯前端实现，无需后端
- CodeMirror 代码编辑器
- 小米 MiMo-V2.5-Pro（1T 参数，1M 上下文）

## 项目结构

```
leetcode-hot100/
├── index.html          # 主页面
├── css/style.css       # 样式
├── js/
│   ├── app.js          # 主逻辑
│   └── ai-interviewer.js  # AI 面试官
├── data/hot100.js      # 题库数据
├── config.json         # 用户配置（不上传）
├── config.example.json # 配置模板
├── Dockerfile
├── docker-compose.yml
└── nginx.conf
```

## License

MIT