!(function (o) {
  'use strict'
  ;(o.fn.fitVids = function (e) {
    var t,
      i,
      n = { customSelector: null, ignore: null }
    return (
      document.getElementById('fit-vids-style') ||
        ((t = document.head || document.getElementsByTagName('head')[0]),
        ((i = document.createElement('div')).innerHTML =
          '<p>x</p><style id="fit-vids-style">.fluid-width-video-container{flex-grow: 1;width:100%;}.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>'),
        t.appendChild(i.childNodes[1])),
      e && o.extend(n, e),
      this.each(function () {
        var e = [
          'iframe[src*="player.vimeo.com"]',
          'iframe[src*="youtube.com"]',
          'iframe[src*="youtube-nocookie.com"]',
          'iframe[src*="kickstarter.com"][src*="video.html"]',
          'object',
          'embed',
        ]
        n.customSelector && e.push(n.customSelector)
        var r = '.fitvidsignore'
        n.ignore && (r = r + ', ' + n.ignore)
        var t = o(this).find(e.join(','))
        ;(t = (t = t.not('object object')).not(r)).each(function () {
          var e,
            t,
            i = o(this)
          0 < i.parents(r).length ||
            ('embed' === this.tagName.toLowerCase() && i.parent('object').length) ||
            i.parent('.fluid-width-video-wrapper').length ||
            (i.css('height') || i.css('width') || (!isNaN(i.attr('height')) && !isNaN(i.attr('width'))) || (i.attr('height', 9), i.attr('width', 16)),
            (e =
              ('object' === this.tagName.toLowerCase() || (i.attr('height') && !isNaN(parseInt(i.attr('height'), 10)))
                ? parseInt(i.attr('height'), 10)
                : i.height()) / (isNaN(parseInt(i.attr('width'), 10)) ? i.width() : parseInt(i.attr('width'), 10))),
            i.attr('name') || ((t = 'fitvid' + o.fn.fitVids._count), i.attr('name', t), o.fn.fitVids._count++),
            i
              .wrap('<div class="fluid-width-video-container"><div class="fluid-width-video-wrapper"></div></div>')
              .parent('.fluid-width-video-wrapper')
              .css('padding-top', 100 * e + '%'),
            i.removeAttr('height').removeAttr('width'))
        })
      })
    )
  }),
    (o.fn.fitVids._count = 0)
})(window.jQuery || window.Zepto),
  (function (e) {
    e.addEventListener('DOMContentLoaded', function () {
      e.querySelectorAll('.kg-gallery-image img').forEach(function (e) {
        var t = e.closest('.kg-gallery-image'),
          i = e.attributes.width.value / e.attributes.height.value
        t.style.flex = i + ' 1 0%'
      })
    })
  })((window, document)),
  (function (t, i) {
    var r,
      n,
      o,
      s,
      a,
      d,
      l,
      c = i.querySelector('link[rel=next]')
    function u() {
      if (404 === this.status) return t.removeEventListener('scroll', f), void t.removeEventListener('resize', v)
      this.response.querySelectorAll('.post-card').forEach(function (e) {
        r.appendChild(i.importNode(e, !0))
      })
      var e = this.response.querySelector('link[rel=next]')
      e ? (c.href = e.href) : (t.removeEventListener('scroll', f), t.removeEventListener('resize', v)), (l = i.documentElement.scrollHeight), (s = o = !1)
    }
    function e() {
      var e
      s ||
        (a + d <= l - n
          ? (o = !1)
          : ((s = !0), ((e = new t.XMLHttpRequest()).responseType = 'document'), e.addEventListener('load', u), e.open('GET', c.href), e.send(null)))
    }
    function h() {
      o || t.requestAnimationFrame(e), (o = !0)
    }
    function f() {
      ;(a = t.scrollY), h()
    }
    function v() {
      ;(d = t.innerHeight), (l = i.documentElement.scrollHeight), h()
    }
    !c ||
      ((r = i.querySelector('.post-feed')) &&
        ((s = o = !(n = 300)),
        (a = t.scrollY),
        (d = t.innerHeight),
        (l = i.documentElement.scrollHeight),
        t.addEventListener('scroll', f, { passive: !0 }),
        t.addEventListener('resize', v),
        h()))
  })(window, document),
  (function (s, a) {
    s.Casper || (s.Casper = {}),
      (s.Casper.stickyNavTitle = function (e) {
        var t = a.querySelector(e.navSelector),
          i = a.querySelector(e.titleSelector),
          r = s.scrollY,
          n = !1
        function o() {
          i.getBoundingClientRect().top + s.scrollY + (i.offsetHeight + 35) <= r ? t.classList.add(e.activeClass) : t.classList.remove(e.activeClass), (n = !1)
        }
        s.addEventListener(
          'scroll',
          function () {
            ;(r = s.scrollY),
              (function () {
                n || requestAnimationFrame(o)
                n = !0
              })()
          },
          { passive: !0 },
        ),
          o()
      })
  })(window, document)
//# sourceMappingURL=casper.js.map
