export const routes = {}

// routes['airoli'] = ['thane', 'vashi/panvel'];
// routes['ambernath'] = ['csmt', 'karjat/khopoli'];
// routes['ambivli'] = ['csmt', 'kasara'];
// routes['ambivli'] = ['csmt', 'kasara'];
// routes['andheri'] = ['churchgate', 'borivali/virar/dahanu', 'cmst', 'goregoan-harbour', 'panvel'];
// routes['asangaon'] = ['cmst', 'kasara'];
// routes['atgaon'] = ['cmst', 'kasara'];
// routes['badlapur'] = ['cmst', 'karjat/khopoli'];


const temp1 = ['byculla', 'chinchpokali', 'currey-road', 'parel', 'matunga', 'sion', 'vidyavihar', 'ghatkopar', 'vikhroli', 'kanjur-marg', 'bhandup', 'nahur', 'mulund', 'kalwa', 'mumbra', 'diva', 'kopar', 'dombivali', 'thakurli'];
temp1.forEach((element, index) =>{
    routes[element] = ['csmt', 'kalyan/khopoli/kasara'];
});

const temp2 = ['shahad', 'ambivli', 'titwala', 'khadavali', 'vashind', 'asangaon', 'atgaon', 'thansit', 'khardi', 'umbermali'];
temp2.forEach((element, index) =>{
    routes[element] = ['csmt', 'kasara'];
});

const temp3 = ['vitthalvadi', 'ulhasnagar', 'ambernath', 'badlapur', 'vangani', 'shelu', 'nerul', 'bhivpuri-road'];
temp3.forEach((element, index) =>{
    routes[element] = ['csmt', 'karjat/khopoli'];
});

const temp4 = ['palasdhari', 'kelavali', 'dolavali', 'lowjee'];
temp4.forEach((element, index) =>{
    routes[element] = ['csmt', 'khopoli'];
});

const temp5 = ["dockyard-road", "reay-road", "cotton-green", "sewri", 'vadala-road']
temp5.forEach((element, index) =>{
    routes[element] = ['csmt', 'panvel/andheri/goregaon'];    
});


const temp6 = ["gtb-nagar", "chunabhatti", "tilaknagar", "chembur", "govandi", "mankhurd"];
temp6.forEach((element, index) =>{
    routes[element] = ['csmt', 'panvel', 'andheri/goregoan-harbour'];    
});

const temp7 = ["vashi", "sanpada", "juinagar", "nerul", "seawood-darave", "belapur-cbd","kharghar", "manasarovar", "khandeshwar", "panvel"];
temp7.forEach((element, index) =>{
    routes[element] = ['csmt', 'panvel', 'andheri/goregoan-harbour', 'thane'];    
});

const temp8 = ["airoli", "rabale", "ghansoli", "koparkhairne", "turbhe"];
temp8.forEach((element, index) =>{
    routes[element] = ['thane', 'vashi/panvel'];    
});

const temp9 = ["marine-lines", "charni-road", "grant-road", "mahalakshmi", "lower-parel", "prabhadevi", "matunga-road"];
temp9.forEach((element, index) =>{
    routes[element] = ['churchgate', 'borivali/virar'];    
});

const temp10 = ["mahim-jn", "bandra", "khar-road", "santa-cruz", "vile-parle", "jogeshwari", "ram-mandir"];
temp10.forEach((element, index) =>{
    routes[element] = ['churchgate', 'borivali/virar/dahanu', 'csmt', 'andheri/goregoan-harbour', 'panvel'];    
});

routes['malad'] = ['churchgate', 'borivali/virar'];
routes['kandivali'] = ['churchgate', 'borivali/virar'];

const temp11 = ["dahisar", "mira-road", "bhayander", "naigaon"];
temp11.forEach((element, index) =>{
    routes[element] = ['churchgate', 'virar'];    
});

routes['vasai-road'] = ['churchgate', 'virar/dahanu'];
routes['nallasopara'] = ['churchgate', 'virar/dahanu'];

const temp12 = ["vaitarana", "saphale", "kelva-road", "palghar", "umroli-road", "boisar", "vangaon"];
temp12.forEach((element, index) =>{
    routes[element] = ['churchgate/virar', 'dahanu'];    
});

routes['dahanu-road'] = ['churchgate/virar'];
routes['virar'] = ['churchgate', 'dahanu'];
routes['borivali'] = ['churchgate', 'virar/dahanu'];
routes['goregaon'] = ['churchgate', 'borivali/virar', 'csmt', 'panvel'];
routes['andheri'] = ['churchgate', 'borivali/virar/dahanu', 'csmt', 'goregaon-harbour', 'panvel'];
routes['dadar'] = ['churchgate', 'borivali/virar/dahanu', 'csmt', 'kalyan/khopoli/kasara'];
routes['mumbai-central'] = ['churchgate', 'borivali/virar/dahanu'];
routes['churchgate'] = ['borivali/virar/dahanu'];
routes['csmt'] = ['kalyan/khopoli/kasara', 'panvel/andheri/goregaon'];
routes['sandhurst-road'] = ['csmt-central', 'kalyan/khopoli/kasara', 'csmt-harbour', 'panvel/andheri/goregaon'];
routes['masjid'] = ['csmt-central', 'kalyan/khopoli/kasara', 'csmt-harbour', 'panvel/andheri/goregaon'];
routes['kurla'] = ['csmt-central', 'kalyan/khopoli/kasara', 'csmt-harbour', 'panvel', 'andheri/goregaon-harbour'];
routes['thane'] = ['csmt', 'kalyan/khopoli/kasara', 'vashi/nerul/panvel'];
routes['kalyan'] = ['csmt', 'khopoli/kasara'];
routes['kasara'] = ['cmst'];
routes['karjat'] = ['csmt', 'khopoli'];
routes['khopoli'] = ['cmst/karjat'];
routes['panvel'] = ['csmt', 'thane', 'andheri/goregaon-harbour'];
