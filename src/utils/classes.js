hasClass = function (elem, c) {
  return elem.classList.contains(c)
}
addClass = function (elem, c) {
  elem.classList.add(c)
}
removeClass = function (elem, c) {
  elem.classList.remove(c)
}

function toggleClass (elem, c) {
  var fn = hasClass(elem, c) ? removeClass : addClass
  fn(elem, c)
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
}
