import { HeroesComponent } from './heroes.component';
import {of} from 'rxjs/internal/observable/of';

describe('HeroesComponent', () => {
	let component: HeroesComponent;
	let HEROES = [];
	let mockHeroService;

	beforeEach(() => {
		HEROES = [
			{ id: 1, name: 'Menganno', strength: 8 },
			{ id: 2, name: 'Super Hijitus', strength: 29 },
			{ id: 3, name: 'Victor von Doom', strength: 1000 },
		];
		mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
		component = new HeroesComponent(mockHeroService);
	});

	describe('delete', () => {
		it('should delete a specified hero from the heroes list', () => {
			mockHeroService.deleteHero.and.returnValue(of(true));
			component.heroes = HEROES;

			component.delete(HEROES[2]);

			expect(component.heroes.indexOf({ id: 3, name: 'Victor von Doom', strength: 1000 })).toBe(-1);
		});

		it('should call deleteHero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    })
	});
});
