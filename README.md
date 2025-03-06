## How to use

```sh
git clone https://github.com/chikaratanaka/2025-03-plactice-tanaka-v0-next
cd 2025-03-plactice-tanaka-v0-next
export DB_URL=postgresql://db_2025_03_plactice_tanaka_v0:ZWViOGQ3YWY0OTM0@104.198.119.18:5432/db_2025_03_plactice_tanaka_v0
yarn next
# open
# http://localhost:3000

```

## Feature

- Todoリスト
- テキストボックス＋登録ボタン 新規登録できる
- 一覧 チェックボックスのON/OFFができる
    - チェックすると終了リストに表示される
    - 削除ボタンで削除できる
- Localstorageに保存
    - 編集ボタンで、内容を編集できる
- DBに保存 Prisma
- ID/PWでログインして保存 Next auth
