# Tanush — Developer Portfolio

A static, framework-free developer portfolio built with pure HTML, CSS, and Vanilla JavaScript.

---

## Project Structure

```
portfolio/
 ├── index.html       ← Main page (all sections)
 ├── style.css        ← All styles
 ├── script.js        ← All interactivity
 ├── projects.js      ← Edit this to add/update projects
 └── assets/          ← Logo and icons
```

---

## Adding Projects

Open `projects.js` and add to the `PROJECTS` array:

```js
{
  title: "My Project",
  description: "What it does.",
  github: "https://github.com/tanushbuilds/project",
  demo: "",  // leave empty if none
  tech: ["Python", "FastAPI"],
}
```

No rebuild needed — cards render automatically.

---

## Local Development

Open `index.html` directly in your browser, or use VS Code's Live Server extension for hot-reload.
