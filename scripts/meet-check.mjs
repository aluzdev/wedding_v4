import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
await page.waitForTimeout(9500)
await page.screenshot({ path: 'shots/meet-mobile.png' })
await browser.close()
console.log('ok')
