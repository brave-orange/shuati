// LeetCode Hot100 题目数据
const HOT100_QUESTIONS = [
    // 1-10: 数组/哈希
    {
        id: 1,
        title: "两数之和",
        difficulty: "easy",
        tags: ["数组", "哈希表"],
        description: `给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。`,
        examples: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
            { input: "nums = [3,3], target = 6", output: "[0,1]" }
        ],
        hint: "使用哈希表可以一次遍历解决问题，存储每个数的索引，查找 target - nums[i] 是否存在。",
        templates: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // 你的代码
    
}`,
            python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # 你的代码
        pass`,
            java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // 你的代码
    }
};`,
            go: `func twoSum(nums []int, target int) []int {
    // 使用哈希表：遍历时检查 target - nums[i] 是否已存在
}`
        }
    },
    {
        id: 49,
        title: "字母异位词分组",
        difficulty: "medium",
        tags: ["数组", "哈希表", "字符串"],
        description: `给你一个字符串数组，请你将字母异位词组合在一起。可以按任意顺序返回结果列表。

字母异位词是由重新排列源单词的所有字母得到的一个新单词。`,
        examples: [
            { input: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", output: "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]" },
            { input: "strs = [\"\"]", output: "[[\"\"]]" },
            { input: "strs = [\"a\"]", output: "[[\"a\"]]" }
        ],
        hint: "将每个字符串排序后作为 key，用哈希表分组。",
        templates: {
            javascript: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
    // 你的代码
    
}`,
            python: `class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        # 你的代码
        pass`,
            java: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        // 你的代码
    }
};`,
            go: `func groupAnagrams(strs []string) [][]string {
    // 将每个字符串排序作为 key，用 map 分组
}`
        }
    },
    {
        id: 128,
        title: "最长连续序列",
        difficulty: "medium",
        tags: ["数组", "哈希表"],
        description: `给定一个未排序的整数数组 nums，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 O(n) 的算法解决此问题。`,
        examples: [
            { input: "nums = [100,4,200,1,3,2]", output: "4" },
            { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" }
        ],
        hint: "使用哈希集合存储所有数，对于每个数，如果它的前一个数不在集合中，则从它开始向后寻找连续序列。",
        templates: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function longestConsecutive(nums) {
    // 你的代码
    
}`,
            python: `class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        # 你的代码
        pass`,
            java: `class Solution {
    public int longestConsecutive(int[] nums) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        // 你的代码
    }
};`,
            go: `func longestConsecutive(nums []int) int {
    // 哈希集合 + 寻找序列起点
}`
        }
    },
    // 11-20: 双指针/滑动窗口
    {
        id: 3,
        title: "无重复字符的最长子串",
        difficulty: "medium",
        tags: ["哈希表", "字符串", "滑动窗口"],
        description: `给定一个字符串 s，请你找出其中不含有重复字符的最长子串的长度。`,
        examples: [
            { input: "s = \"abcabcbb\"", output: "3" },
            { input: "s = \"bbbbb\"", output: "1" },
            { input: "s = \"pwwkew\"", output: "3" }
        ],
        hint: "使用滑动窗口，维护一个窗口内的字符集合，当遇到重复字符时移动左边界。",
        templates: {
            javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    // 你的代码
    
}`,
            python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # 你的代码
        pass`,
            java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // 你的代码
    }
};`,
            go: `func lengthOfLongestSubstring(s string) int {
    // 滑动窗口 + 哈希集合/数组
}`
        }
    },
    {
        id: 438,
        title: "找到字符串中所有字母异位词",
        difficulty: "medium",
        tags: ["哈希表", "字符串", "滑动窗口"],
        description: `给定两个字符串 s 和 p，找到 s 中所有 p 的异位词的子串，返回这些子串的起始索引。

