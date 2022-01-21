const main = () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") document.body.classList.add("custom-dark-theme");

  const integrationToken = localStorage.getItem("integration-token");
  if (integrationToken)
    document.getElementById("integration-token").value = integrationToken;

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

  document.getElementById("count").addEventListener("click", (e) => {
    document.getElementById("result").innerHTML = "!Implemented";
  });
};

window.onload = main;
