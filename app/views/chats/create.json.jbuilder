json.content @chat.content
json.image @chat.image.url
json.created_at @chat.created_at.strftime("%Y年%m月%d日 %H時%M分")
json.user_name @chat.user.name
json.id @chat.id
