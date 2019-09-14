$(function () {
  var search_list = $("#user-search-result");
  var member_list = $("#user-member")

  function appendUser(user) {
    var html =
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>`
    search_list.append(html)
  }

  function appendMember(user) {
    var html =
      `<div class='chat-group-user'>
        <input name='group[user_ids][]' type='hidden' value='${user.id}'>
        <p class='chat-group-user__name'>${user.name}</p>
        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${user.id}" data-user-name="${user.name}">削除</div>
      </div>`
    member_list.append(html)
  }

  function appendErrMsg() {
    var html =
      `<div class='chat-group-user'>
        <p class='chat-group-user__name'>該当するユーザが存在しません</p>
      </div>`
    search_list.append(html)
  }


  $(document).on('click', '.user-search-add', function () {
    var search_user = $(this).data()
    var user = { id: search_user.userId, name: search_user.userName }
    appendMember(user);
    $(this).parent().remove();
  })

  $(document).on('click', '.user-search-remove', function () {
    var delete_user = $(this).data()
    var user = { id: delete_user.userId, name: delete_user.userName }
    appendUser(user);
    $(this).parent().remove()
  })

  $("#user-search-field").on("keyup", function () {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function (users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function (user) {
          appendUser(user);
        });
      } else {
        appendErrMsg();
      }
    })

    .fail(function () {
      alert('error');
    });
  });
});
