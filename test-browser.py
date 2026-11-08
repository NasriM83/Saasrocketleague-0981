import asyncio, json
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        page = await browser.new_page(viewport={"width":1440,"height":1050}, device_scale_factor=1)
        errors=[]
        page.on('pageerror', lambda e: errors.append(str(e)))
        await page.goto('http://localhost:4200', wait_until='networkidle')
        await page.screenshot(path='/home/user/scrimsync/desktop.png', full_page=True)
        await page.get_by_role('button', name='BO7', exact=True).click()
        await page.get_by_role('button', name='21:00', exact=True).click()
        await page.get_by_role('button', name='Confirm scrim', exact=True).click()
        await page.get_by_role('button', name='Sample scrim confirmed · 21:00').wait_for()
        await page.get_by_role('button', name='Login with Discord').click()
        await page.get_by_text('Discord is next up.').wait_for()
        await page.keyboard.press('Escape')
        await page.get_by_role('textbox', name='Email address').fill('qa.scrimsync@example.com')
        await page.get_by_role('button', name='Join the Waitlist').click()
        await page.get_by_role('status').wait_for()
        print('Waitlist result:', await page.get_by_role('status').inner_text())
        await page.reload(wait_until='networkidle')
        await page.get_by_role('textbox', name='Email address').fill('QA.SCRIMSYNC@example.com')
        await page.get_by_role('button', name='Join the Waitlist').click()
        await page.get_by_text('You’re already on the list.').wait_for()
        print('Normalized duplicate check: PASS')
        for width in [768,390,320]:
            await page.set_viewport_size({"width":width,"height":844})
            await page.reload(wait_until='networkidle')
            overflow=await page.evaluate('document.documentElement.scrollWidth > window.innerWidth')
            print(f'{width}px overflow:', overflow)
            assert not overflow
            if width == 390:
                await page.screenshot(path='/home/user/scrimsync/mobile.png', full_page=True)
        print('Browser errors:',json.dumps(errors))
        assert not errors
        await browser.close()

asyncio.run(main())