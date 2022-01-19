### 什么是SVG

`SVG`诞生于`1999`年，是一种[XML](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2FXML)语言，类似`XHTML`，即`SVG`，可以用来绘制矢量图形，例如右面展示的图形。`SVG`可以通过定义必要的线和形状来创建一个图形，也可以修改已有的位图，或者将这两种方式结合起来创建图形。图形和其组成部分可以形变、合成、或者通过滤镜完全改变外观。

#### SVG的优点

1. 可以使用任何文本编辑器来创建绘画`SVG`。
2. 可以搜索、索引、脚本化、压缩`SVG`图像。
3. `SVG`图像可以扩展，可以在任何分辨率上高质量显示。
4. `SVG`图像支持缩放，且不会失去任何质量。
5. `SVG`是开放标准，是纯`XML`文件。

#### 渲染规则

`svg`里的元素渲染顺序、规则是后来居上，越后面渲染的元素越前。

##### 嵌套到HTML文件中的几种方式

- `XHTML`需要将类型声明为`application/xhtml+xml`，才能将`SVG`嵌入到`XML`中。

- `HTML5`可以直接嵌入`SVG`。但需要做一些语法调整。

  - 可以通过 `object` 元素引用`SVG`文件：

  - ```html
    <object data="image.svg" type="image/svg+xml" />
    ```

  - 类似的也可以使用 `iframe` 元素引用`SVG`文件：

  - ```html
    <iframe src="image.svg"></iframe>
    ```

  - 使用`img`标签引用`SVG`文件：

  - ```xml
    <img src="image.svg" style="display:block;width:200px;height:200px" />
    ```

  - 使用`embed`标签：

  - ```xml
    <embed src="image.svg" style="display:block;width:200px;height:200px" />
    ```

  - 使用`div`标签：

  - ```html
    <div style="display:block;width:200px;height:200px;background: url(./image.svg) no-repeat;background-size: 100%;" ></div>
    ```

  - 使用`picture`标签：

  - ```html
    <picture>
        <source srcset="image.svg"  type="image/svg+xml">
        <img src="image.svg" style="display:block;width:200px;height:200px">
    </picture>
    ```

#### svg文件类型

`svg`文件分为两种形式

- 普通`SVG`文件：包含`SVG`标准的文本文件，后缀名通常为`.svg`。
- 压缩版`SVG`文件：某种场景下的`SVG`文件可能很大，SVG标准是允许`gzip`压缩的，后缀名通常为`.svgz`（注意的是在`FireFox`不能再本地上加载`svgz`文件，除非知道处理发布内容的`web`服务器可以正确的处理`gzip`，否则要避免使用`gzip`压缩的`SVG`）

### SVG定位

在`SVG`元素使用的是坐标系统（网络系统），和`Canvas`类似。以页面的左上角为起标点，以`px`为单位，x轴的正方形是向右边的，而y轴正方向是向下边。

#### viewBox属性

`viewBox`是`svg`标签中的一个属性，它允许指定一个给定的一组图形伸展以适应特定的容器元素。

`viewBox`属性的值是一个包含`4`个参数的列表 `min-x`, `min-y`, `width` ,`height`， 以空格或者逗号分隔开， 在用户空间中指定一个矩形区域映射到给定的元素，不允许宽度和高度为负值,`0`则禁用元素的呈现。

例如，我用`SVG`画了一个半径`200px`圆形，在一个`400*400`的画布上的话这个圆形刚刚好占满了整个画布，这时候显示没有问题。

```html
<svg width="200" height="200">
    <circle cx="200" cy="200" r="200" fill="#999" stroke="none"></circle>
</svg>
```

但在实际开发中，页面的画布尺寸是根据实际业务来设定的，不一定是刚刚好。例如在宽高`200*200`的画布上那它将是这样子显示出来的

![image](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211026163100.png)



这样子肯定不是想看到的效果，可以修改下圆的大小，但是实际开发中可能是个复杂的`SVG`,`viewBox`属性就是来解决这个问题的。

这里的`viewBox`是一个`400*400`的正方形，此时它的单位不是`px`，是一个虚拟的单位。在`viewBox`里边放入了一个圆，这个圆的半径是200，但放入`viewBox`后它的单位不是`px`，而是变成了和`viewBox`的虚拟单位。这个虚拟单位代表的长度是会变动的。

![image](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211026163221.png)

这个虚拟单位是可以计算出来的，即`200px/400=0.5px`。所以`viewBox`内部的所有数值去乘`0.5px`才是真正的长度大小。

前面两个参数指的是对内部SVG做一个整体的位移，通常设置`0 0`

#### preserveAspectRatio属性

这个属性直接翻译过来是意思是：**保留纵横比**，它跟`viewBox`的关系特别密切，它表示是否强制进行统一缩放.，如果设置了`viewBox`属性，不声明这个`preserveAspectRatio`属性，`viewBox`也会给这个属性声明一个默认值为`xMidYMid meet`。

上面的例子，画布的宽高和`viewBox`的宽高比是一样`1:1`的。但实际开发中不可能一直跟画布保持一样的比例。此时就需要声明`preserveAspectRatio`属性了，该属性也是应用在`svg`标签上的。

先看看它第一个参数都有哪些属性可以设定：

