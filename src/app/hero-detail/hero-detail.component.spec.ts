import { ActivatedRoute } from '@angular/router';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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

	it('should render hero name in an h2 tag', () => {
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector('h2').textContent).toContain('LA MARAÑAZA');
	});
});
