/*global $, Notification*/

(function () {
  $("script[src='//piwik.quad.moe/piwik.js']").remove()
  $('noscript').remove()
  $('script').last().remove()

  var sourceDom = $('#source')
  var titleDom = $('#title')

  function renderNotification () {
    /* eslint-disable no-new */
    new Notification('Anime Openings', {
      body: titleDom.text() + ' ' + sourceDom.text()
    })
    /* eslint-enable no-new */
  }

  sourceDom.bind('DOMSubtreeModified', renderNotification)

  setTimeout(renderNotification, 1000)
}())
