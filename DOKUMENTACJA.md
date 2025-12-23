# Dokumentacja Projektu Fachowiec Pro

## 1. Wstęp
**Fachowiec Pro** to nowoczesna aplikacja typu Progressive Web App (PWA) dedykowana profesjonalistom świadczącym usługi (remontowe, instalacyjne, naprawcze). Celem projektu jest ułatwienie zarządzania małym biznesem poprzez cyfryzację bazy klientów, zleceń oraz ofertowania, z naciskiem na mobilność i łatwość obsługi.

Aplikacja działa w modelu **Local-First**, co oznacza, że wszystkie dane przechowywane są lokalnie na urządzeniu użytkownika (w przeglądarce), zapewniając błyskawiczne działanie i prywatność bez konieczności ciągłego dostępu do Internetu.

## 2. Stos Technologiczny
Projekt wykorzystuje nowoczesne standardy webowe i ekosystem React:

*   **Frontend:** React 19, Vite 7
*   **Język:** JavaScript (ESNext)
*   **Style:** Vanilla CSS + zmienne CSS (dla łatwej customizacji) + `clsx` do zarządzania klasami.
*   **Stan Aplikacji:** React Context API (brak zewnętrznych bibliotek jak Redux).
*   **Trwałość Danych:** `localStorage` (przeglądarka).
*   **Wizualizacja Danych:** Recharts (wykresy).
*   **Generowanie Dokumentów:** jsPDF + jspdf-autotable (PDF).
*   **Ikony:** Lucide React.
*   **Routing:** React Router v7.

## 3. Obecne Funkcjonalności

### 3.1 Pulpit (Dashboard)
Centrum dowodzenia aplikacją. Wyświetla skrócone informacje o stanie firmy, w tym szybki dostęp do kluczowych akcji.

### 3.2 Klienci (CRM)
Moduł zarządzania bazą kontrahentów.
*   **Lista Klientów:** Przeglądanie zapisanych klientów.
*   **Edycja/Dodawanie:** Formularz danych kontaktowych (Imię, Nazwisko, Telefon, Email, Adres).
*   **Interakcje:** Szybkie wybieranie numeru (tel:) lub wysłanie maila (mailto:) bezpośrednio z aplikacji.

### 3.3 Zlecenia
System śledzenia prac.
*   **Statusy:** Możliwość oznaczania etapu zlecenia (np. Nowe, W trakcie, Zakończone).
*   **Powiązania:** Przypisywanie zleceń do konkretnych klientów.
*   **Historia:** Przechowywanie historii realizacji.

### 3.4 Kosztorysy i Wyceny
Narzędzie do ofertowania.
*   **Tworzenie Wycen:** Dodawanie pozycji (usługa/towar), ilości i cen.
*   **Generowanie PDF:** Automatyczne tworzenie profesjonalnie wyglądającego dokumentu PDF z danymi firmy (pobranymi z Ustawień) oraz klienta.
*   **Zarządzanie:** Lista utworzonych kosztorysów z możliwością ich usunięcia.

### 3.5 Raporty i Analizy
Moduł analityczny wspierający decyzje biznesowe.
*   **Wykres Przychodów:** Wizualizacja finansów w ujęciu miesięcznym (obecnie dane demonstracyjne).
*   **Eksport Danych:** Możliwość pobrania pełnej bazy danych (Klienci, Zlecenia, Kosztorysy) do formatu **CSV** (Excel), co pozwala na tworzenie własnych kopii zapasowych.

### 3.6 Ustawienia i Profil
Konfiguracja danych firmy użytkownika.
*   **Dane Firmowe:** Nazwa firmy, NIP, Adres, Numer Konta Bankowego.
*   **Personalizacja:** Dane te są automatycznie umieszczane na generowanych dokumentach PDF.

## 4. Architektura i Bezpieczeństwo
*   **Offline-Ready:** Dzięki Service Workers (PWA) i LocalStorage, aplikacja może działać w warunkach ograniczonego dostępu do sieci.
*   **Brak Backend:** Aplikacja nie wysyła danych na zewnętrzne serwery. Pełna prywatność danych użytkownika (dane nie opuszczają urządzenia).

## 5. Propozycje Rozwoju (Roadmapa)

Poniżej przedstawiono rekomendowane kierunki rozwoju aplikacji, aby zwiększyć jej wartość dla użytkowników.

### 5.1 Funkcjonalności Biznesowe
1.  **Synchronizacja w Chmurze (Opcjonalna):**
    *   Wprowadzenie logowania (np. Firebase Auth/Supabase).
    *   Synchronizacja danych między telefonem a komputerem.
2.  **Rzeczywiste Raporty:**
    *   Zastąpienie danych demonstracyjnych na wykresach rzeczywistymi sumami z modułu Kosztorysów i Zleceń.
3.  **Kalendarz Prac:**
    *   Wizualny harmonogram zleceń w widoku kalendarza (Dzień/Tydzień/Miesiąc).
4.  **Magazyn Materiałów:**
    *   Prosta ewidencja zużytych materiałów przy zleceniach.
5.  **Galeria Realizacji:**
    *   Możliwość dodawania zdjęć "Przed" i "Po" do konkretnego zlecenia.

### 5.2 Ulepszenia UX/UI
1.  **Dark Mode:** Pełne wsparcie dla trybu ciemnego (systemowego lub przełączanego).
2.  **Wielojęzyczność (i18n):** Przygotowanie aplikacji do obsługi innych rynków (tłumaczenia interfejsu).
3.  **Onboarding:** Samouczek dla nowych użytkowników pokazujący kluczowe funkcje po pierwszym uruchomieniu.

## 6. Propozycje Techniczne (Dług technologiczny)

1.  **Testy Automatyczne:**
    *   Wdrożenie **Vitest** + **React Testing Library**.
    *   Pokrycie testami kluczowych funkcji logicznych (kalkulacje w kosztorysach) oraz komponentów UI.
2.  **Migracja na TypeScript:**
    *   Zastąpienie JavaScript językiem TypeScript w celu wyeliminowania błędów typowania i ułatwienia refaktoryzacji.
3.  **Walidacja Formularzy:**
    *   Wdrożenie biblioteki **Zod** lub **React Hook Form** dla lepszej obsługi błędów i walidacji danych wejściowych (np. poprawność NIP, format email).
4.  **Refaktoryzacja CSS:**
    *   Rozważenie migracji na **CSS Modules** lub **Tailwind CSS** w celu lepszej izolacji stylów w miarę rozrostu aplikacji.
