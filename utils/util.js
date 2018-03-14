/**
 * 格式化时间
 * @param  {Datetime} source 时间对象
 * @param  {String} format 格式
 * @return {String}        格式化过后的时间
 */
function formatDate(source, format) {
  const o = {
    'M+': source.getMonth() + 1, // 月份
    'd+': source.getDate(), // 日
    'H+': source.getHours(), // 小时
    'm+': source.getMinutes(), // 分
    's+': source.getSeconds(), // 秒
    'q+': Math.floor((source.getMonth() + 3) / 3), // 季度
    'f+': source.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (source.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}


function countArrLength(arr,prop){
    let _count = 0;
    arr.forEach(item=>{
      if (prop && Array.isArray(item[prop])){
        _count += countArrLength(item[prop]);
      } else if (Array.isArray(item)) {
        _count += countArrLength(item);
      }else{
        _count++;
      }
    })
    return _count;
}


function formatterList(result) {
  let titleMap = new Map();
  result.forEach(item => {
    item.article_createTime && item.article_createTime.substr(0, 7) && titleMap.set(item.article_createTime.substr(0, 7), []);
  });
  result.forEach(item => {
    const key = item.article_createTime && item.article_createTime.substr(0, 7) || '';
    if (titleMap.has(key)) {
      titleMap.get(key).push(item);
    }
  });

  let groups = [];
  titleMap.forEach((value, key) => {
    groups.push({
      title: key,
      group: value
    })
  });
  return groups;
}

module.exports = { formatDate, countArrLength, formatterList }