- **none** 不会进行强制统一缩放，如果需要，会缩放指定元素的图形内容，使元素的边界完全匹配视图矩形。 (注意：如果第一个参数的值是 `none` ，则属性的第二个值将会被忽略。)
- **xMinYMin** - 强制统一缩放。 将`SVG`元素的`viewbox`属性的X的最小值与视图的X的最小值对齐。 将`SVG`元素的`viewbox`属性的Y的最小值与视图的Y的最小值对齐。
- **xMidYMin** - 强制统一缩放。 将`SVG`元素的`viewbox`属性的X的中点值与视图的X的中点值对齐。 将`SVG`元素的`viewbox`属性的Y的最小值与视图的Y的最小值对齐。
- **xMaxYMin** - 强制统一缩放。 将`SVG`元素的`viewbox`属性的X的最小值+元素的宽度与视图的X的最大值对齐。 将`SVG`元素的`viewbox`属性的Y的最小值与视图的Y的最小值对齐。
- **xMinYMid** - 强制统一缩放。 将`SVG`元素的`viewbox`属性的X的最小值与视图的X的最小值对齐。 将`SVG`元素的`viewbox`属性的Y的中点值与视图的Y的中点值对齐。
- **xMidYMid** (默认值) - 强制统一缩放。 将`SVG`元素的`viewbox`属性的X的中点值与视图的X的中点值对齐。 将`SVG`元素的`viewbox`属性的Y的中点值与视图的Y的中点值对齐。
- **xMaxYMid** - 强制统一缩放。 将`SVG`元素的`viewbox`属性的X的最小值+元素的宽度与视图的X的最大值对齐。 将`SVG`元素的`viewbox`属性的Y的中点值与视图的Y的中点值对齐。
- **xMinYMax** - 强制统一缩放。 将`SVG`元素的`viewbox`属性的X的最小值与视图的X的最小值对齐。 将SVG元素的`viewbox`属性的Y的最小值+元素的高度与视图的Y的最大值对齐。
- **xMidYMax** - 强制统一缩放。 将`SVG`元素的`viewbox`属性的X的中点值与视图的X的中点值对齐。 将`SVG`元素的`viewbox`属性的Y的最小值+元素的高度与视图的Y的最大值对齐。
- **xMaxYMax** - 强制统一缩放。 将`SVG`元素的`viewbox`属性的X的最小值+元素的宽度与视图的X的最大值对齐。 将`SVG`元素的`viewbox`属性的Y的最小值+元素的高度与视图的Y的最大值对齐。

第二个参数是可选的，如果填写第二个参数的时候，需要第一个参数后面使用空格符，将两个参数隔开。

- `meet`(默认值) - 图形将缩放到:

  - 宽高比将会被保留
  - 整个`SVG`的`viewbox`在视图范围内是可见的
  - 尽可能的放大`SVG`的`viewbox`，同时仍然满足其他的条件。

  在这种情况下，如果图形的宽高比和视图窗口不匹配，则某些视图将会超出`viewbox`范围（即`SVG`的`viewbox`视图将会比可视窗口小）。

- `slice`图形将缩放到:

  - 宽高比将会被保留
  - 整个视图窗口将覆盖`viewbox`
  - `SVG`的`viewbox`属性将会被尽可能的缩小，但是仍然符合其他标准。

  在这种情况下，如果`SVG`的`viewbox`宽高比与可视区域不匹配，则`viewbox`的某些区域将会延伸到视图窗口外部（即`SVG`的`viewbox`将会比可视窗口大）。

在了解这个属性和他的参数之后，修改上面的例子，让画布的比例成`1:2`，现在画布的高度已经发生了改变，圆垂直居中了

```html
<svg width="200" height="400" viewBox="0 0 400 400"></svg>
    <circle cx="200" cy="200" r="200" fill="#999" stroke="none"></circle>
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211026163929.png)

现在画布和`viewBox`的两者比例是不同的，可以看到的圆被居中了。此时要配置`preserveAspectRatio`属性，让元素顶对齐。也就是`xMinYMin`值。

```html
<svg width="200" height="400" viewBox="0 0 400 400" preserveAspectRatio="xMinYMin">
    <circle cx="200" cy="200" r="200" fill="#999" stroke="none"></circle>
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211026164052.png)

### 基本绘画

#### 矩形

以下代码代表绘制一个矩形，`rect`标签中的`x`、y属性分别指定了矩形左上角端点的横坐标和纵坐标，`width`、`height`属性分别指定矩形的宽度和高度。

```html
<rect x='0' y='0' width='100' height='100' fill='#999'></rect>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211026171235.png)

#### 圆形

以下代码代表绘制一个圆形，circle标签中的`cx`、`cy`、`r`属性分别为横坐标、纵坐标和半径。

```html
<circle cx='50' cy='50'r='50' fill='#999'></circle>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211026171253.png)

#### 椭圆

以下代码代表绘制一个椭圆，ellipse标签中的`cx`、`cy`、`rx`，`ry`属性分别为圆形横坐标、圆心纵坐标、横向半径、纵向半径。

```html
<line x1="0" y1="0" x2="100" y2="100" stroke="#999" stroke-width="1px"></line>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211026171316.png)

#### 直线

以下代码代表绘制一条直线，line标签中的`x1`，`y1`，`x2`，`y2`属性分别代表起点横坐标、起点纵坐标、终点横坐标、终点纵坐标。

```html
<line x1="0" y1="0" x2="100" y2="100" stroke="#999" stroke-width="1px"></line>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211026171343.png)

#### 多边形

以下代码代表绘制一个多边形，`points`属性指定了折线中每个点的坐标，横坐标和纵坐标之间使用逗号隔开，点与点之间使用空格隔开。

```html
<polyline points="0,0 10,10 30,10 30,30 50,30 50,50 70,50" fill="none" stroke="#999" stroke-width="1px"></polyline>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211026171404.png)

#### 折线

以下代码代表绘制一条折线，也上面多边形一样，`points`属性指定了折线中每个点的坐标，横坐标和纵坐标之间使用逗号隔开，点与点之间使用空格隔开。

```html
<polyline points="10,10 30,10 30,30 50,30 50,50 70,50" fill="none" stroke="#999" stroke-width="3px"></polyline>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211026171424.png)

#### 扩展属性用法

| 属性名称       | 备注                 |
| -------------- | -------------------- |
| stroke         | 设置描边             |
| stroke-width   | 设置描边的大小       |
| stroke-opacity | 设置描边透明度       |
| fill           | 设置填充的颜色       |
| fill-opacity   | 设置填充颜色的透明度 |

#### defs and use

在上面的例子，外面使用了`defs`标签包裹了`linearGradient`标签，那这个`defs`标签有什么作用呢？

`defs` 标签是 `definitions` 的缩写，它可对诸如渐变之类的特殊元素进行定义。

##### defs

