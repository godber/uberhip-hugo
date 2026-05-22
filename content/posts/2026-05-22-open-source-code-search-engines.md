---
title: "Comparing Open Source Code Search Engines in 2026"
date: 2026-05-22T09:53:55-07:00
draft: true
---

Navigating and searching large codebases efficiently is a superpower. For a long time, the landscape of self-hosted, web-based code search had a clear leader in Sourcegraph. However, with Sourcegraph transitioning to a fully closed-source proprietary model, developers and teams looking for privacy-first, self-hosted, or free solutions have had to re-evaluate their options.

In this post, we'll compare the current state of open-source web-based code search engines, look at the classic tools like **OpenGrok**, **Hound**, and **Livegrep**, and explore modern successors like **Sourcebot** (which uses Zoekt under the hood).

To make this practical, I've compiled working **Docker Compose** configurations for each tool so you can spin them up and try them locally.

---

## 1. The Context: The Fall of Open-Source Sourcegraph
If you used Sourcegraph in the past, you might remember it as an open-core tool. However, the landscape has completely shifted:
* **June 2023:** Sourcegraph announced the deprecation of its open-source version, transitioning to a commercial "Sourcegraph Enterprise" license.
* **August 2024:** The transition concluded with the main codebase moving to a private repository, making it fully closed-source.
* **What remains:** Sourcegraph still maintains some open-source backend tools, most notably **Zoekt** (a lightning-fast trigram search engine), but the platform itself is no longer open-source.

If you want a self-hosted search portal today, you have to look elsewhere. Let's look at the classic open-source tools first.

---

## 2. The Classics

### A. Hound: The Simple & Fast Classic
Originally developed by Etsy, **Hound** is a super lightweight code search tool that is extremely fast. Its search backend is inspired by Russ Cox's research on regular expression matching using a trigram index.

