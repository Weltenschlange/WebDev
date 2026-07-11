BEGIN;

INSERT INTO "Projekt" ("titel", "logo", "startdatum", "kurzbeschreibung") VALUES
  ('Implementierung des Projektmanagers', 'https://scl.fh-bielefeld.de/WBA/projectmanager.avif', '2024-04-01T08:20:28.438Z', 'Das Semesterprojekt fuer WBA.'),
  ('Hochwasserfruehwarnsystem', 'https://scl.fh-bielefeld.de/WBA/werre.avif', '2024-10-01T08:20:28.438Z', 'KI basiertes Hochwasserfruehwarnsystem'),
  ('SoSe Party!', 'https://scl.fh-bielefeld.de/WBA/party.jpg', '2024-04-01T08:20:28.438Z', 'Die grosse Sommersemester Party'),
  ('Projekt ohne Arbeit', 'https://scl.fh-bielefeld.de/WBA/urlaub.avif', '2024-07-01T08:20:28.438Z', 'Dieses Projekt hat keine Arbeit'),
  ('Das naechste tolle Projekt', 'https://scl.fh-bielefeld.de/WBA/neu.avif', '2025-04-01T08:20:28.438Z', 'Hier entsteht ein neues Projekt');

INSERT INTO "Aufgabenbereich" ("titel", "kurzbeschreibung") VALUES
  ('Konzeption - P1', 'Konzeption des Projektmanagers'),
  ('Implementierung - P1', 'Implementierung des Projektmanagers'),
  ('Wartung - P1', 'Wartung des Projektmanagers'),
  ('Konzeption - P2', 'Konzeption des Fruehwarnsystems'),
  ('Implementierung - P2', 'Implementierung des Fruehwarnsystems'),
  ('Wartung - P2', 'Wartung des Fruehwarnsystems'),
  ('Planung :|', 'Planung der Party'),
  ('Durchfuehrung :)', 'Durchfuehrung der Party'),
  ('Aufraeumen :(', 'Das Auftraeumen danach');

INSERT INTO "Artefakt" ("titel", "kurzbeschreibung", "aufgabenbereich", "zeitaufwand") VALUES
  ('Projekt 1 - ER-Diagramm', 'ER-Diagramm erstellen', 1, '7:30'),
  ('Projekt 1 - Klassen-Diagramm', 'Klassen-Diagramm erstellen', 1, '5:00'),
  ('Projekt 1 - UserStories', 'User-Stories erstellen', 1, '2:00'),
  ('Projekt 1 - Webseitegeruest', 'Webseitegeruest erstellen', 2, '2:00'),
  ('Projekt 1 - Startseite', 'Startseite erstellen', 2, '3:00'),
  ('Projekt 1 - Projektuebersicht', 'Projektuebersicht erstellen', 2, '3:00'),
  ('Projekt 1 - Projekt-anlegen-Seite', 'Projekt-anlegen-Seite erstellen', 2, '5:00'),
  ('Projekt 1 - Weitere Seiten', 'Weitere Seiten erstellen', 2, '1:00'),
  ('Projekt 1 - Woechentliche Fehlerbehebungen', 'Woechentliche Fehlerbehebungen', 3, '3:00'),
  ('Werre Fruehwarnsystem - UserStories', 'UserStories erstellen', 4, '10:00'),
  ('Werre Fruehwarnsystem - ER-Diagramm', 'ER-Diagramm erstellen', 4, '5:30'),
  ('Werre Fruehwarnsystem - Klassen-Diagramme', 'Klassen-Diagramme erstellen', 4, '40:00'),
  ('Werre Fruehwarnsystem - Einarbeitung SmartMonitoring', 'Einarbeitung SmartMonitoring', 5, '10:00'),
  ('Werre Fruehwarnsystem - Anbdingung Datenquellen', 'Anbindung freier Datenquellen', 5, '80:00'),
  ('Werre Fruehwarnsystem - Erstellung Dashboard', 'Erstellung eines Dashboards', 5, '16:00'),
  ('Planung des Ablaufs', 'Planung des Ablaufs der Party', 7, '25:00'),
  ('Organisation Bands', 'Bands organisieren', 7, '10:00'),
  ('Feiern', 'Die Party findet statt.', 8, '5:00'),
  ('Aufraeumen', 'Danach muss alles wieder aufgeraeumt werden.', 9, '15:00');

INSERT INTO "Projekt_Aufgabenbereich" ("projektID", "aufgabenbereichsID") VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 4),
  (2, 5),
  (2, 6),
  (3, 7),
  (3, 8),
  (3, 9);

INSERT INTO "Projekt_Artefakt" ("projekt_id", "artefakt_id", "arbeits_zeit") VALUES
  (1, 1, '7:50'),
  (1, 2, '4:30'),
  (1, 3, '2:10'),
  (1, 4, '1:40'),
  (1, 5, '2:40'),
  (1, 6, '3:10'),
  (1, 7, NULL),
  (1, 8, NULL),
  (1, 9, NULL),
  (2, 10, '11:50'),
  (2, 11, '5:50'),
  (2, 12, '42:00'),
  (2, 13, '9:40'),
  (2, 14, '82:30'),
  (2, 15, NULL),
  (3, 16, NULL),
  (3, 17, NULL),
  (3, 18, NULL),
  (3, 19, NULL);

COMMIT;