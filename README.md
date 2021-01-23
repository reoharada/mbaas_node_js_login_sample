# mbaas_node_js_login_sample

## 環境構築手順
### nodebrewインストール　
```
$ brew install nodebrew
```

### node.jsのインストール
```
$ mkdir -p ~/.nodebrew/src
$ nodebrew install-binary stable
```
※nodeのバージョンは12.13.1を利用する

### PATHの設定
```
$ export PATH="/Users/ユーザ名/.nodebrew/node/バージョン/bin:$PATH"
```
※「ユーザ名」と「バージョン」は書き換える
※ bashrcやzshrcに追加しておくこと

### git cloneする
```
$ git clone https://github.com/ActDesignLab/ColorPaper
```

### npm installを実行
```
$ cd mbaas_node_js_login_sample
$ npm install
```

### node実行
```
$ ./node_modules/.bin/nodemon app.js
```
http://localhost:3000/
にアクセスできればOK

### カレントユーザをそのまま利用してはいけない理由
ブラウザからログインリクエストを送ると、セッショントークンが返ってくる。
ログインユーザの情報はカレントユーザとして格納される。
アプリケーションのレイヤーでは下記で情報を取得することができる。
```
ncmb.User.getCurrentUser();
```
このセッションの情報はローカルのscratch/フォルダ以下にjsonファイルとして保存される。
一見、ログイン情報はこのカレントユーザが存在するかどうかで確認をすればいいように思えるが、
別のユーザがログインを行うと、scratch/フォルダ以下のログインユーザの情報は上書きされる仕様となっている。
つまり、そのままカレントユーザの情報を参照してログイン情報として活用していると、いつのまにか、別のユーザとしてログインされているなんて現象が起こってしまう。
カレントユーザはあくまでログインセッションのみで活用することが望ましい。
![image](https://user-images.githubusercontent.com/710780/105580518-31803a80-5dd0-11eb-9907-4775b659c581.png)
### ログインの判定
カレントユーザの有無でログイン判定するのは危険であるため、cookieにセッショントークンとユーザ情報を保存し、
都度、mbaasにアクセスを行い、セッショントークンの有効性を問い合わせて、ログインを判定するようにする。
今回は、ユーザIDとセッショントークンを利用して、自分のUsersクラスのデータを更新できることで、セッショントークンが有効であるという判定を行うことにしたい。
ユーザIDとセッショントークンはそれぞれ、WC-SESSION-TOKEN、USER-IDというキーでブラウザcookieに保存することとした。
![image](https://user-images.githubusercontent.com/710780/105580521-35ac5800-5dd0-11eb-9260-12400ca152bd.png)
![image](https://user-images.githubusercontent.com/710780/105580525-39d87580-5dd0-11eb-875a-a115729dd2bd.png)
