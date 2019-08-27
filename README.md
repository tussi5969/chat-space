# Chat-space DB設計
---
## Users table
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false, index: true|
|email|string|null: false|
|password|string|null: false|

## Association
- has_many :messages
- has_many :groups, through: :users_groups
- has_many :users_groups
---
## Groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

## Association
- has_many: users, through: :users_groups
- has_many: :users_groups
- has_many: messages
---

## Messages table
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|

## Association
- belongs_to: group
- belongs_to: user
---

## Groups_Users table
|Column|Type|Options|
|------|----|-------|
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|

## Association
- belongs_to: user
- belongs_to: group
