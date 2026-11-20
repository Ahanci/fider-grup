// Firma bilgileri tek yerde: değişince yalnızca bu dosya güncellenir.
export const site = {
  name: "Fider Grup",
  tagline: "Elektrik Mühendislik Hizmetleri",
  description:
    "Fider Grup; orta ve yüksek gerilim, trafo işletme sorumluluğu, elektriksel ölçümler, arıza tespiti ve elektrik taahhüt hizmetlerinde Gebze / Kocaeli merkezli mühendislik firmasıdır.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fidergrup.com",
  founded: 2019,
  address: {
    street: "Hacı Halil Mah. 1212 Sok. No:5 Kat:6 No:64",
    city: "Gebze",
    region: "Kocaeli",
    country: "TR",
  },
  phone: "0262 644 46 45",
  phoneHref: "tel:+902626444645",
  mobile: "0554 236 15 87",
  mobileHref: "tel:+905542361587",
  fax: "0262 644 56 45",
  email: "info@fidergrup.com",
  mapsQuery: "Hacı Halil Mah. 1212 Sok. Gebze Kocaeli",
} as const;

export type ServiceIcon =
  | "zap"
  | "cable"
  | "wifi"
  | "hardhat"
  | "gauge"
  | "wrench"
  | "shield";

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: ServiceIcon;
  image: string;
  intro: string[];
  items: string[];
  seoDescription: string;
};