它用于预定义一个元素使其能够在`SVG`图像中重复使用。在`defs`元素中定义的图形不会直接呈现。 你可以在你的视口的任意地方利用use标签呈现这些标签。

##### use

在`defs`标签中定义的图形不会直接显示在SVG图像上此时需要使用`use`元素来引入它们渲染到页面。

一个简单的使用例子：

```html
<svg width="300" height="300">
    <defs>
        <g id="copyme">
            <circle r="10" fill="#999" />
          </g>
    </defs>
    <use x="10" y="10" xlink:href="#copyme" />
    <use x="50" y="10" xlink:href="#copyme" />
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027160408.png)





#### g

`g`这个标签其实在前面的例子中有出现过，但是没有给大家详细去讲解它，现在来给大家讲讲这个`g`标签。

它用于图形的集合，利用`g`可以批量的给集合中的图形进行批量赋值。

```html
<g fill="#999">
    <circle cx="10" cy="10" width="30" height="30" r="10"></circle>
    <circle cx="40" cy="10" width="30" height="30" r="10"></circle>
</g>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027163000.png)

### 路径path

路径，它是`SVG`中最强大的图形，它可以绘制出线条, 曲线, 弧形等其他图形，例如贝塞尔曲线、二次曲线等曲线。

先看一个简单例子。

```html
<svg width="100" height="100" >
   <path d='M0 0 L100 100 L100 60 L40 0' fill='#999'></path>
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211026171625.png)

`d`属性包含路径所有路径点，最后起点和终点连接起来形成图形，同样可以使用上面说到的扩展属性。

`M`即是`Move to`命令，它接收两个参数。分别是将横坐标和纵坐标。将点移动到指定的位置。上面的例子是将起点移动至x100，`y0`的点。

`L`即是`Line to`命令，它接收两个参数。分别是将横坐标和纵坐标。L命令将会在当前位置和新位置（`L`前面画笔所在的点）之间画一条线段。

另外L命令还有简写的方法，用来绘制水平线和垂直线。`H`，绘制水平线。`V`，绘制垂直线。这两个命令都只带一个参数，标明在x轴或y轴移动到的位置，因为它们都只在坐标轴的一个方向上移动。

再画一个矩形看看。

```html
<path d='M0 0 H 100 V 100 H 0 V 0' fill='#999'></path>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211026171712.png)

以上代码，使用了L命令的简写方式，首先将画笔定在了`10`，`10`处，将画笔绘制到`x90`这个点上，再绘制到`y90`这个点上，再绘制到`x10`这个点上，最后使用`L`命令的常规写法把这个矩形补全。**此次记得补全，如果没有补全，图形会自动填充但填充形成的一边没有描边**

上面的例子还可以继续优化下，使用`Z`命令闭合路径，`Z`命令会从当前点画一条直线到路径的起点，尽管不总是需要闭合路径，但是它还是经常被放到路径的最后。另外，Z命令不用区分大小写。

```html
<path d='M0 0 H 100 V 100 H 0 Z' fill='#999'></path>
```

##### 命令

| 命令 | 说明                             |
| ---- | -------------------------------- |
| M    | move to                          |
| L    | line to                          |
| H    | horizontal line to               |
| V    | vertical line to                 |
| C    | curve to                         |
| S    | smooth curve to                  |
| Q    | quadratic Bézier curve           |
| T    | smooth quadratic Bézier curve to |
| A    | elliptical Arc                   |
| Z    | close path                       |

> **注意：**以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。



### 颜色和边框

#### fill

`fill`属性设置绘制图形中内部的颜色（默认为`black`），如果你不想填充色可以将`fill`值设置为`none`，`fill-opacity`属性设置填充颜色的透明度范围`0-1`：

```html
<rect x="0" y="0" width="100" height="100" fill="#999"></rect>
<rect x="0" y="0" width="100" height="100" fill="#999" fill-opacity="0.5"></rect>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027153727.png)

#### stroke

`stroke`属性设置绘制图形的线条元素，`stroke-width`属性设置线条元素的宽度,`stroke-opacity`属性设置边框颜色的透明度范围`0-1`

```html
<rect x="0" y="0" width="100" height="100" fill="#999" stroke="#000" stroke-width="10"></rect>
<rect x="0" y="0" width="100" height="100" fill="#999" stroke="#000" stroke-width="10" stroke-opacity="0.5" ></rect>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027154004.png)

`stroke-linecap`属性，设置边框终点的形状，参数分为：

- `butt`用直边结束线段，它是常规做法，线段边界`90`度垂直于描边的方向、贯穿它的终点。
- `square`的效果差不多，但是会稍微超出`实际路径`的范围，超出的大小由`stroke-width`控制。
- `round`表示边框的终点是圆角，圆角的半径也是由`stroke-width`控制的。

`stroke-linejoin`属性，用来控制两条描边线段之间，用什么方式连接，参数分为：

- `miter`是默认值，表示用方形画笔在连接处形成尖角
- `round`表示用圆角连接，实现平滑效果
- `bevel`连接处会形成一个斜接

```html
<svg width="400" height="400">
	<polyline points="10 10 60 50 110 10" fill="none" stroke-width="7" stroke="#999" stroke-linecap="butt"></polyline>
	<polyline points="130 10 180 50 230 10" fill="none" stroke-width="7" stroke="#999" stroke-linecap="square"></polyline>
	<polyline points="250 10 300 50 350 10" fill="none" stroke-width="7" stroke="#999" stroke-linecap="round"></polyline>
	<polyline points="10 70 60 110 110 70" fill="none" stroke-width="7" stroke="#999" stroke-linejoin="miter"></polyline>
	<polyline points="130 70 180 110 230 70" fill="none" stroke-width="7" stroke="#999" stroke-linejoin="round"></polyline>
	<polyline points="250 70 300 110 350 70" fill="none" stroke-width="7" stroke="#999" stroke-linejoin="bevel"></polyline>
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027154442.png)

除了在标签中定义属性之外，也可以使用`CSS`来给绘制的图形进行填充和描边操作。语法和在`html`中使用`css`一样，稍微有不同之处是属性名要做一些改改，见下表

| CSS属性          | SVG属性 | 说明            |
| ---------------- | ------- | --------------- |
| background-color | fill    | 填充 / 背景颜色 |
| border           | stroke  | 描边线条颜色    |

> 图形标签内的`width`、`height`以及路径的命令是**不能使用`css`设置的**，需要写在标签内

看下使用`CSS`的例子：

```css
.zrect{
    stroke: black;
    fill: #999;
}
<rect x="0" y="0" width="100" height="100" class="zrect"></rect>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211026171712.png)

