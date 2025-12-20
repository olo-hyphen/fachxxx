# Fachowiec Pro

Zaawansowane narzędzie PWA do zarządzania biznesem usługowym (remonty, naprawy, instalacje).

## Kluczowe Funkcje

*   **Dashboard:** Szybki przegląd przychodów, statusów zleceń i ostatnich aktywności.
*   **Klienci:** Zarządzanie bazą klientów, historia zleceń i szybkie akcje (telefon, SMS, email).
*   **Zlecenia:** Śledzenie postępów, dodawanie zdjęć, notatek i lokalizacji.
*   **Kosztorysy:** Tworzenie i wysyłanie profesjonalnych kosztorysów w formacie PDF.
*   **Raporty:** Generowanie raportów miesięcznych, eksport danych do CSV i wizualizacje.
*   **Ustawienia:** Konfiguracja danych firmy i personalizacja szablonów komunikacji.

## Stack Technologiczny

*   **Frontend:** React 19, Vite 7, React Router 7
*   **Styling:** Vanilla CSS z CSS Variables, `clsx`
*   **UI:** `lucide-react` (ikony), `recharts` (wykresy), `react-swipeable` (gesty)
*   **PWA:** `vite-plugin-pwa`
*   **PDF:** `jspdf`, `jspdf-autotable`

## Architektura

Aplikacja wykorzystuje React Context API do zarządzania stanem:

*   **`DataContext`:** Odpowiada za operacje CRUD i persystencję danych (początkowo w `localStorage`).
*   **`AuthContext`:** Zarządza uwierzytelnianiem użytkownika i chroni trasy.
*   **`ToastContext`:** Dostarcza system powiadomień.
