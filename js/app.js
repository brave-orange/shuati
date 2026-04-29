// LeetCode Hot100 刷题训练 - 主应用逻辑

class LeetCodeTrainer {
    constructor() {
        // AI 配置管理器
        this.aiConfig = new AIConfigManager();
        this.aiInterviewer = null;
        
        // 配置
        this.config = {
            questionCount: 3,
            timeLimit: 15,
            language: 'javascript',
            interviewMode: false,
            aiEnabled: false
        };

        // 状态
        this.state = {
            questions: [],
            currentIndex: 0,
            scores: [],
            startTime: null,
            timer: null,
            remainingTime: 0,
            editor: null,
            history: []
        };

        // 初始化
        this.init();
    }

    init() {
        this.loadHistory();
        this.bindEvents();
        this.initEditor();
    }

    // 加载历史记录
    loadHistory() {
        try {
            const saved = localStorage.getItem('leetcode_history');
            if (saved) {
                this.state.history = JSON.parse(saved);
            }
        } catch (e) {
            console.log('无法加载历史记录');
        }
    }

    // 保存历史记录
    saveHistory() {
        try {
            localStorage.setItem('leetcode_history', JSON.stringify(this.state.history));
        } catch (e) {
            console.log('无法保存历史记录');
        }
    }

    // 绑定事件
    bindEvents() {
        // 欢迎页面
        document.getElementById('startBtn').addEventListener('click', () => {
            this.showPanel('settingsPanel');
        });

        // 设置面板
        document.getElementById('questionCount').addEventListener('input', (e) => {
            this.config.questionCount = parseInt(e.target.value);
            document.getElementById('questionCountValue').textContent = `${e.target.value} 题`;
        });

        document.getElementById('timeLimit').addEventListener('input', (e) => {
            this.config.timeLimit = parseInt(e.target.value);
            document.getElementById('timeLimitValue').textContent = `${e.target.value} 分钟`;
        });

        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.config.language = e.target.value;
            this.updateEditorLanguage();
        });

        // 模式切换
        document.getElementById('normalMode').addEventListener('click', () => {
            this.setInterviewMode(false);
        });
        document.getElementById('interviewMode').addEventListener('click', () => {
            this.setInterviewMode(true);
        });

        // AI 判题切换
        document.getElementById('aiOff').addEventListener('click', () => {
            this.setAIEnabled(false);
        });
        document.getElementById('aiOn').addEventListener('click', () => {
            this.setAIEnabled(true);
        });

        // AI 配置
        this.initAIConfig();

        // 开始训练
        document.getElementById('startPractice').addEventListener('click', () => {
            this.startPractice();
        });

        // 主面板操作
        document.getElementById('showHintBtn').addEventListener('click', () => {
            this.showHint();
        });

        document.getElementById('resetCodeBtn').addEventListener('click', () => {
            this.resetCode();
        });

        document.getElementById('formatCodeBtn').addEventListener('click', () => {
            this.formatCode();
        });

        document.getElementById('submitCode').addEventListener('click', () => {
            this.submitCode();
        });

        document.getElementById('prevQuestion').addEventListener('click', () => {
            this.prevQuestion();
        });

        document.getElementById('nextQuestion').addEventListener('click', () => {
            this.nextQuestion();
        });

        // 结果面板
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.startPractice();
        });

        document.getElementById('backSettingsBtn').addEventListener('click', () => {
            this.resetPractice();
            this.showPanel('settingsPanel');
        });

        // 历史面板
        document.getElementById('historyBtn').addEventListener('click', () => {
            this.showHistory();
        });

        document.getElementById('closeHistoryBtn').addEventListener('click', () => {
            this.hidePanel('historyPanel');
        });

        document.getElementById('settingsBtn').addEventListener('click', () => {
            if (document.getElementById('settingsPanel').classList.contains('hidden')) {
                this.showPanel('settingsPanel');
            } else {
                this.hidePanel('settingsPanel');
            }
        });
    }

    // 初始化代码编辑器
    initEditor() {
        this.state.editor = CodeMirror(document.getElementById('codeEditor'), {
            mode: 'javascript',
            theme: 'dracula',
            lineNumbers: true,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: false,
            lineWrapping: true,
            autofocus: true
        });
    }

    // 更新编辑器语言
    updateEditorLanguage() {
        const lang = this.config.language;
        const modeMap = {
            'javascript': 'javascript',
            'python': 'python',
            'java': 'text/x-java',
            'cpp': 'text/x-c++src',
            'go': 'go'
        };
        this.state.editor.setOption('mode', modeMap[lang] || 'javascript');
        document.getElementById('currentLanguage').textContent = this.getLanguageName(lang);
    }

    getLanguageName(lang) {
        const names = {
            'javascript': 'JavaScript',
            'python': 'Python',
            'java': 'Java',
            'cpp': 'C++',
            'go': 'Go'
        };
        return names[lang] || lang;
    }

    // 设置面试模式
    setInterviewMode(enabled) {
        this.config.interviewMode = enabled;
        document.getElementById('normalMode').classList.toggle('active', !enabled);
        document.getElementById('interviewMode').classList.toggle('active', enabled);
        document.getElementById('modeDesc').textContent = enabled
            ? '面试模式：隐藏提示，限时答题，模拟真实面试'
            : '普通模式：可查看提示和参考答案';
        
        // 面试模式下隐藏提示按钮
        const hintArea = document.getElementById('hintArea');
        if (enabled) {
            hintArea.style.display = 'none';
        } else {
            hintArea.style.display = 'block';
        }
    }

    // 设置 AI 判题
    setAIEnabled(enabled) {
        this.config.aiEnabled = enabled;
        document.getElementById('aiOff').classList.toggle('active', !enabled);
        document.getElementById('aiOn').classList.toggle('active', enabled);
        document.getElementById('aiConfigGroup').style.display = enabled ? 'block' : 'none';
        
        if (enabled) {
            this.updateAIConfigUI();
        }
    }

    // 初始化 AI 配置
    initAIConfig() {
        const providerSelect = document.getElementById('aiProviderSelect');
        const modelSelect = document.getElementById('aiModelSelect');
        const apiKeyInput = document.getElementById('aiApiKeyInput');
        const saveKeyBtn = document.getElementById('saveApiKey');
        const customUrlRow = document.getElementById('customUrlRow');
        const customApiUrl = document.getElementById('customApiUrl');

        // 供应商切换
        providerSelect.addEventListener('change', (e) => {
            const providerId = e.target.value;
            this.aiConfig.setProvider(providerId);
            
            // 显示/隐藏自定义 URL
            customUrlRow.style.display = providerId === 'custom' ? 'flex' : 'none';
            
            // 更新模型列表
            this.updateModelSelect();
            
            // 显示当前 API Key（如果已保存）
            const provider = this.aiConfig.getProvider();
            apiKeyInput.value = provider.apiKey ? '●●●●●●●●' : '';
        });

        // 模型切换
        modelSelect.addEventListener('change', (e) => {
            this.aiConfig.setModel(e.target.value);
        });

        // 保存 API Key
        saveKeyBtn.addEventListener('click', () => {
            const key = apiKeyInput.value;
            if (key && key !== '●●●●●●●●') {
                this.aiConfig.setApiKey(key);
                apiKeyInput.value = '●●●●●●●●';
                alert('API Key 已保存！');
                
                // 如果是自定义供应商，同时保存 URL
                if (providerSelect.value === 'custom') {
                    const url = customApiUrl.value;
                    if (url) {
                        this.aiConfig.config.providers.custom.baseUrl = url;
                        this.aiConfig.saveConfig();
                    }
                }
            }
        });

        // 面试风格
        document.getElementById('interviewStyleSelect').addEventListener('change', (e) => {
            this.aiConfig.config.interview.style = e.target.value;
            this.aiConfig.saveConfig();
        });

        // 初始化 UI
        this.updateAIConfigUI();
    }

    // 更新 AI 配置 UI
    updateAIConfigUI() {
        const providerSelect = document.getElementById('aiProviderSelect');
        const modelSelect = document.getElementById('aiModelSelect');
        const apiKeyInput = document.getElementById('aiApiKeyInput');
        const customUrlRow = document.getElementById('customUrlRow');
        const interviewStyleSelect = document.getElementById('interviewStyleSelect');

        // 设置当前供应商
        providerSelect.value = this.aiConfig.config.ai.provider;
        
        // 显示/隐藏自定义 URL
        customUrlRow.style.display = providerSelect.value === 'custom' ? 'flex' : 'none';
        
        // 更新模型列表
        this.updateModelSelect();
        
        // 显示 API Key 状态
        const provider = this.aiConfig.getProvider();
        apiKeyInput.value = provider.apiKey ? '●●●●●●●●' : '';
        
        // 设置面试风格
        interviewStyleSelect.value = this.aiConfig.config.interview?.style || 'interactive';
    }

    // 更新模型选择列表
    updateModelSelect() {
        const modelSelect = document.getElementById('aiModelSelect');
        const models = this.aiConfig.getAvailableModels();
        
        modelSelect.innerHTML = models.map(m => 
            `<option value="${m.id}" ${m.id === this.aiConfig.getModel() ? 'selected' : ''}>
                ${m.name}
            </option>`
        ).join('');
    }

    // 显示面板
    showPanel(panelId) {
        // 隐藏所有面板
        ['welcomePanel', 'settingsPanel', 'mainPanel', 'resultPanel', 'historyPanel'].forEach(id => {
            document.getElementById(id).classList.add('hidden');
        });
        // 显示指定面板
        document.getElementById(panelId).classList.remove('hidden');
    }

    hidePanel(panelId) {
        document.getElementById(panelId).classList.add('hidden');
    }

    // 开始训练
    startPractice() {
        // 随机选择题目
        this.state.questions = this.selectQuestions(this.config.questionCount);
        this.state.currentIndex = 0;
        this.state.scores = [];
        this.state.startTime = Date.now();
        this.state.remainingTime = this.config.timeLimit * 60;

        // 显示主面板
        this.showPanel('mainPanel');
        this.hidePanel('aiResult');

        // 加载第一题
        this.loadQuestion(0);

        // 启动计时器
        this.startTimer();
    }

    // 随机选择题目
    selectQuestions(count) {
        const available = [...HOT100_QUESTIONS];
        const selected = [];
        
        while (selected.length < count && available.length > 0) {
            const index = Math.floor(Math.random() * available.length);
            selected.push(available[index]);
            available.splice(index, 1);
        }

        return selected;
    }

    // 加载题目
    loadQuestion(index) {
        const question = this.state.questions[index];
        if (!question) return;

        // 更新进度
        document.getElementById('progressText').textContent = `题目 ${index + 1} / ${this.config.questionCount}`;
        document.getElementById('progressFill').style.width = `${((index + 1) / this.config.questionCount) * 100}%`;

        // 题目信息
        document.getElementById('questionNumber').textContent = `#${question.id}`;
        document.getElementById('questionTitle').textContent = question.title;
        
        const difficultyEl = document.getElementById('difficulty');
        difficultyEl.textContent = question.difficulty === 'easy' ? '简单' : 
                                    question.difficulty === 'medium' ? '中等' : '困难';
        difficultyEl.className = `difficulty ${question.difficulty}`;
        
        document.getElementById('tags').textContent = question.tags.join(' | ');

        // 题目描述
        document.getElementById('questionDesc').textContent = question.description;

        // 示例
        const examplesArea = document.getElementById('examplesArea');
        examplesArea.innerHTML = question.examples.map((ex, i) => `
            <div class="example-item">
                <div class="example-label">示例 ${i + 1}：</div>
                <div class="example-content">
                    <div>输入：${ex.input}</div>
                    <div>输出：${ex.output}</div>
                </div>
            </div>
        `).join('');

        // 提示（面试模式隐藏）
        if (!this.config.interviewMode) {
            document.getElementById('hintContent').textContent = question.hint;
            document.getElementById('hintContent').classList.add('hidden');
            document.getElementById('showHintBtn').style.display = 'inline-flex';
        }

        // 代码模板
        this.state.editor.setValue(question.templates[this.config.language] || '');

        // 更新按钮状态
        document.getElementById('prevQuestion').disabled = index === 0;
        document.getElementById('nextQuestion').textContent = index === this.config.questionCount - 1 ? '完成训练' : '➡️ 下一题';

        // 隐藏 AI 结果
        document.getElementById('aiResult').classList.add('hidden');

        // 更新当前语言显示
        this.updateEditorLanguage();
    }

    // 显示提示
    showHint() {
        document.getElementById('hintContent').classList.remove('hidden');
        document.getElementById('showHintBtn').style.display = 'none';
    }

    // 重置代码
    resetCode() {
        const question = this.state.questions[this.state.currentIndex];
        this.state.editor.setValue(question.templates[this.config.language] || '');
    }

    // 格式化代码（简单实现）
    formatCode() {
        // CodeMirror 没有内置格式化，这里只做简单提示
        alert('代码格式化功能需要引入额外库（如 prettier）。当前仅支持手动调整缩进。');
    }

    // 提交代码
    async submitCode() {
        const code = this.state.editor.getValue();
        
        if (!code.trim() || code.includes('你的代码')) {
            alert('请先完成代码编写！');
            return;
        }

        // 显示加载
        document.getElementById('loadingOverlay').classList.remove('hidden');

        let score = 50; // 默认分数
        let feedback = '';

        if (this.config.aiEnabled) {
            try {
                const result = await this.aiJudge(code);
                score = result.score;
                feedback = result.feedback;
            } catch (e) {
                console.error('AI 判题失败:', e);
                feedback = `AI 判题失败: ${e.message}\n\n已使用默认评分。`;
            }
        } else {
            // 无 AI 时的简单评分
            score = this.simpleJudge(code);
            feedback = this.getSimpleFeedback(score);
        }

        // 隐藏加载
        document.getElementById('loadingOverlay').classList.add('hidden');

        // 记录分数
        this.state.scores.push({
            questionId: this.state.questions[this.state.currentIndex].id,
            title: this.state.questions[this.state.currentIndex].title,
            score: score,
            code: code
        });

        // 显示结果
        document.getElementById('aiScore').textContent = score;
        // Markdown 渲染
        document.getElementById('aiFeedback').innerHTML = marked.parse(feedback);
        document.getElementById('aiResult').classList.remove('hidden');
    }

    // AI 判题 - 交互式面试
    async aiJudge(code) {
        const question = this.state.questions[this.state.currentIndex];
        
        // 创建面试官实例
        this.aiInterviewer = new AIInterviewer(this.aiConfig);
        
        try {
            // 开始面试对话
            const result = await this.aiInterviewer.startInterview(question, code, this.config.language);
            
            // 构建反馈文本
            let feedbackText = result.text;
            
            // 如果有追问，显示追问
            if (result.hasQuestions) {
                feedbackText += `\n\n---\n\n🎯 **面试官追问**：\n${result.questions.map(q => `> ${q}`).join('\n')}`;
                
                // 存储追问，等待用户回答
                this.state.pendingQuestions = result.questions;
            }
            
            // 解析评分
            const scoring = result.scoring;
            if (scoring.score) {
                feedbackText += `\n\n📊 **评分详情**：\n`;
                feedbackText += `- 正确性：${scoring.correctness || 'N/A'}/20\n`;
                feedbackText += `- 时间复杂度：${scoring.timeComplexity || 'N/A'}/20\n`;
                feedbackText += `- 空间复杂度：${scoring.spaceComplexity || 'N/A'}/20\n`;
                feedbackText += `- 代码风格：${scoring.codeStyle || 'N/A'}/20\n`;
                feedbackText += `- 边界处理：${scoring.edgeCases || 'N/A'}/20\n`;
                feedbackText += `- **总分：${scoring.score}/100**\n`;
                
                if (scoring.feedback) {
                    feedbackText += `\n💡 **评价**：${scoring.feedback}\n`;
                }
                if (scoring.suggestions && scoring.suggestions.length > 0) {
                    feedbackText += `\n🔧 **改进建议**：\n${scoring.suggestions.map(s => `- ${s}`).join('\n')}`;
                }
                
                // 显示考查重点
                if (result.focusPoints && result.focusPoints.length > 0) {
                    feedbackText += `\n\n📚 **本题考查重点**：\n${result.focusPoints.map(f => `- ${f}`).join('\n')}`;
                }
            }
            
            return {
                score: scoring.score || 50,
                feedback: feedbackText,
                hasQuestions: result.hasQuestions
            };
            
        } catch (e) {
            console.error('AI 判题失败:', e);
            throw new Error(`AI 判题失败: ${e.message}`);
        }
    }
    
    // 回答追问
    async answerQuestion(userAnswer) {
        if (!this.aiInterviewer) {
            return { error: '没有进行中的面试对话' };
        }
        
        try {
            const result = await this.aiInterviewer.continueInterview(userAnswer);
            
            let feedbackText = `你回答："${userAnswer}"\n\n`;
            feedbackText += `面试官反馈：\n${result.text}`;
            
            // 更新评分
            if (result.scoring && result.scoring.score) {
                feedbackText += `\n\n📊 **更新后评分**：${result.scoring.score}/100`;
                
                if (result.hasQuestions) {
                    feedbackText += `\n\n🎯 **继续追问**：\n${result.questions.map(q => `> ${q}`).join('\n')}`;
                }
            }
            
            return {
                feedback: feedbackText,
                score: result.scoring?.score || 50
            };
        } catch (e) {
            return { error: e.message };
        }
    }

    // 简单评分（无 AI 时）
    simpleJudge(code) {
        let score = 40;
        
        // 代码长度
        if (code.length > 50) score += 10;
        if (code.length > 100) score += 10;
        
        // 有注释
        if (code.includes('//') || code.includes('/*')) score += 10;
        
        // 有函数定义
        if (code.includes('function') || code.includes('def ') || code.includes('public')) score += 10;
        
        // 有返回语句
        if (code.includes('return')) score += 10;
        
        // 有循环或条件
        if (code.includes('for') || code.includes('while') || code.includes('if')) score += 10;

        return Math.min(100, score);
    }

    getSimpleFeedback(score) {
        if (score >= 80) {
            return '✅ 代码看起来很完整！建议开启 AI 判题获取详细评审。';
        } else if (score >= 60) {
            return '📝 代码基本完整，但可能缺少一些细节。建议开启 AI 判题获取具体建议。';
        } else {
            return '⚠️ 代码可能未完成或缺少关键部分。请检查是否实现了核心逻辑。';
        }
    }

    // 上一题
    prevQuestion() {
        if (this.state.currentIndex > 0) {
            this.state.currentIndex--;
            this.loadQuestion(this.state.currentIndex);
        }
    }

    // 下一题
    nextQuestion() {
        if (this.state.currentIndex < this.config.questionCount - 1) {
            this.state.currentIndex++;
            this.loadQuestion(this.state.currentIndex);
        } else {
            this.finishPractice();
        }
    }

    // 完成训练
    finishPractice() {
        // 停止计时器
        if (this.state.timer) {
            clearInterval(this.state.timer);
        }

        // 计算总分
        const totalScore = this.state.scores.reduce((sum, s) => sum + s.score, 0);
        const avgScore = this.state.scores.length > 0 
            ? Math.round(totalScore / this.state.scores.length) 
            : 0;

        // 计算用时
        const usedTime = Math.round((Date.now() - this.state.startTime) / 1000);
        const minutes = Math.floor(usedTime / 60);
        const seconds = usedTime % 60;

        // 显示结果
        document.getElementById('totalScore').textContent = avgScore;
        document.getElementById('completedCount').textContent = this.state.scores.length;
        document.getElementById('usedTime').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('avgScore').textContent = avgScore;

        // 详细结果
        const detailsHtml = this.state.scores.map(s => `
            <div class="result-item">
                <span>#${s.questionId} ${s.title}</span>
                <span class="score-value">${s.score}分</span>
            </div>
        `).join('');
        document.getElementById('resultDetails').innerHTML = detailsHtml;

        // 保存历史
        this.state.history.push({
            date: new Date().toLocaleString(),
            questionCount: this.config.questionCount,
            scores: this.state.scores,
            avgScore: avgScore,
            usedTime: `${minutes}:${seconds}`
        });
        this.saveHistory();

        // 显示结果面板
        this.showPanel('resultPanel');
    }

    // 启动计时器
    startTimer() {
        this.state.timer = setInterval(() => {
            this.state.remainingTime--;
            
            const minutes = Math.floor(this.state.remainingTime / 60);
            const seconds = this.state.remainingTime % 60;
            document.getElementById('timerDisplay').textContent = 
                `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`;

            // 时间警告
            if (this.state.remainingTime <= 60) {
                document.getElementById('timerDisplay').style.color = '#f44336';
            }

            // 时间结束
            if (this.state.remainingTime <= 0) {
                this.finishPractice();
            }
        }, 1000);
    }

    // 重置训练
    resetPractice() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
        }
        this.state.questions = [];
        this.state.currentIndex = 0;
        this.state.scores = [];
        this.state.startTime = null;
        this.state.remainingTime = 0;
    }

    // 显示历史
    showHistory() {
        const historyList = document.getElementById('historyList');
        
        if (this.state.history.length === 0) {
            historyList.innerHTML = '<p class="no-history">暂无训练记录</p>';
        } else {
            historyList.innerHTML = this.state.history.slice(-10).reverse().map(h => `
                <div class="history-item">
                    <div class="history-header">
                        <span class="history-date">${h.date}</span>
                        <span class="history-stats">平均 ${h.avgScore} 分 | ${h.usedTime}</span>
                    </div>
                    <div class="history-questions">
                        完成 ${h.questionCount} 题：${h.scores.map(s => `#${s.questionId}(${s.score}分)`).join(', ')}
                    </div>
                </div>
            `).join('');
        }

        this.showPanel('historyPanel');
    }
}

// 启动应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new LeetCodeTrainer();
});