/* 
  查找表问题
    两个数组的交集 II-350
    给定两个数组，编写一个函数来计算它们的交集。
    https://leetcode-cn.com/problems/intersection-of-two-arrays-ii
*/
let intersect = function(nums1, nums2) {
  let map1 = makeCountMap(nums1);
  let map2 = makeCountMap(nums2);
  let res = [];
  // 遍历map结构
  for (let num of map1.keys()) {
    const count1 = map1.get(num);
    const count2 = map2.get(num);
    // 如果两个map结构中都存在同一个key,则比较两个key出现的次数,取最小值
    if (count2) {
      const pushCount = Math.min(count1, count2);
      // 按照最小出现的次数push进对应次数的数据
      for (let i = 0; i < pushCount; i++) {
        res.push(num);
      }
    }
  }
  return res;
};

function makeCountMap(nums) {
  let map = new Map();
  // 生成Map,遍历数据,将数组的value作为key,value出现的次数作为value,统计key出现的次数
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    let count = map.get(num);
    if (count) {
      map.set(num, count + 1);
    } else {
      map.set(num, 1);
    }
  }
  /* 
  [1, 2, 3, 3, 3, 4, 5, 6, 7, 7, 8]
  to ...
  {
    1: 1,
    2: 1,
    3: 3,
    4: 1,
    5: 1,
    6: 1,
    7: 2,
    8: 1,
  }

  [1, 2, 3, 3, 4, 5, 6, 7, 8, 9]
  to ...
  {
    1: 1,
    2: 1,
    3: 2,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 1
  }
  */
  return map;
}
const testValue = intersect([1, 2, 3, 3, 3, 4, 5, 6, 7, 7, 8], [1, 2, 3, 3, 4, 5, 6, 7, 8, 9]);
console.log("testValue", testValue);

/* 
  双指针问题
    最接近的三数之和
    给定一个包括  n 个整数的数组  nums  和 一个目标值  target。找出  nums  中的三个整数，使得它们的和与  target  最接近。返回这三个数的和。假定每组输入只存在唯一答案。
    https://leetcode-cn.com/problems/3sum-closest

    先按照升序排序，然后分别从左往右依次选择一个基础点 i（0 <= i <= nums.length - 3），在基础点的右侧用双指针去不断的找最小的差值。
    假设基础点是 i，初始化的时候，双指针分别是：

    left：i + 1，基础点右边一位。
    right: nums.length - 1 数组最后一位。

    然后求此时的和，如果和大于 target，那么可以把右指针左移一位，去试试更小一点的值，反之则把左指针右移。
    在这个过程中，不断更新全局的最小差值 min，和此时记录下来的和 res。
    最后返回 res 即可。
    */

// 1.[-1,2,1,-4] , 1
let threeSumClosest = (nums, target) => {
  let length = nums.length;
  if (length === 3) {
    return getSum(nums);
  }
  // 2.[2,1,-1,-4]
  // 先升序排序 这是解题的前置条件
  nums.sort((a, b) => a - b);

  let min = Infinity, // 和target的最小差
    res;

  // 从左往右依次尝试定一个基础指针,右边至少再保留两位,否则无法凑成3个
  for (let i = 0; i <= length - 3; i++) {
    let basic = nums[i],
      left = i + 1, // 左指针先从i右侧第一位开始尝试
      right = length - 1; // 右指针先从数组最后一项开始尝试
    // 3. i:0 basic:2 left:1 right:3
    while (left < right) {
      // 4.  2 + 1 + -4 = -1
      // 三数求和
      let sum = basic + nums[left] + nums[right];
      // 5. diff =1
      // 更新最小差
      let diff = Math.abs(sum - target);
      if (diff < min) {
        min = diff;
        res = sum;
      }
      if (sum < target) {
        // 求出的和如果小于目标值的话,可以尝试吧左指针右移 扩大值
        left++;
      } else if (sum > target) {
        // 反之则右指针左移
        right--;
      } else {
        // 相等的话,差就为0,一定是答案
        return sum;
      }
    }
  }
  return res;
};

const getSum = (nums) => nums.reduce((pre, cur) => pre + cur, 0);

/* 
  滑动窗口问题
    无重复字符的最长子串
    给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
    https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
*/
let lengthOfLongesSubString = (str) => {
  let length = str.length;
  // 滑动窗口为 s[left...right]
  let left = 0,
    right = -1,
    freqMap = {}, // 记录当前子串中下标对应的出现频率
    max = 0; // 找到的满足条件子串的最长长度

  /* 
    传入: 'abcddef'
    当right增加到4时 freqMap为 {a:1,b:1,c:1,d:1}
    right继续增加到5时,nextLetter为 d 这时freqMap中已经存在d了,说明当前这个不重复字段已经扫描结束了
    于是left开始增加,从freqMap[str[0]]开始,将之前记录的不重复值的频率置0
    freqMap = { a:0, b: 0, c:0, d:0 }
    当所有记录频率都置为0时 第一个校验就会通过 继续增加right的值 以此类推
  */
  while (left < length) {
    let nextLetter = str[right + 1];
    // 从第一项开始查看,如果未被记录且值有效,则记录该值及频率
    if (!freqMap[nextLetter] && nextLetter !== undefined) {
      freqMap[nextLetter] = 1;
      right++;
    } else {
      // 如果出现重复值,则将之前记录的值的频率置空
      freqMap[str[left]] = 0;
      left++;
    }
    // 记录满足条件最长长度
    max = Math.max(max, right - left + 1);
  }
  return max;
};

// 动态规划
const robMax = (nums) => {
  if (!nums.length) return 0;
  let dp = [];
  for (let i = nums.length - 1; i >= 0; i--) {
    debugger;
    let robNow = nums[i] + (dp[i + 2] || 0);
    let robNext = dp[i + 1] || 0;
    dp[i] = Math.max(robNow, robNext);
  }
  return dp[0];
};

// 贪心算法
let findContentChildren = (g, s) => {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);

  let j = 0;
  let i = 0;
  let count = 0;
  while (j < s.length && i < g.length) {
    debugger
    let need = g[i];
    let cookie = s[j];
    if (cookie >= need) {
      count++;
      i++;
      j++;
    } else {
      j++;
    }
  }
  return count;
};
