const puppeteer = require('puppeteer');

const APP_URL = process.env.APP_URL || 'http://app:4200';

describe('Layout', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(APP_URL, { waitUntil: 'networkidle0' });
    // Wait for Angular to render the app
    await page.waitForSelector('app-root header', { timeout: 15000 });
  });

  afterAll(async () => {
    if (browser) await browser.close();
  });

  describe('Header', () => {
    it('renders a top header bar', async () => {
      const header = await page.$('header');
      expect(header).not.toBeNull();

      const box = await header.boundingBox();
      expect(box.y).toBe(0);
      expect(box.width).toBe(1280);
    });

    it('has menu items aligned to the left', async () => {
      const menuItems = await page.$$('header nav a');
      expect(menuItems.length).toBeGreaterThan(0);

      const firstItemBox = await menuItems[0].boundingBox();
      // Menu items should be on the left side of the header
      expect(firstItemBox.x).toBeLessThan(400);
    });

    it('has a profile icon on the far right', async () => {
      const profileIcon = await page.$('header [data-testid="profile-icon"]');
      expect(profileIcon).not.toBeNull();

      const box = await profileIcon.boundingBox();
      // Profile icon should be on the right side
      expect(box.x).toBeGreaterThan(1100);
    });

    it('has a gear icon to the left of the profile icon', async () => {
      const gearIcon = await page.$('header [data-testid="gear-icon"]');
      const profileIcon = await page.$('header [data-testid="profile-icon"]');
      expect(gearIcon).not.toBeNull();

      const gearBox = await gearIcon.boundingBox();
      const profileBox = await profileIcon.boundingBox();
      // Gear should be to the left of profile
      expect(gearBox.x).toBeLessThan(profileBox.x);
    });

    it('has a dropdown select box to the left of the gear icon', async () => {
      const dropdown = await page.$('header [data-testid="header-dropdown"]');
      const gearIcon = await page.$('header [data-testid="gear-icon"]');
      expect(dropdown).not.toBeNull();

      const dropdownBox = await dropdown.boundingBox();
      const gearBox = await gearIcon.boundingBox();
      // Dropdown should be to the left of gear
      expect(dropdownBox.x).toBeLessThan(gearBox.x);
    });
  });

  describe('Footer', () => {
    it('renders a footer at the bottom of the page', async () => {
      const footer = await page.$('footer');
      expect(footer).not.toBeNull();
    });

    it('displays the Wise Owl Tech LLC copyright', async () => {
      const footerText = await page.$eval('footer', (el) => el.textContent);
      expect(footerText).toContain('Wise Owl Tech LLC');
    });

    it('displays a git hash version', async () => {
      const versionEl = await page.$('footer [data-testid="version"]');
      expect(versionEl).not.toBeNull();

      const versionText = await page.$eval(
        'footer [data-testid="version"]',
        (el) => el.textContent,
      );
      // Git hash should be a hex string (at least short hash of 7 chars)
      expect(versionText.trim()).toMatch(/[0-9a-f]{7,}/);
    });
  });
});
