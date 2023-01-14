console.log('helloworld')

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.ele').forEach(ele => {
      console.log(ele.id, isElementInViewport(ele))
    })
  })
})
