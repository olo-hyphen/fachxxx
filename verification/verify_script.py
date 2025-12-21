from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})

        # Inject data
        page.goto("http://localhost:4173")
        page.evaluate("""() => {
            const estimates = [{
                id: '101',
                title: 'Existing Estimate',
                clientId: '1',
                clientName: 'Test Client',
                items: [{description: 'Service', quantity: 1, price: 100}],
                total: 100,
                createdAt: new Date().toISOString()
            }];
            localStorage.setItem('estimates', JSON.stringify(estimates));
        }""")

        # Reload to apply data
        page.reload()

        # 1. Verify Settings
        page.goto("http://localhost:4173/settings")
        page.wait_for_selector("text=Dane firmy / użytkownika")
        page.fill("#name", "Jan Kowalski Services")
        page.click("button:has-text('Zapisz zmiany')", force=True)
        page.screenshot(path="verification/settings_page_filled.png")

        # 2. Verify Estimates Edit
        page.goto("http://localhost:4173/estimates")

        # Wait for the estimate card
        page.wait_for_selector("text=Existing Estimate")

        # Click Edit button using force=True
        page.get_by_title("Edytuj").click(force=True)

        # Check if form opened
        page.wait_for_selector("text=Edytuj kosztorys")

        # Change title
        page.fill("#title", "Updated Estimate Title")
        page.click("button:has-text('Zapisz zmiany')", force=True)

        # Verify change
        page.wait_for_selector("text=Updated Estimate Title")

        page.screenshot(path="verification/estimates_edited_final.png")

        browser.close()

if __name__ == "__main__":
    verify_frontend()
