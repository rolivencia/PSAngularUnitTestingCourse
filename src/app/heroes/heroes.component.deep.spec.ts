import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from '../hero/hero.component';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Directive({
	selector: '[routerLink]',
	host: { '(click)': 'onClick()' },
})
export class RouterLinkDirectiveStub {
	@Input('routerLink') linkParams: string;
	navigatedTo: string = null;

	onClick() {
		this.navigatedTo = this.linkParams;
	}
}

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
			declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
			providers: [{ provide: HeroService, useValue: mockHeroService }],
			// schemas: [NO_ERRORS_SCHEMA],
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

	it(`should call heroService.deleteHero when the Hero Component's delete button is clicked`, () => {
		// spy method of current tested fixture component
		spyOn(fixture.componentInstance, 'delete');
		mockHeroService.getHeroes.and.returnValue(of(HEROES));

		// run ngOnInit
		fixture.detectChanges();

		//get the full list of children Hero components
		const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

		//trigger the event
		heroComponents[0].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () => {} });

		expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
	});

	it(`should call heroService.deleteHero when the Hero Component's (the children) delete event is raised`, () => {
		// spy delete method of current tested fixture component
		spyOn(fixture.componentInstance, 'delete');

		// grab data from mock service
		mockHeroService.getHeroes.and.returnValue(of(HEROES));

		// run ngOnInit
		fixture.detectChanges();

		//get the full list of children Hero components
		const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

		// child component raises the event that the parent component is listening to
		(<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

		expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
	});

	it(`should call heroService.deleteHero when the Hero Component's instance fixture delete event is triggered with triggerEventHandler`, () => {
		// spy delete method of current tested fixture component
		spyOn(fixture.componentInstance, 'delete');

		// grab data from mock service
		mockHeroService.getHeroes.and.returnValue(of(HEROES));

		// run ngOnInit
		fixture.detectChanges();

		//get the full list of children Hero components
		const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

		// child component raises the event that the parent component is listening to
		heroComponents[0].triggerEventHandler('delete', null);

		expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
	});

	it('should add a new hero to the hero list when the add button is click', () => {
		// grab data from mock service
		mockHeroService.getHeroes.and.returnValue(of(HEROES));

		// run ngOnInit
		fixture.detectChanges();

		// set test hero name
		const name = 'Señor Frío';

		// what the mock service should return after click event
		mockHeroService.addHero.and.returnValue(of({ id: 5, name: name, strength: 11 }));

		// we bind the elements
		const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
		const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

		inputElement.value = name;
		addButton.triggerEventHandler('click', null);

		fixture.detectChanges();

		const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
		expect(heroText).toContain(name);
	});

	it('should have the correct route for the first hero', () => {

    // grab data from mock service
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

		const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

		let routerLink = heroComponents[1]
			.query(By.directive(RouterLinkDirectiveStub))
			.injector.get(RouterLinkDirectiveStub);

		heroComponents[1].query(By.css('a')).triggerEventHandler('click', null);

		expect(routerLink.navigatedTo).toBe('/detail/2');
	});
});
