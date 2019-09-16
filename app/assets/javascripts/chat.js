$(function () {
  var buildHTML = function (chat) {
    var img_display = (chat.image) ? `<img src=${chat.image} class="chat__main__content__text__image">` : ``;
    var content = chat.content ? `<div class="chat__main__content__text"> ${chat.content} </div>` : ``;

    var html =
      `<div class="chat__main__content" data-chat-id= ${chat.id}>
        <div class="chat__main__content__info">
          <span class="chat__main__content__info__username">
            ${chat.user_name}
          </span>
          <span class="chat__main__content__info__date">
            ${chat.created_at}
          </span>
        </div>
        ${content}
        ${img_display}
      </div>`
    return html;
  };

  $('#new_chat').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

      .done(function (data) {
        var html = buildHTML(data);
        $('.chat__main').append(html);
        $('.chat__main').animate({scrollTop: $('.chat__main')[0].scrollHeight}, 'fast');
        $("#message_form").val('')
        $('.chat__message__btn').prop('disabled', false);
      })
      .fail(function () {
        alert('error');
      });
  });

  var reloadChats = function () {
    if (window.location.href.match(/\/groups\/\d+\/chats/)) {
      var last_chat_id = $('.chat__main__content:last').data("chat-id");
      $.ajax({
        url: 'api/chats',
        type: 'GET',
        dataType: 'json',
        data: {id: last_chat_id}
      })
      .done(function (chats) {
        var insertHTML = '';
        chats.forEach(function (chat) {
          insertHTML = buildHTML(chat)
          $('.chat__main').append(insertHTML)
          $('.chat__main').animate({scrollTop: $('.chat__main')[0].scrollHeight}, 'fast');
        });
      })
      .fail(function() {
        console.log('error');
      });
    }
  };

  setInterval(reloadChats, 5000);

});
