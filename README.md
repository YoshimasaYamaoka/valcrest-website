# Valcrest Website

## Cloudflare Pages デプロイ手順

### Step 1: GitHubにアップロード
1. https://github.com にログインし、「New repository」で `valcrest-website` を作成（Public）
2. このフォルダで以下を実行:
   ```
   git init
   git add .
   git commit -m "first commit"
   git remote add origin https://github.com/あなたのID/valcrest-website.git
   git push -u origin main
   ```

### Step 2: Cloudflare Pagesで公開
1. https://pages.cloudflare.com にログイン（無料）
2. 「Create a project」→「Connect to Git」→ GitHubと連携
3. `valcrest-website` を選択
4. ビルド設定: Framework preset=None / Build command=空欄 / Output directory=/
5. 「Save and Deploy」
→ 数十秒で https://valcrest-website.pages.dev で公開完了

### 更新時
```
git add .
git commit -m "update: 変更内容"
git push
```
→ 自動で反映されます

## Formspree設定（お問い合わせフォームを動かすために）
1. https://formspree.io に無料登録
2. 「+ New Form」→ Form IDをコピー（例: xpwzvqkr）
3. contact.html の `YOUR_FORM_ID` を書き換える
4. git push で反映
（月100件まで無料）

## LINEリンクの差し替え
contact.html の `href="#"` を LINE公式アカウントのURLに変更後、git push

## 独自ドメイン（後から追加 / 年額約2,000円〜）
Cloudflare Registrar でドメイン取得 → Cloudflare Pagesの「Custom domains」から設定