#### stroke-dasharray

该属性用于控制描边的点划线的长度，你需要传入一个参数，这个参数可以是一个数，也可以是一个数列，看下面这个例子。

```html
<line x1="0" x2="50" y1="10" y2="10" stroke-width=".5" stroke="red" stroke-dasharray="5"></line>
<line x1="0" x2="50" y1="20" y2="20" stroke-width=".5" stroke="red" stroke-dasharray="10"></line>
<line x1="0" x2="50" y1="30" y2="30" stroke-width=".5" stroke="red" stroke-dasharray="5,10"></line>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027170625.png)

图中，每条竖线的间隔是`10px`，线长是`60px`。先看第一条线条，这个的`stroke-dasharray`值是`5`，指线条每`5px`的实线长度就会有`5px`的间隔距离。同理，第二条线条，则每`10px`的实线长度就会有`10px`的距离。

第三条线条，这里是`stroke-dasharray`传入的是两个参数，使用空格隔开（也可以使用逗号隔开参数），第一个参数指的是实线的长度，第二个参数是间隔的距离。如图看到红线每5px的长度就会有`10px`的间隔距离。

第四条线条传入的是三个参数，前两个参数和上面一样，第三个参数是实线的长度，可以理解成奇数为实线长度，而偶数为间隔距离。

第五条线条传入的是四个参数，但参数是相同的，等价于 `5 10`。

#### stroke-dashoffset

该属性用于起点的偏移，正数为x值向左偏移，负数为x值向右偏移，传入一个参数，用于设置偏移值。

该属性需要搭配上面的`stroke-dasharray`属性使用，否则无法看出偏移效果。

看下面这个例子：

```html
<line x1="10" x2="90" y1="10" y2="10" stroke-width=".5" stroke="#999" stroke-dasharray="20";></line>
<line x1="10" x2="90" y1="20" y2="20" stroke-width=".5" stroke="#999" stroke-dasharray="20"; stroke-dashoffset="-10"></line>
<line x1="10" x2="90" y1="30" y2="30" stroke-width=".5" stroke="#999" stroke-dasharray="20"; stroke-dashoffset="10"></line>
复制代码
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027170848.png)

第一条线条没有设置`stroke-dashoffset`，默认为`0`。

第二条线条`stroke-dashoffset`值设置为`-10`，即线条起始点向右偏移`10px`。

第三条线条`stroke-dashoffset`值设置为`10`，即线条起始点向左偏移`10px`。



#### 线性渐变

> 在SVG中不能使用linear-gradient函数，这是无效代码！！！

线性渐变是沿着直线改变颜色

```html
<svg width="300" height="300">
    <defs>
        <linearGradient id="test">
            <stop offset="5%" stop-color="#12c2e9" />
            <stop offset="85%" stop-color="#c471ed" />
        </linearGradient>
    </defs>
    <rect fill="url(#test)" x="10" y="10" width="200" height="100"></rect>
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027155645.png)

在画布中创建一个`defs`元素（稍后会讲到），在内部创建一个`linearGradient`标签（该标签用于定义线性渐变，应用于图形元素的填充、描边）。内部放了两个stop标签，这两个标签通过指定的位置`offset`属性和`stop-color`属性来说明在渐变的特定位置上渲染指定的颜色。

这里要注意的是`offset`值是从`0`开始的，范围为`0%—100%`（或者是`0—1`），如果出现位置重合，将采用后面设置的值。

`stop`标签一共有三个属性，上面已经展示了`stop`标签的两个属性，还有一个`stop-opacity`属性，用于设置某个位置的透明度。

```html
<stop offset="85%" stop-color="gold" stop-opacity="0"/>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027155714.png)

使用渐变需要在图形标签上使用`stroke` 、`fill`进行引用，使用`url`引用元素的方式将渐变的ID值传入即可。（`stroke`也是同样操作）

`linearGradient`标签中你还可以定义渐变的开始和结束位置。它们分别是`x1`、`x2`、`y1`、`y2`。默认是水平渐变的，可以通过修改这些属性来改变渐变的方向，下面看看垂直渐变的例子：

```html
<svg width="300" height="300">
    <defs>
        <linearGradient id="test1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="5%" stop-color="#12c2e9" />
            <stop offset="85%" stop-color="#c471ed" />
        </linearGradient>
    </defs>
    <rect fill="url(#test1)" x="10" y="10" width="200" height="100"></rect>
</svg>
```

![image-20211027155926638](/Users/xiao/Library/Application Support/typora-user-images/image-20211027155926638.png)

- 当 `y1` 和 `y2` 相等，而 x1 和 `x2` 不同时，可创建水平渐变
- 当 `x1` 和`x2` 相等，而 y1 和 `y2` 不同时，可创建垂直渐变
- 当 `x1` 和 `x2` 不同，且 y1 和 `y2` 不同时，可创建角形渐变

#### 径向渐变

与线性渐变的用法类似，只不过是它是从一个点开始发散绘制渐变。看看一个径向渐变的例子：

```html
<svg width="300" height="300">
    <defs>
        <radialGradient  id="test3">
            <stop offset="5%" stop-color="#c471ed" />
            <stop offset="55%" stop-color="#12c2e9" />
        </radialGradient >
    </defs>
    <rect fill="url(#test3)" x="10" y="10" width="100" height="100"></rect>
</svg>
```

![image-20211027160131083](/Users/xiao/Library/Application Support/typora-user-images/image-20211027160131083.png)

