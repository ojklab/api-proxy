import {
  contentTypeFilter,
  createApp,
} from "https://servestjs.org/@/mod.ts";

const app = createApp();

app.get("/", async (req) => {
  const file = await Deno.open("./index.html");
  req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html",
    }),
    body: file,
  });
});

app.post("/", contentTypeFilter("application/json"), async (req) => {
  // index.htmlからデータの受け取り
  const reqJson = await req.json();

  // POSTで渡すパラメータの準備
  const options: any = {
    method: "POST",
    mode: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json, charset=utf-8",
    }),
  };

  // Headersの追加
  if (reqJson.headers) {
    for (const [key, value] of Object.entries(reqJson.headers)) {
      if (key === "Content-Type" || key === "mode") {
        options["headers"].set(key, value);
      } else {
        options["headers"].append(key, value);
      }
    }
  }

  let res: any;

  if (reqJson.method === "GET") {
    const query = new URLSearchParams(reqJson.query);
    res = await fetch(`${reqJson.url}?${query}`);
  } else if (reqJson.method === "POST") {
    options["body"] = JSON.stringify(reqJson.body);
    res = await fetch(reqJson.url, options);
  } else {
    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify({ status: "Bad method (GET or POST)" }),
    });
  }

  let resJson: any;

  if (res.ok) {
    resJson = await res.json();
  } else {
    console.log(res);
  }

  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "application/json, charset=utf-8",
    }),
    body: JSON.stringify(resJson),
  });
}); // app.post

app.listen({ port: 80 });
