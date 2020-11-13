import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from '../hero/hero.component';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';

describe('HeroesComponent (deep test)', () => {
	let fixture: ComponentFixture<HeroesComponent>;
	let mockHeroService;
	let HEROES: Hero[] = [];

	beforeEach(() => {
		HEROES = [
			{ id: 1, name: 'Menganno', strength: 8 },
			{ id: 2, name: 'Super Hijitus', strength: 29 },
			{ id: 3, name: 'Victor von Doom', strength: 1000 },
		];
		mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
		TestBed.configureTestingModule({
			declarations: [HeroesComponent, HeroComponent],
			providers: [{ provide: HeroService, useValue: mockHeroService }],
			schemas: [NO_ERRORS_SCHEMA],
		});
		fixture = TestBed.createComponent(HeroesComponent);
	});

	it('should render each hero as a HeroComponent', () => {
		mockHeroService.getHeroes.and.returnValue(of(HEROES));

		// run ngOnInit
		fixture.detectChanges();

		const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

		for (let i = 0; i < heroComponentsDEs.length; i++) {
			expect(heroComponentsDEs[i].componentInstance.hero.name).toEqual(HEROES[i].name);
		}
	});
});
