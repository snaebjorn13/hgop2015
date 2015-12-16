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
Nodejs er "open source cross platform" keyrsluumhverfi fyrir bakenda vefforrit. Það notar Javascript V8 vélina til að keyra kóða. Það er notað í flestum tilfellum, og í okkar, til að keyra einhversskonar API bakenda.
## Bower
Bower er tól til þess að halda utan um javascript pakka fyrir framenda á vefsíðum. Það heldur utan um þessi "dependencies" í bower.json skrá sem geymd er í rót verkefnisins.
## Topology of Deployment as of day 3
GitHub heldur utan um source kóðann fyrir forritið okkar og DockerHub heldur utan um keyrslu gám fyrir forritið. Breytingar eru gerðar að vild á development vagrant vélinni og þegar gert er commit á GitHub repository-ið okkar þá fer Jenkins commit stage ferli í gang.

Jenkins pollar GitHub repository-ið á mínútu fresti eftir breytingum, þegar hann nemur breytingar þá sækir hann breytingarnar, keyrir Grunt build script og býr til Docker image. Svo er push-að Docker image-inu á DockerHub og test vélin er látin slökkva á Docker gámnum hjá sér, sækja nýjasta image-ið og keyra Docker gáminn upp á nýtt með nýja image-inu.

## Load Tests
#### Results
Ég setti upphaflega það markmið að spila 600 leiki á 8 sekúndum eftir að hafa prófað mig áfram og fundið tölur sem gáfu mér stabílar niðurstöður. Svo hækkaði ég timeout-ið um 20% í 9.5 sekúndur.

Þegar Jenkins keyrði álagsprófið spiluðust 600 leikir á 6.85 sekúndum, semsagt vel undir mörkunum 9.5 sekúndur.

#### Parallel Execution
Leikirnir í álagsprófinu keyra á sama tíma, for lykkjan í tictactoe.load.js keyrir án þess að bíða eftir að leikirnir hafa klárað að spilast. Það er vegna þess að Node.js notar asynchronous IO og block-ar ekki þráðinn (eina þráðinn sem er í notkun) á meðan beðið er eftir svari. QED fallið er keyrt í lok hvers leiks og það keyrir done fallið bara þegar allir leikir hafa klárað að spilast.

Álagsprófið stenst ef allir leikir klárast innan þeirra tímamarka sem við setjum okkur.

## Deploy Any Version

#### What does this give us? Who would use the capability to track versions and why? Who would use capability to deploy any version and why?
Þetta gefur okkur möguleikann á því að deploy-a eldri útgáfum ef við skyldum vilja það. Þetta er mjög góður kostur að hafa og gæti komið sér vel þegar það er release-að. Við myndum vilja gera það, til dæmis, ef nýjasta útgáfa er komin í production og það uppgötvast að það er böggur sem prófanirnar náðu ekki að grípa. Þá getum við bara sett eldri útgáfu í production á meðan sú nýja er löguð.

Sá sem hefur aðgang að Jenkins build interface-inu getur stýrt því hvaða version er keyrandi í production.

#### What was wrong with having docker push in the deployment script rather than in the dockerbuild.sh script?
Deployment skriptan keyrir á öðru stage-i heldur en það sem er trigger-að af git commit-inu. Þar sem git commit taggið er notað sem version á Docker image er betra að hafa það á sama stage-i og það sem er triggerað af commit-inu.

#### How does the "deploy any version, anywhere" build feature work? Hint: Track GIT_COMMIT
Við hvert commit sem push-að er fer build pipeline-ið í gang. Commit hash-ið er notað til að skilgreina útgáfuna og er bætt við fyrir aftan nafnið á docker image-inu. Þetta commit hash er pikkað upp af commit stage-inu og er sent áfram í acceptance stage-ið og deployment stage-ið. Því veltur það hvaða version fer í production, á því hvaða version (commit hash) commit stage-ið byrjar með. Því getum við sett gamalt build í gang (með eldra commit hash en það nýjasta) og þar með sett þá útgáfu í production, ef build-ið klikkar ekki á einhverju stigi.

# Jenkins Build Pipeline
## Commit Stage
```
export DISPLAY=:0
npm install
bower install
./dockerbuild.sh
```

## Acceptance Stage
```
export GIT_UPSTREAM_HASH=$(<dist/githash.txt)
./dockerupdate.sh vagrant@192.168.33.10 9000 $GIT_UPSTREAM_HASH
```
```
npm install
./acceptancetest.sh
```

## Capacity Stage
```
npm install
./loadtest.sh
```

## Production Deployment Stage
```
export GIT_UPSTREAM_HASH=$(<dist/githash.txt)
./dockerupdate.sh vagrant@192.168.33.10 9001 $GIT_UPSTREAM_HASH
```