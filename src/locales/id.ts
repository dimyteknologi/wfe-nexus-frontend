export const id = {
  navigation: {
    home: "Beranda",
    about: "Tentang",
    dssInterface: "Antarmuka SPK",
    siteSpecific: "Spesifik Lokasi",
    contextSpecific: "Spesifik Konteks",
    login: "Masuk",
    logout: "Keluar",
  },
  dssModal: {
    tabs: {
      about: "TENTANG",
      relatedAssumption: "ASUMSI TERKAIT",
      scenarioBuilding: "PEMBUATAN SKENARIO",
    },
    about: {
      title: "Tentang Alat SPK",
      p1: "Alat Sistem Pendukung Keputusan (SPK) ini dikembangkan melalui pendekatan berbasis keterkaitan, menekankan interaksi antara sektor air–pangan–energi di bawah kondisi sosial dan ekonomi yang dinamis sebagai pendorong utama kinerja pembangunan daerah.",
      p2: "Dengan menggunakan perspektif berpikir sistem dan pendekatan pemodelan dinamika sistem (Forester, 1961; Vennix, 1996; Senge, 2000; Sterman, 2000; Morecroft, 2015), Alat SPK ini dirancang untuk mengilustrasikan dampak skenario permintaan untuk sektor ekonomi (industri dan jasa), produksi pertanian (padi, peternakan, dan perikanan darat), serta pertumbuhan penduduk terhadap kapasitas lokal dalam memenuhi kebutuhan air, pangan, dan energi.",
      p3: "Alat ini juga menggabungkan skenario spesifik sektor seperti pengembangan area resapan untuk produksi air (kolam buatan, tindakan konservasi), penyebaran PV surya, dan perbaikan produktivitas pertanian, dengan tujuan meningkatkan ketahanan air, energi, dan pangan lokal di masa depan.",
      p4: "Kerangka konseptual keterkaitan sektoral dalam Alat SPK diilustrasikan sebagai berikut:",
      conceptDiagramAlt: "Kerangka Konseptual SPK",
      conceptFramework: "Kerangka konseptual keterkaitan sektoral",
      p5: "Diagram di atas mengilustrasikan dinamika yang saling terhubung dalam Kesatuan Air–Energi–Pangan (WEF Nexus), menekankan hubungan umpan balik antara ketersediaan sumber daya, konsumsi, dan produksi. Setiap komponen mempengaruhi yang lain melalui putaran penguat dan penyeimbang, membentuk hasil keberlanjutan dari waktu ke waktu. Modul-modulnya meliputi:",
      p6: "Beberapa asumsi terkait kebutuhan sumber daya (air, energi, pangan) dalam suatu wilayah meliputi:",
      modules: {
        food: {
          title: "1. Modul Pangan",
          components: "Komponen: Produksi pangan lokal (padi, ternak, ikan, dll.), ketersediaan pangan, Tingkat Swasembada (SSL), dan Ketersediaan per Orang (APP).",
          dependencies: "Ketergantungan: Produksi pangan bergantung pada ketersediaan air untuk irigasi dan energi untuk pemompaan, pemrosesan, dan transportasi."
        },
        water: {
          title: "2. Modul Air",
          components: "Komponen: Penyimpanan air, pasokan irigasi, permintaan domestik dan industri.",
          linkages: "Keterkaitan: Pasokan air memberikan ketersediaan bagi ekonomi dan populasi untuk tumbuh."
        },
        energy: {
          title: "3. Modul Energi",
          components: "Komponen: Pasokan energi (termasuk energi terbarukan), konsumsi oleh sektor pertanian dan air.",
          interactions: "Interaksi: Pembangkitan energi seringkali memerlukan air (misalnya, tenaga air, sistem pendingin), menciptakan saling ketergantungan antar modul."
        },
        economy: {
          title: "4. Modul Ekonomi",
          components: "Komponen: PDRB untuk manufaktur, pertanian, dan lainnya.",
          interactions: "Interaksi: Sebagai pendorong permintaan sumber daya (pangan, air, energi) dan umpan balik dalam hal ketersediaan untuk pertumbuhan ekonomi."
        },
        population: {
          title: "5. Modul Populasi",
          components: "Komponen: Populasi dan pertumbuhannya.",
          interactions: "Interaksi: Sebagai pendorong permintaan sumber daya (pangan, air, energi) bagi populasi dan umpan balik dalam hal ketersediaan untuk pertumbuhan ekonomi yang mempengaruhi pertumbuhan populasi."
        }
      },
      p7: "Interaksi antar sektor akan membentuk putaran (loop) antara setiap modul, termasuk:",
      tableLoops: {
        loop: "Loop",
        involvedModule: "Modul Terlibat",
        description: "Deskripsi",
        rows: [
          { id: "B1", module: "Ekonomi ➔ Air ➔ Ekonomi", desc: "PDRB mempengaruhi permintaan air; pasokan air pada gilirannya mempengaruhi kapasitas ekonomi untuk tumbuh." },
          { id: "B2", module: "Ekonomi ➔ Energi ➔ Ekonomi", desc: "PDRB mempengaruhi permintaan energi; pasokan energi pada gilirannya mempengaruhi kapasitas ekonomi untuk tumbuh." },
          { id: "B3", module: "Pangan ➔ Air ➔ Pangan", desc: "Volume produksi pangan mempengaruhi permintaan air untuk irigasi; pasokan air mempengaruhi kapasitas produksi pangan." },
          { id: "B4", module: "Pangan ➔ Energi ➔ Pangan", desc: "Volume produksi pangan mempengaruhi permintaan energi untuk produksi; pasokan energi mempengaruhi kapasitas produksi pangan." },
          { id: "R1", module: "Populasi", desc: "Populasi dan pertumbuhannya sendiri bertindak sebagai putaran penguat." },
          { id: "B5", module: "Populasi ➔ Air ➔ Populasi", desc: "Populasi mempengaruhi permintaan air; kecukupan dan kualitas pasokan air mempengaruhi pertumbuhan populasi." },
          { id: "B6", module: "Populasi ➔ Pangan ➔ Populasi", desc: "Populasi mempengaruhi permintaan pangan; pasokan pangan mempengaruhi pertumbuhan populasi karena ketersediaan." }
        ]
      },
      sectoralScopeTitle: "Lingkup dan Batasan Sektoral",
      tableScope: {
        sector: "Sektor",
        scope: "Lingkup dan Batasan",
        rows: [
          { sector: "Ekonomi", scope: "17 sektor ekonomi PDRB dengan fokus lebih dalam pada sektor pertanian" },
          { sector: "Pertanian", scope: ["Padi sebagai makanan pokok utama, dengan penggunaan lahan yang luas", "Ternak sebagai pendukung makanan pokok", "Perikanan darat sebagai pendukung makanan pokok"] },
          { sector: "Demografi", scope: ["Total Populasi", "Laju pertumbuhan populasi"] },
          { sector: "Air", scope: ["Umum: Total perhitungan permintaan dan pasokan air lokal", "Permintaan: Domestik, Ekonomi (Industri), Sistem perkotaan", "Pasokan: Air Permukaan, Air Tanah, Pasokan regional"] },
          { sector: "Energi", scope: ["Umum: Hanya mencakup listrik—karena keterbatasan data", "Permintaan: Domestik, Ekonomi (Industri)", "Pasokan: Produksi lokal, Pasokan regional"] },
          { sector: "Pangan", scope: ["Umum: Hanya mencakup makanan pokok (beras)", "Permintaan: Domestik, Ekonomi (Industri dan/atau jasa)", "Pasokan: Produksi lokal, Surplus atau defisit produksi"] }
        ]
      },
      p8: "Penggunaan SPK dimulai dengan memasukkan dataset kondisi regional, diikuti dengan mengkonfigurasi asumsi dan tren model di area tersebut, memetakan asumsi dan tren ini ke dalam skenario model, dan memvalidasi perilaku historis."
    },
    aboutContext: {
      title: "Tentang Alat SPK",
      p1: "Alat Sistem Pendukung Keputusan (SPK) dikembangkan menggunakan pendekatan berbasis keterkaitan, menekankan interkoneksi antara sektor air-energi-pangan untuk daerah pertanian yang ditandai dengan sumber daya air permukaan yang melimpah, tantangan dalam transportasi air, ketersediaan sumber energi terbarukan (EBT) seperti energi surya untuk aplikasi skala mikro, dan energi panas bumi untuk pembangkit listrik regional. Sumber daya ini bersumber dari daerah Samosir dan Ulubelu di Lampung.",
      p2: "Dalam konteks spesifik, pengguna dapat menentukan luas lahan pertanian, kapasitas pembangkit listrik tenaga surya, dan kapasitas pembangkit listrik tenaga panas bumi sebagai variabel input utama yang menentukan kinerja pertanian dan hasil ekonomi mikro. Pembangkit listrik tenaga surya mengurangi ketergantungan pada pompa air berbasis bahan bakar fosil, sementara energi panas bumi berkontribusi mengurangi konsumsi energi untuk proses pengeringan pasca panen. Kedua intervensi ini secara langsung mempengaruhi pendapatan dan kinerja keuntungan petani. Selain itu, keberlanjutan finansial dari pengoperasian pembangkit listrik tenaga surya juga dipertimbangkan, untuk menilai sejauh mana masyarakat lokal atau wilayah mampu mengelola operasi jangka panjang dari pembangkit listrik tenaga surya dan sistem pemompaan air.",
      p3: "Menggunakan perspektif berpikir sistem dan pendekatan pemodelan dinamika sistem (Forrester, 1961; Vennix, 1996; Senge, 2000; Sterman, 2000; Morecroft, 2015), Alat SPK dirancang untuk mengilustrasikan dampak skenario permintaan di sektor pertanian (khususnya pertanian padi), serta di sektor sumber daya air dan energi. Sektor energi mencakup sistem panas bumi dan fotovoltaik surya (PV) untuk pemompaan air pertanian, sedangkan sektor air mencakup air permukaan dan air yang diangkut yang dipasok melalui pompa berbasis bahan bakar fosil dan pompa berbasis PV surya.",
      conceptTitle: "Kerangka konseptual keterkaitan sektoral dalam Alat SPK diilustrasikan sebagai berikut:",
      conceptDiagramAlt: "Kerangka Konseptual SPK",
      conceptFramework: "Kerangka konseptual keterkaitan sektoral",
      scopeIntro: "Konsep SPK dikembangkan pada tingkat mikro dengan mempertimbangkan dinamika dan karakteristik pertanian lokal (produktivitas, lahan, dan manajemen praktis), sumber daya air (air permukaan dan air tanah), dan sumber energi (berbasis fosil dan terbarukan), dalam lingkup berikut:",
      sectoralScopeTitle: "Lingkup dan Batasan Sektoral",
      table: {
          sector: "Sektor",
          scope: "Lingkup dan Batasan",
          agriculture: {
              name: "Pertanian",
              items: ["Area", "Produktivitas", "Produksi"]
          },
          demography: {
              name: "Demografi",
              items: ["Total Populasi", "Permintaan Beras"]
          },
          water: {
              name: "Air",
              general: "Umum: Total perhitungan permintaan dan pasokan air lokal",
              demand: "Permintaan:",
              demandItems: ["Permintaan pertanian", "Permintaan agrikultur", "Permintaan panas bumi (diterapkan hanya ketika menggunakan air permukaan)"],
              supply: "Pasokan:",
              supplyItems: ["Air curah hujan", "Air yang diangkut menggunakan pompa (berbasis bahan bakar fosil atau berbasis PV surya)"]
          },
          energy: {
              name: "Energi",
              general: "Umum: Terbatas pada tujuan pertanian",
              demand: "Permintaan:",
              demandItems: ["Permintaan pertanian"],
              supply: "Pasokan:",
              supplyItems: ["Pasokan bahan bakar fosil", "PV Surya", "Uap berlebih dari panas bumi"]
          },
          food: {
              name: "Pangan",
              general: "Umum: Hanya beras",
              demand: "Permintaan:",
              demandItems: ["Permintaan domestik"],
              supply: "Pasokan:",
              supplyItems: ["Produksi lokal", "Surplus atau defisit produksi"]
          }
      },
      diagramAlt: "Kerangka Konseptual SPK"
    },
    relatedAssumption: {
      title: "Asumsi Terkait",
      intro: "Beberapa asumsi terkait kebutuhan sumber daya (air, energi, pangan) dalam suatu wilayah meliputi:",
      items: [
        "Permintaan air per kapita [liter/kapita/hari]",
        "Permintaan air per unit produksi industri [m³/miliar IDR]",
        "Permintaan air untuk lahan pertanian [mm/hari/ha]",
        "Permintaan air untuk perikanan darat [mm/hari/ha]",
        "Permintaan air untuk ternak [mm/hari/ekor]",
        "Permintaan air untuk lahan perkotaan [% dari permintaan domestik]",
        "Laju konversi lahan pertanian dan hutan [%/tahun]",
        "Permintaan pangan per kapita [kg/kapita/tahun]",
        "Permintaan energi per kapita [kWh/kapita/tahun]",
        "Rasio penyusutan beras dari gabah kering giling (GKG) [%]",
        "Intensitas energi untuk ekonomi [kWh/miliar IDR]",
      ]
    },
    relatedAssumptionContext: {
        title: "Asumsi Terkait",
        intro: "Beberapa asumsi terkait kebutuhan sumber daya (air, energi, pangan) untuk konteks spesifik:",
        items: [
            "Permintaan air untuk lahan pertanian [mm/hari/ha]",
            "Permintaan pangan per kapita [kg/kapita/tahun]",
            "Permintaan energi untuk produksi pangan [MJ/ha/musim]",
            "Hasil benih [ton/ha]",
            "Intensitas pertanian [1/tahun]",
            "Curah hujan [mm/tahun]",
            "Air yang diangkut oleh pompa air [m3/KWh]",
            "Intensitas matahari di area [W/m2]",
            "Durasi matahari per hari [jam/hari]",
            "Efisiensi panel [%]"
        ]
    },
    scenarioBuilding: {
      title: "Pembuatan Skenario",
      intro: "Skenario terkait permintaan dan pasokan, untuk setiap sektor sumber daya, meliputi:",
      table: {
        sector: "Sektor",
        scope: "Lingkup dan Batasan",
        rows: [
          { sector: "Industri", items: ["Pertumbuhan industri"] },
          { sector: "Pangan", items: ["Pertumbuhan pertanian", "Konversi lahan pertanian", "Produktivitas pertanian"] },
          { sector: "Air", items: ["Persentase kolam buatan di area industri", "Persentase kolam buatan di area perumahan", "Unit permintaan air domestik", "Unit permintaan air industri"] },
          { sector: "Energi", items: ["Persentase Area PV Surya di industri", "Persentase Area PV Surya di Perumahan", "Tingkat efisiensi energi industri", "Tingkat kenaikan konsumsi listrik domestik"] },
          { sector: "Populasi", items: ["Laju pertumbuhan populasi"] }
        ]
      }
    },
    scenarioBuildingContext: {
      title: "Pembuatan Skenario",
      intro: "Untuk konteks spesifik, kasus yang ditelaah berfokus pada desa/kecamatan yang didominasi oleh lahan pertanian dalam ekosistem pulau kecil yang memiliki sumber daya air melimpah (danau) namun menghadapi kesulitan dalam transportasi air, serta memiliki potensi panas bumi yang dapat dimanfaatkan untuk pembangkit listrik dan penggunaan langsung. Pengaturan skenario yang tersedia untuk disimulasikan meliputi:",
      table: {
        sector: "Sektor",
        scope: "Lingkup dan Batasan",
        rows: [
          { sector: "Sisi Permintaan Pangan", items: ["Populasi awal", "Pertumbuhan populasi", "Permintaan beras per kapita", "Faktor konversi GKP ke GKG", "Faktor konversi GKG ke beras"] },
          { sector: "Produksi Pertanian", items: ["Lahan pertanian", "Pertumbuhan konversi lahan", "Yield dasar", "Target intensitas pertanaman", "Input intensitas air"] },
          { sector: "Pompa Diesel", items: ["Kapasitas", "Unit head air"] },
          { sector: "Pupuk", items: ["Persentase pupuk kimia", "Rasio massa organik terhadap kimia"] },
          { sector: "Curah Hujan", items: ["Curah hujan", "Intensitas curah hujan per tahun", "Hari hujan dalam setahun"] },
          { sector: "Pompa Air PV Surya", items: ["Kapasitas terpasang PV Surya", "Biaya PV Surya (Dibebankan ke petani)"] },
          { sector: "Panas Bumi", items: ["Panas Bumi", "Kapasitas", "Pemanfaatan uap berlebih"] }
        ]
      }
    }
  },
  login: {
    title: "Masuk ke Akun Anda",
    emailLabel: "Alamat Email",
    emailPlaceholder: "nama@domain.com",
    passwordLabel: "Kata Sandi",
    passwordPlaceholder: "Masukkan kata sandi",
    rememberMe: "Ingat saya",
    submitButton: "Masuk",
    processingButton: "Memproses...",
    authError: "Otentikasi gagal",
    invalidCredentials: "email dan password tidak sesuai",
  },
  landing: {
    hero: {
      title1: "WEF NEXUS",
      title2: "Sistem Pendukung Keputusan",
      subtitle: "Mengubah pemikiran Water-Energy-Food Nexus menjadi wawasan dan kebijakan yang dapat ditindaklanjuti untuk pembangunan berkelanjutan.",
      cta: "Mulai Sekarang",
      collaboration: "Simulasi Kolaborasi",
      activeUser: "Pengguna Aktif",
      collaboratedWith: "Berkolaborasi dengan organisasi pemerintah dalam merintis pembangunan."
    },
    features: {
      badge: "Fitur Canggih",
      title: "Segala yang Anda Butuhkan untuk Keputusan Terinformasi",
      subtitle: "Platform kami menyediakan alat komprehensif untuk menganalisis dan mengoptimalkan alokasi Keterkaitan Air-Energi-Pangan (Water-Energy-Food Nexus) untuk masalah spesifik lokasi dan konteks.",
      items: {
         analytics: { title: "Analitik Tingkat Lanjut", desc: "Manfaatkan analitik konteks dan situs untuk mendapatkan wawasan mendalam tentang saling ketergantungan dan dampak nexus." },
         modeling: { title: "Pemodelan Skenario", desc: "Buat dan bandingkan beberapa skenario untuk mengevaluasi keputusan kebijakan dalam kondisi yang berbeda." },
         simulation: { title: "Simulasi Real-time", desc: "Simulasikan indikator utama secara real-time dengan visualisasi dinamis." },
         collaboration: { title: "Kolaborasi Pemangku Kepentingan", desc: "Memungkinkan kolaborasi yang mulus antara berbagai pemangku kepentingan dengan akses berbasis peran." },
         reporting: { title: "Pelaporan Komprehensif", desc: "Hasilkan laporan terperinci dengan visualisasi dalam berbagai format untuk pembuat keputusan." },
         security: { title: "Keamanan Data", desc: "Keamanan tingkat perusahaan dengan enkripsi dan kepatuhan terhadap standar perlindungan data global." }
      }
    },
    howItWorks: {
       badge: "Cara Kerja",
       title: "Dari Data ke Keputusan dalam Empat Langkah",
       subtitle: "Proses yang disederhanakan untuk mengubah data kompleks menjadi wawasan yang dapat ditindaklanjuti",
       steps: {
          step1: { title: "Integrasi Data", desc: "Hubungkan sumber data Anda atau gunakan dataset sampel kami untuk memulai dengan cepat." },
          step2: { title: "Konfigurasi Model", desc: "Konfigurasikan model berdasarkan konteks spesifik dan pertanyaan kebijakan Anda." },
          step3: { title: "Analisis & Simulasi", desc: "Jalankan simulasi dan analisis hasil melalui visualisasi interaktif." },
          step4: { title: "Implementasi", desc: "Implementasikan kebijakan berbasis bukti dengan kepercayaan diri dan pemantauan." }
       }
    },
    cta: {
       title: "Siap Mengubah Pengambilan Keputusan Anda?",
       subtitle: "Bergabunglah dengan ratusan organisasi yang menggunakan WEF Nexus untuk menciptakan kebijakan dan praktik berkelanjutan",
       button: "Mulai Sekarang"
    }
  },
  about: {
    header: {
      badge: "Inisiatif Pemerintah",
      title: "Tentang WEF Nexus DSS",
      subtitle: "Platform inovatif untuk mendukung pengambilan keputusan terpadu dalam mengelola sumber daya air, energi, dan pangan"
    },
    tabs: {
      nexus: "TENTANG WEF NEXUS",
      dss: "TENTANG ALAT DSS",
      developers: "PENGEMBANG"
    },
    nexusTab: {
      title: "Pendekatan WEF Nexus Terpadu",
      intro: [
        "Water-Energy-Food (WEF) Nexus adalah pendekatan terpadu untuk mengelola dan memahami keterkaitan antara sistem air, energi, dan pangan. Pertama kali dibahas di World Economic Forum (WEF) pada tahun 2008 untuk mengatasi tantangan global di masa depan.", 
        "Untuk Konteks Indonesia, WEF Nexus didefinisikan sebagai strategi terpadu yang mengelola sumber daya air, energi, dan pangan secara terkoordinasi, dengan tujuan menyeimbangkan permintaan yang bersaing, melindungi ekosistem, dan mempromosikan ketahanan inklusif dalam konteks urbanisasi yang cepat, industrialisasi, dan perubahan iklim.",
        "Definisi ini menempatkan WEF Nexus bukan hanya sebagai konsep teoritis, tetapi sebagai kerangka pendukung keputusan dan tata kelola—sebuah alat untuk mengidentifikasi, mengevaluasi, dan mengimplementasikan intervensi yang memberikan manfaat lintas sektoral. Melalui pendekatan ini, WEF Nexus menjadi fondasi untuk mencapai tujuan jangka panjang Indonesia dalam memastikan keamanan sumber daya, ketahanan iklim, dan kemakmuran berkelanjutan menuju Indonesia Emas 2045.",
      ],
      implementationPrincipleTitle: "Diimplementasikan melalui 7 prinsip utama meliputi:",
      implementationPrinciple: [
        "Integrasi lintas sektor dan lintas skala",
        "Efisiensi dan produktivitas sumber daya",
        "Kesetaraan dan inklusivitas",
        "Keberlanjutan dan perlindungan ekosistem",
        "Integrasi lintas bidang: kepemilikan lahan, gender, dan perencanaan tata ruang",
        "Ketahanan dan manajemen adaptif",
        "Partisipasi multi-pemangku kepentingan dan koherensi tata kelola",
      ],
      implementationSecurityIntro: "dan disatukan ke dalam beberapa kebijakan pembangunan nasional, termasuk Rencana Jangka Panjang (RPJP) Indonesia 2020-2045, Rencana Jangka Menengah (RPJP) Indonesia 2025-2029, Tujuan Pembangunan Berkelanjutan (2030), dan Kedua Kebijakan Ditetapkan (2nd NDC) Indonesia dengan Target Net Zero Emissions pada tahun 2060, diimplementasikan melalui 3 program prioritas nasional utama, yaitu:",
      waterSecurity: {
        title: "Ketahanan Air",
        description: "Kapasitas populasi untuk menjaga akses berkelanjutan terhadap kuantitas air berkualitas yang memadai (UN-Water, 2013)"
      },
      energySecurity: {
        title: "Ketahanan Energi",
        description: "Ketersediaan berkelanjutan sumber energi dengan harga terjangkau (IEA, 1974)"
      },
      foodSecurity: {
        title: "Ketahanan Pangan",
        description: "Ketika semua orang setiap saat memiliki akses fisik dan ekonomi terhadap pangan yang cukup, aman dan bergizi (The WFS, 1996)"
      },
      indicatorsTitle: "Beberapa indikator utama untuk WEF Nexus meliputi:",
      indicators: [
        "Indeks Ketahanan Air",
        "Indeks Ketahanan Energi",
        "Indeks Ketahanan Pangan",
        "Pangsa Energi Terbarukan",
        "Indeks Kualitas Air",
        "Akses Air Pipa dan Sanitasi",
        "Akses Listrik",
        "Pengurangan Emisi",
        "Indeks Kualitas Lingkungan"
      ],
      futherInformation:"Untuk informasi lebih lanjut mengenai peta jalan WEF Nexus Indonesia dapat merujuk ke tautan ini:",
      futherInformationLink:"https://linktr.ee/WEFNexus"
    },
    dssTab: {
      title: "Alat Sistem Pendukung Keputusan",
      intro: "Alat DSS dikembangkan untuk menyediakan simulasi proyeksi Air, Energi, dan Pangan dalam suatu wilayah dalam kerangka waktu tertentu di bawah berbagai skenario pembangunan sosial dan ekonomi. Saat ini, alat DSS dikembangkan untuk:",
      introList: [
       "Analisis spesifik lokasi, dikembangkan untuk mensimulasikan dampak indikator Air, Energi, dan Pangan di wilayah kabupaten/kota di bawah berbagai skenario industri, pertanian, dan sumber daya WEF; dan",
       "Spesifik konteks; dikembangkan untuk mensimulasikan dampak pengembangan dan pemanfaatan pembangkit listrik tenaga panas bumi atau pompa air berbasis PV surya terhadap praktik dan produktivitas pertanian dalam wilayah desa atau kecamatan."
      ],
      introEnd: "Dapat digunakan khususnya oleh pemerintah daerah untuk membantu proses analisis selama proses perencanaan, untuk memberikan masukan bagi perumusan kebijakan daerah. Juga dapat diperluas ke pengguna lain, seperti pemerintah pusat, akademisi, mitra pembangunan, LSM, dan masyarakat umum.",
      systemsTitle: "Pendekatan Sistem",
      systemsText: "Menggunakan pendekatan berbasis sistem (Systems Thinking/System Dynamics), WEF Nexus mengakomodasi interaksi antara sektor air, energi, dan pangan/lahan, bersama dengan berbagai putaran umpan balik yang terbentuk dalam sektor WEF dan antara sektor sosial-ekonomi, untuk mengakomodasi kompleksitas WEF Nexus.",
      benefitsTitle: "Manfaat Utama:",
      benefits: [
        "Mengeksplorasi berbagai jalur pembangunan masa depan",
        "Mengilustrasikan potensi sinergi dan trade-off dalam sektor WEF",
        "Memberikan masukan untuk perumusan kebijakan regional"
      ],
    },
    developersTab: {
      title: "Tim Pengembang",
      intro: "Dikembangkan melalui proses partisipatif yang melibatkan berbagai pemangku kepentingan—di sisi pemerintah—termasuk Kementerian Perencanaan Pembangunan Nasional (Bappenas), Kementerian Pertanian, Kementerian Energi dan Sumber Daya Mineral (ESDM), beberapa perwakilan dari pemerintah daerah, dan akademisi; semuanya diorkestrasikan oleh UNDP Indonesia.",
      collaborativeTitle: "Proses Kolaboratif",
      collaborativeText: "Pengembangan WEF Nexus DSS melibatkan kolaborasi erat antara berbagai institusi untuk memastikan alat ini dapat memenuhi kebutuhan pengguna dan memiliki dampak nyata pada perencanaan pembangunan.",
      processItems: [
        "Kolaborasi Multi-Pemangku Kepentingan",
        "Pendekatan Partisipatif",
        "Pengembangan Iteratif"
      ],
      partnershipText: "Bermitra dengan:"
    }
  },
  footer: {
     tagline: "Mengubah pemikiran WEF Nexus menjadi wawasan dan kebijakan yang dapat ditindaklanjuti.",
     product: {
        title: "Produk",
        features: "Fitur",
        caseStudies: "Studi Kasus",
        testimonials: "Testimoni"
     },
     resources: {
        title: "Sumber Daya",
        blog: "Blog",
        documentation: "Dokumentasi",
        support: "Dukungan",
        api: "API"
     },
     company: {
        title: "Perusahaan",
        about: "Tentang",
        contact: "Kontak",
        partners: "Mitra"
     },
     copyright: "© 2025 WEF Nexus. Hak cipta dilindungi undang-undang."
  }
};
