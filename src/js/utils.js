export function strMonth(num){
  const map = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
               'Sep', 'Oct', 'Nov', 'Dec'];
  return map[num];
}

export function strMin(num){
  let str = num.toString(10);

  return (str.length < 2)? `0${str}` : str;
}

export function dateString(timeStamp){
  let time = new Date(timeStamp);
  let [ yr, month, date ] = [
    time.getFullYear(), time.getMonth(), time.getDate()
  ];

  return `${strMonth(month)}, ${date}, ${yr}`;
}
