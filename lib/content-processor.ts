/**
 * Processes HTML content to ensure proper display on dark backgrounds
 * - Converts black or dark text to light colors
 * - Preserves image positioning from the editor
 * - Ensures proper styling for embedded content
 */
export function processHtmlContent(html: string): string {
  if (!html) return ""

  // Create a DOM parser to work with the HTML
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")

  // Process text colors - find elements with dark text and change to light
  const textElements = doc.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, li, td, th")
  textElements.forEach((el) => {
    const style = window.getComputedStyle(el)
    const color = style.color

    // Check if the color is dark (simplified check)
    if (
      color &&
      (color.includes("rgb(0, 0, 0)") || color.includes("rgba(0, 0, 0") || color.includes("#000") || color === "black")
    ) {
      el.setAttribute("style", `${el.getAttribute("style") || ""}; color: #e5e7eb !important;`)
    }
  })

  // Process images with more detailed alignment detection
  const images = doc.querySelectorAll("img")
  images.forEach((img) => {
    // Default to making all images responsive
    img.classList.add("max-w-full", "h-auto", "rounded-md")

    // Get parent element to check alignment
    const parent = img.parentElement

    if (parent) {
      // Check for figure elements which often contain centered images
      if (parent.tagName.toLowerCase() === "figure") {
        parent.classList.add("mx-auto", "text-center", "my-6")
        img.classList.add("mx-auto")
        return
      }

      // Check for alignment in the image itself
      const imgStyle = img.getAttribute("style") || ""
      const imgAlign = img.getAttribute("align") || ""

      // Check for alignment in parent
      const parentStyle = parent.getAttribute("style") || ""
      const parentClass = parent.getAttribute("class") || ""
      const parentAlign = parent.getAttribute("align") || ""
      const parentTextAlign = parentStyle.match(/text-align:\s*(center|left|right)/i)

      // Determine alignment from all sources
      if (
        imgAlign === "center" ||
        (imgStyle.includes("margin-left: auto") && imgStyle.includes("margin-right: auto")) ||
        parentAlign === "center" ||
        parentClass.includes("aligncenter") ||
        parentClass.includes("text-center") ||
        (parentTextAlign && parentTextAlign[1] === "center") ||
        (parentStyle.includes("margin-left: auto") && parentStyle.includes("margin-right: auto"))
      ) {
        // Center alignment
        if (parent.tagName.toLowerCase() === "p") {
          parent.classList.add("text-center")
        }
        img.classList.add("mx-auto", "block", "my-4")
      } else if (
        imgAlign === "right" ||
        parentAlign === "right" ||
        parentClass.includes("alignright") ||
        (parentTextAlign && parentTextAlign[1] === "right")
      ) {
        // Right alignment
        img.classList.add("float-right", "ml-6", "mb-4")
      } else if (
        imgAlign === "left" ||
        parentAlign === "left" ||
        parentClass.includes("alignleft") ||
        (parentTextAlign && parentTextAlign[1] === "left")
      ) {
        // Left alignment
        img.classList.add("float-left", "mr-6", "mb-4")
      } else {
        // If no specific alignment is found, default to center for better appearance
        img.classList.add("mx-auto", "block", "my-4")
        if (parent.tagName.toLowerCase() === "p" && parent.childNodes.length === 1) {
          parent.classList.add("text-center")
        }
      }
    }
  })

  // Handle paragraphs that contain only an image
  const paragraphs = doc.querySelectorAll("p")
  paragraphs.forEach((p) => {
    if (p.childNodes.length === 1 && p.querySelector("img")) {
      p.classList.add("text-center")
    }
  })

  // Return the processed HTML
  return doc.body.innerHTML
}

/**
 * Ensures that empty paragraphs are preserved in HTML content
 * This is important for maintaining spacing in blog posts
 */
export function preserveEmptyParagraphs(html: string): string {
  if (!html) return ""

  // Replace empty paragraphs with a non-breaking space to ensure they're not removed
  const preservedHtml = html.replace(/<p>\s*<\/p>/g, "<p>&nbsp;</p>")

  return preservedHtml
}
