 // 将返回数据线性转化为树形结构
 export default function listToTree(list) {
    let map = {};
    list.forEach(item => {
      if (!map[item.code]) {
        map[item.code] = item;
      }
    });
    list.forEach(item => {
      if (item.parentCode !== "") {
        map[item.parentCode].children
          ? map[item.parentCode].children.push(item)
          : (map[item.parentCode].children = [item]);
      }
    });
    return list.filter(item => {
      if (item.parentCode === "") {
        return item;
      }
    });
  }