$(function () {
  function buildHTML(chat) {
    var img_display = chat.image ? `<img src=${chat.image} class="chat__main__content__text__image">` : ``;
    var html =
      `<div class="chat__main__content" data-chat-id=${chat.id}>
        <div class="chat__main__content__info">
          <span class="chat__main__content__info__username">
            ${chat.user_name}
          </span>
          <span class="chat__main__content__info__date">
            ${chat.date}
          </span>
        </div>
        <div class="chat__main__content__text">
          ${chat.content}
        </div>
        ${img_display}
      </div>`
    return html;
  }


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
        $('form')[0].reset();
      })
      .fail(function () {
        alert('error');
      });
      return false;
  });
});
