import { TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Footer);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a footer element', () => {
    const fixture = TestBed.createComponent(Footer);
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('footer')).toBeTruthy();
  });

  it('should display the current year', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const year = new Date().getFullYear().toString();
    expect(el.textContent).toContain(year);
  });

  it('should display Wise Owl Tech LLC copyright', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Wise Owl Tech LLC');
  });

  it('should display git hash version', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const versionEl = el.querySelector('[data-testid="version"]');
    expect(versionEl).toBeTruthy();
    expect(versionEl?.textContent?.trim().length).toBeGreaterThan(0);
  });
});
