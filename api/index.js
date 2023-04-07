import express from "express";
const app = express();
import cors from "cors";
import { Users } from "./users.js";
const port = 3003;

app.use(cors());

app.get("/", (req, res) => {
    //?=の後の文字列を取得
  const {q} = req.query;
  console.log(q)

  const keys = ["first_name", "last_name", "email"];

  console.log(Users[0]["email"]);

  //usersデータをfilterする関数
  //someでkeysを展開してUsers[0]["email"] みたいな感じでセットする
  //filterとincludesで渡ってきた文字列に絞る
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(q))
    );
  };
  res.json(search(Users));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