`stop`用法和线性渐变的用法是一样的，深蓝色现在正在向边缘的方向渐渐的变成灰白色。在线性渐变中可以控制渐变的方向。同样，径向渐变中也可以控制渐变的中心点位置。它的属性有`cx`、`cy`、r、`fx`、`fy`，分别代表的是圆形中心点位置，半径、渐变边缘的位置（范围`0—1`）。

```html
<svg width="300" height="300">
    <defs>
        <radialGradient  id="test4" cx="0" cy="0" r="0.5" fy="0.25" fx="0.25">
            <stop offset="0%" stop-color="#c471ed" />
            <stop offset="100%" stop-color="#12c2e9" />
        </radialGradient >
    </defs>
    <rect fill="url(#test4)" x="10" y="10" width="100" height="100"></rect>
</svg>
```

![image-20211027160247232](/Users/xiao/Library/Application Support/typora-user-images/image-20211027160247232.png)



### 图案

在`SVG`中，图形对象一般使用`fill` 、`stroke`进行填充。`SVG`可以自定义一个图形作为填充的背景，这个图形可以是一个`SVG`元素，也可以是位图图像，下面结合实例来讲解如何去使用。

`pattern`标签用于定义一个填充对象，可以将定义的这个对象到指定图形中进行重复、平铺、覆盖填充。之后使用自身的属性`fill` / `stroke`来引用自定义的填充对象`pattern`。

它和渐变一样，需要被放置到`defs`标签中。

先看下这个简单例子：

```html
<svg width="200" height="200">
    <defs>
        <pattern id="bg_red_circle" width="100%" height="100%">
            <circle cx="25" cy="25" r="20" stroke="red" fill="none" fill-opacity="0.5"/>
        </pattern>
    </defs>
    <rect width="50" height="50" x="10" y="10" stroke="blue" fill="url(#bg_red_circle)"></rect>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027160800.png)

使用`pattern`定义了一个自定义图案，在`pattern`标签中放置你想要的图形，这里放的是一个红色无填充的圆形。给`pattern`标签需要绑定一个`ID`值，用于在其他元素上引用这个自定义图案进行填充。

这里是`width`和`height`是定义这个`pattern`是否占满被应用的图形，`100%（ or 1 ）`即是占满整个元素。如果不是占满，则是重复平铺在被应用的图形上。如果你想要在绘制时偏移矩形的开始点，也可以使用`x`和`y`属性

在`pattern`中，它也有自己的定位系统以及它们的大小。和`SVG`类似。

上面的例子的背景，被填充的图形比例都是`1:1`，再看看另外一个例子：

```html
 <svg width="300" height="300">
        <defs>
          <pattern id="bg_red_circle" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="10" stroke="#999" fill="none"></circle>
          </pattern>
        </defs>
        <rect width="200" height="200" stroke="blue" fill="url(#bg_red_circle)"></rect>
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027161124.png)

与上个例子不同的是，这个例子设置了自定义图形的`width`和`height`（这与`patternUnits`有关系），被填充的图形大小则是`200*200`，当画布还有多余的位置则会平铺填充。

这个例子还多了一个`patternUnits`属性，  用来定义图案效果区域的单位。他有两个值分别是`userSpaceOnUse`和`objectBoundingBox`。他的默认值是`objectBoundingBox`。

- **objectBoundingBox**：`x`、`y`、`width`和`height`表示的值都是外框的坐标系统（包裹`pattern`的元素）。也就是说，图案的单位进行了一个缩放，比如：pattern中为`1`的值，会变成和包裹元素的外框的`width`和`height`一样的大小。（使用这个值时，width和height需要小于`1.0`，否则图案只会出现一次）
- **userSpaceOnUse**：`x`、`y`、`width`和`height`表示的值都是当前用户坐标系统的值。也就是说，这些值没有缩放，都是绝对值。

在上面例子中，圆是完美的铺满了整个矩形。可以设置`x`和`y`值，看看有什么变化？

```html
<svg width="300" height="300">
        <defs>
          <pattern id="bg_red_circle" x="10" y="10" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="10" stroke="#999" fill="none"></circle>
          </pattern>
        </defs>
        <rect width="200" height="200" stroke="blue" fill="url(#bg_red_circle)"></rect>
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027161225.png)

从矩形的四边，可以发现整个图形背景进行了偏移，也就是说`x`和`y`属性是修改整个图形的位置。

同样，也可以将这个图案应用到描边中

```html
<svg width="300" height="300">
        <defs>
          <pattern id="bg_red_circle1" x="10" y="10" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="10" stroke="#999" fill="none" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="none" stroke-width="20" stroke="url(#bg_red_circle1)"></rect>
      </svg>
```

![image-20211027161333319](/Users/xiao/Library/Application Support/typora-user-images/image-20211027161333319.png)

| 属性                | 说明                       |
| ------------------- | -------------------------- |
| x                   | 自定义图案`x`轴坐标        |
| y                   | 自定义图案`y`轴坐标        |
| width               | 自定义图案的宽度           |
| height              | 自定义图案的宽度           |
| preserveAspectRatio | 以保留原始内容的宽高比     |
| xlink:href          | 用于指另一种模式           |
| patternUnits        | 用来定义图案效果区域的单位 |
| patternContentUnits | 用来定义模式内容区域的单位 |

### 文字

在SVG中有两种截然不同的文本模式. 一种是写在图像中的文本，另一种是SVG字体。关于后者将在教程的后面进行讲解，现在主要集中前者：写在图像中的文本。

#### text

text标签用于在画布中，放置任何的文字。

```html
<svg width="100" height="100"><text x="10" y="20">Hello word</text></svg>
```

文字的内容写在text标签体中，x和y分别代表文本在画布中显示的位置。

![image-20211027161759467](/Users/xiao/Library/Application Support/typora-user-images/image-20211027161759467.png)

##### text-anchor

该属性用于设置文本从坐标点中的文本流方向，值分别是start、end、middle、inherit。从下面图中可以看到四种值的不同。

```html
<svg width="100" height="200">
  <text x="40" y="20" text-anchor="start">Hello</text>
  <text x="40" y="50" text-anchor="end">Hello</text>
  <text x="40" y="80" text-anchor="middle">Hello</text>
  <text x="40" y="110" text-anchor="inherit">Hello</text>
  <line x1="40" x2="40" y1="0" y2="135" stroke="#999" stroke-opacity="0.5"></line>
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027162103.png)

