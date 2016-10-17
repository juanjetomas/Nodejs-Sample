$(function() {
  $('#right-column').hide();

  $('li.company-name a').click(function() {

    var name = $(this).text();

    $('#right-column h2').text(name);

    $('#comments li').remove();

    $.getJSON('/company/' + name, function(data) {
      for (var i = 0; i < data.length; i++) {
        $('<li>').appendTo('#comments').text(data[i]);
      }
    });

    $('#right-column').show();

    return false;
  });

  $('#add-new-comment').click(function() {

    var name = $('#right-column h2').text();
    var comment = $('#new-comment').val();

    $.ajax({
      type: "POST",
      url: "/company/add-comment",
      data: JSON.stringify({ name: name, comment: comment }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        $('<li>').appendTo('#comments').text(comment);
        $('#new-comment').val('');
      },
      error: function(err) {
        var msg = 'Status: ' + err.status + ': ' + err.responseText;
        alert(msg);
      }
    });
    return false;
  });
});
