# ByeBuy

ByeBuy ist ein Add-On, dass Nutzer von Internetshopping-Plattformen dazu anhält, bewusstere Kaufentscheidungen zu
treffen. Es wurde im Rahmen der Digital Innovation Challenge 2021 (#DIC2021) von Studierenden am Hasso-Plattner-Institut
entwickelt.

## Setup

### Installation des Add-Ons

Wir haben das Add-On zunächst nur für den Firefox-Browser getestet. Es kann auf [https://addons.mozilla.org/en-US/firefox/addon/byebuy/](https://addons.mozilla.org/en-US/firefox/addon/byebuy/) heruntergeladen werden (Nachtrag 30.09.21).

### Entwicklung

1. Clone dieses Repository
2. Öffne [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox) im Firefox-Browser
3. Klicke auf `Load Temporaray Add-On...` und wähle eine beliebige Datei im Repository-Ordner aus
4. Um den Effekt von Code-Änderungen auszuprobieren, kann das Add-On mit `Reload` einfach aktualisiert werden
5. Nun kann das Add-On auf Amazon-Webseiten genutzt werden. Gespeicherte Items kann man ansehen indem man auf das Icon
   der Extension klickt.

### Kurzanleitung

Auf Amazon-Produkt-Webseiten wird nun neben den Buttons `Add To Cart` und `Buy Now` auch ein grüner Button angezeigt,
mit dem das Produkt um einige Tage "zurückgestellt" werden kann.

Durch Klick auf das Add-On-Icon in der oberen Leiste des Browsers erfolgt eine Weiterleitung auf eine Web-Ansicht der
zurückgestellten Produkte. Hier können Produkte auf zwei Weisen wieder entfernt werden: wenn sie doch gekauft wurden
oder wenn sie nicht gekauft wurden. In letzterem Fall wird die Anzeige der gesparten Kosten und des CO2-Ausstoßes
aktualisiert.

## Das Problem

Internetshopping wird immer beliebter. Im Internet gibt es heutzutage alles mit nur wenigen Klicks zu kaufen. Leider
erhöht sich mit dieser Bequemlichkeit auch die Anzahl von Fehlkäufen. Die Konsequenz: Produkte liegen oft ungenutzt zu
Hause herum oder werden zurückgeschickt und womöglich nach der Retour vom Online-Händler vernichtet. Somit helfen sie
weder den Käufern noch der Umwelt.

Es ist schwer, das ausgestoßene CO2, das durch Impulskäufe entsteht, genau zu beziffern. Aber eine große Menge an (
Fehl-)Käufen führt natürlich zu hoher Umweltbelastung. Als Orientierung: Im Jahr 2019 wurden allein in Deutschland 301
Millionen Retouren verzeichnet [1]. Damit gab es nur für den Transport einen CO2-Ausstoß von 150.000 Tonnen [2].
Weiterhin haben Studien ergeben, dass 2018 in Deutschland 4% der Retouren vernichtet wurden [3]. Eine Produktvernichtung
bedeutet, dass der oft hohe CO2-Ausstoß für die Herstellung völlig unnötig war, da die Produkte nie benutzt wurden.

## Unsere Lösung

Um dieses klimaschädliche Verhalten zu reduzieren, wollen wir den Nutzern dabei helfen, bewusste Kaufentscheidungen zu
treffen. Dazu haben wir eine Browser-Erweiterung mit dem Namen ByeBuy entwickelt. Dieses Add-On bietet beim
Onlineshopping die Möglichkeit, den Kauf von Produkten einige Zeit in die Zukunft zu verlegen. Statt `Buy Now` gibt
es also auch einen Button für `Buy Later`.

Unsere funktionsfähige Lösung fokussiert sich zunächst auf den Onlineversandhändler Amazon, der den Bereich E-Commerce
in Deutschland und der Welt dominiert [4]. Weitere Anbieter für Internetshopping können in Zukunft mit geringem Aufwand
von uns zum Add-On hinzugefügt werden.

Wir belohnen die Nutzung unserer Software, indem wir Käufern im Internet sichtbar machen, welche Ressourcen (CO2-Ausstoß
und finanzielle Kosten) durch ein bewussteres Verhalten eingespart wurden. Wir rechnen zunächst nur mit den gesparten
CO2-Emmissionen für den Transport (500g pro Sendung [2]), da die weitere CO2-Berechnung stark produktabhängig ist. Somit
wird aktiven Nutzern vor Augen geführt, wie sehr es sich lohnen kann, über Kaufentscheidungen ein paar Nächte zu
schlafen. Unsere Lösung wirft ein Licht auf die Konsequenzen eines Internetkaufs, die ansonsten oft unbemerkt bleiben.

Wir erhoffen uns, dass unser Add-On breitflächige Nutzung findet. Wenn viele einen kleinen Beitrag leisten, indem sie
weniger unnötige Internetbestellungen aufgeben, stehen deutliche CO2-Einsparungen in Aussicht.

Ein Stück weit arbeiten wir damit gegen Onlinehändler an, deren Ziel es ist, Umsatz zu maximieren und Kunden ein
möglichst einfaches Kauferlebnis zu bieten. Wir sehen jedoch auch, dass es nicht im Interesse der Anbieter sein kann,
wenn Nutzer Unmengen an Fehlkäufen wieder an sie zurücksenden. Wir sind uns bewusst, dass unser Produkt möglicherweise
zu Umsatzeinbußen von Onlinehändlern führt, aber sind der Meinung, dass nachhaltiger E-Commerce mit bedachten
Kaufentscheidungen der Konsumenten vereinbar sein muss.

## Die Zielgruppe

Unser Angebot richtet sich vor allem an um Nachhaltigkeit bemühte Menschen und Vielkäufer mit schlechtem Gewissen. ;)
Aber auch wer mehr um den eigenen Geldbeutel besorgt ist als um die Umwelt, kann von ByeBuy profitieren, indem unnötige
Ausgaben vermieden werden.

In unserer schnelllebigen Welt haben wir weitgehend verlernt, zu warten. Menschen sind es gewohnt, alles Erdenkliche
innerhalb kürzester Zeit geliefert bekommen zu können. Trotzdem sind wir optimistisch, dass wir viele Personen dazu
bewegen können, unser Add-On zu nutzen und sich bei weniger dringenden Kaufentscheidungen wieder mehr Zeit zu lassen.

Wir wollen jedoch niemandem zum Minimalismus zwingen und Internetkäufe nicht völlig verbieten. Vielmehr soll unsere
Software ein Anreiz zu überlegteren Entscheidungen im Internet sein. Die Nutzung des Add-On ist freiwillig und dringende
Bestellungen können wie gewohnt sofort getätigt werden.

## Wie innovativ ist unsere Lösung?

Unsere Lösung ist technisch einfach umzusetzen und zur Implementierung benötigte es keine Rocket Science. Das hindert
sie aber nicht daran, innovativ zu sein.

Wir haben bei unserer Recherche etliche Software-Lösungen für noch bequemere Onlinekäufe gefunden, wie z. B. Add-Ons zum
Preisvergleich verschiedener Plattformen. Dahingegen haben wir vergeblich nach einer Lösung wie der unseren gesucht, die
Kaufentscheidungen bewusst ein kleines Stückchen unbequemer machen.

Wir halten unseren Beitrag für innovativ, weil er unkompliziert von Menschen weltweit genutzt werden kann und
Privatpersonen eine neue Möglichkeit bietet, bewusster und nachhaltiger zu leben. Da unsere Lösung lokal im Browser
läuft, kann sie ohne Skalierungsprobleme von beliebig vielen Menschen genutzt werden. Der potenzielle Nutzen unseres
Add-Ons ist also immens.

## Quellen

1. [Universität Bamberg, Forschungsgruppe Retouren](http://www.retourenforschung.de/info-retournierverhalten-waehrend-der-covid-19-pandemie-untersucht.html)
2. [Süddeutsche Zeitung: Das macht 500 Gramm CO2](https://www.sueddeutsche.de/wissen/oeko-bilanz-des-internethandel-das-macht-500-gramm-co2-1.1607616)
3. [Tagesspiegel: Warum die Vernichtung von Retouren weiter nicht verboten ist](https://www.tagesspiegel.de/wirtschaft/gesetzesaenderung-zu-recycling-warum-die-vernichtung-von-retouren-weiter-nicht-verboten-ist/25539344.html)
4. [Handelsdaten: Ranking der größten Einzelhändler weltweit nach E-Commerce-Umsatz](https://www.handelsdaten.de/e-commerce/ranking-top-einzelhaendler-weltweit-nach-e-commerce-umsatz)
