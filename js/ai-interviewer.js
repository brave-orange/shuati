// AI 配置管理器
class AIConfigManager {
    constructor() {
        this.config = null;
        this.loadConfig();
    }

    async loadConfig() {
        try {
            // 从本地存储加载
            const saved = localStorage.getItem('leetcode_ai_config');
            if (saved) {
                this.config = JSON.parse(saved);
            } else {
                // 加载默认配置
                const response = await fetch('config.json');
                this.config = await response.json();
                this.saveConfig();
            }
        } catch (e) {
            // 使用内置默认配置
            this.config = this.getDefaultConfig();
        }
    }

    getDefaultConfig() {
        return {
            ai: {
                enabled: true,
                provider: "xiaomi",
                model: "mimo-v2.5-pro",
                temperature: 0.3,
                max_tokens: 4096
            },
            providers: {
                xiaomi: {
                    name: "小米 MiMo",
                    baseUrl: "https://token-plan-cn.xiaomimimo.com/v1",
                    apiKey: "",
                    models: [
                        { id: "mimo-v2.5-pro", name: "MiMo-V2.5-Pro" },
                        { id: "mimo-v2.5", name: "MiMo-V2.5" }
                    ]
                }
            },
            interview: {
                style: "interactive",
                enableFollowUp: true
            }
        };
    }

    saveConfig() {
        localStorage.setItem('leetcode_ai_config', JSON.stringify(this.config));
    }

    getProvider() {
        return this.config.providers[this.config.ai.provider];
    }

    getApiUrl() {
        const provider = this.getProvider();
        return `${provider.baseUrl}/chat/completions`;
    }

    getApiKey() {
        return this.getProvider().apiKey;
    }

    getModel() {
        return this.config.ai.model;
    }

    setProvider(providerId, apiKey = null) {
        this.config.ai.provider = providerId;
        if (apiKey) {
            this.config.providers[providerId].apiKey = apiKey;
        }
        // 默认选择第一个模型
        const provider = this.config.providers[providerId];
        const firstModel = provider.models[0];
        if (firstModel) {
            this.config.ai.model = firstModel.id;
        }
        this.saveConfig();
    }

    setModel(modelId) {
        this.config.ai.model = modelId;
        this.saveConfig();
    }

    setApiKey(apiKey) {
        this.config.providers[this.config.ai.provider].apiKey = apiKey;
        this.saveConfig();
    }

    getAvailableProviders() {
        return Object.entries(this.config.providers).map(([id, provider]) => ({
            id,
            name: provider.name,
            hasKey: provider.apiKey && provider.apiKey.length > 0
        }));
    }

    getAvailableModels() {
        const provider = this.getProvider();
        return provider.models;
    }
}

// AI 面试官 - 交互式判题
class AIInterviewer {
    constructor(configManager) {
        this.config = configManager;
        this.conversationHistory = [];
        this.currentQuestion = null;
    }

    // 开始面试对话
    startInterview(question, code, language) {
        this.currentQuestion = question;
        this.conversationHistory = [];
        
        // 分析题目考查重点
        const focusPoints = this.analyzeQuestionFocus(question);
        
        // 获取面试风格
        const style = this.config.config.interview?.style || 'interactive';
        
        let systemPrompt = '';
        
        if (style === 'hint') {
            // 引导提示模式
            systemPrompt = `你是一位算法面试导师。你的职责是**引导思路，不给答案**。

回复原则：
1. 简洁精炼，不超过 150 字
2. 指出考点（如：哈希表 O(1) 查找、双指针边界条件）
3. 给思考方向提示，禁止给具体代码
4. 评分 + 一句话改进建议

格式：
**考点**：xxx
**提示**：xxx（思考方向）
**评分**：xx/100
**建议**：一句话`;
        } else if (style === 'direct') {
            // 直接评分模式
            systemPrompt = `你是一位算法评审官。快速评审代码。

回复原则：
1. 简洁，不超过 100 字
2. 列出 3 个考点
3. 直接评分 + 简短反馈

格式：
**考点**：1.xxx 2.xxx 3.xxx
**评分**：xx/100
**反馈**：一句话`;
        } else {
            // 交互式追问模式
            systemPrompt = `你是一位算法面试官。风格简洁、专业。

回复原则：
1. 总字数不超过 200 字
2. 先列出 2-3 个考点
3. 针对代码提出 1 个关键追问
4. 评分 + 简短建议

追问示例：
- "你为什么用哈希表？时间复杂度是多少？"
- "边界条件处理了吗？比如空数组？"
- "有没有更优解法？"

格式：
**考点**：xxx, xxx
**追问**：xxx
**评分**：xx/100
**建议**：一句话`;
        }

        this.conversationHistory.push({
            role: 'system',
            content: systemPrompt
        });

        const userPrompt = this.buildFirstPrompt(question, code, language, focusPoints, style);
        this.conversationHistory.push({
            role: 'user',
            content: userPrompt
        });

        return this.callAI();
    }

