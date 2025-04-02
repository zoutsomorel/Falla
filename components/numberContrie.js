class NumberContries{

static pays=[
    // Europe
    { name: 'Albanie', code: '+355', pattern: '^[6][0-9]{8}$', iso: 'al' },
    { name: 'Allemagne', code: '+49', pattern: '^[1-9][0-9]{10}$', iso: 'de' },
    { name: 'Andorre', code: '+376', pattern: '^[3-6][0-9]{5}$', iso: 'ad' },
    { name: 'Arménie', code: '+374', pattern: '^[4-9][0-9]{7}$', iso: 'am' },
    { name: 'Autriche', code: '+43', pattern: '^[6][0-9]{8}$', iso: 'at' },
    { name: 'Azerbaïdjan', code: '+994', pattern: '^[4-9][0-9]{8}$', iso: 'az' },
    { name: 'Belgique', code: '+32', pattern: '^[4][0-9]{8}$', iso: 'be' },
    { name: 'Biélorussie', code: '+375', pattern: '^[2-9][0-9]{8}$', iso: 'by' },
    { name: 'Bosnie-Herzégovine', code: '+387', pattern: '^[6][0-9]{7,8}$', iso: 'ba' },
    { name: 'Bulgarie', code: '+359', pattern: '^[8-9][0-9]{8}$', iso: 'bg' },
    { name: 'Chypre', code: '+357', pattern: '^[9][0-9]{7}$', iso: 'cy' },
    { name: 'Croatie', code: '+385', pattern: '^[9][0-9]{8}$', iso: 'hr' },
    { name: 'Danemark', code: '+45', pattern: '^[2-9][0-9]{7}$', iso: 'dk' },
    { name: 'Espagne', code: '+34', pattern: '^[6-7][0-9]{8}$', iso: 'es' },
    { name: 'Estonie', code: '+372', pattern: '^[5][0-9]{6,7}$', iso: 'ee' },
    { name: 'Finlande', code: '+358', pattern: '^[4-5][0-9]{8}$', iso: 'fi' },
    { name: 'France', code: '+33', pattern: '^[6-7][0-9]{8}$', iso: 'fr' },
    { name: 'Géorgie', code: '+995', pattern: '^[5][0-9]{8}$', iso: 'ge' },
    { name: 'Grèce', code: '+30', pattern: '^[6][0-9]{9}$', iso: 'gr' },
    { name: 'Hongrie', code: '+36', pattern: '^[2-9][0-9]{8}$', iso: 'hu' },
    { name: 'Irlande', code: '+353', pattern: '^[8][0-9]{8}$', iso: 'ie' },
    { name: 'Islande', code: '+354', pattern: '^[6-8][0-9]{7}$', iso: 'is' },
    { name: 'Italie', code: '+39', pattern: '^[3][0-9]{9}$', iso: 'it' },
    { name: 'Kazakhstan', code: '+7', pattern: '^[7][0-9]{9}$', iso: 'kz' },
    { name: 'Kosovo', code: '+383', pattern: '^[4][0-9]{7}$', iso: 'xk' },
    { name: 'Lettonie', code: '+371', pattern: '^[2][0-9]{7}$', iso: 'lv' },
    { name: 'Liechtenstein', code: '+423', pattern: '^[6][0-9]{7}$', iso: 'li' },
    { name: 'Lituanie', code: '+370', pattern: '^[6][0-9]{7}$', iso: 'lt' },
    { name: 'Luxembourg', code: '+352', pattern: '^[6][0-9]{8}$', iso: 'lu' },
    { name: 'Macédoine du Nord', code: '+389', pattern: '^[7][0-9]{7}$', iso: 'mk' },
    { name: 'Malte', code: '+356', pattern: '^[7-9][0-9]{7}$', iso: 'mt' },
    { name: 'Moldavie', code: '+373', pattern: '^[6-7][0-9]{7}$', iso: 'md' },
    { name: 'Monaco', code: '+377', pattern: '^[4-6][0-9]{8}$', iso: 'mc' },
    { name: 'Monténégro', code: '+382', pattern: '^[6][0-9]{7,8}$', iso: 'me' },
    { name: 'Norvège', code: '+47', pattern: '^[4-9][0-9]{7}$', iso: 'no' },
    { name: 'Pays-Bas', code: '+31', pattern: '^[6][0-9]{8}$', iso: 'nl' },
    { name: 'Pologne', code: '+48', pattern: '^[4-9][0-9]{8}$', iso: 'pl' },
    { name: 'Portugal', code: '+351', pattern: '^[9][0-9]{8}$', iso: 'pt' },
    { name: 'République tchèque', code: '+420', pattern: '^[6-7][0-9]{8}$', iso: 'cz' },
    { name: 'Roumanie', code: '+40', pattern: '^[7][0-9]{8}$', iso: 'ro' },
    { name: 'Royaume-Uni', code: '+44', pattern: '^[7][0-9]{9}$', iso: 'gb' },
    { name: 'Russie', code: '+7', pattern: '^[9][0-9]{9}$', iso: 'ru' },
    { name: 'Saint-Marin', code: '+378', pattern: '^[6][0-9]{7,8}$', iso: 'sm' },
    { name: 'Serbie', code: '+381', pattern: '^[6][0-9]{7,8}$', iso: 'rs' },
    { name: 'Slovaquie', code: '+421', pattern: '^[9][0-9]{8}$', iso: 'sk' },
    { name: 'Slovénie', code: '+386', pattern: '^[3-7][0-9]{7}$', iso: 'si' },
    { name: 'Suède', code: '+46', pattern: '^[7][0-9]{8}$', iso: 'se' },
    { name: 'Suisse', code: '+41', pattern: '^[7][0-9]{8}$', iso: 'ch' },
    { name: 'Ukraine', code: '+380', pattern: '^[6-9][0-9]{8}$', iso: 'ua' },
    { name: 'Vatican', code: '+379', pattern: '^[0-9]{10}$', iso: 'va' },

        // Afrique
    { name: 'Afrique du Sud', code: '+27', pattern: '^[6-8][0-9]{8}$', iso: 'za' },
    { name: 'Algérie', code: '+213', pattern: '^[5-7][0-9]{8}$', iso: 'dz' },
    { name: 'Angola', code: '+244', pattern: '^[9][0-9]{8}$', iso: 'ao' },
    { name: 'Bénin', code: '+229', pattern: '^[4-9][0-9]{7}$', iso: 'bj' },
    { name: 'Botswana', code: '+267', pattern: '^[7][0-9]{7}$', iso: 'bw' },
    { name: 'Burkina Faso', code: '+226', pattern: '^[6-7][0-9]{7}$', iso: 'bf' },
    { name: 'Burundi', code: '+257', pattern: '^[7][0-9]{7}$', iso: 'bi' },
    { name: 'Cameroun', code: '+237', pattern: '^[6][0-9]{8}$', iso: 'cm' },
    { name: 'Cap-Vert', code: '+238', pattern: '^[5-9][0-9]{6}$', iso: 'cv' },
    { name: 'Comores', code: '+269', pattern: '^[3][0-9]{6}$', iso: 'km' },
    { name: 'Congo', code: '+242', pattern: '^[0][0-9]{8}$', iso: 'cg' },
    { name: 'Côte d\'Ivoire', code: '+225', pattern: '^[0-9]{8}$', iso: 'ci' },
    { name: 'Djibouti', code: '+253', pattern: '^[7][0-9]{7}$', iso: 'dj' },
    { name: 'Égypte', code: '+20', pattern: '^[1][0-9]{9}$', iso: 'eg' },
    { name: 'Érythrée', code: '+291', pattern: '^[7][0-9]{7}$', iso: 'er' },
    { name: 'Eswatini', code: '+268', pattern: '^[7][0-9]{7}$', iso: 'sz' },
    { name: 'Éthiopie', code: '+251', pattern: '^[9][0-9]{8}$', iso: 'et' },
    { name: 'Gabon', code: '+241', pattern: '^[6-7][0-9]{7}$', iso: 'ga' },
    { name: 'Gambie', code: '+220', pattern: '^[7-9][0-9]{6}$', iso: 'gm' },
    { name: 'Ghana', code: '+233', pattern: '^[2][0-9]{8}$', iso: 'gh' },
    { name: 'Guinée', code: '+224', pattern: '^[6][0-9]{8}$', iso: 'gn' },
    { name: 'Guinée-Bissau', code: '+245', pattern: '^[5-7][0-9]{7}$', iso: 'gw' },
    { name: 'Guinée équatoriale', code: '+240', pattern: '^[2-9][0-9]{7}$', iso: 'gq' },
    { name: 'Kenya', code: '+254', pattern: '^[7][0-9]{8}$', iso: 'ke' },
    { name: 'Lesotho', code: '+266', pattern: '^[5-8][0-9]{7}$', iso: 'ls' },
    { name: 'Libéria', code: '+231', pattern: '^[4-6][0-9]{7}$', iso: 'lr' },
    { name: 'Libye', code: '+218', pattern: '^[9][0-9]{8}$', iso: 'ly' },
    { name: 'Madagascar', code: '+261', pattern: '^[3][0-9]{8}$', iso: 'mg' },
    { name: 'Malawi', code: '+265', pattern: '^[7-9][0-9]{7}$', iso: 'mw' },
    { name: 'Mali', code: '+223', pattern: '^[6-7][0-9]{7}$', iso: 'ml' },
    { name: 'Maroc', code: '+212', pattern: '^[6-7][0-9]{8}$', iso: 'ma' },
    { name: 'Maurice', code: '+230', pattern: '^[5][0-9]{7}$', iso: 'mu' },
    { name: 'Mauritanie', code: '+222', pattern: '^[4][0-9]{7}$', iso: 'mr' },
    { name: 'Mozambique', code: '+258', pattern: '^[8][0-9]{7,8}$', iso: 'mz' },
    { name: 'Namibie', code: '+264', pattern: '^[6][0-9]{8}$', iso: 'na' },
    { name: 'Niger', code: '+227', pattern: '^[9][0-9]{7}$', iso: 'ne' },
    { name: 'Nigeria', code: '+234', pattern: '^[7-9][0-9]{9}$', iso: 'ng' },
    { name: 'Ouganda', code: '+256', pattern: '^[7][0-9]{8}$', iso: 'ug' },
    { name: 'République centrafricaine', code: '+236', pattern: '^[7][0-9]{7}$', iso: 'cf' },
    { name: 'République démocratique du Congo', code: '+243', pattern: '^[8-9][0-9]{8}$', iso: 'cd' },
    { name: 'Rwanda', code: '+250', pattern: '^[7][0-9]{8}$', iso: 'rw' },
    { name: 'São Tomé-et-Principe', code: '+239', pattern: '^[9][0-9]{6}$', iso: 'st' },
    { name: 'Sénégal', code: '+221', pattern: '^[7][0-9]{8}$', iso: 'sn' },
    { name: 'Seychelles', code: '+248', pattern: '^[2-8][0-9]{5}$', iso: 'sc' },
    { name: 'Sierra Leone', code: '+232', pattern: '^[7-9][0-9]{7}$', iso: 'sl' },
    { name: 'Somalie', code: '+252', pattern: '^[6-7][0-9]{7}$', iso: 'so' },
    { name: 'Soudan', code: '+249', pattern: '^[9][0-9]{8}$', iso: 'sd' },
    { name: 'Soudan du Sud', code: '+211', pattern: '^[9][0-9]{8}$', iso: 'ss' },
    { name: 'Tanzanie', code: '+255', pattern: '^[6-7][0-9]{8}$', iso: 'tz' },
    { name: 'Tchad', code: '+235', pattern: '^[6][0-9]{7}$', iso: 'td' },
    { name: 'Togo', code: '+228', pattern: '^[7-9][0-9]{7}$', iso: 'tg' },
    { name: 'Tunisie', code: '+216', pattern: '^[2-9][0-9]{7}$', iso: 'tn' },
    { name: 'Zambie', code: '+260', pattern: '^[7-9][0-9]{8}$', iso: 'zm' },
    { name: 'Zimbabwe', code: '+263', pattern: '^[7][0-9]{8}$', iso: 'zw' },

    // Asie
    { name: 'Afghanistan', code: '+93', pattern: '^[7][0-9]{8}$', iso: 'af' },
    { name: 'Arabie saoudite', code: '+966', pattern: '^[5][0-9]{8}$', iso: 'sa' },
    { name: 'Bahreïn', code: '+973', pattern: '^[3][0-9]{7}$', iso: 'bh' },
    { name: 'Bangladesh', code: '+880', pattern: '^[1][0-9]{9}$', iso: 'bd' },
    { name: 'Bhoutan', code: '+975', pattern: '^[1-7][0-9]{7}$', iso: 'bt' },
    { name: 'Birmanie (Myanmar)', code: '+95', pattern: '^[9][0-9]{8,9}$', iso: 'mm' },
    { name: 'Brunei', code: '+673', pattern: '^[7-8][0-9]{6}$', iso: 'bn' },
    { name: 'Cambodge', code: '+855', pattern: '^[1][0-9]{8}$', iso: 'kh' },
    { name: 'Chine', code: '+86', pattern: '^[1][0-9]{10}$', iso: 'cn' },
    { name: 'Corée du Nord', code: '+850', pattern: '^[1-9][0-9]{7}$', iso: 'kp' },
    { name: 'Corée du Sud', code: '+82', pattern: '^[1][0-9]{9}$', iso: 'kr' },
    { name: 'Émirats arabes unis', code: '+971', pattern: '^[5][0-9]{8}$', iso: 'ae' },
    { name: 'Hong Kong', code: '+852', pattern: '^[5-9][0-9]{7}$', iso: 'hk' },
    { name: 'Inde', code: '+91', pattern: '^[6-9][0-9]{9}$', iso: 'in' },
    { name: 'Indonésie', code: '+62', pattern: '^[8][0-9]{9,10}$', iso: 'id' },
    { name: 'Irak', code: '+964', pattern: '^[7][0-9]{9}$', iso: 'iq' },
    { name: 'Iran', code: '+98', pattern: '^[9][0-9]{9}$', iso: 'ir' },
    { name: 'Israël', code: '+972', pattern: '^[5][0-9]{8}$', iso: 'il' },
    { name: 'Japon', code: '+81', pattern: '^[7-9][0-9]{9}$', iso: 'jp' },
    { name: 'Jordanie', code: '+962', pattern: '^[7][0-9]{8}$', iso: 'jo' },

        // Suite Asie
    { name: 'Kazakhstan', code: '+7', pattern: '^[7][0-9]{9}$', iso: 'kz' },
    { name: 'Kirghizistan', code: '+996', pattern: '^[5-7][0-9]{8}$', iso: 'kg' },
    { name: 'Koweït', code: '+965', pattern: '^[5-9][0-9]{7}$', iso: 'kw' },
    { name: 'Laos', code: '+856', pattern: '^[2][0-9]{8}$', iso: 'la' },
    { name: 'Liban', code: '+961', pattern: '^[3,7][0-9]{7}$', iso: 'lb' },
    { name: 'Macao', code: '+853', pattern: '^[6][0-9]{7}$', iso: 'mo' },
    { name: 'Malaisie', code: '+60', pattern: '^[1][0-9]{8,9}$', iso: 'my' },
    { name: 'Maldives', code: '+960', pattern: '^[7-9][0-9]{6}$', iso: 'mv' },
    { name: 'Mongolie', code: '+976', pattern: '^[8-9][0-9]{7}$', iso: 'mn' },
    { name: 'Népal', code: '+977', pattern: '^[9][0-9]{9}$', iso: 'np' },
    { name: 'Oman', code: '+968', pattern: '^[9][0-9]{7}$', iso: 'om' },
    { name: 'Ouzbékistan', code: '+998', pattern: '^[9][0-9]{8}$', iso: 'uz' },
    { name: 'Pakistan', code: '+92', pattern: '^[3][0-9]{9}$', iso: 'pk' },
    { name: 'Palestine', code: '+970', pattern: '^[5][0-9]{8}$', iso: 'ps' },
    { name: 'Philippines', code: '+63', pattern: '^[9][0-9]{9}$', iso: 'ph' },
    { name: 'Qatar', code: '+974', pattern: '^[3-7][0-9]{7}$', iso: 'qa' },
    { name: 'Singapour', code: '+65', pattern: '^[8-9][0-9]{7}$', iso: 'sg' },
    { name: 'Sri Lanka', code: '+94', pattern: '^[7][0-9]{8}$', iso: 'lk' },
    { name: 'Syrie', code: '+963', pattern: '^[9][0-9]{8}$', iso: 'sy' },
    { name: 'Tadjikistan', code: '+992', pattern: '^[9][0-9]{8}$', iso: 'tj' },
    { name: 'Taïwan', code: '+886', pattern: '^[9][0-9]{8}$', iso: 'tw' },
    { name: 'Thaïlande', code: '+66', pattern: '^[6,8,9][0-9]{8}$', iso: 'th' },
    { name: 'Timor oriental', code: '+670', pattern: '^[7][0-9]{7}$', iso: 'tl' },
    { name: 'Turkménistan', code: '+993', pattern: '^[6][0-9]{7}$', iso: 'tm' },
    { name: 'Vietnam', code: '+84', pattern: '^[3-9][0-9]{8}$', iso: 'vn' },
    { name: 'Yémen', code: '+967', pattern: '^[7][0-9]{8}$', iso: 'ye' },

    // Amérique du Nord
    { name: 'Canada', code: '+1', pattern: '^[2-9][0-9]{9}$', iso: 'ca' },
    { name: 'États-Unis', code: '+1', pattern: '^[2-9][0-9]{9}$', iso: 'us' },
    { name: 'Mexique', code: '+52', pattern: '^[1-9][0-9]{9}$', iso: 'mx' },

    // Amérique Centrale
    { name: 'Belize', code: '+501', pattern: '^[6][0-9]{7}$', iso: 'bz' },
    { name: 'Costa Rica', code: '+506', pattern: '^[6-8][0-9]{7}$', iso: 'cr' },
    { name: 'Guatemala', code: '+502', pattern: '^[4-5][0-9]{7}$', iso: 'gt' },
    { name: 'Honduras', code: '+504', pattern: '^[3,7-9][0-9]{7}$', iso: 'hn' },
    { name: 'Nicaragua', code: '+505', pattern: '^[5,7-8][0-9]{7}$', iso: 'ni' },
    { name: 'Panama', code: '+507', pattern: '^[6][0-9]{7}$', iso: 'pa' },
    { name: 'Salvador', code: '+503', pattern: '^[6-7][0-9]{7}$', iso: 'sv' },

    // Caraïbes
    { name: 'Antigua-et-Barbuda', code: '+1268', pattern: '^[2-9][0-9]{6}$', iso: 'ag' },
    { name: 'Bahamas', code: '+1242', pattern: '^[3-9][0-9]{6}$', iso: 'bs' },
    { name: 'Barbade', code: '+1246', pattern: '^[2-9][0-9]{6}$', iso: 'bb' },
    { name: 'Cuba', code: '+53', pattern: '^[5][0-9]{7}$', iso: 'cu' },
    { name: 'Dominique', code: '+1767', pattern: '^[2-9][0-9]{6}$', iso: 'dm' },
    { name: 'Grenade', code: '+1473', pattern: '^[4][0-9]{6}$', iso: 'gd' },
    { name: 'Haïti', code: '+509', pattern: '^[3-4][0-9]{7}$', iso: 'ht' },
    { name: 'Jamaïque', code: '+1876', pattern: '^[2-9][0-9]{6}$', iso: 'jm' },
    { name: 'République dominicaine', code: '+1809', pattern: '^[8][0-9]{7}$', iso: 'do' },
    { name: 'Saint-Kitts-et-Nevis', code: '+1869', pattern: '^[5-9][0-9]{6}$', iso: 'kn' },
    { name: 'Saint-Vincent-et-les-Grenadines', code: '+1784', pattern: '^[4][0-9]{6}$', iso: 'vc' },
    { name: 'Sainte-Lucie', code: '+1758', pattern: '^[5-8][0-9]{6}$', iso: 'lc' },
    { name: 'Trinité-et-Tobago', code: '+1868', pattern: '^[2-9][0-9]{6}$', iso: 'tt' },

    // Amérique du Sud
    { name: 'Argentine', code: '+54', pattern: '^[9][0-9]{9}$', iso: 'ar' },
    { name: 'Bolivie', code: '+591', pattern: '^[6-7][0-9]{7}$', iso: 'bo' },
    { name: 'Brésil', code: '+55', pattern: '^[1-9][0-9]{10}$', iso: 'br' },
    { name: 'Chili', code: '+56', pattern: '^[9][0-9]{8}$', iso: 'cl' },
    { name: 'Colombie', code: '+57', pattern: '^[3][0-9]{9}$', iso: 'co' },
    { name: 'Équateur', code: '+593', pattern: '^[9][0-9]{8}$', iso: 'ec' },
    { name: 'Guyana', code: '+592', pattern: '^[6][0-9]{6}$', iso: 'gy' },
    { name: 'Paraguay', code: '+595', pattern: '^[9][0-9]{8}$', iso: 'py' },
    { name: 'Pérou', code: '+51', pattern: '^[9][0-9]{8}$', iso: 'pe' },
    { name: 'Suriname', code: '+597', pattern: '^[6-8][0-9]{6}$', iso: 'sr' },
    { name: 'Uruguay', code: '+598', pattern: '^[9][0-9]{7}$', iso: 'uy' },
    { name: 'Venezuela', code: '+58', pattern: '^[4][0-9]{9}$', iso: 've' },

        // Océanie
    { name: 'Australie', code: '+61', pattern: '^[4][0-9]{8}$', iso: 'au' },
    { name: 'Fidji', code: '+679', pattern: '^[7-9][0-9]{6}$', iso: 'fj' },
    { name: 'Îles Cook', code: '+682', pattern: '^[5-7][0-9]{4}$', iso: 'ck' },
    { name: 'Îles Marshall', code: '+692', pattern: '^[2-6][0-9]{6}$', iso: 'mh' },
    { name: 'Îles Salomon', code: '+677', pattern: '^[7-8][0-9]{6}$', iso: 'sb' },
    { name: 'Kiribati', code: '+686', pattern: '^[9][0-9]{4}$', iso: 'ki' },
    { name: 'Micronésie', code: '+691', pattern: '^[3-9][0-9]{6}$', iso: 'fm' },
    { name: 'Nauru', code: '+674', pattern: '^[4-5][0-9]{4}$', iso: 'nr' },
    { name: 'Nouvelle-Zélande', code: '+64', pattern: '^[2][0-9]{7,9}$', iso: 'nz' },
    { name: 'Palaos', code: '+680', pattern: '^[8][0-9]{6}$', iso: 'pw' },
    { name: 'Papouasie-Nouvelle-Guinée', code: '+675', pattern: '^[7][0-9]{7}$', iso: 'pg' },
    { name: 'Samoa', code: '+685', pattern: '^[7][0-9]{6}$', iso: 'ws' },
    { name: 'Tonga', code: '+676', pattern: '^[7][0-9]{6}$', iso: 'to' },
    { name: 'Tuvalu', code: '+688', pattern: '^[2-9][0-9]{4}$', iso: 'tv' },
    { name: 'Vanuatu', code: '+678', pattern: '^[5-7][0-9]{5}$', iso: 'vu' },

    // Territoires spéciaux et dépendances
    { name: 'Polynésie française', code: '+689', pattern: '^[8-9][0-9]{7}$', iso: 'pf' },
    { name: 'Nouvelle-Calédonie', code: '+687', pattern: '^[5-9][0-9]{5}$', iso: 'nc' },
    { name: 'Groenland', code: '+299', pattern: '^[2-9][0-9]{5}$', iso: 'gl' },
    { name: 'Îles Féroé', code: '+298', pattern: '^[2-9][0-9]{5}$', iso: 'fo' },
    { name: 'Gibraltar', code: '+350', pattern: '^[5-6][0-9]{7}$', iso: 'gi' },
    { name: 'Guam', code: '+1671', pattern: '^[6-9][0-9]{6}$', iso: 'gu' },
    { name: 'Îles Caïmans', code: '+1345', pattern: '^[2-9][0-9]{6}$', iso: 'ky' },
    { name: 'Îles Vierges britanniques', code: '+1284', pattern: '^[3][0-9]{6}$', iso: 'vg' },
    { name: 'Îles Vierges américaines', code: '+1340', pattern: '^[3][0-9]{6}$', iso: 'vi' },
    { name: 'Aruba', code: '+297', pattern: '^[5-6][0-9]{6}$', iso: 'aw' },
    { name: 'Bermudes', code: '+1441', pattern: '^[5-9][0-9]{6}$', iso: 'bm' },
    { name: 'Îles Mariannes du Nord', code: '+1670', pattern: '^[2-9][0-9]{6}$', iso: 'mp' },
    { name: 'Porto Rico', code: '+1787', pattern: '^[2-9][0-9]{6}$', iso: 'pr' },
    { name: 'Samoa américaines', code: '+1684', pattern: '^[2-9][0-9]{6}$', iso: 'as' },
    { name: 'Guadeloupe', code: '+590', pattern: '^[6-7][0-9]{8}$', iso: 'gp' },
    { name: 'Martinique', code: '+596', pattern: '^[6-7][0-9]{8}$', iso: 'mq' },
    { name: 'Guyane française', code: '+594', pattern: '^[6-7][0-9]{8}$', iso: 'gf' },
    { name: 'La Réunion', code: '+262', pattern: '^[6-7][0-9]{8}$', iso: 're' },
    { name: 'Mayotte', code: '+262', pattern: '^[6-7][0-9]{8}$', iso: 'yt' },
    { name: 'Saint-Martin', code: '+590', pattern: '^[6-7][0-9]{8}$', iso: 'mf' },
    { name: 'Saint-Barthélemy', code: '+590', pattern: '^[6-7][0-9]{8}$', iso: 'bl' },
    { name: 'Saint-Pierre-et-Miquelon', code: '+508', pattern: '^[4-9][0-9]{5}$', iso: 'pm' },
    { name: 'Wallis-et-Futuna', code: '+681', pattern: '^[5-9][0-9]{5}$', iso: 'wf' }
];
static paysSelectionne={};

static getFlag(iso){
	return "https://flagcdn.com/"+iso+".svg";
}


static putOption(p,id){
	return `
	<div class='flex p-2' onclick="NumberContries.selectionnePays(${id},this)">
		<div class='px-2'><img src='${this.getFlag(p.iso)}'/></div>
		<div class='px-2 flex-center h-100'>${p.name}(${p.code})</div>
	</div>`
}

static get afficheOption(){
	let html="";
	this.pays.forEach(e=>{
		html+=this.putOption(e);
	});

	return `<div class='listeContrie w-100 shadow rounded' style='display:none;position:absolute'>${html}</div>`;
}

static selectionnePays(id,el){
	this.paysSelectionne=this.pays[id];
}

static afficheSelect(){
	return `
		<div class='NumberContries'>
			<div class='border-gray rounded w-100' onclick="NumberContries.displayOption(this)">Chosir le pays</div>
			${this.afficheOption}
		</div>
	`
}

static displayOption(el){
	let parent=dom.getParent(el,'NumberContries')[0];
	if(parent){
		let p;
		if(p==dom.getChild(parent,"listeContrie")[0]){
			p.style.display=p.style.display=='none'?'':'none';
		}
	}
}

}