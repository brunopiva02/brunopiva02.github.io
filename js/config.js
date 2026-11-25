/* ==========================================================
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITÁS EDITAR
   para cambiar links, temas de Spotify y audios.
   Al terminar, ejecutá generar.cmd (doble clic) para actualizar
   las páginas en inglés y lo que lee Google.
   ========================================================== */
window.SITE = {
  email: "brunoproduccionesmusicales@gmail.com",

  // Dirección del sitio publicado, por ejemplo "https://brunopiva.com". Después ejecutá generar.cmd.
  url: "https://brunopiva02.github.io",

  // Dirección de Formspree que recibe los mensajes del formulario de contacto.
  form: "https://formspree.io/f/xaeoazen",

  // Un link vacío ("") no se muestra en el sitio.
  links: {
    Fiverr: "https://www.fiverr.com/bruno_piva",
    Instagram: "https://www.instagram.com/brunopiva_/",
    "itch.io": "https://brunopiva02.itch.io",
    SoundCloud: "",
    Spotify: "",
    YouTube: "",
    LinkedIn: "https://www.linkedin.com/in/bruno-piva-461441310"
  },

  // Gigs de Fiverr. Si queda vacío, el botón lleva al perfil.
  gigs: {
    videojuegos: "https://www.fiverr.com/bruno_piva/produce-cozy-lofi-and-chill-music-for-your-indie-game",
    guitarraFunk: "https://www.fiverr.com/bruno_piva/be-your-session-guitarist",
    guitarraLoops: "https://www.fiverr.com/bruno_piva/make-the-most-suitable-guitar-part-for-your-song"
  },

  // Pegá links de Spotify (tema, álbum, playlist o artista): Compartir > Copiar enlace.
  spotify: {
    guitarras: ["https://open.spotify.com/playlist/1A6UpfienELpPlOChb9LE1"]
  },

  // Reseñas reales de Fiverr. text = texto original; es / en = traducción (solo si hace falta).
  // track = id del tema relacionado (agrega botón para escucharlo y link al juego).
  rating: { value: "5,0", valueEn: "5.0", count: 4 },
  reviews: [
    { text: "Working with him was a wonderful experience! He kept in touch throughout the whole process and went above and beyond what I originally asked for. His work is fantastic, and he’s incredibly talented. I’m so happy with the music he created for my game. I highly recommend working with him!", lang: "en",
      es: "¡Trabajar con él fue una experiencia maravillosa! Estuvo en contacto durante todo el proceso y fue mucho más allá de lo que le pedí al principio. Su trabajo es fantástico y tiene un talento increíble. Estoy muy feliz con la música que creó para mi juego. ¡Recomiendo mucho trabajar con él!",
      author: "charlier1991", country: "Argentina", track: "cursed-harvest-mini-main-theme", work: "Música para The Cursed Harvest Mini", workEn: "Music for The Cursed Harvest Mini", pages: ["home", "videojuegos"] },
    { text: "Grande Bruno! Grazie per il tuo lavoro, era proprio quello che cercavo! Sei stato veloce ed efficace. Come si deve essere su Fiverr! A presto", lang: "it",
      es: "¡Grande, Bruno! Gracias por tu trabajo, ¡era justo lo que buscaba! Fuiste rápido y eficaz. ¡Como hay que ser en Fiverr! Hasta pronto.",
      en: "Great, Bruno! Thanks for your work, it was exactly what I was looking for! You were fast and efficient. Just how it should be on Fiverr! See you soon.",
      author: "elpidiodevinz", country: "Italia", countryEn: "Italy", work: "Grabación de guitarras", workEn: "Guitar recording", pages: ["home", "guitarras"] },
    { text: "tempi, costo, lavoro, ...tutto benissimo!!!", lang: "it", es: "Tiempos, costo, trabajo... ¡todo buenísimo!", en: "Timing, cost, work... all excellent!",
      author: "elpidiodevinz", country: "Italia", countryEn: "Italy", work: "Grabación de guitarras", workEn: "Guitar recording", pages: ["guitarras"] },
    { text: "great guitars", lang: "en", es: "Excelentes guitarras.", author: "beatboy19", country: "Estados Unidos", countryEn: "United States", work: "Grabación de guitarras", workEn: "Guitar recording", pages: ["home", "guitarras"] }
  ],

  // Para sumar un tema: copiá el MP3 en /audio y agregá un renglón.
  // genre = en qué bloque de Videojuegos aparece (Chiptune, Doom Metal, Jazz Noir, Indie Chill) o de Cine (Cisma, Otras piezas) o de Producción (Electrónica, Rock, Lofi).
  // before = id del MP3 "antes" (maqueta): agrega el selector Antes / Después.
  // spotify = link del tema en Spotify (opcional).
  // game = link a la página del juego (opcional).
  // pages = en qué páginas aparece ("videojuegos", "cine", "guitarras", "produccion").
  tracks: [
    { id: "shopping-security-123", genre: "Chiptune", project: "Shopping Security", game: "https://lefrancha.itch.io/shopping-security", title: "Niveles 1, 2 y 3", en: "Levels 1, 2 and 3", pages: ["videojuegos"] },
    { id: "shopping-security-456", genre: "Chiptune", project: "Shopping Security", game: "https://lefrancha.itch.io/shopping-security", title: "Niveles 4, 5 y 6", en: "Levels 4, 5 and 6", pages: ["videojuegos"] },
    { id: "go-home-main-theme", genre: "Chiptune", project: "Go Home", title: "Tema principal", en: "Main theme", pages: ["videojuegos"] },
    { id: "ultrainquisition-main-theme", genre: "Doom Metal", project: "UltraInquisition", game: "https://jeremiasbeltran.itch.io/ultrainquisition", title: "Tema principal", en: "Main theme", pages: ["videojuegos"] },
    { id: "spookigram-main-theme", genre: "Jazz Noir", project: "Spookigram", game: "https://insolgar.itch.io/spookigram", title: "Tema principal", en: "Main theme", pages: ["videojuegos"] },
    { id: "spookigram-menu-music", genre: "Jazz Noir", project: "Spookigram", game: "https://insolgar.itch.io/spookigram", title: "Música de menú", en: "Menu music", pages: ["videojuegos"] },
    { id: "cursed-harvest-mini-main-theme", genre: "Indie Chill", project: "The Cursed Harvest Mini", game: "https://prickleworld.itch.io/the-cursed-harvest-mini", title: "Tema principal", en: "Main theme", pages: ["videojuegos"] },
    { id: "cursed-harvest-mini-menu-music", genre: "Indie Chill", project: "The Cursed Harvest Mini", game: "https://prickleworld.itch.io/the-cursed-harvest-mini", title: "Música de menú", en: "Menu music", pages: ["videojuegos"] },
    { id: "fishing-song", genre: "Indie Chill", project: "Fishing Song", title: "Demo", en: "Demo", pages: ["videojuegos"] },

    { id: "cisma-radio", genre: "Cisma", project: "Radio", title: "Cisma", en: "Cisma", pages: ["cine"] },
    { id: "cisma-bosque", genre: "Cisma", project: "Bosque", projectEn: "Forest", title: "Cisma", en: "Cisma", pages: ["cine"] },
    { id: "cisma-paranoia", genre: "Cisma", project: "Paranoia", title: "Cisma", en: "Cisma", pages: ["cine"] },
    { id: "cisma-tension", genre: "Cisma", project: "Tensión", projectEn: "Tension", title: "Cisma", en: "Cisma", pages: ["cine"] },
    { id: "cisma-pesadilla", genre: "Cisma", project: "Pesadilla", projectEn: "Nightmare", title: "Cisma", en: "Cisma", pages: ["cine"] },
    { id: "cisma-bano", genre: "Cisma", project: "Baño", projectEn: "Bathroom", title: "Cisma", en: "Cisma", pages: ["cine"] },
    { id: "filmscore-101", genre: "Otras piezas", project: "Filmscore 101", title: "Demo", en: "Demo", pages: ["cine"] },


    { id: "trance-lisergico", genre: "Electrónica", project: "Trance Lisérgico", title: "SODOMA", en: "SODOMA", pages: ["produccion"] },
    { id: "mescalina", genre: "Electrónica", project: "Mescalina", title: "SODOMA", en: "SODOMA", pages: ["produccion"] },
    { id: "arrakis", genre: "Electrónica", project: "Arrakis", title: "SODOMA", en: "SODOMA", pages: ["produccion"] },
    { id: "la-tua-bicicletta", genre: "Rock", project: "La Tua Bicicletta", title: "Elpidiodv", en: "Elpidiodv", before: "la-tua-bicicletta-maqueta", pages: ["produccion"] },
    { id: "amantes", genre: "Lofi", project: "Amantes", title: "Ruka", en: "Ruka", spotify: "https://open.spotify.com/track/1Ur7JeS5KesWFzZJfnB3nl", pages: ["produccion"] },
    { id: "hypnos", genre: "Lofi", project: "Hypnos", title: "Ruka", en: "Ruka", spotify: "https://open.spotify.com/track/65lLD4vYb11S4Aeyu7FYd6", pages: ["produccion"] },
    { id: "oniris", genre: "Lofi", project: "Oniris", title: "Ruka", en: "Ruka", spotify: "https://open.spotify.com/track/1EltpCtlE8NiTaT8nZQhoZ", pages: ["produccion"] }
  ]
};
