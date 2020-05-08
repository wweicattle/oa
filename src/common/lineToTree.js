 // 将返回数据线性转化为树形结构
 export  function lineToTree(list) {
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
  // 
export function timeToDate(arr,prop){
  var prop=prop;
  arr.forEach((element, index) => {
      let aa = new Date(parseInt(element[prop])).toLocaleDateString();
      arr[index][prop] = aa;
    });
}