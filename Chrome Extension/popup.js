const main = () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") document.body.classList.add("custom-dark-theme");

  const integrationToken = localStorage.getItem("integration-token");
  if (integrationToken)
    document.getElementById("integration-token").value = integrationToken;

  const pageId = localStorage.getItem("page-id");
  if (pageId) document.getElementById("page-id").value = pageId;

  document.getElementById("theme-switcher").addEventListener("click", () => {
    if (document.body.classList.contains("custom-dark-theme")) {
      document.body.classList.remove("custom-dark-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("custom-dark-theme");
      localStorage.setItem("theme", "dark");
    }
  });

  document
    .getElementById("integration-token")
    .addEventListener("change", (e) => {
      localStorage.setItem("integration-token", e.target.value);
    });

  document.getElementById("page-id").addEventListener("change", (e) => {
    localStorage.setItem("page-id", e.target.value);
  });

  document.getElementById("count").addEventListener("click", () => {
    const integrationToken = document.getElementById("integration-token").value;
    const pageId = document.getElementById("page-id").value;

    document.getElementById("result").style.display = "none";
    document.getElementById("loading-spinner").style.display = "inline-block";

    fetch(
      "https://notion-words-in-page-counter.herokuapp.com/api/count-words-in-page",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: integrationToken,
        },
        body: JSON.stringify({
          pageId,
        }),
      }
    )
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(response);
      })
      .then((data) => {
        // console.log("Success: ", data);
        document.getElementById("result").innerHTML = data?.nbOfWords;
      })
      .catch((error) => {
        console.error("Error: ", error);
        document.getElementById("result").innerHTML = "Error";
      })
      .finally(() => {
        document.getElementById("result").style.display = "initial";
        document.getElementById("loading-spinner").style.display = "none";
      });
  });
};

window.onload = main;
