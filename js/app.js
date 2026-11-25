(() => {
  const S = window.SITE, W = window.WAVES || {};
  const $ = (q, r = document) => r.querySelector(q), $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* modo privado */ } }
  };

  /* ---------- Idioma ---------- */
  const ROOT = new URL("..", document.currentScript.src).href; // carpeta del sitio
  let lang = document.documentElement.lang === "en" ? "en" : "es";
  const t = (es, en) => (lang === "en" ? en : es);
  const projectName = k => t(k.project, k.projectEn || k.project);
  const pageIn = l => `${ROOT}${l === "en" ? "en/" : ""}${document.body.dataset.page}.html`;
  // Primera visita en español con navegador en otro idioma: se ofrece la versión en inglés.
  // Los buscadores y las vistas previas de links quedan afuera.
  const bot = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|linkedin|lighthouse|inspection/i.test(navigator.userAgent);
  const wanted = store.get("lang") || ((navigator.language || "es").startsWith("es") ? "es" : "en");
  if (lang === "es" && wanted === "en" && !bot) { location.replace(pageIn("en") + location.hash); return; }
  /* ---------- Íconos ---------- */
  const PICK = '<svg class="pick" viewBox="0 0 40 44" aria-hidden="true"><path d="M20 2C31 2 38 5 38 12c0 11-11 30-18 30S2 23 2 12C2 5 9 2 20 2Z"/></svg>';
  const svg = d => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
  const I = {
    play: svg("M7 4v16l13-8z"), pause: svg("M6 4h4v16H6zM14 4h4v16h-4z"),
    prev: svg("M5 4h3v16H5zM20 4v16L9 12z"), next: svg("M16 4h3v16h-3zM4 4v16l11-8z"),
    close: svg("M5 6.4 6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12z"),
    vol: svg("M3 9v6h4l5 5V4L7 9zm13-1.5v9a5 5 0 0 0 0-9z")
  };
  const NAV = [["index.html", "Inicio", "Home"], ["videojuegos.html", "Videojuegos", "Video games"],
    ["cine.html", "Cine", "Film score"], ["guitarras.html", "Guitarras", "Guitars"],
    ["produccion.html", "Producción musical", "Music production"],
    ["index.html#sobre-mi", "Sobre mí", "About me"], ["#contacto", "Contacto", "Contact"]];
  const ext = 'target="_blank" rel="noopener"';
  const brand = n => (window.ICONS && ICONS[n] ? svg(ICONS[n]).replace("ico", "ico brand") : "");
  const socials = () => Object.entries(S.links).filter(([, u]) => u).map(([n, u]) => `<a href="${u}" ${ext} aria-label="${n}">${n === "Fiverr" ? brand(n).replace("0 0 24 24", "0 8.2 24 7.6").replace("brand", "brand wide") : brand(n) + n}</a>`).join("");

  /* ---------- Cabecera, menú, contacto ---------- */
  function renderShell() {
    const page = document.body.dataset.page;
    $("#header").innerHTML = `
      <a class="logo" href="index.html" aria-label="Bruno Piva, ${t("inicio", "home")}">${PICK}</a>
      <div class="head-actions">
        <button class="btn ghost" data-lang aria-label="${t("Switch to English", "Cambiar a español")}">${t("EN", "ES")}</button>
        <a class="btn" href="#contacto">${t("Hablemos", "Let’s talk")}</a>
        <button class="btn ghost" data-menu aria-expanded="false" aria-controls="menu">${t("Menú", "Menu")}</button>
      </div>`;
    $("#menu").innerHTML = `<nav aria-label="${t("Principal", "Main")}">${NAV.map(([h, es, en]) =>
      `<a href="${h}"${h === page + ".html" ? ' aria-current="page"' : ""}>${t(es, en)}</a>`).join("")}</nav>
      <div class="menu-links"><a href="mailto:${S.email}">${S.email}</a>${socials()}</div>`;
    $("#contacto").innerHTML = `
      <div class="contact-in">
        <div>
          <h2 class="big">${t("Contame qué estás haciendo.", "Tell me what you’re making.")}</h2>
          <p class="lede">${t("Un juego, un corto, una canción a medio terminar. Con un par de líneas alcanza para empezar.", "A game, a short film, a half-finished song. A couple of lines is enough to start.")}</p>
          <p class="mail"><a href="mailto:${S.email}">${S.email}</a><button class="btn ghost" data-copy>${t("Copiar", "Copy")}</button></p>
          <div class="socials">${socials()}</div>
        </div>
        <form id="cform">
          <label>${t("Tu nombre", "Your name")}<input name="name" autocomplete="name" required></label>
          <label>${t("Tu email", "Your email")}<input name="email" type="email" autocomplete="email" required></label>
          <input class="trap" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
          <label>${t("¿Qué necesitás?", "What do you need?")}<select name="what">
            ${[["videojuegos", "Música para un videojuego", "Music for a video game"], ["cine", "Música para cine o video", "Music for film or video"], ["guitarras", "Grabación de guitarras", "Guitar recording"], ["produccion", "Producción musical", "Music production"], ["", "Otra cosa", "Something else"]]
        .map(([p, es, en]) => `<option${p && p === page ? " selected" : ""}>${t(es, en)}</option>`).join("")}
          </select></label>
          <label>${t("Tu proyecto", "Your project")}<textarea name="msg" rows="4" required></textarea></label>
          <button class="btn" type="submit">${t("Enviar mensaje", "Send message")}</button>
          <p class="note" role="status">${t("Te respondo al email que dejes acá.", "I’ll reply to the email you leave here.")}</p>
        </form>
      </div>
      <footer><span>© ${new Date().getFullYear()} Bruno Piva</span><a href="#top">${t("Volver arriba", "Back to top")}</a></footer>`;
  }
  function toggleMenu(open) {
    const m = $("#menu");
    m.classList.toggle("open", open); m.inert = !open;
    document.body.classList.toggle("menu-open", open);
    const b = $("[data-menu]");
    b.setAttribute("aria-expanded", open); b.textContent = open ? t("Cerrar", "Close") : t("Menú", "Menu");
  }

  /* ---------- Audio ---------- */
  const decks = [new Audio(), new Audio()]; decks.forEach(d => { d.preload = "none"; });
  let audio = decks[0];
  const spare = () => decks.find(d => d !== audio);
  const before = new Set(); // temas que suenan en su versión "antes"
  const fileOf = k => (k.before && before.has(k.id) ? k.before : k.id);
  let cur = null, queue = S.tracks, failed = false;
  const dur = k => (isFinite(audio.duration) && k === cur && audio.duration) || (W[fileOf(k)] || {}).dur || 0;
  const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const level = (k, sec) => { const e = (W[fileOf(k)] || {}).env; const c = e && e[Math.floor(sec * 10)]; return c ? parseInt(c, 36) / 35 : 0; };

  function play(k, at) {
    if (cur !== k) {
      cur = k; failed = false;
      spare().pause();
      audio.src = `${ROOT}audio/${fileOf(k)}.mp3`;
      renderPlayer(); primeOther(k);
    }
    if (at !== undefined) audio.currentTime = at;
    audio.play().catch(e => { if (e.name !== "AbortError") sync(); });
  }
  // Antes / Después: se precarga la otra versión para cambiar sin cortes
  function primeOther(k) {
    const d = spare();
    if (!k.before) { d.removeAttribute("src"); d.preload = "none"; return; }
    d.src = `${ROOT}audio/${before.has(k.id) ? k.id : k.before}.mp3`; d.preload = "auto"; d.load();
  }
  // Equivalencia de tiempos entre maqueta y final (m = segundo de la final cada 2 s de maqueta)
  function mapTime(k, sec, toBefore) {
    const m = (W[k.before] || {}).map;
    if (!m) return sec;
    if (!toBefore) {
      const i = Math.min(m.length - 2, Math.floor(sec / 2));
      return m[i] + (m[i + 1] - m[i]) * Math.min(1, sec / 2 - i);
    }
    let i = 0; while (i < m.length - 2 && m[i + 1] < sec) i++;
    return 2 * (i + Math.max(0, Math.min(1, (sec - m[i]) / (m[i + 1] - m[i]))));
  }
  function setVersion(k, toBefore) {
    if (before.has(k.id) === toBefore) { if (cur !== k || audio.paused) play(k); return; }
    const at = cur === k ? mapTime(k, audio.currentTime, toBefore) : 0;
    toBefore ? before.add(k.id) : before.delete(k.id);
    if (cur !== k) { drawWaves(true); play(k); return; }
    const old = audio, next = spare(), vol = old.volume;
    audio = next; failed = false;
    next.volume = vol;
    next.currentTime = Math.max(0, Math.min(at, dur(k) - 2));
    const swap = () => { // cruce breve cuando la nueva ya suena
      let n = 0;
      const id = setInterval(() => {
        n++; old.volume = vol * Math.max(0, 1 - n / 8);
        if (n >= 8 || audio === old) { clearInterval(id); if (audio !== old) old.pause(); old.volume = audio.volume; }
      }, 20);
    };
    next.addEventListener("playing", swap, { once: true });
    next.play().catch(() => { old.pause(); sync(); });
    renderPlayer(); drawWaves(true);
  }
  const abButtons = k => (!k.before ? "" : `<div class="ab" role="group" aria-label="${t("Versión", "Version")}: ${projectName(k)}">
    <button data-ab="1" data-id="${k.id}">${t("Antes", "Before")}</button><button data-ab="0" data-id="${k.id}">${t("Después", "After")}</button></div>`);
  const toggle = k => (cur === k && !audio.paused ? audio.pause() : play(k));
  function step(d) {
    if (!cur) return;
    const i = queue.indexOf(cur);
    play(queue[(i + d + queue.length) % queue.length]);
  }
  const on = (ev, fn) => decks.forEach(d => d.addEventListener(ev, () => { if (d === audio) fn(); }));
  on("ended", () => { if (queue.indexOf(cur) < queue.length - 1) step(1); else sync(); });
  ["play", "pause"].forEach(e => on(e, sync));
  on("error", () => { if (cur) { failed = true; sync(); } });

  function renderPlayer() {
    const p = $("#player");
    if (!cur) return;
    p.hidden = false; p.classList.toggle("has-ab", !!cur.before); document.body.classList.add("has-player");
    p.innerHTML = `
      <div class="p-ctl">
        <button data-step="-1" aria-label="${t("Anterior", "Previous")}">${I.prev}</button>
        <button class="round" data-pp></button>
        <button data-step="1" aria-label="${t("Siguiente", "Next")}">${I.next}</button>
      </div>
      <div class="p-info"><b>${projectName(cur)}</b><span>${t(cur.title, cur.en)}</span></div>${abButtons(cur)}
      <div class="p-wave"><canvas data-wave="${cur.id}" data-bars="150"></canvas>
        <input type="range" min="0" max="${dur(cur)}" step="0.1" value="${audio.currentTime}" data-seek aria-label="${t("Posición del tema", "Track position")}"></div>
      <span class="time" data-ptime></span>
      <label class="p-vol">${I.vol}<input type="range" min="0" max="1" step="0.01" value="${audio.volume}" data-vol aria-label="${t("Volumen", "Volume")}"></label>
      <button data-close aria-label="${t("Cerrar reproductor", "Close player")}">${I.close}</button>`;
    sync(); drawWaves(true);
  }
  function sync() {
    $$("[data-play]").forEach(b => {
      const k = S.tracks.find(x => x.id === b.dataset.play), on = k === cur && !audio.paused;
      b.innerHTML = on ? I.pause : I.play;
      b.setAttribute("aria-label", `${on ? t("Pausar", "Pause") : t("Reproducir", "Play")}: ${projectName(k)}, ${t(k.title, k.en)}`);
      b.closest(".track").classList.toggle("current", k === cur);
    });
    $$("[data-rplay]").forEach(b => {
      b.textContent = cur && b.dataset.rplay === cur.id && !audio.paused ? t("Pausar", "Pause") : t("Escuchar el tema", "Hear the track");
    });
    $$("[data-ab]").forEach(b => {
      b.setAttribute("aria-pressed", before.has(b.dataset.id) === (b.dataset.ab === "1"));
    });
    const pp = $("[data-pp]");
    if (pp) {
      pp.innerHTML = audio.paused ? I.play : I.pause;
      pp.setAttribute("aria-label", audio.paused ? t("Reproducir", "Play") : t("Pausar", "Pause"));
    }
    const inf = $(".p-info span");
    if (inf && cur) inf.textContent = failed ? t("No se pudo cargar el audio", "Audio could not be loaded") : t(cur.title, cur.en);
    tick();
  }

  /* ---------- Ondas ---------- */
  const cache = {};
  function bars(id, n) {
    const key = id + n;
    if (cache[key]) return cache[key];
    const e = (W[id] || {}).env || "";
    return cache[key] = Array.from({ length: n }, (_, i) => {
      const a = Math.floor(i * e.length / n), b = Math.max(a + 1, Math.floor((i + 1) * e.length / n));
      let m = 0; for (let j = a; j < b; j++) m = Math.max(m, parseInt(e[j] || "0", 36)); return m / 35;
    });
  }
  function drawWaves(all) {
    $$("canvas[data-wave]").forEach(c => {
      const mine = cur && c.dataset.wave === cur.id;
      if (!all && !mine) return;
      const w = c.clientWidth, h = c.clientHeight, r = Math.min(devicePixelRatio || 1, 2);
      if (!w) return;
      if (c.width !== Math.round(w * r)) { c.width = Math.round(w * r); c.height = Math.round(h * r); }
      const x = c.getContext("2d"), n = Math.min(+c.dataset.bars, Math.floor(w / 4)), cs = getComputedStyle(c);
      const on = cs.getPropertyValue("--on"), off = cs.getPropertyValue("--off");
      const pos = mine ? audio.currentTime / (dur(cur) || 1) : 0;
      x.setTransform(r, 0, 0, r, 0, 0); x.clearRect(0, 0, w, h);
      bars(fileOf(S.tracks.find(k => k.id === c.dataset.wave)), n).forEach((v, i) => {
        const bh = Math.max(2, v * h); x.fillStyle = i / n < pos ? on : off;
        x.fillRect(i * w / n, (h - bh) / 2, Math.max(1, w / n - 2), bh);
      });
    });
  }
  function tick() {
    drawWaves(false);
    const s = $("[data-seek]");
    if (s && cur) {
      if (document.activeElement !== s || !s.matches(":active")) { s.max = dur(cur); s.value = audio.currentTime; }
      s.setAttribute("aria-valuetext", fmt(audio.currentTime));
      $("[data-ptime]").textContent = `${fmt(audio.currentTime)} / ${fmt(dur(cur))}`;
    }
    // Las letras del nombre siguen el volumen real del tema
    $$(".wordmark i").forEach((el, i) => {
      const v = cur && !audio.paused && !reduced.matches ? level(cur, Math.max(0, audio.currentTime - i * 0.1)) : 0;
      el.style.transform = `scaleY(${1 + v * 0.75})`;
    });
  }
  let raf = 0;
  const loop = () => { tick(); raf = audio.paused ? 0 : requestAnimationFrame(loop); };
  on("play", () => { if (!raf) raf = requestAnimationFrame(loop); });
  addEventListener("resize", () => drawWaves(true));

  /* ---------- Contenido ---------- */
  function renderContent() {
    $$("[data-tracks]").forEach(box => {
      const list = S.tracks.filter(k => k.pages.includes(box.dataset.tracks) && (!box.dataset.genre || k.genre === box.dataset.genre));
      let last = "";
      box.innerHTML = list.map(k => {
        const repeat = k.project === last; last = k.project;
        return `<li class="track${repeat ? " rep" : ""}"><button class="round" data-play="${k.id}"></button>
        <div class="t-name"><b>${projectName(k)}</b><span>${t(k.title, k.en)}</span>${k.game ? `<a class="game" href="${k.game}" ${ext} aria-label="${t("Jugar", "Play")} ${projectName(k)} ${t("en", "on")} itch.io">${brand("itch.io")}${t("Jugar en itch.io", "Play on itch.io")}</a>` : ""}${k.spotify ? `<a class="game" href="${k.spotify}" ${ext} aria-label="${projectName(k)}, Spotify">${brand("Spotify")}${t("Escuchar en Spotify", "Listen on Spotify")}</a>` : ""}${abButtons(k)}</div>
        <canvas data-wave="${k.id}" data-bars="110" aria-hidden="true"></canvas>
        <span class="time">${fmt(dur(k))}</span></li>`;
      }).join("");
    });
    $$("[data-spotify]").forEach(sec => {
      const urls = (S.spotify[sec.dataset.spotify] || []).map(u =>
        /open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|album|playlist|artist|episode|show)\/([A-Za-z0-9]+)/.exec(u)).filter(Boolean);
      sec.hidden = !urls.length;
      const box = $(".embeds", sec);
      box.innerHTML = urls.map(m => `<iframe title="Spotify" loading="lazy" height="${m[1] === "track" ? 152 : 352}"
        src="https://open.spotify.com/embed/${m[1]}/${m[2]}?theme=0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`).join("");
    });
    $$("[data-reviews]").forEach(sec => {
      const list = (S.reviews || []).filter(r => r.pages.includes(sec.dataset.reviews));
      sec.hidden = !list.length;
      sec.innerHTML = `<div class="sec-head"><h2>${t("Lo que dicen mis clientes", "What my clients say")}</h2>
        <a class="rate" href="${S.links.Fiverr}" ${ext}><span class="stars" aria-hidden="true">★★★★★</span> ${t(S.rating.value, S.rating.valueEn)} ${t("en Fiverr", "on Fiverr")} · ${S.rating.count} ${t("reseñas", "reviews")}</a></div>
        <div class="reviews">${list.map(r => {
        const k = S.tracks.find(x => x.id === r.track), tr = r.lang !== lang && r[lang];
        return `<figure class="rv"><blockquote${tr ? "" : ` lang="${r.lang}"`}>“${tr || r.text}”</blockquote>
          <figcaption><b>${r.author}</b>, ${t(r.country, r.countryEn || r.country)}<span>${t(r.work, r.workEn)}</span>
          ${tr ? `<details><summary>${t("Traducido. Ver original", "Translated. See original")}</summary><p lang="${r.lang}">${r.text}</p></details>` : ""}
          ${k ? `<div class="cta"><button class="btn ghost" data-rplay="${k.id}"></button>${k.game ? `<a class="game" href="${k.game}" ${ext}>${brand("itch.io")}${t("Jugar en itch.io", "Play on itch.io")}</a>` : ""}</div>` : ""}</figcaption></figure>`;
      }).join("")}</div>`;
    });
    $$("[data-social]").forEach(b => { b.innerHTML = `<a href="mailto:${S.email}">${brand("Gmail")}Gmail</a>` + socials(); });
    $$("[data-fiverr]").forEach(a => { const u = (S.gigs || {})[a.dataset.fiverr] || S.links.Fiverr; a.hidden = !u; a.href = u; });
    drawWaves(true); sync();
  }
  function observe() {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    $$(".rv").forEach(e => io.observe(e));
  }
  function renderAll() { renderShell(); renderContent(); renderPlayer(); toggleMenu(false); observe(); }

  /* ---------- Eventos ---------- */
  document.addEventListener("click", e => {
    const q = s => e.target.closest(s);
    let el;
    if ((el = q("[data-ab]"))) {
      const box = el.closest("[data-tracks]");
      if (box) queue = S.tracks.filter(k => k.pages.includes(box.dataset.tracks));
      const id = el.dataset.id, ab = el.dataset.ab, inPlayer = !!el.closest("#player");
      setVersion(S.tracks.find(k => k.id === id), ab === "1");
      if (inPlayer) { const b = $(`#player [data-ab="${ab}"]`); if (b) b.focus(); }
    } else if ((el = q("[data-play]"))) {
      const key = el.closest("[data-tracks]").dataset.tracks;
      queue = S.tracks.filter(k => k.pages.includes(key));
      toggle(S.tracks.find(k => k.id === el.dataset.play));
    } else if ((el = q(".track canvas"))) {
      const r = el.getBoundingClientRect(), k = S.tracks.find(x => x.id === el.dataset.wave);
      const key = el.closest("[data-tracks]").dataset.tracks;
      queue = S.tracks.filter(x => x.pages.includes(key));
      play(k, (e.clientX - r.left) / r.width * dur(k));
    } else if ((el = q("[data-yt]"))) {
      decks.forEach(d => d.pause());
      const f = document.createElement("iframe");
      f.className = "video"; f.title = el.dataset.ytTitle; f.allowFullscreen = true;
      f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      f.referrerPolicy = "strict-origin-when-cross-origin";
      f.src = `https://www.youtube-nocookie.com/embed/${el.dataset.yt}?autoplay=1&rel=0&hl=${lang}`;
      el.replaceWith(f);
    } else if ((el = q("[data-rplay]"))) {
      queue = S.tracks.filter(k => k.pages.includes("videojuegos"));
      toggle(S.tracks.find(k => k.id === el.dataset.rplay));
    } else if (q("[data-pp]")) toggle(cur);
    else if ((el = q("[data-step]"))) step(+el.dataset.step);
    else if (q("[data-close]")) {
      decks.forEach(d => d.pause()); cur = null; $("#player").hidden = true; document.body.classList.remove("has-player"); sync(); drawWaves(true);
    } else if (q("[data-menu]")) toggleMenu(!$("#menu").classList.contains("open"));
    else if (q("[data-lang]")) {
      const to = t("en", "es"), u = new URL(pageIn(to));
      store.set("lang", to);
      if (http) load(u, true).then(() => { const b = $("[data-lang]"); if (b) b.focus(); }); else location.href = u.href;
    } else if ((el = q("[data-copy]"))) {
      const ok = () => { el.textContent = t("Copiado", "Copied"); };
      const select = () => getSelection().selectAllChildren($(".mail a"));
      if (navigator.clipboard) navigator.clipboard.writeText(S.email).then(ok, select); else select();
    } else if ((el = q("a[href]"))) navigate(e, el);
  });
  // Al tocar el reproductor de Spotify se pausa el propio, para que no suenen a la vez
  addEventListener("blur", () => setTimeout(() => {
    const a = document.activeElement;
    if (a && a.tagName === "IFRAME" && /spotify|youtube/.test(a.src)) decks.forEach(d => d.pause());
  }));
  document.addEventListener("input", e => {
    if (e.target.matches("[data-seek]") && cur) { audio.currentTime = +e.target.value; tick(); }
    if (e.target.matches("[data-vol]")) decks.forEach(d => { d.volume = +e.target.value; });
  });
  document.addEventListener("submit", async e => {
    if (e.target.id !== "cform") return;
    e.preventDefault();
    const form = e.target, btn = $("button[type=submit]", form), note = $(".note", form), f = new FormData(form);
    if (btn.disabled) return;
    if (f.get("_gotcha")) { note.textContent = t("¡Listo!", "Done!"); return; } // bot
    const subject = `${f.get("what")}: ${f.get("name")}`;
    f.append("_subject", subject);
    btn.disabled = true; btn.textContent = t("Enviando…", "Sending…");
    note.className = "note"; note.textContent = "";
    try {
      const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 20000);
      const r = await fetch(S.form, { method: "POST", body: f, headers: { Accept: "application/json" }, signal: ctl.signal });
      clearTimeout(timer);
      if (!r.ok) throw 0;
      form.reset();
      note.classList.add("ok");
      note.textContent = t("¡Mensaje enviado! Te respondo pronto.", "Message sent! I’ll reply soon.");
    } catch {
      // Si el servicio falla, el mensaje no se pierde: queda escrito y se ofrece el mail
      const a = document.createElement("a");
      a.href = `mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${f.get("msg")}\n\n${f.get("name")}\n${f.get("email")}`)}`;
      a.textContent = S.email;
      note.classList.add("bad");
      note.replaceChildren(t("No se pudo enviar. Probá de nuevo o escribime a ", "It couldn’t be sent. Try again or write to "), a);
    }
    btn.disabled = false; btn.textContent = t("Enviar mensaje", "Send message");
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && $("#menu").classList.contains("open")) { toggleMenu(false); $("[data-menu]").focus(); }
    if (e.key === " " && cur && !e.target.closest("input,textarea,select,button,a")) { e.preventDefault(); toggle(cur); }
  });
  const preview = e => {
    const a = e.target.closest && e.target.closest("[data-img]");
    if (a) $$(".svc-img > *").forEach(i => i.classList.toggle("on", i.dataset.k === a.dataset.img));
  };
  document.addEventListener("mouseover", preview); document.addEventListener("focusin", preview);

  /* ---------- Navegación sin cortar la música ---------- */
  const http = location.protocol.startsWith("http");
  let shown = location.pathname;
  const goHash = h => { const el = h && h !== "#top" && document.getElementById(h.slice(1)); if (el) el.scrollIntoView(); else scrollTo(0, 0); };
  function navigate(e, a) {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey || a.target) return;
    const u = new URL(a.href);
    if (u.origin !== location.origin || !/^(https?|file):$/.test(u.protocol)) return;
    toggleMenu(false);
    if (u.pathname === location.pathname) { e.preventDefault(); history.pushState(null, "", u.hash || u.pathname); goHash(u.hash); return; }
    if (!http) return;
    e.preventDefault(); load(u, true);
  }
  async function load(u, push) {
    try {
      const r = await fetch(u.pathname); if (!r.ok) throw 0;
      const d = new DOMParser().parseFromString(await r.text(), "text/html"), m = d.querySelector("main");
      if (!m) throw 0;
      if (push) history.pushState(null, "", u.pathname + u.hash); // antes de insertar: las rutas son relativas
      $("main").replaceWith(m); document.body.dataset.page = d.body.dataset.page;
      lang = document.documentElement.lang = d.documentElement.lang; document.title = d.title;
      shown = u.pathname; renderAll(); scrollTo({ top: 0, behavior: "instant" }); goHash(u.hash);
      if (!u.hash) m.focus({ preventScroll: true });
    } catch { location.href = u.href; }
  }
  addEventListener("popstate", () => { if (http && location.pathname !== shown) load(new URL(location.href), false); else goHash(location.hash); });

  document.documentElement.classList.add("js");
  renderAll();
  if (location.hash) goHash(location.hash);
})();
