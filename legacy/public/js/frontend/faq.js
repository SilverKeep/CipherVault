document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("click", () => {
      const answer = item.querySelector(".faq-answer");
      const isOpen = item.classList.contains("open");

      item.querySelector(".faq-question").classList.toggle("active");

      if (isOpen) {
        // Close the FAQ
        answer.style.maxHeight = `${answer.scrollHeight}px`; // Set current height to allow for smooth transition
        setTimeout(() => (answer.style.maxHeight = "0"), 1); // Then set it to 0
        item.classList.remove("open");
      } else {
        // Open the FAQ
        answer.style.maxHeight = `${answer.scrollHeight}px`; // Set maxHeight to the content's height
        item.classList.add("open");
      }
    });
  });
});
