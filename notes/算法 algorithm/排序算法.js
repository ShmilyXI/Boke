// 生成list结构
function ArrayList() {
  let arr = [];
  this.insert = (item) => arr.push(item);
  this.toString = () => arr.join();
}

// 创建arr
const createArr = (size) => {
  const arr = new ArrayList();
  for (let i = 0; i < size; i++) {
    arr.insert(i);
  }
  return arr;
};

const utils = {
  swap(array, a, b) {
    [array[a], array[b]] = [array[b], array[a]];
  },
  randomNum() {
    return Math.floor(Math.random() * 100);
  },
  randomArray() {
    return Array.from(Array(this.randomNum()), (_) => this.randomNum() * 50 + this.randomNum());
  },
};

/* 
    -------------------------------------------------- 冒泡排序 -------------------------------------------------- 
    比较数组中任意两个相邻的数值，如果第一个比第二个大，则交换他们的位置
*/
const bubbleSort = (arr) => {
  const length = arr.length,
    array = [...arr];
  // 元素两两相比
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j + 1], array[j]] = [array[j], array[j + 1]]; // 元素交换
      }
    }
  }
  return array;
};
/* 
const array = createArr(5);
const array = [1, 4, 5, 6, 7, 2, 1, 5, 6, 7, 9, 11];
console.log('array', array.toString());
bubbleSort(array);
console.log('array', array.toString()); 
*/

/* 
    -------------------------------------------------- 选择排序 -------------------------------------------------- 
    找到数据结构中的最小值，将其放到第一位，接着找第二小的值，放在第二位，以此类推，反之亦然
*/
const selectionSort = (arr) => {
  let length = arr.length,
    array = [...arr],
    minIndex;
  for (let i = 0; i < length - 1; i++) {
    // 进来先默认最小index为 i
    minIndex = i;
    for (let j = i; j < length; j++) {
      // 寻找最小的数
      if (array[minIndex] > array[j]) minIndex = j;
    }
    // 如果minIndex不等于i 说明遍历完以后，minIndex变小了，则交换他们的位置
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  return array;
};

/* 
    -------------------------------------------------- 直接插入排序 -------------------------------------------------- 
    假设第一个元素已经被排序，然后从后往前扫，如果该假设的元素大于新元素，将元素往下移动一个位置
*/
const insertSort = (arr) => {
  let length = arr.length,
    array = [...arr],
    preIndex,
    current;
  for (let i = 1; i < length; i++) {
    preIndex = i;
    current = array[i];
    while (preIndex > 0 && array[preIndex - 1] > current) {
      array[preIndex] = array[preIndex - 1];
      preIndex--;
    }
    array[preIndex] = current;
  }
  return array;
};

/* 
    -------------------------------------------------- 希尔排序 -------------------------------------------------- 
    先将整个待排序的记录序列分割成为若干子序列。
    分别进行直接插入排序。
    待整个序列中的记录基本有序时，再对全体记录进行依次直接插入排序
*/
const shellSort = (arr) => {
  let length = arr.length,
    temp,
    gap = 1;
  while (gap < length / 3) {
    gap = gap * 3 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < length; i++) {
      temp = arr[i];
      let j = i - gap;
      for (; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
  }
  return arr;
};


/* 
    -------------------------------------------------- 快速排序 -------------------------------------------------- 
    先找到一个基准点（一般指数组的中部），然后数组被该基准点分为两部分，依次与该基准点数据比较，如果比它小，放左边；反之，放右边。
    左右分别用一个空数组去存储比较后的数据。
    最后递归执行上述操作，直到数组长度 <= 1;
*/
const quickSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  // 取基准点
  const midIndex = Math.floor(arr.length / 2);
  // 取基准点的值，
  const midArr = arr.splice(midIndex, 1);
  const midVal = midArr[0];
  // 存放比基准点小的值
  const left = [];
  // 存放比基准点大的值
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < midVal) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // 递归调用，直到元素长度<=1
  return [...quickSort(left), midVal, ...quickSort(right)];
};

