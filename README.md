# Fachowiec Pro

Fachowiec Pro is a Progressive Web App (PWA) designed for service professionals such as renovation teams, repair technicians, and installers. The application enables comprehensive business management from both mobile devices and desktop computers.

## Features

*   **Dashboard:** Financial summary, order statuses, and recent activity.
*   **Clients:** Contractor database with quick access to contact options (call/SMS).
*   **Orders:** Management of service processes, statuses, and client assignment.
*   **Estimates:** Creation of price quotes and PDF generation.
*   **Reports:** Revenue summaries and data export to CSV.
*   **Mobile-First:** Responsive interface adapted for smartphones (bottom navigation) and desktops (sidebar).

## Getting Started

To run the application locally, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at the address displayed in the terminal (usually `http://localhost:5173`).

## Technologies

*   **React + Vite:** Frontend framework and build tool.
*   **Vanilla CSS:** Styling using CSS variables.
*   **React Router:** Navigation management.
*   **Recharts:** Data visualization (charts).
*   **jsPDF:** PDF generation for estimates.
*   **Lucide React:** Icon library.
*   **Context API:** State management (Auth, Data, Toast).

## Project Structure

*   `src/components/`: Reusable UI components and layout elements.
*   `src/contexts/`: React Context providers for global state management.
*   `src/pages/`: Main application views (Dashboard, Clients, Orders, etc.).
*   `src/assets/`: Static assets.

## Documentation

The codebase is fully documented using JSDoc. You can inspect the source files to see detailed descriptions of components, hooks, and functions.

### Core Concepts

*   **AuthContext:** Manages user authentication (currently mocked for demonstration).
*   **DataContext:** Handles CRUD operations for clients, orders, and estimates, persisting data to `localStorage`.
*   **ToastContext:** Provides a global notification system.