##### fill

和其他图形一样，text也可以使用fill属性对主题进行颜色填充。也用引用渐变、图案进行填充。

```html
<svg width="200" height="200">
  <defs>
    <linearGradient id="fillTest">
      <stop offset="5%" stop-color="#fc5c7d" />
      <stop offset="85%" stop-color="#6a82fb" />
    </linearGradient>
  </defs>
  <text x="40" y="20" fill="red">Hello</text>
  <text x="40" y="40" fill="green">Hello</text>
  <text x="40" y="60" fill="#ee2">Hello</text>
  <text x="40" y="80" fill="rgb(255,0,0)">Hello</text>
  <text x="40" y="100" fill="url(#fillTest)">Hello</text>
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027162226.png)

##### stroke

同样，也可以给字体设置描边。

```html
<defs>
    <linearGradient id="strTest">
        <stop offset="5%" stop-color="#00f260" />
        <stop offset="85%" stop-color="#0575e6" />
    </linearGradient>
</defs>
<text x="40" y="20" stroke="red">Hello</text>
<text x="40" y="40" stroke="green">Hello</text>
<text x="40" y="60" stroke="#ee2">Hello</text>
<text x="40" y="80" stroke="rgb(255,0,0)">Hello</text>
<text x="40" y="100" stroke="url(#strTest)">Hello</text>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027162305.png)

##### tspan

该元素用来标记大块文本的子部分，它必须是一个`text`元素或别的`tspan`元素的子元素。一个典型的用法是把句子中的一个词变成粗体，突出重点。

```html
<svg width="200" height="200">
  <text x="10" y="20">
    坐标：
    <tspan font-weight="bold">广州</tspan>
  </text>
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027162342.png)

`tspan`标签还有以下几种属性：

| 属性 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| x    | 为容器设置一个新绝对`x`坐标。它覆盖了默认的当前的文本位置。这个属性可以包含一个数列，它们将一个一个地应用到`tspan`元素内的每一个字符上。 |
| y    | 为容器设置一个新绝对`y`坐标。它覆盖了默认的当前的文本位置。这个属性可以包含一个数列，它们将一个一个地应用到`tspan`元素内的每一个字符上。 |
| dx   | 从当前位置，用一个水平偏移开始绘制文本。这里，你可以提供一个值数列，可以应用到连续的字体，因此每次累积一个偏移。 |
| dy   | 从当前位置，用一个垂直偏移开始绘制文本。这里，你可以提供一个值数列，可以应用到连续的字体，因此每次累积一个偏移。 |

```html
<text x="10" y="20">
    坐标：
    <tspan x="10" y="20" font-weight="bold">
        广州
    </tspan>
</text>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027162425.png)

| 属性   | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| rotate | 把所有的字符旋转一个角度。如果是一个数列，则使每个字符旋转分别旋转到那个值，剩下的字符根据最后一个值旋转。 |

```html
<text x="10" y="20">
    <tspan rotate="18">
        hello world
    </tspan>
</text>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027162518.png)

| 属性       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| textLength | 这是一个很模糊的属性，给出字符串的计算长度。它意味着如果它自己的度量文字和长度不满足这个提供的值，则允许渲染引擎精细调整字型的位置。 |

```html
<text x="10" y="20">
    <tspan x="10" y="20" textLength="80">
        hello world
    </tspan>
    <tspan x="10" y="40" textLength="110">
        hello world
    </tspan>
    <tspan x="10" y="60" textLength="140">
        hello world
    </tspan>
</text>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027162538.png)

##### 其他字体相关属性

下面这些属性可以在`text`标签中直接设置成一个属性，或是在`CSS`中声明。

| 属性             | 说明                                         |
| ---------------- | -------------------------------------------- |
| font-family      | 设置文本的字体系列                           |
| font-style       | 设置斜体文字的字体样式属性                   |
| font-weight      | 设置字体的粗细                               |
| font-variant     | 在小型大写字母和普通文本选项之间切换         |
| font-stretch     | 在给定字体的可选拉伸版本中切换               |
| font-size        | 设置文本的大小                               |
| font-size-adjust | 独立于字体的实际大小尺寸，调整其可视大小尺寸 |
| kerning          | 开启或关闭字体间距选项                       |
| letter-spacing   | 设置你的文本中的字母与字母之间的间距         |
| word-spacing     | 设置你的文本中的单词与单词之间的间距         |
| text-decoration  | 设置/取消字体上的文本装饰                    |

### Transform

#### 图形平移

`translate`函数用于元素的水平、垂直的移动。该函数需要传入`1-2`个参数，分别`x`，x和`y`。如果你只需要进行水平移动时可以使用单参数形式，第二个值默认为`0`。

```html
<circle cx="30" cy="30" r="15" fill="#999" />
<circle cx="30" cy="30" r="15" fill="#999" transform="translate(40)" />
<circle cx="30" cy="30" r="15" fill="#999" transform="translate(40,40)" />
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027163233.png)

#### 图形旋转

`rotate`函数用于旋转一个元素，需要传入一个旋转角度，正角度表示了顺时针的旋转，负角度表示逆时针的旋转。

```html
<rect x="60" y="0" width="40" height="40" fill="red" transform="rotate(45)" />
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027163321.png)

需要注意的是这里不是按照图形的中心点进行旋转，如果你的需求的按图形的中心点进行旋转可以使用CSS来实现，加入以下内联代码即可实现。（可以通过`transform-origin`属性定义中心点）

```css
style="transform-box:fill-box;transform-origin:center;"
```

#### 斜切

`skewX`、`skewY`函数用于转换，将图形倾斜到二维的平面上。它需要传入一个角度用于扭曲图形

