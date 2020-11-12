import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('HeroComponent (shallow tests)', () => {
	let fixture: ComponentFixture<HeroComponent>;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [HeroComponent],
			imports: [RouterTestingModule],
		});
		fixture = TestBed.createComponent(HeroComponent);
	});

	it('should have the correct hero name', () => {
		fixture.componentInstance.hero = { id: 1, name: 'Menganno', strength: 3 };
		expect(fixture.componentInstance.hero.name).toEqual('Menganno');
	});

	it('should render the hero name in an anchor tag', () => {
		fixture.componentInstance.hero = { id: 1, name: 'Menganno', strength: 3 };
		fixture.detectChanges();

		const deA = fixture.debugElement.query(By.css('a'));
		expect(deA.nativeElement.textContent).toContain('Menganno');
		// expect(fixture.nativeElement.querySelector('a').textContent).toContain('Menganno');
	});
});
