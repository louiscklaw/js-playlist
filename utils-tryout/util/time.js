function getDisplayHour(hour) {
  hour = parseInt(hour, 10)
  let hr = hour == 0 ? 12 : hour > 12 ? hour - 12 : hour
  return hr < 10 ? '0' + hr : hr
}
function getAmPm(hour) {
  return hour < 12 ? 'AM' : 'PM'
}
function getOpenHours(day, start, end) {
  if ((day == null) | (day.length == 0) || (start == null) | (start.length == 0) || (end == null) | (end.length == 0)) {
    return ''
  }
  let showText = getStr(day)
  if (showText == '') {
    showText = getStr('Today')
  }
  let start1 = start
  let start2 = ''
  if (start.indexOf(':') > 0) {
    start1 = start.substring(0, start.indexOf(':'))
    start2 = start.substring(start.indexOf(':'))
  }
  let end1 = end
  let end2 = ''
  if (end.indexOf(':') > 0) {
    end1 = end.substring(0, end.indexOf(':'))
    end2 = end.substring(end.indexOf(':'))
  }
  showText += ', '
  if (parseInt(start1, 10) <= 12) showText = showText + start1 + start2 + getStr('AM') + ' - '
  else showText = showText + (parseInt(start1, 10) - 12) + start2 + getStr('PM') + ' - '
  if (parseInt(end1, 10) <= 12) showText = showText + end1 + end2 + getStr('AM')
  else showText = showText + (parseInt(end1, 10) - 12) + end2 + getStr('PM')
  return showText
}
