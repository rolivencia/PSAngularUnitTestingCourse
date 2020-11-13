import { inject, TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

describe('HeroService', () => {
	let mockMessageService;
	let httpTestingController: HttpTestingController;
	let heroSvc: HeroService;

	beforeEach(() => {
		mockMessageService = jasmine.createSpyObj(['add']);

		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [HeroService, { provide: MessageService, useValue: mockMessageService }],
		});

		// Finds the service that correlatest to the HttpTesting Controller
		httpTestingController = TestBed.get(HttpTestingController);
		heroSvc = TestBed.get(HeroService);
	});

	describe('getHero', () => {
		it('should call get with the correct URL', () => {
			heroSvc.getHero(4).subscribe(() => {});

			const req = httpTestingController.expectOne('api/heroes/4');
			req.flush({ id: 4, name: 'Neurus', strength: 120 });
			httpTestingController.verify();
		});
	});
});
