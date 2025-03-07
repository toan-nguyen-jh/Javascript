// update progress
document.querySelectorAll(".progress-bar").forEach((bar) => {
  let value = bar.getAttribute("data-progress");
  bar.style.setProperty("--progress-value", value + "%");
});