([web](https://github.com/hound-search/hound) | [code](https://github.com/hound-search/hound) | [docs](https://github.com/hound-search/hound))

* **Best for:** Small-to-medium teams who want a simple search bar across multiple repositories without high resource usage.
* **Pros:** Extremely low memory usage, very fast text search, simple UI.
* **Cons:** Largely unmaintained today; lacks code intelligence (like jumping to definitions).

#### Docker Compose Setup
To run Hound, you need a `config.json` next to your `docker-compose.yml`.

**`config.json`:**
```json
{
  "max-concurrent-indexers": 2,
  "dbpath": "data",
  "repos": {
    "my-project": {
      "url": "https://github.com/username/my-project.git"
    }
  }
}
```

**`docker-compose.yml`:**
```yaml
services:
  hound:
    container_name: hound
    image: hound-search/hound:latest
    ports:
      - "6080:6080"
    volumes:
      - ./config.json:/data/config.json
      - ./hound-data:/data/data
    restart: unless-stopped
```
Run `docker compose up -d` and visit `http://localhost:6080`.

---

### B. Livegrep: Lightning-Fast Interactive Regex
**Livegrep** (by Nelson Elhage) is built for instantaneous, interactive regex searching of giant, gigabyte-scale code bases. It uses a C++ backend and a Go web server.

([web](http://livegrep.com/) | [code](https://github.com/livegrep/livegrep) | [docs](https://github.com/livegrep/livegrep/tree/main/doc))

* **Best for:** Developers who love heavy regex and want an interactive, stateless "instant grep" across repositories.
* **Pros:** Unbelievably fast regex matching; scales nicely for massive code bases because it works off a single pre-built index file.
* **Cons:** Requires a separate indexing step (compiling code into a `.idx` file) before you run the web server.

#### Docker Compose Setup
Because Livegrep relies on a pre-built index, you first build the index, then run the web services.

**1. Create a `data` directory and build the index:**
```bash
# Run the indexer against your code directory (e.g. `./src`)
docker run --rm \
  -v ./src:/src \
  -v ./data:/data \
  ghcr.io/livegrep/livegrep/indexer \
  /livegrep/bin/codesearch -create -index /data/livegrep.idx /src
```

**2. Start the services using `docker-compose.yml`:**
```yaml
services:
  livegrep-backend:
    image: ghcr.io/livegrep/livegrep/base
    volumes:
      - ./data:/data
    command: /livegrep/bin/codesearch -load_index /data/livegrep.idx -grpc 0.0.0.0:9999
    restart: unless-stopped

  livegrep-web:
    image: ghcr.io/livegrep/livegrep/base
    ports:
      - "8910:8910"
    depends_on:
      - livegrep-backend
    command: /livegrep/bin/livegrep -docroot /livegrep/web -listen 0.0.0.0:8910 --connect livegrep-backend:9999
    restart: unless-stopped
```
Run `docker compose up -d` and navigate to `http://localhost:8910`.

---

### C. OpenGrok: The Deep Code Intelligence Engine
Maintained by Oracle, **OpenGrok** is a mature, feature-rich source code search and cross-reference engine. Unlike Hound or Livegrep, OpenGrok parses the code structure using Lucene, understanding your files semantically.

([web](https://oracle.github.io/opengrok/) | [code](https://github.com/oracle/opengrok) | [docs](https://github.com/oracle/opengrok/wiki))

* **Best for:** Teams who want a browser-based IDE-like experience, where you can click function names to jump to their definitions or find all references across the codebase.
* **Pros:** Deep code intelligence, file history integration (Git/SVN/Mercurial), mature and highly configurable.
* **Cons:** Written in Java; very heavy on memory and CPU; indexing large repos can take a significant amount of time.

#### Docker Compose Setup
Create `./src` (where your source code lives), `./etc`, and `./data` directories first.

**`docker-compose.yml`:**
```yaml
services:
  opengrok:
    container_name: opengrok
    image: opengrok/docker:latest
    ports:
      - "8080:8080/tcp"
    environment:
      SYNC_PERIOD_MINUTES: '60'
    volumes:
      - ./src:/opengrok/src/
      - ./etc:/opengrok/etc/
      - ./data:/opengrok/data/
    restart: unless-stopped
```
Run `docker compose up -d`, put your repositories in `./src`, and OpenGrok will automatically begin indexing them and serving the UI at `http://localhost:8080`.

---

## 3. The Modern Successor: Sourcebot
With Sourcegraph out of the open-source game, **Sourcebot** has emerged as a premium, self-hosted developer portal. It uses **Zoekt** (the same high-performance trigram engine used by Sourcegraph) for core search, and layers a modern UI and optional LLM-based agentic intelligence on top.

([web](https://sourcebot.dev) | [code](https://github.com/sourcebot-dev/sourcebot) | [docs](https://docs.sourcebot.dev))

* **Best for:** Teams who want a modern replacement for Sourcegraph that includes natural-language code understanding.
* **Pros:** Highly scalable (thanks to Zoekt), clean modern UI, indexes repositories from GitHub/GitLab natively, and can be wired to your own LLM API keys for answering complex questions about your codebase.
* **Cons:** Slightly more complex configuration due to its modular nature.

#### Docker Compose Setup
To run Sourcebot, you create a JSON configuration file pointing to your repos.

**`sourcebot-config.json`:**
```json
{
  "$schema": "https://raw.githubusercontent.com/sourcebot-dev/sourcebot/main/schemas/v3/index.json",
  "connections": {
    "my-github": {
      "type": "github",
      "token": "your-github-personal-access-token",
      "repos": [
        "your-org/your-repo"
      ]
    }
  },
  "models": [
    {
      "provider": "openai",
      "model": "gpt-4o",
      "token": { "env": "OPENAI_API_KEY" }
    }
  ],
  "settings": {
    "maxFileSize": 2000000
  }
}
```

**`docker-compose.yml`:**
```yaml
services:
  sourcebot:
    container_name: sourcebot
    image: ghcr.io/sourcebot-dev/sourcebot:latest
    ports:
      - "3000:3000"
    environment:
      - CONFIG_PATH=/config/sourcebot-config.json
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - SOURCEBOT_TELEMETRY_DISABLED=true
    volumes:
      - ./sourcebot-config.json:/config/sourcebot-config.json
      - ./sourcebot-data:/data
    restart: unless-stopped
```
Run `docker compose up -d` and visit `http://localhost:3000`.

---

## Summary & Recommendations

Here is a quick breakdown to help you choose:

| Tool | Indexing Style | Best For | Memory Footprint |
| :--- | :--- | :--- | :--- |
| **Hound** | Trigram | Quick & easy multi-repo search | Very Low |
| **Livegrep** | RE2 Suffix Array | Instant regex for massive codebases | Low (once indexed) |
| **OpenGrok** | AST / Lucene | Deep code navigation & definitions | High |
| **Sourcebot** | Zoekt (Trigram) + AI | Modern self-hosted Sourcegraph alternative | Medium |

### My Personal Take
*(Write your personal take and experiences here!)*
