# Report
## Vagrant
Vagrant er tól til að halda utan um keyrslu- og þróunarumhverfi í sýndarvélum. Vagrant ræsir vélarnar upp í gegnum sýndarvélaforrit (á borð við VirtualBox) og keyrir þær samkvæmt ákveðnum stillingum. Vagrant býður upp á samstilltar möppur á host-vélinni og guest-vélinni. Allar breytingar sem gerðar eru í möppunni á host-vélinni, gerast líka á guest-vélinni og vice versa.
## VirtualBox
VirtualBox er forrit sem notað er til þess að keyra sýndarvélar. VirtualBox gerir manni kleift að setja upp annað stýrikerfi í afmarkaðri sýndarvél, og er þess vegna tilvalið til þess að prófa nýtt stýrikerfi eða setja upp stöðugt þróunarumhverfi.
## Grunt
Grunt er "task runner" sem notaður er til þess að sjálfvirknivæða "build"-ferlið í þróun Javascript forrita. Hann keyrir "tösk" hvert af fætur öðru sem stillt er í Gruntfile.js skrá í rót verkefnis.
## npm
npm er tól til að halda utan um javascript pakka fyrir nodejs keyrsluumhverfið. npm sækir þá pakka sem tilgreindir eru í packages.json í rót hvers verkefnis og setur þá í node_modules möppu í rótinni. npm sækir pakka á npm "registry"-ið.
## nodejs
nodejs er "open source cross platform" keyrsluumhverfi fyrir bakenda vefforrit. Það notar Javascript V8 vélina til að keyra kóða.
## Bower
Bower er tól til þess að halda utan um javascript pakka fyrir framenda á vefsíðum. Það heldur utan um þessi "dependencies" í bower.json skrá sem geymd er í rót verkefnisins.
## Topology of Deployment
Ravison travis.