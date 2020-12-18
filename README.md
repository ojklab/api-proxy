API Proxy
===

ブラウザからfetchしたときにCORSの同一オリジンポリシーによってブロックされるAPIサービスを使用するための仲介プログラム。
OJKの授業で使用するために作成。

## 使用方法

1. Github（本資料のリンク参照）の緑色の「Code」ボタンから「Download ZIP」を選択してアプリ用のフォルダに解凍する。

2. 何かしらターミナルを開く。Windowsの場合、ファイルのあるフォルダをエクスプローラで開いてロケーションバーに「powershell」と打ち込むとその場所を起点としてPowerShellが起動する。

3. ターミナルに以下のコマンドを打ち込んでEnterキーを押す（Denoというソフトウェアがインストールされるのでしばらく待つ）

 Windows（PowerShell）の場合：
 iwr https://deno.land/x/install/install.ps1 -useb | iex

 MacやWindows（Git Bash）の場合：
 curl -fsSL https://deno.land/x/install/install.sh | sh

 ～以上は1度やればOK～

4. ターミナルに以下のコマンドを打ち込んでEnterキーを押す。初回は文字がたくさん表示されるが、最後に「servest:router listening on :80」と表示されたらOK。このターミナルは作業中は閉じないこと。

 deno run --allow-net --allow-read apiproxy.ts

5. ブラウザのアドレスバーに「localhost」と打ち込んでEnterキーを押すとサンプルプログラム（index.html）が実行される。

6. index.htmlを編集して自分のアプリを作成する。手順4のターミナルが起動している間はindex.htmlを更新してブラウザを再読み込みすれば反映される。index.htmlの編集の仕方はコメントとして記述してあるので参照のこと。