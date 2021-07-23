import React, { useState, useEffect, useRef, useCallback } from "react";
import "./virtualscroll.css";

/* 
  虚拟滚动
*/

const TOTAL_ITEMS = 100000; // 生成的虚拟元素数量
const ITEM_HEIGHT = 20; // 生成的单个元素高度

const Solipsis = ({ children, items, itemHeight, visible: { from, to }, onVisibilityChange }) => {
  const container = useRef();

  const handelOnScroll = useCallback(() => {
    const { clientHeight: height, scrollTop } = container.current;
    // 获取当前视图内存在的元素数量
    const _items = Math.ceil(height / itemHeight);
    // 内容区域上方的元素(已滚动元素)
    const _from = Math.floor(scrollTop / itemHeight);
    // 内容区下方的元素
    const _to = Math.min(_from + _items + 1, items);
    // 当内容区上方的元素与下方的元素 与原来的不一致时,说明内容被滚动了,
    if (_from !== from || _to !== to) {
      onVisibilityChange({ from: _from, to: _to });
    }
  }, [container.current, itemHeight, from, to, items]);

  useEffect(handelOnScroll, []); // 初始化触发一次滚动函数

  return (
    <div className="solipsis" ref={container} onScroll={handelOnScroll}>
      {/* 内容区上方空白区域 用来撑起滚动区 */}
      <div style={{ height: from * itemHeight }} />
      {[...new Array(to - from)].map((_, i) => React.cloneElement(React.Children.only(children), { key: i + from, index: i + from }))}
      {/* 内容区下方空白区域 用来撑起滚动区 */}
      <div style={{ height: (items - to) * itemHeight }} />
    </div>
  );
};

const Item = ({ index }) => {
  return (
    <div className="item" style={{ height: ITEM_HEIGHT }}>
      <b>{index}</b>, test文案
    </div>
  );
};

const ItemCount = ({ visible: { from, to } }) => (
  <div>
    <h1>
      FROM: {from + 1}, TO: {to + 1}
    </h1>
  </div>
);

const VirtualScroll = () => {
  const [visible, setVisible] = useState({ from: 0, to: 0 });
  const options = {
    wrapWidth: "250px",
    wrapHeight: "500px",
  };
  const { wrapHeight, wrapWidth } = options;
  return (
    <div className="virtual-scroll" style={{ height: wrapHeight, width: wrapWidth }}>
      <ItemCount visible={visible} />
      <Solipsis items={TOTAL_ITEMS} itemHeight={ITEM_HEIGHT} visible={visible} onVisibilityChange={setVisible}>
        <Item />
      </Solipsis>
    </div>
  );
};
export default VirtualScroll;
