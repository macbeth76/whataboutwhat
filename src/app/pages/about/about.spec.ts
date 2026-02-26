import { TestBed } from '@angular/core/testing';
import { About } from './about';

describe('About', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(About);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render about content', () => {
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Wise Owl Tech LLC');
  });
});