export const services: Service[] = [
  {
    slug: "orta-ve-yuksek-gerilim-sistemleri",
    title: "Orta ve Yüksek Gerilim Sistemleri",
    short: "Trafo merkezi, OG hücre ve enerji dağıtım sistemlerinin proje, kurulum ve devreye alımı.",
    icon: "zap",
    image: "/img/orta-yuksek-gerilim.jpg",
    intro: [
      "Yüksek gerilim; elektrik enerjisi üretildikten sonra bir trafo ile yükseltilen, iletim hatlarıyla taşınan ve ardından alçak gerilime dönüştürülen gerilimdir. Orta ve yüksek gerilim sistemleri doğru tasarlanmadığında can ve mal güvenliğini doğrudan tehdit eder.",
      "Fider Grup, tesisinizin enerji ihtiyacına uygun orta gerilim hattından trafo merkezine kadar tüm sistemi proje, uygulama ve devreye alma aşamalarıyla tek elden sunar.",
    ],
    items: [
      "Resmi kurumlardan gerekli izinlerin alınması, proje çizimi, takip ve onay işlemleri",
      "Beton köşk montajı veya OG direk dikilmesi",
      "Orta gerilim hücreleri ve transformatör (trafo) montajı",
      "Topraklama işleri ve alçak gerilim panosu kurulumu",
      "Yer altı ve yer üstü kablo çekimi, reglaj ve devreye alma",
      "Trafo bakımı, yağ testleri ve koruma sistemi kontrolleri",
    ],
    seoDescription:
      "Orta ve yüksek gerilim sistemleri: trafo merkezi kurulumu, OG hücre montajı, bakım ve devreye alma. Gebze, Kocaeli, İstanbul ve tüm Türkiye.",
  },
  {
    slug: "kuvvetli-akim-tesisatlari",
    title: "Kuvvetli Akım Tesisatları",
    short: "Fabrika, AVM ve ticari yapılar için alçak gerilim güç dağıtımı, pano ve aydınlatma tesisatları.",
    icon: "cable",
    image: "/img/kuvvetli-akim.jpg",
    intro: [
      "Kuvvetli akım tesisatları; doğru akımda 600 V, alternatif akımda faz-nötr arası 250 V'tan düşük gerilim sistemlerini kapsar. Güç dağıtımı, aydınlatma ve enerji besleme hatlarının tümü bu kapsamdadır.",
      "Fabrikalar, mağazalar, AVM'ler ve konutlar için projeye uygun, standartlara göre kontrol edilmiş ve raporlanmış tesisatlar kuruyoruz.",
    ],
    items: [
      "Alçak gerilim güç ve dağıtım panoları",
      "Kablo tavası, kanal ve iletken döşeme işleri",
      "Aydınlatma tesisatı ve acil aydınlatma sistemleri",
      "Kompanzasyon ve topraklama sistemleri",
      "Devreye alma testleri ve iç tesisat raporlaması",
    ],
    seoDescription:
      "Kuvvetli akım tesisatları: alçak gerilim pano, aydınlatma, kablo ve topraklama işleri. Gebze ve Kocaeli merkezli elektrik mühendislik hizmeti.",
  },
  {
    slug: "zayif-akim-sistemleri",
    title: "Zayıf Akım Sistemleri",
    short: "Yapısal kablolama, yangın alarm, güvenlik ve iletişim altyapısı kurulumu.",
    icon: "wifi",
    image: "/img/zayif-akim.jpg",
    intro: [
      "Zayıf akım sistemleri; yapı içindeki bilgi akışını, iletişimi, kontrolü ve güvenliği yöneten sistemlerdir. Telefon, anten, yangın alarm ve benzeri düşük gerilimli cihazlar bu grupta yer alır ve genellikle 12 V ile çalışır.",
      "Bir yapı, zayıf akım sistemleri olmadan sadece betondan ibarettir. Bu nedenle altyapıyı baştan doğru planlıyor ve sahada eksiksiz uyguluyoruz.",
    ],
    items: [
      "Yapısal (data/ses) kablolama",
      "Yangın algılama ve alarm sistemleri",
      "Kamera ve güvenlik sistemleri",
      "Telefon, anten ve diğer iletişim altyapıları",
    ],
    seoDescription:
      "Zayıf akım sistemleri: yapısal kablolama, yangın alarm, güvenlik ve iletişim altyapısı kurulumu. Fider Grup Mühendislik.",
  },
  {
    slug: "elektrik-taahhut",
    title: "Elektrik Taahhüt",
    short: "AG, OG ve zayıf akım dahil anahtar teslim elektrik uygulama ve taahhüt işleri.",
    icon: "hardhat",
    image: "/img/elektrik-taahhut.jpg",
    intro: [
      "Elektrik ile ilgili uygulaması yapılan tüm işlere elektrik taahhüt denir. Alçak gerilim, orta gerilim ve zayıf akım sistemleri dahil; kurumlardan gerekli izinler alınarak onaylı projeye uygun şekilde yapılır.",
      "Fabrika, mağaza, AVM, ticarethane ve konut projelerinde enerjisiz kalmamanız için 7/24 hizmetinizdeyiz.",
    ],
    items: [
      "Orta ve yüksek gerilim taahhüt işleri, trafo merkezi kurulumu",
      "Alçak gerilim tesisat ve pano işleri",
      "Zayıf akım sistemleri uygulaması",
      "Demontaj hizmetleri",
      "İzin, kabul ve devreye alma süreçlerinin yönetimi",
    ],
    seoDescription:
      "Elektrik taahhüt: fabrika, mağaza, AVM ve konut projeleri için AG, OG ve zayıf akım uygulama hizmetleri. İstanbul, Kocaeli, Gebze.",
  },
  {
    slug: "elektriksel-olcumler",
    title: "Elektriksel Ölçümler",
    short: "Topraklama, paratoner, iç tesisat ve kaçak akım ölçümleri; mühendis onaylı raporlama.",
    icon: "gauge",
    image: "/img/elektriksel-olcumler.jpg",
    intro: [
      "Elektriksel ölçümler; elektrik tesisatının, panoların, paratonerin, topraklamanın ve elektrikle çalışan tüm cihazların durumunu kontrol etmek için yapılan risk analizi, ölçüm ve kontrollerdir.",
      "Yetkili mühendislerimiz ölçümleri yapar ve onaylı raporu size sunar. Acil durumlarda yakın bölgelerde aynı gün ölçüm yapabiliyoruz.",
    ],
    items: [
      "Topraklama ölçümü ve raporu",
      "Elektrik iç tesisat kontrolü ve raporlama",
      "Kaçak akım koruma rölesi (KAKR) testi",
      "Paratoner (yıldırımdan korunma) tesisatı ölçüm raporu",
      "Katodik koruma ölçümü",
      "İzolasyon direnci, çevrim ve hat empedansı ölçümleri",
      "Süreklilik (toprak devamlılığı) testi, aydınlatma ölçümü",
    ],
    seoDescription:
      "Topraklama, paratoner, iç tesisat ve kaçak akım ölçümleri; mühendis onaylı raporlama. İstanbul, Kocaeli (Gebze) ve tüm Türkiye.",
  },
  {
    slug: "elektrik-ariza",
    title: "Elektrik Arıza Tespiti ve Çözümü",
    short: "Yüksek, orta ve alçak gerilimde 7/24 arıza tespiti ve müdahale.",
    icon: "wrench",
    image: "/img/elektrik-ariza.jpg",
    intro: [
      "Elektrik arızaları, zamanında ve uzman ekiplerce müdahale edilmezse can ve mal kayıplarına yol açabilir. Fider Grup; yüksek gerilim, orta gerilim ve alçak gerilimde her türlü arızaya müdahale edecek bilgi ve birikime sahiptir.",
      "Telefon veya e-posta ile istediğiniz zaman ulaşabilirsiniz. Başta Marmara bölgesi olmak üzere Türkiye'nin her yerine 7/24 hizmet veriyoruz.",
    ],
    items: [
      "YG, OG ve AG arıza tespiti ve onarımı",
      "Periyodik ölçüm ve kontrollerle arızaların önceden önlenmesi",
      "Termal kamera ile görüntüleme",
      "Raporlama ve iyileştirme önerileri",
    ],
    seoDescription:
      "Elektrik arıza tespiti ve çözümü: YG, OG ve AG arızalarına 7/24 müdahale. İstanbul, Kocaeli, Gebze ve Marmara bölgesi.",
  },
  {
    slug: "trafo-isletme-sorumlulugu",
    title: "Trafo İşletme Sorumluluğu",
    short: "EMO yetki belgeli trafo yüksek gerilim işletme sorumluluğu (trafo müşavirliği).",
    icon: "shield",
    image: "/img/trafo-isletme.jpg",
    intro: [
      "Elektrik Mühendisleri Odası (EMO) tarafından verilen yetki belgeleriyle İstanbul, Kocaeli, Sakarya, Tekirdağ, Edirne ve çevre illerde Trafo Yüksek Gerilim İşletme Sorumluluğu (trafo müşavirliği) hizmeti veriyoruz.",
      "İşletme sorumluluğunu üstlendiğimiz tesislerde her ay düzenli check-list ile birlikte termal kamera görüntüleme ve web üzerinden kompanzasyon takibi hizmeti ücretsiz sunulur.",
    ],
    items: [
      "Aylık check-list kontrolü ve termal kamera görüntüleme",
      "Web üzerinden kompanzasyon takibi",
      "Topraklama, paratoner ve aydınlık seviyesi ölçümleri",
      "Elektrik iç tesisat muayene raporu, harmonik testi",
      "Detaylı pano kontrolleri, KAKR testi ve raporlama",
    ],
    seoDescription:
      "Trafo yüksek gerilim işletme sorumluluğu (trafo müşavirliği): EMO yetki belgeli hizmet. İstanbul, Kocaeli (Gebze, Dilovası), Sakarya ve çevresi.",
  },
];

export const nav = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler/orta-ve-yuksek-gerilim-sistemleri", label: "Hizmetler", children: true },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/referanslar", label: "Referanslar" },
  { href: "/makaleler", label: "Makaleler" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const whyUs = [
  { title: "Hızlı müdahale", text: "Arıza ve acil taleplerde 7/24 ulaşılabilir uzman ekip." },
  { title: "İş sağlığı ve güvenliği", text: "Tüm uygulamalarda İSG kurallarını ön planda tutan çalışma disiplini." },
  { title: "Mühendis onaylı raporlama", text: "Ölçüm ve kontroller yetkili mühendislerce raporlanır ve onaylanır." },
  { title: "Deneyimli kadro", text: "Elektrik taahhüt sektöründe yılların birikimine sahip kurucu kadro." },
] as const;

export const regions = [
  "İstanbul (Anadolu ve Avrupa)",
  "Kocaeli (Gebze, Darıca, Çayırova, Dilovası, Körfez, Derince, İzmit)",
  "Sakarya",
  "Bolu",
  "Düzce",
  "Tekirdağ",
  "Edirne",
] as const;