/* 
    -------------------------------------------------- 归并排序 -------------------------------------------------- 
   归并排序属于一种分治算法。归并排序的思想就是将原始数组切分成一个一个较小的数组，直到每一个数组只有一个元素为止，然后再把一个一个小数组，一点一点的结合成一个最终排序后的数组。
   其实简单来说，就是先分，再合。归并排序的实现有两种方法，一种是递归，一种是迭代。
   1. mergeSortRec([55,44,22,99,11,33]) => mergeSortRec([55,44,22]),mergeSortRec([99,11,33]) => ... => [55] [44] [22] [99] [11] [33]
   2. merge([55],[44]) => [44,55]
   3. merge([22],[99]) => [22,99]
   4. merge([44,55],[22,99]) => [22,44,55,99]
*/
const mergeSortRec = (arr) => {
  const length = arr.length;
  // 如果length为1，说明已经分到底了
  if (length === 1) {
    return arr;
  }
  const mid = Math.floor(length / 2),
    left = arr.slice(0, mid),
    right = arr.slice(mid, length);
  return merge(mergeSortRec(left), mergeSortRec(right));
};

const merge = (left, right) => {
  let result = [],
    il = 0,
    ir = 0;
  // 如果左侧的比右侧的小，则放入左侧数值，并将il++，这样下次比较的时候，就是左侧下一个元素与右侧那个大的元素比较了
  while (il < left.length && ir < right.length) {
    if (left[il] < right[ir]) {
      result.push(left[il++]);
    } else {
      result.push(right[ir++]);
    }
  }
  // 前面比较完之后，会剩下一个元素没有对应的数据进行比较，所以将剩下的元素放入集合中
  while (il < left.length) {
    result.push(left[il++]);
  }
  while (ir < right.length) {
    result.push(right[ir++]);
  }
  return result;
};

/* 
    -------------------------------------------------- 堆排序 -------------------------------------------------- 
    堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。
    1.将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；
    2.将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R[1,2…n-1]<=R[n]；
    3.由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。
*/
const heapSort = (arr) => {
  // 初始化大顶堆，从第一个非叶子节点开始
  for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
    heapify(arr, i, arr.length);
  }
  // 排序，每一次循环找出一个当前最大值，数组长度减一
  for (let i = Math.floor(arr.length - 1); i > 0; i--) {
    // 根节点与最后一个节点交换
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // 从根节点开始调整，并且最后一个节点已经为当前最大值，不需要参与比较，所以第三个参数为i，即比较到i的前一个节点即可
    heapify(arr, 0, i);
  }
  return arr;
};

/* 
  将i节点以下的堆整理为大顶堆，注意这一步实现的基础实际上是：
    假设节点i以下的子堆已经是一个大顶堆，heapify函数实现的功能实际上是：找到节点i在包括节点i的堆中的正确位置。
    后面将写一个for循环，从第一个非叶子节点开始，对每一个非叶子节点都执行heapify操作，所以就满足了i以下的子堆已经是一个大顶堆。 
*/
const heapify = (arr, i, length) => {
  let temp = arr[i];
  for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
    temp = arr[i];
    if (j + 1 < length && arr[j] < arr[j + 1]) {
      j++;
    }
    if (temp < arr[j]) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i = j;
    } else {
      break;
    }
  }
};

/* 
    -------------------------------------------------- 计数排序 -------------------------------------------------- 
    计数排序就是遍历数组记录数组下的元素出现过多次，然后把这个元素找个位置先安置下来，简单点说就是以原数组每个元素的值作为新数组的下标，而对应小标的新数组元素的值作为出现的次数，相当于是通过下标进行排序。
    计数排序不是基于比较的排序算法，其核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。 作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。
    1.找出待排序的数组中最大和最小的元素；
    2.统计数组中每个值为i的元素出现的次数，存入数组C的第i项；
    3.对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）；
    4.反向填充目标数组：将每个元素i放在新数组的第B(i)项，每放一个元素就将C(i)减去1。
*/
const countingSort = (arr) => {
  let length = arr.length,
    B = [],
    C = [],
    max = (min = arr[0]);
  // 将数组中的val作为C中的key存储，值为val出现的次数
  for (let i = 0; i < length; i++) {
    min = min <= arr[i] ? min : arr[i];
    max = max >= arr[i] ? max : arr[i];
    C[arr[i]] = C[arr[i]] ? C[arr[i]] + 1 : 1;
  }
  // 计算排序后的元素下标，从C「min]开始，如果min为1,C[min]为1，C[5]的值为1，则C[1]-C[4]的值都为1，C[5]的值为2，以此类推
  for (let j = min; j < max; j++) {
    C[j + 1] = (C[j + 1] || 0) + (C[j] || 0);
  }
  // 从后往前遍历原数组，找到对应数据在C中的下标，C中下标存储的就是对应元素在数组中的下标，在B中的对应下标位置存储元素
  for (let k = length - 1; k >= 0; k--) {
    debugger;
    B[C[arr[k]] - 1] = arr[k];
    C[arr[k]]--;
  }
  return B;
};

