import React, { useState, useEffect } from "react";
import { Tree, Input, Button, message, Tooltip, Modal, Popconfirm } from "antd";
import { CloseOutlined, CheckOutlined, EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Services from "@/services";
import { ProcessingRecursion } from "@/common/utils";

import "./index.styl";

const { TreeNode } = Tree;
const { Search } = Input;

const getDataList = (treeData) => {
  const dataList = [];
  const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      dataList.push({ key: node.id, deptName: node.deptName });
      if (node?.children) {
        generateList(node?.children);
      }
    }
    return dataList;
  };
  return generateList(treeData);
};

const getDataId = (treeData) => {
  const dataList = [...treeData];
  const generateList = (data, pid) => {
    for (let i = 0; i < data.length; i++) {
      const id = `-${i}`;
      if (!data[i].treeId) {
        data[i].treeId = `0${id}`;
      }
      if (pid) {
        data[i].treeId = `${pid}${id}`;
        data[i].pid = pid
      }

      if (data?.[i]?.children) {
        generateList(data?.[i]?.children, data[i].treeId);
      }
    }
    return data;
  };
  return generateList(dataList);
};

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node?.children) {
      if (node?.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node?.children)) {
        parentKey = getParentKey(key, node?.children);
      }
    }
  }
  return parentKey;
};

