"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { business, defaultMenu, reviews, starterGallery, type MenuItem } from "../lib/site-data";



export default function Home() {
  const [photos, setPhotos] = useState(starterGallery);
  const [menu, setMenu] = useState<MenuItem[]>(defaultMenu);
  const [menuPhotos, setMenuPhotos] = useState<string[]>([]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [panel, setPanel] = useState(false);
  const [logged, setLogged] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState<"gallery" | "menu">("gallery");

  useEffect(() => {
    const savedPhotos = localStorage.getItem("nsp-gallery");
    const savedMenu = localStorage.getItem("nsp-menu");
    const savedMenuPhotos = localStorage.getItem("nsp-menu-photos");
    if (savedPhotos) setPhotos(JSON.parse(savedPhotos));
    if (savedMenu) setMenu(JSON.parse(savedMenu));
    if (savedMenuPhotos) setMenuPhotos(JSON.parse(savedMenuPhotos));
  }, []);

  const savePhotos = (next: string[]) => {
    setPhotos(next);
    localStorage.setItem("nsp-gallery", JSON.stringify(next));
  };

  const saveMenu = (next: MenuItem[]) => {
    setMenu(next);
    localStorage.setItem("nsp-menu", JSON.stringify(next));
  };

  const saveMenuPhotos = (next: string[]) => {
    setMenuPhotos(next);
    localStorage.setItem("nsp-menu-photos", JSON.stringify(next));
  };

  const addMenuPhotos = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => setMenuPhotos(current => {
        const next = [...current, String(reader.result)];
        localStorage.setItem("nsp-menu-photos", JSON.stringify(next));
        return next;
      });
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const addPhotos = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos(current => {
          const next = [...current, String(reader.result)];
          localStorage.setItem("nsp-gallery", JSON.stringify(next));
          return next;
        });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const updateMenu = (id: number, patch: Partial<MenuItem>) => {
    saveMenu(menu.map(item => item.id === id ? { ...item, ...patch } : item));
  };

  const addMenuItem = () => {
    saveMenu([...menu, {
      id: Date.now(),
      title: "Nowa pozycja",
      description: "Opis pozycji.",
      price: "29 zł"
    }]);
  };

  const addMenuPhoto = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateMenu(id, { image: String(reader.result) });
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <main>
      <header>
        <b>NA <span>SPOKOJNIE</span></b>
        <nav className={mobileNavOpen ? "open" : ""}>
          {[["#o-nas", "O nas"], ["#menu", "Menu"], ["#pelna-karta", "Karta menu"], ["#galeria", "Galeria"], ["#opinie", "Opinie"], ["#kontakt", "Kontakt"]].map(([href, label]) => <a key={href} href={href} onClick={() => setMobileNavOpen(false)}>{label}</a>)}
        </nav>
        <a className="phone" href={business.phoneHref}>{business.phoneDisplay}</a>
        <button className="mobileMenuToggle" aria-label={mobileNavOpen ? "Zamknij menu" : "Otwórz menu"} aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen(!mobileNavOpen)}>{mobileNavOpen ? "×" : "☰"}</button>
      </header>

      <section className="hero">
        <div className="heroText">
          <small>WROCŁAW · KRZYKI</small>
          <h1>Dobre rzeczy.<br/><i>Na spokojnie.</i></h1>
          <p>Restauracja, w której można zwolnić, dobrze zjeść i zostać trochę dłużej.</p>
          <div><a className="btn acid" href="{business.mapsDirections}" target="_blank">Wyznacz trasę ↗</a><a className="btn outline" href="#menu">Zobacz menu</a></div>
        </div>
        <div className="heroImg"><Image src={heroImage} alt="Elegancki burger w restauracji Na Spokojnie" fill priority sizes="50vw"/></div>
        <div className="rating">5,0<br/><small>451 opinii</small></div>
      </section>

      <section id="o-nas" className="split">
        <div><small>01 / O NAS</small><h2>Miejsce, do którego <em>wpada się bez pośpiechu.</em></h2></div>
        <p>Na Spokojnie to lokal przy Grota-Roweckiego 71 we Wrocławiu. Świeże jedzenie, swobodna atmosfera i ludzie, którzy potrafią cieszyć się chwilą. Śniadanie, burger, frytki albo po prostu coś dobrego. Bez zadęcia.</p>
      </section>

      <section id="menu" className="cream">
        <div className="head"><div><small>02 / NA TALERZU</small><h2>Popularne wybory</h2></div><span>{business.priceRange}</span></div>
        <div className="cards">
          {menu.map((item, i) => <article key={item.id}>
            {item.image && <div className="menuCardImage"><Image src={item.image} alt={item.title} fill sizes="33vw"/></div>}
            <b>{String(i + 1).padStart(2, "0")}</b><h3>{item.title}</h3><p>{item.description}</p><strong>{item.price}</strong>
          </article>)}
        </div>
      </section>

      <section id="pelna-karta" className="fullMenuSection">
        <div className="head"><div><small>03 / PEŁNA KARTA MENU</small><h2>Wybierz coś dla siebie.</h2></div><span>{menuPhotos.length ? `${menuPhotos.length} stron karty` : "Karta menu"}</span></div>
        {menuPhotos.length ? <div className="menuPhotoGallery">{menuPhotos.map((photo, i) => <div className="menuPagePreview" key={i}><Image src={photo} alt={`Pełna karta menu, strona ${i + 1}`} fill sizes="(max-width: 700px) 90vw, 28vw" /></div>)}</div> : <p className="menuPlaceholder">Pełna karta menu pojawi się tutaj. Właściciel może dodać zdjęcia wszystkich stron karty w panelu.</p>}
      </section>

      <section id="galeria" className="gallery">
        <div className="head"><div><small>03 / GALERIA</small><h2>Tak to u nas wygląda</h2></div><span>{photos.length} zdjęć</span></div>
        <div className="grid">{photos.map((p, i) => <button key={i} onClick={() => setActive(i)}><Image src={p} alt={"Na Spokojnie " + (i + 1)} fill sizes="25vw"/></button>)}</div>
      </section>

      <section id="opinie" className="dark">
        <small>04 / GOŚCIE MÓWIĄ</small><div className="bigRating">5,0 <span>★★★★★</span></div>
        <div className="reviews">{reviews.map(review => <article key={review.name}><div>★★★★★</div><p>„{review.text}”</p><b>{review.name}</b></article>)}</div>
      </section>

      <section id="kontakt" className="split contact">
        <div><small>05 / WPADNIJ</small><h2>Zostaw pośpiech<br/>za drzwiami.</h2><a className="bigPhone" href="tel:+48577722263">577 722 263</a></div>
        <div><p><b>ADRES</b><br/>{business.address.split(", ")[0]}<br/>52-218 Wrocław</p><p><b>GODZINY</b><br/>Godziny do potwierdzenia</p><a className="btn black" href="https://www.google.com/maps/dir/?api=1&destination=Grota-Roweckiego+71,+52-218+Wrocław" target="_blank">Wyznacz trasę ↗</a></div>
      </section>

      <iframe className="map" title="Mapa" src={business.mapsEmbed} loading="lazy"/>

      <footer><b>NA <span>SPOKOJNIE</span></b><span>Grota-Roweckiego 71 · Wrocław</span><button onClick={() => setPanel(true)}>Panel właściciela</button></footer>

      {active !== null && <div className="lightbox" onClick={() => setActive(null)}>
        <button className="nav" onClick={e => { e.stopPropagation(); setActive((active - 1 + photos.length) % photos.length); }}>‹</button>
        <Image src={photos[active]} alt="" fill sizes="100vw" style={{ objectFit: "contain" }}/>
        <span className="lightboxCount">{active + 1} / {photos.length}</span><button className="close" aria-label="Zamknij galerię" onClick={() => setActive(null)}>×</button>
        <button className="next" onClick={e => { e.stopPropagation(); setActive((active + 1) % photos.length); }}>›</button>
      </div>}

      {panel && <div className="overlay">
        <div className="owner" role="dialog" aria-modal="true" aria-label="Panel właściciela">
          <button className="x" aria-label="Zamknij panel" onClick={() => setPanel(false)}>×</button>
          {!logged ? <>
            <small>STREFA WŁAŚCICIELA</small>
            <h2>Zarządzaj stroną</h2>
            <p>Demo lokalne. Hasło: admin. Zmiany są zapisywane w tej przeglądarce. Później można podłączyć Supabase bez przebudowy panelu.</p>
            <input type="password" placeholder="Hasło" value={pass} onChange={e => setPass(e.target.value)}/>
            <button className="btn black full" onClick={() => pass === "admin" && setLogged(true)}>Zaloguj</button>
          </> : <>
            <small>PANEL WŁAŚCICIELA</small>
            <div className="tabs">
              <button className={tab === "gallery" ? "selected" : ""} onClick={() => setTab("gallery")}>Galeria</button>
              <button className={tab === "menu" ? "selected" : ""} onClick={() => setTab("menu")}>Menu</button>
            </div>

            {tab === "gallery" ? <>
              <h2>Galeria</h2>
              <label className="upload">＋ Dodaj zdjęcia<input type="file" accept="image/*" multiple onChange={addPhotos}/></label>
              <div className="admin">{photos.map((p, i) => <div key={i}>
                <Image src={p} alt="" fill sizes="150px"/>
                <button onClick={() => savePhotos(photos.filter((_, j) => j !== i))}>Usuń</button>
              </div>)}</div>
            </> : <>
              <div className="menuAdminHeader"><div><h2>Menu</h2><p>Edytuj nazwę, opis, cenę i zdjęcie każdej pozycji.</p></div><button className="btn black" onClick={addMenuItem}>＋ Dodaj pozycję</button></div>
              <section className="fullMenuAdmin">
                <div><h3>Pełne zdjęcia karty menu</h3><p>To osobna galeria stron karty, niezależna od galerii restauracji i zdjęć dań.</p></div>
                <label className="upload">＋ Dodaj zdjęcia pełnej karty<input type="file" accept="image/*" multiple onChange={addMenuPhotos}/></label>
                <div className="admin menuPageAdmin">{menuPhotos.map((photo, i) => <div key={i}><Image src={photo} alt={`Strona karty menu ${i + 1}`} fill sizes="150px"/><button onClick={() => saveMenuPhotos(menuPhotos.filter((_, j) => j !== i))}>Usuń</button></div>)}</div>
              </section>
              <div className="menuAdmin">
                {menu.map(item => <article className="menuItem" key={item.id}>
                  <div className="menuFields">
                    <input value={item.title} onChange={e => updateMenu(item.id, { title: e.target.value })} placeholder="Nazwa"/>
                    <textarea value={item.description} onChange={e => updateMenu(item.id, { description: e.target.value })} placeholder="Opis"/>
                    <input value={item.price} onChange={e => updateMenu(item.id, { price: e.target.value })} placeholder="Cena"/>
                  </div>
                  <div className="menuPhoto">
                    {item.image ? <Image src={item.image} alt={item.title} fill sizes="180px"/> : <span>Brak zdjęcia</span>}
                  </div>
                  <div className="menuPhotoControls">
                    <label className="miniUpload">＋ {item.image ? "Zmień zdjęcie" : "Dodaj zdjęcie"}<input type="file" accept="image/*" onChange={e => addMenuPhoto(item.id, e)}/></label>
                    {item.image && <button onClick={() => updateMenu(item.id, { image: undefined })}>Usuń zdjęcie</button>}
                    <button className="danger" onClick={() => saveMenu(menu.filter(x => x.id !== item.id))}>Usuń pozycję</button>
                  </div>
                </article>)}
              </div>
            </>}
          </>}
        </div>
      </div>}
    </main>
  );
}