/* 
    -------------------------------------------------- 桶排序 -------------------------------------------------- 
    桶排序是计数排序的升级版。它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。
    桶排序 (Bucket sort)的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排）。
    1.设置一个定量的数组当作空桶；
    2.遍历输入数据，并且把数据一个一个放到对应的桶里去；
    3.对每个不是空的桶进行排序；
    4.从不是空的桶里把排好序的数据拼接起来。 
*/
const bucketSort = (arr, bucketSize) => {
  if (!arr.length) return;
  let length = arr.length,
    min = (max = arr[0]);
  for (let i = 0; i < length; i++) {
    min = min <= arr[i] ? min : arr[i]; // 获取最小值
    max = max >= arr[i] ? max : arr[i]; // 获取最大值
  }

  // 初始化桶
  const DEFAULT_BUCKET_SIZE = 5; // 设置每个桶的默认数量为5
  bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
  const bucketCount = Math.floor((max - min) / bucketSize) + 1; // 设置桶的数量
  // 初始化每个桶
  const buckets = new Array(bucketCount);
  for (let i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }

  // 利用映射函数将数据分配到各个桶中
  for (let i = 0; i < length; i++) {
    const index = Math.floor((arr[i] - min) / bucketSize);
    buckets[index].push(arr[i]);
  }

  arr.length = 0;
  for (let i = 0; i < buckets.length; i++) {
    insertSort(buckets[i]); // 对每个桶进行排序
    for (let j = 0; j < buckets[i].length; j++) {
      arr.push(buckets[i][j]);
    }
  }
  return arr;
};

/* 
    -------------------------------------------------- 基数排序 -------------------------------------------------- 
    基数排序是一种非比较型整数排序算法，其原理是将整数按位数切割成不同的数字，然后按每个位数分别比较。
    由于整数也可以表达字符串（比如名字或日期）和特定格式的浮点数，所以基数排序也不是只能使用于整数。
    使用条件：
      要求数据可以分割独立的位来比较；
      位之间由递进关系，如果 a 数据的高位比 b 数据大，那么剩下的地位就不用比较了；
      每一位的数据范围不能太大，要可以用线性排序，否则基数排序的时间复杂度无法做到 O(n)。
    方案:
      按照优先从高位或低位来排序有两种实现方案:
      MSD：由高位为基底，先按 k1 排序分组，同一组中记录, 关键码 k1 相等，再对各组按 k2 排序分成子组, 之后，对后面的关键码继续这样的排序分组，直到按最次位关键码 kd 对各子组排序后，再将各组连接起来，便得到一个有序序列。MSD 方式适用于位数多的序列。
      LSD：由低位为基底，先从 kd 开始排序，再对 kd - 1 进行排序，依次重复，直到对 k1 排序后便得到一个有序序列。LSD 方式适用于位数少的序列。
*/
// 获取最大值的位数
const getMaxDigits = (arr) => arr?.length && String(arr.reduce((pre, cur) => (cur > pre ? cur : pre), 0)).length;
/* 
  name: 基数排序
  @param: arr 待排序数组
  @param: max 最大位数(String(v).length)
*/
const radixSort = (arr, max) => {
  const buckets = [];
  let unit = 10,
    base = 1;
  for (let i = 0; i < max; i++, base *= 10, unit *= 10) {
    for (let j = 0; j < arr.length; j++) {
      let index = ~~((arr[j] % unit) / base); // 依次过滤出个位，十位等等
      // 往不同桶里添加数据
      if (buckets[index] == null) {
        buckets[index] = [];
      }
      buckets[index].push(arr[j]);
    }
    let pos = 0,
      value;
    for (let j = 0, length = buckets.length; j < length; j++) {
      if (buckets[j] != null) {
        while ((value = buckets[j].shift()) != null) {
          // 将不同桶里的数据挨个捞出来，为下一轮高位做准备，由于靠近桶底的元素排名靠前，因此先从桶底开始捞
          arr[pos++] = value;
        }
      }
    }
  }
  return arr;
};