```html
<rect x="10" y="0" width="40" height="40" fill="none" stroke="#999" />
<rect x="60" y="0" width="40" height="40" fill="none" stroke="#999" transform="skewX(40)" />
<rect x="50" y="0" width="40" height="40" fill="none" stroke="#999" transform="skewY(50)" />
```

![image-20211027163431068](/Users/xiao/Library/Application Support/typora-user-images/image-20211027163431068.png)

#### 缩放

`scale`函数用于缩放一个图形，它需要传入一个缩放的值作为比例来缩放。

```html
<circle cx="30" cy="30" r="15" fill="none" stroke="#999" transform="scale(0.5)" />
<circle cx="30" cy="30" r="15" fill="none" stroke="pink" transform="scale(1)" />
<circle cx="30" cy="30" r="15" fill="none" stroke="skyblue" transform="scale(1.5)" />
<circle cx="100" cy="30" r="15" fill="none" stroke="#999" transform="scale(0.5)"
        style="transform-box: fill-box; transform-origin: center" />
<circle cx="100" cy="30" r="15" fill="none" stroke="pink" transform="scale(1)"
        style="transform-box: fill-box; transform-origin: center" />
<circle cx="100" cy="30" r="15" fill="none" stroke="skyblue" transform="scale(1.5)"
        style="transform-box: fill-box; transform-origin: center" />
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027163553.png)

与上面的`rotate`一样，如果你想要按照图形的中心点进行旋转，需要与`CSS`一起使用。

### 裁剪、遮罩

`SVG`支持多种遮罩效果，使用这些特性，你可以在你的项目中生产出很多很酷炫的效果。分为剪切路径和遮罩,让一起来看看吧 👇👇👇

- 剪切路径`cliping path`
  - 在剪切路径内图形是可见的，在剪切路径之外的图形是不可见的。
- 遮罩`mask`
  - 遮罩是一种容器，它一定了一组图形并将它们作为半透明的媒介，可以用来组合前景对象和背景。
- 裁剪路径和其他的蒙板一个重要的区别就是：裁剪路径是1位蒙板，也就是说裁剪路径覆盖的对象要么就是全透明（可见的，位于裁剪路径内部），要么就是全不透明（不可见，位于裁剪路径外部）。而蒙板可以指定不同位置的透明度。

#### 剪切

剪切路径使用`clipPath`标签定义，后使用`clip-path`属性引用，它用于限制一个图形的显示。当图形超出`clipPath`规定的范围，那么超出的范围将不会绘制出来。这个图形可以是使用简单的图形绘画、`path`、`text`等图形绘制标签

下面是一个`clipPath`标签使用的例子：

```html
<svg width="200" height="200">
  <defs>
    <clipPath id="cTest">
      <rect x="10" y="10" width="100" height="50" />
    </clipPath>
  </defs>
  <rect x="10" y="10" width="100" height="100" fill="#999" clip-path="url(#cTest)"></rect>
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027164427.png)

这个例子，将一个`100*100`的正方形遮挡了一半，因为使用了`clipPath`限制了它的绘制范围。它甚至还可以用于`text`标签，把上面例子的代码改改。

```html
 <svg width="200" height="200">
   <defs>
     <clipPath id="cTest1">
       <text x="10" y="20" font-size="10">用文本定范围</text>
     </clipPath>
   </defs>
   <g clip-path="url(#cTest1)">
     <rect x="10" y="10" width="50" height="50" fill="red" />
     <rect x="45" y="10" width="50" height="50" fill="green" />
   </g>
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027164513.png)

`clipPath`标签还有一个`clipPathUnits`属性，用于定义用于元素内容的坐标系。

- **userSpaceOnUse**（默认值）：`x`、`y`、`width`和`height`表示的值都是当前用户坐标系统的值。也就是说，这些值没有缩放，都是绝对值。
- **objectBoundingBox**：`x`、`y`、`width`和`height`表示的值都是当前剪切路径的图形的用户坐标系和包围图形比例值。

#### 遮罩

遮罩的效果最令人印象深刻的是表现为一个渐变。如果你想要让一个元素淡出，你可以利用遮罩效果实现这一点。

简单对比下剪切路径和遮罩的区别：

```html
 <svg width="200" height="200">
   <defs>
     <linearGradient id="Gradient">
       <stop offset="0" stop-color="white" stop-opacity="0" />
       <stop offset="1" stop-color="white" stop-opacity="1" />
     </linearGradient>
     <clipPath id="cp">
       <rect x="60" y="0" width="35" height="35" />
     </clipPath>
     <mask id="Mask">
       <rect x="0" y="0" width="50" height="50" fill="url(#Gradient)" />
     </mask>
   </defs>
   <image xlink:href="https://photo.16pic.com/00/53/26/16pic_5326745_b.jpg" x="0" y="0" height="50px"
          width="50px" mask="url(#Mask)" />
   <image xlink:href="https://photo.16pic.com/00/53/26/16pic_5326745_b.jpg" x="60" y="0" height="50px"
          width="50px" clip-path="url(#cp)" />
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027164848.png)

以上例子中，将定义了一个简单的渐变效果，并绘制了一个矩形引用了它。最后用`mask`标签包裹了这个矩形。所以实现了图片与白色之间的渐变效果。遮罩与剪切路径类似，只不过是半透明的。遮罩通常用于将两个不同的对象进行组合显示，而剪切路径用于剪切图形。

`mask`还可以设置以下属性

- **maskUnits**： 定义`mask`标签中的坐标系统，引用该遮罩的图形的坐标系
- **maskContentUnits **： 定义`mask`标签中子元素的坐标系统
- `x` / `y` 该属性分别设置图形的 `x` / `y` 轴坐标，在`mask`元素中 `x` / `y` 默认值为`-10%`
- `width` / `height` 该属性在用户坐标系统中标识了一个水平 / 垂直长度，在`mask`元素中`x`默认值为`120%`

在某些情况下，一些基本的 `SVG` 图形并不能提供某种想要达到的效果。比如常见的阴影效果，模糊效果等，滤镜（`filter`）就是`SVG`中用于解决创建复杂效果的难题的。

### 滤镜 filter