异位词指由相同字母重新排列形成的字符串（包括相同的字符串）。`,
        examples: [
            { input: "s = \"cbaebabacd\", p = \"abc\"", output: "[0,6]" },
            { input: "s = \"abab\", p = \"ab\"", output: "[0,1,2]" }
        ],
        hint: "使用滑动窗口和字符计数，比较窗口内字符频率与 p 是否相同。",
        templates: {
            javascript: `/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
function findAnagrams(s, p) {
    // 你的代码
    
}`,
            python: `class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        # 你的代码
        pass`,
            java: `class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        // 你的代码
    }
};`,
            go: `func findAnagrams(s string, p string) []int {
    // 滑动窗口，比较字符频率
}`
        }
    },
    // 21-30: 链表
    {
        id: 21,
        title: "合并两个有序链表",
        difficulty: "easy",
        tags: ["递归", "链表"],
        description: `将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。`,
        examples: [
            { input: "l1 = [1,2,4], l2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
            { input: "l1 = [], l2 = []", output: "[]" },
            { input: "l1 = [], l2 = [0]", output: "[0]" }
        ],
        hint: "可以使用迭代或递归解决。迭代时比较两个链表头节点，取较小的接入结果链表。",
        templates: {
            javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function mergeTwoLists(list1, list2) {
    // 你的代码
    
}`,
            python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        # 你的代码
        pass`,
            java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // 你的代码
    }
}`,
            cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // 你的代码
    }
};`,
            go: `func mergeTwoLists(list1 *ListNode, list2 *ListNode) *ListNode {
    // 迭代或递归合并有序链表
}`
        }
    },
    {
        id: 206,
        title: "反转链表",
        difficulty: "easy",
        tags: ["递归", "链表"],
        description: `给你单链表的头节点 head，请你反转链表，并返回反转后的链表。`,
        examples: [
            { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
            { input: "head = [1,2]", output: "[2,1]" },
            { input: "head = []", output: "[]" }
        ],
        hint: "迭代：使用三个指针 prev、curr、next，逐个反转节点指向。递归：递归到最后一个节点，然后逐层返回反转。",
        templates: {
            javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function reverseList(head) {
    // 你的代码
    
}`,
            python: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # 你的代码
        pass`,
            java: `class Solution {
    public ListNode reverseList(ListNode head) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // 你的代码
    }
};`,
            go: `func reverseList(head *ListNode) *ListNode {
    // 迭代：三指针反转
}`
        }
    },
    {
        id: 146,
        title: "LRU缓存",
        difficulty: "medium",
        tags: ["设计", "哈希表", "链表", "双向链表"],
        description: `请你设计并实现一个满足 LRU (最近最少使用) 缓存约束的数据结构。

