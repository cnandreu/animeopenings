(function() {

  var sourceDom = $('#source');
  var titleDom = $('#title');

  function renderNotification() {
    new Notification('Anime Openings', {
      body: titleDom.text() + ' ' + sourceDom.text()
    });
  }

  sourceDom.bind('DOMSubtreeModified', renderNotification)

  setTimeout(renderNotification, 1000);

}());

