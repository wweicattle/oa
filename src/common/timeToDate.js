// 
export function timeToDate(arr,prop){
    var prop=prop;
    arr.forEach((element, index) => {
        let aa = new Date(parseInt(element[prop])).toLocaleDateString();
        arr[index][prop] = aa;
      });
}