`SVG`过滤器在应用过滤效果的时候需要一个输入源。这个输入源可以是一个图形，或图形的`alpha`通道，或另一个过滤器的输出值。

`SVG`过滤器可以从输入源中产生一个输出图像。一个过滤器的输出可以是另一个过滤器的输入，这样，过滤器可以被链接起来使用。

下面是一张`SVG`过滤器输入和输出的说明图片：

![54.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f76a734541e348e8ab3a25581a565044~tplv-k3u1fbpfcp-watermark.awebp)

滤镜与和之前定义渐变效果类似，它需要在`def`标签中定义，然后再通过它的`ID`值引用到图形元素中。

#### 模糊效果

来看个简单的例子：

```html
<svg width="200" height="200">
    <defs>
        <filter id="blurFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4"/>
        </filter>
    </defs>
    <rect filter="url(#blurFilter)" x="10" y="10" width="50" height="50" fill="#999"></rect>
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027165455.png)

上面例子中，使用了`feGaussianBlur` 滤镜，也就是模糊滤镜。在该滤镜中给定了两个属性分别是`in`和`stdDeviation`，in属性代表给定过滤器原语的输入，`stdDeviation` 属性设定了模糊的程度。

#### 多个滤镜搭配工作

`SVG`中的滤镜还支持多个滤镜混合使用，你可能见过一个`filter`标签内里有大量代码，这对新手来说可能就很懵了

接下来，看看一个简单的多滤镜使用的例子：

```html
 <svg width="200" height="200">
   <defs>
     <filter id="blurFilter">
       <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
       <feOffset in="blur" dx="10" dy="12" result="offsetBlur" />
       <feMerge>
         <feMergeNode in="offsetBlur" />
         <feMergeNode in="SourceGraphic" />
       </feMerge>
     </filter>
   </defs>
   <image xlink:href="https://photo.16pic.com/00/53/26/16pic_5326745_b.jpg" x="10" y="0" height="50px" width="50px" filter="url(#blurFilter)"></image>
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027165623.png)

在这个例子中，使用了两种路径，分别是`feGaussianBlur`和`feOffset`，分别带有模糊和阴影效果。在`feGaussianBlur`多了一个result属性，这个是SVG的一个特征，不同滤镜作用的效果可以通过 `result` 产出一个中间结果（`primitives`），其他滤镜可以使用in导入不同滤镜中导出的result。之后，使用`feOffset`滤镜用于创建阴影效果，使用`in`拿到上面`result`导出的内容，再做出位移操作。

`feMerge`滤镜登场，用于将同时应用滤镜效果（不是按顺序显示效果），它里边需要写入`feMergeNode` 标签，使用`in`属性将不同滤镜导出的效果进行输入。

#### 关于滤镜通用属性

| 属性          | 说明                           |
| ------------- | ------------------------------ |
| x、y          | 设置滤镜坐标系（默认值0）      |
| width、height | 滤镜容器大小（默认值100%）     |
| result        | 导出滤镜效果，便于其他滤镜使用 |
| in            | 指定滤镜的输入源               |

### 图像

`SVG`可以自定义引入图像文件（`JPGE`、`PNG`），也可以使用JavaScript进行操作SVG。让的SVG更加丰富。

#### image

image标签用于在`SVG`画布中插入图像文件，下面是一个在画布中插入图片的实例。

```html
<svg width="200" height="200">
  <image xlink:href="https://photo.16pic.com/00/53/26/16pic_5326745_b.jpg" x="0" y="0" height="50px" width="50px"></image>
</svg>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/20211027165953.png)

这个标签与`HTML`中的`img`标签一样，是引入图像文件，但是引入的方式不同，`img`是使用`src`属性来引入图像文件，而`image`标签需要通过`xlink:href`链接引入图像文件。在`image`你还需要指定一些属性，用于控制`image`标签。

| 属性                | 说明                                 |
| ------------------- | ------------------------------------ |
| x、y                | 设定图像标签在坐标系统的坐标点       |
| width、height       | 设定图像标签宽度 / 高度              |
| xlink:href          | 引用图像文件                         |
| preserveAspectRatio | 设置图像比例（具体使用可参考第二章） |

#### javascript操作SVG

如果 `SVG` 代码直接写在 `HTML` 网页之中，它就成为网页 `DOM` 的一部分，可以直接用 `DOM` 操作。

看看这个例子：

```html
<svg width="200" height="200">
  <rect id="myRect" x="10" y="10" width="50" height="50" fill="#999"></rect>
</svg>
<script>
  const myRectDom = document.getElementById("myRect");
  myRectDom.addEventListener(
    "click",
    (e) => {
      myRectDom.setAttribute("width", 80);
      myRectDom.setAttribute("height", 80);
    },
    false
  );
</script>
<style>
  #myRect {
    transition: all 1s;
  }
</style>
```

![](https://raw.githubusercontent.com/ShmilyXI/Gallerys/master/BokeImage/images/iShot2021-10-27%2017.03.47.mov)

上面例子中，当点击矩形时，矩形的宽高从`50*50`过渡到`80*80`的的效果。

先是在`rect`标签中绑定一个ID值，在JavaScript中获取这个标签（`DOM`）。给`rect`标签绑定一个点击事件，让`rect`标签被点击时，使用`setAttribute`属性将宽高设置为`80`。为了有一个过渡效果，我给这个`rect`添加了动画，也就是`transition: all 1s;`这行代码。



### 动画

现在，web页面中动画的实现方式有很多，例如原生的`CSS3`动画、`JavaScript`动画...等多种方法实现，甚至是直接使用`animate`、`anime`、`magic`等这些开源的类库来实现。

学过的很多种图形绘制都可以实现动画效果，`transform`、路径变化、描边等这些都是可以实现动画效果的。

#### 一些SVG动画库

- GSAP
- Snap.svg
- SVG.js
- anime.js
- Velocity.js
- D3

在学习动画之前，先学习两个属性，这与后面要实现的动画有一定的关系。它们分别是`stroke-dasharray`和`stroke-dashoffset`，从属性名称来看，它们都是与`stroke`（描边）有关的。