var translation = new Map()
translation.set("Project", ["Project", "Projekt"])
translation.set("Menu", ["Menu", "Menü"])
translation.set("Short Description", ["Short Description", "Kurzbeschreibung"])
translation.set("Long Description", ["Long Description", "Lange Beschreibung"])
translation.set("Project Goals", ["Project Goals"," Projektziele"])
translation.set("Project Lead", ["Project Lead", "Projektleitung"])
translation.set("Comment", ["Comment", "Kommentar"])

var languages = new Map()
languages.set("EN", 0)
languages.set("DE", 1)

/* Anmerkungen zu Aufgabe 5

Austauschbarkeit:
    Für jede Sprache, die auf der Seite möglich ist gibt es eine Referenz ID. 
    Taucht ein übersetztes Wort auf, wird in der translation Map auf den Array zugegriffen und der String mit der entsprechenden ID genommen.

Wartbarkeit:
    Ein Wort lässt sich durch die Referenz auf den Englischen Begriff sehr schnell finden und per ID zu dem Eintrag für die entsprechende Sprache gelangen.
    Würde man für jede Sprache eine eigene Datei anlegen wäre das nicht viel übersichtlicher als es in einer einzigen Datei wäre.

Zurechtfinden:
    Jedes Wort/Jede Begrifflichkeit hat einen Eintrag, wenn man etwas anpassen will geht man zu der entsprechenden ID der Sprache bei dem Wort welches man ändern will.
    Ein Übersetzer würde sehr wahrscheinlich nicht direkt an der Datei sondern über ein Webinterface an der Übersetzung arbeiten. 
    Durch die Präsenz aller Übersetzungen in einer Datei wird die Entwicklung einer solchen Übersetzungsanwendung vereinfacht.

Erweitern:
    Bei neuen Begriffen muss nur ein neuer Map erstellt werden und entsprechend die Übersetzungen eingetragen werden. 
    Durch leere Strings können Übersetzungen auch auf später verschoben oder ausgelassen werden.
    Bei ganzen Sprachen muss für jedes übersetzte Wort ein neues Element in den Array des Wortes eingefügt werden wo die übersetzung eingetragen wird.
    Außerdem muss der Languages Array erweitert werden. Wie bei Begriffen können Übersetzungen durch leere Strings ausgelassen werden.

*/