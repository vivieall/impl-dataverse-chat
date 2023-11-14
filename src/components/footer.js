export function Footer() {
  const footer = document.querySelector("#footer");
  if (!footer.querySelector("p")) { // Verifica si el pie de página ya ha sido añadido
    const footerElement = document.createElement("p");
    footerElement.textContent = "© 2023 - Desarrollado por 👩‍💻 Vivie 💛 < L >";
    footer.appendChild(footerElement);
  }
}
