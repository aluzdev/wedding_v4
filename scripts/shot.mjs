// screenshot localhost dev server: node scripts/shot.mjs <name>
import { chromium } from 'playwright'
const name = process.argv[2] ?? 'shot'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await page.screenshot({ path: `shots/${name}-desktop.png`, fullPage: true })
await page.setViewportSize({ width: 390, height: 844 })
await page.waitForTimeout(800)
await page.screenshot({ path: `shots/${name}-mobile.png`, fullPage: true })
await browser.close()
if (errors.length) { console.log('CONSOLE ERRORS:\n' + errors.join('\n')) } else { console.log('no console errors') }
