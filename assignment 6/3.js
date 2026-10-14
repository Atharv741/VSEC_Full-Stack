
const container = document.getElementById("container");
const blocks = document.querySelectorAll(".block");

blocks.forEach((block) => {
  block.addEventListener("click", () => {
    container.classList.add("open");
  });
});
