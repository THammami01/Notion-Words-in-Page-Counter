// fetch("https://api.notion.com/v1/search", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "Bearer INTEGRATION_TOKEN",
//     "Notion-Version": "2021-08-16",
//   },
//   data: {
//     query: "",
//   },
// })
//   .then((response) => {
//     if (response.ok) return response.json();
//     return Promise.reject(response);
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.warn("Something went wrong.", err);
//   });

fetch("https://api.notion.com/v1/search", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer INTEGRATION_TOKEN",
    "Notion-Version": "2021-08-16",
  },
  body: JSON.stringify({
    query: "",
  }),
})
  .then((response) => {
    if (response.ok) return response.json();
    return Promise.reject(response);
  })
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
