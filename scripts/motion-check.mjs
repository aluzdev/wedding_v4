import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
await page.waitForTimeout(1000)
await page.screenshot({ path: 'shots/motion-t0.png' })
await page.waitForTimeout(2500)
await page.screenshot({ path: 'shots/motion-t1.png' })
await browser.close()
