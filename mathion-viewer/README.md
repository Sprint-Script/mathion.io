# ⬡ mathion-viewer

A GitHub Pages site that **automatically turns every `*.mathion` file in the repo into a clickable button**.

Live demo → `https://<your-username>.github.io/<repo-name>/`

---

## How it works

| Step | What happens |
|------|-------------|
| You push a `*.mathion` file | GitHub Actions runs automatically |
| The workflow scans the repo | Finds every `*.mathion` file and writes `manifest.json` |
| GitHub Pages deploys `index.html` | `loader.js` reads `manifest.json` and renders one button per file |
| User clicks a button | The raw `.mathion` file opens in a new tab |

---

## Adding files

Just drop any `*.mathion` file anywhere in the repo and push:

```
my-project.mathion
data/config.mathion
levels/world1.mathion
```

The next deploy will show a button for each one.  
The **button label** is the filename without the `.mathion` extension.

---

## Setup (one-time)

1. **Fork / create** this repo on GitHub.
2. Go to **Settings → Pages** → set *Source* to **GitHub Actions**.
3. Push any change to `main` to trigger the first deploy.

That's it. No build tools, no dependencies.

---

## File structure

```
.
├── index.html        ← page shell
├── style.css         ← styling
├── loader.js         ← reads manifest, builds buttons
├── manifest.json     ← auto-generated list of .mathion files
├── examples/
│   ├── hello.mathion
│   ├── demo.mathion
│   └── sample.mathion
└── .github/
    └── workflows/
        └── deploy.yml   ← scans files + deploys to Pages
```

---

## Manual manifest update (optional)

If you prefer not to use the GitHub Action, edit `manifest.json` yourself:

```json
{
  "files": [
    "examples/hello.mathion",
    "my-folder/custom.mathion"
  ]
}
```

Paths are relative to the repo root.