function EditSearchTree(props) {
  const [expandedKeys, setExpandedKeys] = useState([]); // 展开的key
  const [searchValue, setSearchValue] = useState(""); // 搜索值
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [editValues, setEditValues] = useState({}); // 正在编辑的数据值
  const [editKey, setEditKey] = useState(null); // 正在编辑的数据
  const { onLoad, onTransform, style, tenantId, ...restProps } = props;

  useEffect(() => {
    handleExpand([]);
  }, []);

  useEffect(() => {
    if (tenantId) {
      getTenantDeptTree();
    }
  }, [props.tenantId]);

  const getTenantDeptTree = async () => {
    const DATA = await Services.getTenantDeptTree({ tenantId });
    if (DATA && Array.isArray(DATA)) {
      console.log("DATA", DATA);

      setTreeData(getDataId(DATA));
      setDataList(getDataList(getDataId(DATA)));
    }
  };

  const findNode = (id, data) => {
    if (data?.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          return data[i];
        } else if (data[i]?.children && data[i]?.children?.length > 0) {
          for (let j = 0; j < data[i]?.children?.length; j++) {
            const child = data[i]?.children?.[j];
            if (child.id === id) {
              return child;
            } else {
              if (child?.children && child?.children?.length) {
                const node = findNode(id, child?.children);
                if (node) {
                  return node;
                }
              }
            }
          }
        }
      }
    }
  };

  // 输入框值变化
  const onInputChange = (val, item) => {
    setEditValues({ ...editValues, [item.id]: val });
  };

  // 关闭编辑树节点
  const onCloseTreeNode = (item) => {
    const _treeData = [...treeData];
    const ele = findNode(item.id, _treeData);
    // 如果为新增的元素取消编辑  则直接删掉
    if (ele?.parentDeptId === editKey) {
      const parentEle = findNode(editKey, _treeData);
      parentEle.children.pop();
      setEditKey(null);
    } else if (ele) {
      ele.isEdit = false;
      setEditKey(null);
    }
    setTreeData(_treeData);
  };

  // deleteDept,
  // deleteDeptAccount,
  // saveDept,
  // updateDept,

  // 保存编辑树节点
  const onSaveTreeNode = async (item) => {
    const _treeData = [...treeData];
    const ele = findNode(item.id, _treeData);
    if (ele) {
      // 新增或编辑 有parentDeptId就是新增的
      if (item.parentDeptId) {
        await Services.saveDept({ deptName: editValues[item.id], parentDeptId: item.parentDeptId });
      } else {
        await Services.updateDept({ deptName: editValues[item.id], id: item.id });
      }
      ele.deptName = editValues[item.id];
      ele.isEdit = false;
      setEditKey(null);
      getTenantDeptTree();
    }
    setTreeData(_treeData);
  };

  // 添加树节点
  const onAddTreeNode = (item) => {
    // 只能同时编辑一个节点
    if (editKey) {
      message.warning("当前还有正在编辑中的数据,请保存后继续操作!");
      return;
    }

    // 展开当前新增的节点位置
    setExpandedKeys([...expandedKeys,item?.treeId])

    const _treeData = [...treeData];
    const ele = findNode(item.id, _treeData);
    if (ele) {
      if (!ele.children) {
        ele.children = [];
      }
      ele.children.push({ isEdit: true, parentDeptId: item.id });
      setEditKey(item.id);
    }
    setTreeData(_treeData);
  };

  // 编辑树节点
  const onEditTreeNode = (item) => {
    console.log("item", item);
    if (editKey) {
      message.warning("当前还有正在编辑中的数据,请保存后继续操作!");
      return;
    }
    const _treeData = [...treeData];
    const ele = findNode(item.id, _treeData);
    if (ele) {
      ele.isEdit = true;
      setEditValues({ ...editValues, [ele.id]: ele.deptName });
      setEditKey(item.id);
    }
    setTreeData(_treeData);
  };

  // 删除树节点
  const onDeleteTreeNode = async (item) => {
    await Services.deleteDept({ id: item.id });
    getTenantDeptTree();
  };

  const handleExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const handleSearch = (value) => {
    if (value) {
      const expandedSet = new Set();
      dataList.forEach((item) => {
        if (item.deptName && item.deptName.includes(value)) {
          const parentKey = getParentKey(item.key, treeData);
          expandedSet.add(parentKey);
        }
      });
      const expandedKeys = Array.from(expandedSet);
      setExpandedKeys(expandedKeys);
      setSearchValue(value);
      setAutoExpandParent(true);
    } else {
      setExpandedKeys([]);
      setSearchValue(value);
      setAutoExpandParent(true);
    }
  };

  const handleAsyncLoadTree = (treeNode) => {
    return new Promise((resolve, reject) => {
      const { children, params, dataRef } = treeNode.props;
      if (children) {
        resolve(children);
        return;
      }
      onLoad(params).then((res) => {
        if (res.success && res.data) {
          const newChildren = onTransform(res.data);
          dataRef.children = newChildren;
          setDataList([...dataList, ...newChildren]);
          resolve(newChildren);
        } else {
          message.error(res.errmsg || res.message);
          reject(res.errmsg || res.message);
        }
      });
    });
  };

  const _renderTreeNode = (data) => {
    return data.map((item) => {
      const { key, deptName, children, sourceType, isEdit, ...restProps } = item;

      // 当前搜索值的index
      const index = deptName ? deptName.indexOf(searchValue) : -1;

      let newTitle = null;

      if (item.isEdit) {
        // 编辑状态下
        newTitle = (
          <div className="inlineInput">
            <Input defaultValue={deptName} className="input" onChange={(e) => onInputChange(e?.target?.value, item)} />
            <div className="iconBox">
              <Popconfirm title="确认取消编辑?" onConfirm={() => onCloseTreeNode(item)} okText="是" cancelText="否">
                <CloseOutlined style={{ marginLeft: 8, color: "#ff4d4f" }} />
              </Popconfirm>
              <Popconfirm title="确认保存?" onConfirm={() => onSaveTreeNode(item)} okText="是" cancelText="否">
                <CheckOutlined style={{ marginLeft: 8, color: "#bae637" }} />
              </Popconfirm>
            </div>
          </div>
        );
      } else {
        newTitle = (
          <div className="titleWrap">
            {index > -1 ? (
              <span>
                {deptName && deptName.substr(0, index)}
                <span style={{ color: "#f50" }}>{searchValue}</span>
                {deptName && deptName.substr(index + searchValue.length)}
              </span>
            ) : (
              <span>{deptName}</span>
            )}
            <span className="titleIcon">
              <Tooltip title="添加">
                <PlusOutlined style={{ marginLeft: 8, color: "#40a9ff" }} onClick={() => onAddTreeNode(item)} />
              </Tooltip>
              {sourceType === 1 && (
                <>
                  <Tooltip title="编辑">
                    <EditOutlined style={{ marginLeft: 8, color: "#597ef7" }} onClick={() => onEditTreeNode(item)} />
                  </Tooltip>
                  <Popconfirm title="确认删除?" onConfirm={() => onDeleteTreeNode(item)} okText="是" cancelText="否">
                    {item.parentKey === "0" ? null : <DeleteOutlined style={{ marginLeft: 8, color: "#ff4d4f" }} />}
                  </Popconfirm>
                </>
              )}
            </span>
          </div>
        );
      }
      if (children) {
        return (
          <TreeNode key={key} title={newTitle} dataRef={item} {...restProps}>
            {_renderTreeNode(children)}
          </TreeNode>
        );
      }
      return <TreeNode key={key} className="treeNode" title={newTitle} dataRef={item} {...restProps} />;
    });
  };

  return (
    <div style={{ ...style }} className="searchTreeWrap">
      <Search style={{ marginBottom: 8 }} className="searchInput" placeholder="输入关键字筛选" onSearch={handleSearch} />
      <Tree
        {...restProps}
        selectable={false}
        loadData={onLoad && onTransform ? handleAsyncLoadTree : null}
        onExpand={handleExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}>
        {_renderTreeNode(treeData)}
      </Tree>
    </div>
  );
}

export default EditSearchTree;
