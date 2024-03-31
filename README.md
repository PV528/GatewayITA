# Gateway
V tem projektu smo dodali dva vratna strežnika:

## gatewayWeb: Namenjen je spletnemu odjemalcu. Vsebuje skupno vstopno točko za več mikrostoritev:

+ /cars/**: Povezava na mikrostoritev za upravljanje avtomobilov.
+ /user/**: Povezava na tri mikrostoritve za upravljanje uporabnikov.
+ /api/rentals/: Povezava na dve mikrostoritvi za upravljanje najemov.
+ Omogoča vse CRUD operacije za vse tri mikrostoritve.
+ Teče na localhost:3000.

## gatewayMobile: Ta vratni strežnik je namenjen mobilnemu odjemalcu.

+ Z uporabo predpone /mobile/** omejuje dostop le na branje podatkov, kar povečuje varnost in zmanjšuje možnost neželenih sprememb podatkov.
+ Omogoča zgolj branje podatkov.
+ Teče na localhost:3010.