    // 分析题目考查重点（简化版）
    analyzeQuestionFocus(question) {
        const focusMap = {
            '哈希表': ['哈希 O(1) 查找', '空间换时间'],
            '数组': ['双指针技巧', '边界处理'],
            '链表': ['指针操作', '哑节点技巧'],
            '双指针': ['左右指针移动条件', '相遇判断'],
            '滑动窗口': ['窗口扩展/收缩时机', '窗口内状态维护'],
            '二叉树': ['递归思维', '遍历方式'],
            '动态规划': ['状态定义', '状态转移'],
            '回溯': ['递归终止条件', '剪枝优化'],
            '栈': ['单调栈应用', '栈配合其他结构'],
            '二分查找': ['边界条件', '旋转数组处理'],
            '排序': ['排序算法选择', '自定义比较']
        };

        for (const [tag, points] of Object.entries(focusMap)) {
            if (question.tags.some(t => t.includes(tag) || tag.includes(t))) {
                return points;
            }
        }
        return ['问题分析', '代码实现', '复杂度优化'];
    }

    // 构建第一次评审 Prompt（简化版）
    buildFirstPrompt(question, code, language, focusPoints, style) {
        const examplesBrief = question.examples.slice(0, 1).map(e => 
            `输入: ${e.input} → 输出: ${e.output}`
        ).join('\n');

        let prompt = `题目：${question.title} (#${question.id}) [${question.difficulty}]
标签：${question.tags.join('、')}
示例：${examplesBrief}

代码（${language}）：
${code}`;

        if (style === 'hint') {
            prompt += `\n\n请：指出考点，给思考方向提示（不给答案），评分。`;
        } else if (style === 'direct') {
            prompt += `\n\n请：列出考点，直接评分。`;
        } else {
            prompt += `\n\n请：列出考点，提出 1 个关键追问，评分。`;
        }

        return prompt;
    }

    // 继续对话（回答追问）
    continueInterview(userAnswer) {
        this.conversationHistory.push({
            role: 'user',
            content: `考生回答："${userAnswer}"

请：简短评价回答，追问或给出提示，更新评分。不超过 100 字。`
        });

        return this.callAI();
    }

    // 调用 AI API
    async callAI() {
        const response = await fetch(this.config.getApiUrl(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.getApiKey()}`
            },
            body: JSON.stringify({
                model: this.config.getModel(),
                messages: this.conversationHistory,
                temperature: this.config.config.ai.temperature,
                max_tokens: this.config.config.ai.max_tokens
            })
        });

        if (!response.ok) {
            throw new Error(`API 请求失败: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        // 记录 AI 回复
        this.conversationHistory.push({
            role: 'assistant',
            content: content
        });

        return this.parseResponse(content);
    }

    // 解析 AI 响应
    parseResponse(content) {
        // 提取 JSON 评分
        const jsonMatch = content.match(/\{[\s\S]*"score"[\s\S]*\}/);
        let scoring = null;

        if (jsonMatch) {
            try {
                scoring = JSON.parse(jsonMatch[0]);
            } catch (e) {
                console.log('JSON 解析失败');
            }
        }

        // 提取追问
        const questions = scoring?.questions || [];
        
        // 分离文本和 JSON
        const textPart = content.replace(/\{[\s\S]*\}/, '').trim();

        return {
            text: textPart,
            scoring: scoring || { score: 50, feedback: '评分解析失败' },
            questions: questions,
            hasQuestions: questions.length > 0,
            focusPoints: scoring?.focusPoints || []
        };
    }

    // 最终评分
    getFinalScore() {
        // 从对话历史中找最后一个评分 JSON
        for (let i = this.conversationHistory.length - 1; i >= 0; i--) {
            if (this.conversationHistory[i].role === 'assistant') {
                const content = this.conversationHistory[i].content;
                const jsonMatch = content.match(/\{[\s\S]*"score"[\s\S]*\}/);
                if (jsonMatch) {
                    try {
                        return JSON.parse(jsonMatch[0]);
                    } catch (e) {}
                }
            }
        }
        return { score: 50 };
    }
}

// 导出
window.AIConfigManager = AIConfigManager;
window.AIInterviewer = AIInterviewer;