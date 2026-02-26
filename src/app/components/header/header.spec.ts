import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Header);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a header element', () => {
    const fixture = TestBed.createComponent(Header);
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('header')).toBeTruthy();
  });

  it('should have navigation links', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('nav a');
    expect(links.length).toBe(2);
    expect(links[0].textContent).toContain('Home');
    expect(links[1].textContent).toContain('About');
  });

  it('should have a dropdown select', () => {
    const fixture = TestBed.createComponent(Header);
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('[data-testid="header-dropdown"]')).toBeTruthy();
  });

  it('should have a gear icon button', () => {
    const fixture = TestBed.createComponent(Header);
    const el = fixture.nativeElement as HTMLElement;
    const btn = el.querySelector('[data-testid="gear-icon"]');
    expect(btn).toBeTruthy();
    expect(btn?.getAttribute('aria-label')).toBe('Settings');
  });

  it('should have a profile icon button', () => {
    const fixture = TestBed.createComponent(Header);
    const el = fixture.nativeElement as HTMLElement;
    const btn = el.querySelector('[data-testid="profile-icon"]');
    expect(btn).toBeTruthy();
    expect(btn?.getAttribute('aria-label')).toBe('Profile');
  });
});
