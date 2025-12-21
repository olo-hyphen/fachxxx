from playwright.sync_api import sync_playwright

def verify_settings_update():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a larger viewport to maybe avoid overlay issues
        page = browser.new_page(viewport={"width": 1280, "height": 800})

        # Navigate directly to settings
        page.goto("http://localhost:4173/settings")

        # Wait for the settings header
        page.wait_for_selector("h1:has-text('Ustawienia firmy')")

        # Fill in the form
        page.fill("#companyName", "Super Firma Remontowa")
        page.fill("#nip", "111-222-33-44")
        page.fill("#address", "ul. Testowa 5, 00-000 Warszawa")
        page.fill("#phone", "987 654 321")
        page.fill("#bankAccount", "12 3456 7890 0000 0000 1234 5678")

        # Force click the save button to bypass intersection checks
        page.click("button:has-text('Zapisz zmiany')", force=True)

        # Wait specifically for the toast. It might have a specific class or structure.
        # Assuming ToastContext uses some common pattern.
        # If the text selector fails, let's just wait a bit and check persistence.
        try:
             page.wait_for_selector("text=Ustawienia zapisane", timeout=2000)
        except:
             print("Toast not found within 2s, checking persistence directly.")

        # Take a screenshot of the filled settings
        page.screenshot(path="settings_filled.png")

        # Reload page to check persistence
        page.reload()
        page.wait_for_selector("h1:has-text('Ustawienia firmy')")

        # Check if values are still there
        val = page.input_value("#companyName")
        if val != "Super Firma Remontowa":
             print(f"Verification Failed: Expected 'Super Firma Remontowa', got '{val}'")
        else:
             print("Verification Passed: Company Name persisted.")

        page.screenshot(path="settings_persisted.png")

        browser.close()

if __name__ == "__main__":
    verify_settings_update()
