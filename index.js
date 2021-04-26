const ACAO = "http://127.0.0.1:5500";

async function handleRequest(req) {
  const resError = (msg) => {
    const res = JSON.stringify(msg);
    return new Response(res, {
      headers: {
        "Access-Control-Allow-Origin": ACAO,
        "content-type": "application/json; charset=utf-8",
      }
    });
  };

  if (req.method !== "POST") {
    resError({ message: "A method should be POST" });
  }

  const params = await req.json();
  console.log(params);

  // Headersの追加
  const options = {};
  if (params.headers) {
    for (const [key, value] of Object.entries(params.headers)) {
      if (key === "Content-Type" || key === "mode") {
        options["headers"].set(key, value);
      } else {
        options["headers"].append(key, value);
      }
    }
  }

  let apiRes;
  if (params.method === "GET") {
    const query = new URLSearchParams(params.query);
    apiRes = await fetch(`${params.url}?${query}`);
  } else if (params.method === "POST") {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json, charset=utf-8",
      },
    };
    options["body"] = JSON.stringify(params.body);
    apiRes = await fetch(params.url, options);
  } else {
    resError({ message: 'A method in body should be GET or POST' });
  }

  if (apiRes.ok) {
    const json = await apiRes.json();
    const res = JSON.stringify(json);
    return new Response(res, {
      headers: {
        "Access-Control-Allow-Origin": ACAO,
        "content-type": "application/json; charset=utf-8",
      }
    });
  } else {
    resError(res);
  }
}

// fetchで待機
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});