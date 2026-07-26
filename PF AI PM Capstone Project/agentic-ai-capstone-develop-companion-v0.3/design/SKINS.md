# The Three Skins

One console, three moods. All three live inside `TOKENS.css` — switching is one attribute: `data-skin` on `<html>`. Components, spacing, and type never change. Only the palette does.

Pick by your product's audience, not by personal taste:

| Skin | Attribute | Mood | Fits |
|---|---|---|---|
| **Operations** (default) | `data-skin="ops"` | Dark, calm, mission-control | internal tools, ops teams, queues, triage |
| **Studio** | `data-skin="studio"` | Light, clean, SaaS | customer-facing tools, business users, anything demoed in daylight |
| **Terminal** | `data-skin="term"` | Mono, green-on-black | developer tools, data/infra workflows, technical audiences |

Rules:

1. Pick **one** in prompt 12, then lock it. Skin-flipping mid-demo reads as indecision.
2. Never mix skins or override token values per-element.
3. Status colors (pass green, needs-work amber, fail/escalate red, info blue) are shared across skins — never restyle them. A viewer must always be able to read status at a glance.
4. Video check: whatever you pick, your text must survive video compression. The kit's sizes already guarantee this if you did not shrink anything.
