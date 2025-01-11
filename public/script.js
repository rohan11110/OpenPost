document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const link = button.querySelector("a");
            if (link) {
                // Simulate a click on the link inside the button
                window.location.href = link.href;
            }
        });
    });
});