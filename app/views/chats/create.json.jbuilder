json.id @chat.id
json.user_name @chat.user.name
json.date @chat.created_at.strftime("%Y年%m月%d日 %H時%M分")
json.content @chat.content
json.image @chat.image_url
