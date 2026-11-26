import { Component, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Conference } from '../../models/conference';
import { ORGANIZERS } from '../../data/organizers';
import { OrganizerList } from '../organizer-list/organizer-list';

@Component({
  selector: 'app-home',
  imports: [DatePipe, OrganizerList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // Liste statique des conférences (Signal)
  readonly conferences = signal<Conference[]>([
    {
      id: 1,
      picture: 'images/angular.svg',
      title: 'Angular Summit 2026',
      date: new Date('2026-12-10'),
      adress: 'Esprit, Ariana – Tunis',
      available_Places: 45,
      organizers: [ORGANIZERS[0], ORGANIZERS[1]],
    },
    {
      id: 2,
      picture: 'images/ia.svg',
      title: "Intelligence Artificielle & Avenir",
      date: new Date('2026-12-18'),
      adress: 'Cité de la Culture, Tunis',
      available_Places: 12,
      organizers: [ORGANIZERS[2]],
    },
    {
      id: 3,
      picture: 'images/cloud.svg',
      title: 'Cloud & DevOps Days',
      date: new Date('2027-01-08'),
      adress: 'Technopole El Ghazala, Ariana',
      available_Places: 0,
      organizers: [],
    },
    {
      id: 4,
      picture: 'images/securite.svg',
      title: 'Cybersécurité : défis 2027',
      date: new Date('2027-01-22'),
      adress: 'Palais des Congrès, Tunis',
      available_Places: 80,
      organizers: [ORGANIZERS[1], ORGANIZERS[3], ORGANIZERS[4]],
    },
    {
      id: 5,
      picture: 'images/data.svg',
      title: 'Big Data & Analytics Forum',
      date: new Date('2027-02-05'),
      adress: 'Hôtel Mövenpick, Sousse',
      available_Places: 7,
      organizers: [ORGANIZERS[3]],
    },
    {
      id: 6,
      picture: 'images/mobile.svg',
      title: 'Mobile Dev Conference',
      date: new Date('2027-02-19'),
      adress: 'Novotel, Sfax',
      available_Places: 30,
      organizers: [ORGANIZERS[0], ORGANIZERS[4]],
    },
  ]);

  // Texte de recherche (Signal)
  readonly search = signal('');

  // Liste filtrée, recalculée automatiquement quand search() ou conferences() change
  readonly filteredConferences = computed(() => {
    const term = this.search().trim().toLowerCase();
    return this.conferences().filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        c.adress.toLowerCase().includes(term) ||
        c.organizers.some((o) => o.name.toLowerCase().includes(term)),
    );
  });

  readonly totalPlaces = computed(() =>
    this.conferences().reduce((sum, c) => sum + c.available_Places, 0),
  );

  onSearch(event: Event) {
    this.search.set((event.target as HTMLInputElement).value);
  }

  // Exemple d'Event Binding + update() : réserver une place
  reserve(id: number) {
    this.conferences.update((list) =>
      list.map((c) =>
        c.id === id && c.available_Places > 0
          ? { ...c, available_Places: c.available_Places - 1 }
          : c,
      ),
    );
  }
}
