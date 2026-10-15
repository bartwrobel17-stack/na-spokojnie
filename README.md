# Na Spokojnie

Responsywna strona restauracji **Na Spokojnie** we Wrocławiu. Projekt oparty na Next.js App Router, React i TypeScript, przygotowany do wdrożenia na Vercel.

## Funkcje

- Strona publiczna z sekcjami o restauracji, menu, pełnej karcie menu, galerii, opiniach i kontakcie.
- Wyrazisty, editorialowy kierunek wizualny: ciepłe tło, ciemny hero, limonkowy akcent i kontrastowa typografia.
- Responsywna nawigacja mobilna.
- Galeria zdjęć z podglądem w lightboxie i nawigacją poprzednie/następne.
- Panel właściciela z zakładkami **Galeria** i **Menu**.
- Niezależne dane dla galerii restauracji, pozycji menu oraz pełnych zdjęć stron karty menu.
- Edycja nazw, opisów, cen i zdjęć pozycji menu.
- Upload wielu zdjęć, podgląd i usuwanie.
- Dane strukturalne Restaurant, canonical, Open Graph, sitemap i robots.
- Przyciski telefonu i wyznaczania trasy w Google Maps.

## Stack

- Next.js 15
- React 19
- TypeScript
- CSS
- Vercel

## Uruchomienie lokalne

Wymagany Node.js w wersji zgodnej z Next.js 15.

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

Build produkcyjny:

```bash
npm run build
npm run start
```

## Panel właściciela: wersja demo

Panel jest dostępny przez link **Panel właściciela** w stopce. Hasło demonstracyjne: `admin`.

**Ważne:** aktualna wersja zapisuje dane w `localStorage` przeglądarki. Zmiany są widoczne na stronie w tej samej przeglądarce i na tym samym urządzeniu, ale nie synchronizują się pomiędzy urządzeniami ani użytkownikami. Hasło demo nie jest zabezpieczeniem produkcyjnym.

Dane są rozdzielone kluczami:
- `nsp-gallery` — zdjęcia galerii restauracji,
- `nsp-menu` — pozycje menu wraz ze zdjęciami,
- `nsp-menu-photos` — zdjęcia pełnych stron karty menu.

Uploady są w wersji demo przechowywane jako Data URL w localStorage. Duże zdjęcia lub duża liczba plików mogą wyczerpać limit pamięci przeglądarki. Do produkcji należy przenieść pliki do storage.

## Przygotowanie do Supabase

Aby przejść na trwałe dane bez przebudowy interfejsu:

1. Utwórz tabele, np. `menu_items` oraz `site_media`, z polem typu/roli rozróżniającym `gallery`, `menu_item` i `menu_page`.
2. Przenieś zdjęcia do Supabase Storage, a w rekordach przechowuj ścieżki lub publiczne URL-e zamiast Data URL.
3. Bieżący adapter demo znajduje się w `lib/browser-storage.ts`. Rozszerz go lub zastąp repozytorium Supabase, zachowując ten sam kontrakt odczytu/zapisu dla komponentów.
4. Włącz Supabase Auth i zabezpiecz operacje zapisu regułami RLS. Nie używaj stałego hasła w kodzie frontendu.
5. Dodaj zmienne środowiskowe `NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY` w ustawieniach projektu Vercel.

Nie należy traktować bieżącego panelu localStorage jako bezpiecznego systemu administracyjnego.

## Zdjęcia

Zdjęcie hero korzysta z fotografii „Gourmet Hamburger (Unsplash)” dostępnej w Wikimedia Commons na licencji CC0 / domenie publicznej. Zdjęcia galerii startowej pochodzą z materiałów udostępnionych dla projektu. Przed publikacją produkcyjną upewnij się, że masz prawa do wszystkich zdjęć, które dodajesz.

## SEO i adres wdrożenia

Metadane, canonical, sitemap i robots korzystają ze zmiennej `NEXT_PUBLIC_SITE_URL`. Skopiuj `.env.example` do `.env.local` i wpisz adres produkcyjny. Na Vercel ustaw tę samą zmienną w Settings → Environment Variables. Jeśli nie ustawisz zmiennej, projekt użyje adresu `https://na-spokojnie.vercel.app`.

## Wdrożenie na Vercel

1. Zaimportuj repozytorium GitHub do Vercel.
2. Pozostaw ustawienia Next.js wykryte automatycznie.
3. Wdróż gałąź `main`.
4. Po podpięciu domeny zaktualizuj adres kanoniczny i sitemap.