实现 LRUCache 类：
- LRUCache(int capacity) 以正整数容量初始化 LRU 缓存
- int get(int key) 如果关键字存在于缓存中，则返回关键字的值，否则返回 -1
- void put(int key, int value) 如果关键字已存在，则变更其值；如果不存在，则插入该组关键字-值。当缓存容量达到上限时，应在写入新数据之前删除最久未使用的数据值。`,
        examples: [
            { input: `["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]`, output: `[null, null, null, 1, null, -1, null, -1, 3, 4]` }
        ],
        hint: "使用哈希表 + 双向链表。哈希表实现 O(1) 查找，双向链表维护访问顺序。",
        templates: {
            javascript: `/**
 * @param {number} capacity
 */
function LRUCache(capacity) {
    // 你的代码
    
}

LRUCache.prototype.get = function(key) {
    // 你的代码
};

LRUCache.prototype.put = function(key, value) {
    // 你的代码
};`,
            python: `class LRUCache:

    def __init__(self, capacity: int):
        # 你的代码
        pass

    def get(self, key: int) -> int:
        # 你的代码
        pass

    def put(self, key: int, value: int) -> None:
        # 你的代码
        pass`,
            java: `class LRUCache {
    public LRUCache(int capacity) {
        // 你的代码
    }
    
    public int get(int key) {
        // 你的代码
    }
    
    public void put(int key, int value) {
        // 你的代码
    }
}`,
            cpp: `class LRUCache {
public:
    LRUCache(int capacity) {
        // 你的代码
    }
    
    int get(int key) {
        // 你的代码
    }
    
    void put(int key, int value) {
        // 你的代码
    }
};`,
            go: `type LRUCache struct {
    // map + 双向链表
}

func Constructor(capacity int) LRUCache {
    
}

func (this *LRUCache) Get(key int) int {
    
}

func (this *LRUCache) Put(key int, value int) {
    
}`
        }
    },
    // 31-40: 二叉树
    {
        id: 104,
        title: "二叉树的最大深度",
        difficulty: "easy",
        tags: ["树", "深度优先搜索", "递归"],
        description: `给定一个二叉树 root，返回其最大深度。

二叉树的最大深度是指从根节点到最远叶子节点的最长路径上的节点数。`,
        examples: [
            { input: "root = [3,9,20,null,null,15,7]", output: "3" },
            { input: "root = [1,null,2]", output: "2" }
        ],
        hint: "递归：max(left_depth, right_depth) + 1。迭代：使用层序遍历，记录层数。",
        templates: {
            javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function maxDepth(root) {
    // 你的代码
    
}`,
            python: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        # 你的代码
        pass`,
            java: `class Solution {
    public int maxDepth(TreeNode root) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        // 你的代码
    }
};`,
            go: `func maxDepth(root *TreeNode) int {
    // DFS 递归或 BFS
}`
        }
    },
    {
        id: 102,
        title: "二叉树的层序遍历",
        difficulty: "medium",
        tags: ["树", "广度优先搜索"],
        description: `给你二叉树的根节点 root，返回其节点值的层序遍历。（即逐层地，从左到右访问所有节点）。`,
        examples: [
            { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
            { input: "root = [1]", output: "[[1]]" },
            { input: "root = []", output: "[]" }
        ],
        hint: "使用队列实现 BFS，每次处理一层。",
        templates: {
            javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function levelOrder(root) {
    // 你的代码
    
}`,
            python: `class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        # 你的代码
        pass`,
            java: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // 你的代码
    }
};`,
            go: `func levelOrder(root *TreeNode) [][]int {
    // BFS 队列
}`
        }
    },
    // 41-50: 动态规划
    {
        id: 70,
        title: "爬楼梯",
        difficulty: "easy",
        tags: ["记忆化搜索", "数学", "动态规划"],
        description: `假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶？`,
        examples: [
            { input: "n = 2", output: "2" },
            { input: "n = 3", output: "3" }
        ],
        hint: "dp[i] = dp[i-1] + dp[i-2]，本质是斐波那契数列。",
        templates: {
            javascript: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
    // 你的代码
    
}`,
            python: `class Solution:
    def climbStairs(self, n: int) -> int:
        # 你的代码
        pass`,
            java: `class Solution {
    public int climbStairs(int n) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    int climbStairs(int n) {
        // 你的代码
    }
};`,
            go: `func climbStairs(n int) int {
    // 动态规划 dp[i] = dp[i-1] + dp[i-2]
}`
        }
    },
    {
        id: 5,
        title: "最长回文子串",
        difficulty: "medium",
        tags: ["字符串", "动态规划"],
        description: `给你一个字符串 s，找到 s 中最长的回文子串。`,
        examples: [
            { input: "s = \"babad\"", output: "\"bab\" 或 \"aba\"" },
            { input: "s = \"cbbd\"", output: "\"bb\"" }
        ],
        hint: "中心扩展法：以每个字符或字符间隙为中心，向两边扩展。或使用动态规划 dp[i][j] 表示子串是否为回文。",
        templates: {
            javascript: `/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
    // 你的代码
    
}`,
            python: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        # 你的代码
        pass`,
            java: `class Solution {
    public String longestPalindrome(String s) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        // 你的代码
    }
};`,
            go: `func longestPalindrome(s string) string {
    // 中心扩展法
}`
        }
    },
    // 51-60: 回溯/DFS
    {
        id: 46,
        title: "全排列",
        difficulty: "medium",
        tags: ["数组", "回溯"],
        description: `给定一个不含重复数字的数组 nums，返回其所有可能的全排列。你可以按任意顺序返回答案。`,
        examples: [
            { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
            { input: "nums = [0,1]", output: "[[0,1],[1,0]]" },
            { input: "nums = [1]", output: "[[1]]" }
        ],
        hint: "使用回溯算法，维护一个已使用的标记数组，每次选择一个未使用的数字加入当前排列。",
        templates: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
    // 你的代码
    
}`,
            python: `class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        # 你的代码
        pass`,
            java: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        // 你的代码
    }
};`,
            go: `func permute(nums []int) [][]int {
    // 回溯
}`
        }
    },
    {
        id: 78,
        title: "子集",
        difficulty: "medium",
        tags: ["位运算", "数组", "回溯"],
        description: `给你一个整数数组 nums，数组中的元素互不相同。返回该数组所有可能的子集（幂集）。

解集不能包含重复的子集。你可以按任意顺序返回解集。`,
        examples: [
            { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
            { input: "nums = [0]", output: "[[],[0]]" }
        ],
        hint: "回溯：每次选择是否加入当前元素。迭代：每个元素对现有子集扩展。",
        templates: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets(nums) {
    // 你的代码
    
}`,
            python: `class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        # 你的代码
        pass`,
            java: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        // 你的代码
    }
};`,
            go: `func subsets(nums []int) [][]int {
    // 回溯或位运算
}`
        }
    },
    // 61-70: 贪心/排序
    {
        id: 56,
        title: "合并区间",
        difficulty: "medium",
        tags: ["数组", "排序"],
        description: `以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]。
请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。`,
        examples: [
            { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
            { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" }
        ],
        hint: "先按起点排序，然后逐个合并重叠区间。",
        templates: {
            javascript: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
    // 你的代码
    
}`,
            python: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        # 你的代码
        pass`,
            java: `class Solution {
    public int[][] merge(int[][] intervals) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // 你的代码
    }
};`,
            go: `func merge(intervals [][]int) [][]int {
    // 排序后合并重叠区间
}`
        }
    },
    // 71-80: 二分查找
    {
        id: 4,
        title: "寻找两个正序数组的中位数",
        difficulty: "hard",
        tags: ["数组", "二分查找", "分治"],
        description: `给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
请你找出并返回这两个正序数组的中位数。

算法的时间复杂度应该为 O(log (m+n))。`,
        examples: [
            { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000" },
            { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.50000" }
        ],
        hint: "使用二分查找，找到分割点使得左右两边元素数量相等且左边最大 <= 右边最小。",
        templates: {
            javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
    // 你的代码
    
}`,
            python: `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        # 你的代码
        pass`,
            java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // 你的代码
    }
};`,
            go: `func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
    // 二分查找，O(log(m+n))
}`
        }
    },
    {
        id: 33,
        title: "搜索旋转排序数组",
        difficulty: "medium",
        tags: ["数组", "二分查找"],
        description: `整数数组 nums 按升序排列，数组中的值互不相同。

在传递给函数之前，nums 在预先未知的某个下标 k 上进行了旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]。

给你旋转后的数组 nums 和一个整数 target，如果 nums 中存在这个目标值 target，则返回它的下标，否则返回 -1。

要求时间复杂度 O(log n)。`,
        examples: [
            { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
            { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
            { input: "nums = [1], target = 0", output: "-1" }
        ],
        hint: "二分查找时判断哪一半是有序的，target 在有序的那一半就继续在该半查找，否则在另一半查找。",
        templates: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
    // 你的代码
    
}`,
            python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # 你的代码
        pass`,
            java: `class Solution {
    public int search(int[] nums, int target) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // 你的代码
    }
};`,
            go: `func search(nums []int, target int) int {
    // 旋转数组二分查找
}`
        }
    },
    // 81-90: 图/BFS/DFS
    {
        id: 200,
        title: "岛屿数量",
        difficulty: "medium",
        tags: ["深度优先搜索", "广度优先搜索", "矩阵"],
        description: `给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或垂直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。`,
        examples: [
            { input: `grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`, output: "1" },
            { input: `grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]`, output: "3" }
        ],
        hint: "遍历网格，遇到 '1' 就进行 DFS/BFS 将相连的陆地都标记为已访问，计数加 1。",
        templates: {
            javascript: `/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
    // 你的代码
    
}`,
            python: `class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        # 你的代码
        pass`,
            java: `class Solution {
    public int numIslands(char[][] grid) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        // 你的代码
    }
};`,
            go: `func numIslands(grid [][]byte) int {
    // DFS/BFS 染色
}`
        }
    },
    // 91-100: 其他高频题
    {
        id: 20,
        title: "有效的括号",
        difficulty: "easy",
        tags: ["栈", "字符串"],
        description: `给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s，判断字符串是否有效。

有效字符串需满足：
1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。`,
        examples: [
            { input: "s = \"()\"", output: "true" },
            { input: "s = \"()[]{}\"", output: "true" },
            { input: "s = \"(]\"", output: "false" }
        ],
        hint: "使用栈，遇到左括号入栈，遇到右括号检查栈顶是否匹配。",
        templates: {
            javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // 你的代码
    
}`,
            python: `class Solution:
    def isValid(self, s: str) -> bool:
        # 你的代码
        pass`,
            java: `class Solution {
    public boolean isValid(String s) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    bool isValid(string s) {
        // 你的代码
    }
};`,
            go: `func isValid(s string) bool {
    // 栈匹配括号
}`
        }
    },
    {
        id: 139,
        title: "单词拆分",
        difficulty: "medium",
        tags: ["数组", "哈希表", "字符串", "动态规划"],
        description: `给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中的单词拼接出 s。

注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。`,
        examples: [
            { input: "s = \"leetcode\", wordDict = [\"leet\",\"code\"]", output: "true" },
            { input: "s = \"applepenapple\", wordDict = [\"apple\",\"pen\"]", output: "true" },
            { input: "s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]", output: "false" }
        ],
        hint: "动态规划：dp[i] 表示前 i 个字符能否被拆分。检查每个可能的分割点。",
        templates: {
            javascript: `/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
function wordBreak(s, wordDict) {
    // 你的代码
    
}`,
            python: `class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        # 你的代码
        pass`,
            java: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        // 你的代码
    }
};`,
            go: `func wordBreak(s string, wordDict []string) bool {
    // 动态规划 dp[i] = s[:i] 是否可拆分
}`
        }
    },
    {
        id: 152,
        title: "乘积最大子数组",
        difficulty: "medium",
        tags: ["数组", "动态规划"],
        description: `给你一个整数数组 nums，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。`,
        examples: [
            { input: "nums = [2,3,-2,4]", output: "6" },
            { input: "nums = [-2,0,-1]", output: "0" }
        ],
        hint: "因为负数可能使最小变最大，需要同时记录最大和最小值。",
        templates: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxProduct(nums) {
    // 你的代码
    
}`,
            python: `class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        # 你的代码
        pass`,
            java: `class Solution {
    public int maxProduct(int[] nums) {
        // 你的代码
    }
}`,
            cpp: `class Solution {
public:
    int maxProduct(vector<int>& nums) {
        // 你的代码
    }
};`,
            go: `func maxProduct(nums []int) int {
    // dp，维护 max 和 min（负数情况）
}`
        }
    }
];

// 导出题目数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HOT100_QUESTIONS;
}