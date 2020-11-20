import { ActivatedRoute } from '@angular/router';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';

describe('HeroDetailComponent', () => {
	let mockActivatedRoute, mockHeroService, mockLocation;
	let fixture: ComponentFixture<HeroDetailComponent>;

	beforeEach(() => {
		mockActivatedRoute = {
			snapshot: {
				paramMap: {
					get: () => {
						return '3';
					},
				},
			},
		};

		mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
		mockLocation = jasmine.createSpyObj(['back']);

		TestBed.configureTestingModule({
			declarations: [HeroDetailComponent],
			imports: [FormsModule],
			providers: [
				{ provide: ActivatedRoute, useValue: mockActivatedRoute },
				{ provide: HeroService, useValue: mockHeroService },
				{ provide: Location, useValue: mockLocation },
			],
		});

		fixture = TestBed.createComponent(HeroDetailComponent);

		mockHeroService.getHero.and.returnValue(
			of<Hero>({ id: 3, name: 'La Marañaza', strength: 45 }),
		);
	});

	it('should render hero name in an h2 tag - with done', () => {
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector('h2').textContent).toContain('LA MARAÑAZA');
	});

	it('should call updateHero when save is called', (done) => {
		mockHeroService.updateHero.and.returnValue(of({}));
		fixture.detectChanges();

		fixture.componentInstance.save();
		setTimeout(() => {
			expect(mockHeroService.updateHero).toHaveBeenCalled();
			done();
		}, 300);
	});

	it('should render hero name in an h2 tag', () => {
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector('h2').textContent).toContain('LA MARAÑAZA');
	});

	it('should call updateHero when save is called  - with done', (done) => {
		mockHeroService.updateHero.and.returnValue(of({}));
		fixture.detectChanges();

		fixture.componentInstance.save();
		setTimeout(() => {
			expect(mockHeroService.updateHero).toHaveBeenCalled();
			done();
		}, 300);
	});

	it('should call updateHero when save is called  - with fakeAsync', fakeAsync(() => {
		mockHeroService.updateHero.and.returnValue(of({}));
		fixture.detectChanges();

		fixture.componentInstance.save();
		tick(250); // Ticks forward 250 ms and calls any code that should be called inside of that timeframe

		expect(mockHeroService.updateHero).toHaveBeenCalled();
	}));

	it('should call updateHero when save is called  - with async for Promise', async(() => {
		mockHeroService.updateHero.and.returnValue(of({}));
		fixture.detectChanges();

		fixture.componentInstance.saveWithPromise();
		fixture.whenStable();

		fixture.whenStable().then(() => {
			expect(mockHeroService.updateHero).toHaveBeenCalled();
		});
	}));
});
