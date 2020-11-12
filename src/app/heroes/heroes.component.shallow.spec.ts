import { ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from '../hero/hero.component';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

describe('HeroesComponent (shallow test)', () => {
	let fixture: ComponentFixture<HeroesComponent>;
	let mockHeroService;
	let HEROES: Hero[] = [];

	@Component({
		selector: 'app-hero',
		template: '<div></div>',
	})
	class FakeHeroComponent {
		@Input() hero: Hero;
		// @Output() delete = new EventEmitter();
	}

	beforeEach(() => {
		HEROES = [
			{ id: 1, name: 'Menganno', strength: 8 },
			{ id: 2, name: 'Super Hijitus', strength: 29 },
			{ id: 3, name: 'Victor von Doom', strength: 1000 },
		];
		mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
		TestBed.configureTestingModule({
			declarations: [HeroesComponent, FakeHeroComponent],
			providers: [{ provide: HeroService, useValue: mockHeroService }],
			// schemas: [NO_ERRORS_SCHEMA],
		});
		fixture = TestBed.createComponent(HeroesComponent);
	});

	it('should set heroes correctly from the service', () => {
		mockHeroService.getHeroes.and.returnValue(of(HEROES));
		fixture.detectChanges();

		expect(fixture.componentInstance.heroes.length).toBe(3);
	});

	it('should create three li elements - one for each hero', () => {
		mockHeroService.getHeroes.and.returnValue(of(HEROES));
		fixture.detectChanges();
		expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
	});
});
