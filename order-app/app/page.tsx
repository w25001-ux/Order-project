"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
type Guitar = {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  color: string;
  accent: string;
  badge?: string;
  image?: string;
  icon?: string;
  category?: "guitar" | "accessory";
  oldPrice?: number;
  recommended?: boolean;
};
type CartItem = Guitar & { quantity: number };
const guitars: Guitar[] = [
  {
    id: "aurora",
    name: "Aurora ST",
    type: "Electric",
    price: 128000,
    description: "透明感のある音と、扱いやすい細身のネック。",
    color: "#d8e8e2",
    accent: "#385f55",
    badge: "BEST SELLER",
    image: "/guitar-seafoam.png",
    recommended: true,
  },
  {
    id: "nocturne",
    name: "Nocturne LP",
    type: "Electric",
    price: 168000,
    description: "太く温かなサウンド。深いブルーの一本。",
    color: "#d9ddea",
    accent: "#303a59",
    badge: "NEW",
    image: "/guitar-midnight.png",
    oldPrice: 188000,
  },
  {
    id: "cedar",
    name: "Cedar Folk",
    type: "Acoustic",
    price: 96000,
    description: "柔らかな響き。弾き語りに寄り添う豊かな鳴り。",
    color: "#eadbc8",
    accent: "#8b5938",
    image: "/guitar-acoustic.png",
    oldPrice: 108000,
  },
  {
    id: "sol",
    name: "Sol Classic",
    type: "Classical",
    price: 74000,
    description: "指に優しいナイロン弦と、明るく素直な音。",
    color: "#e9dfca",
    accent: "#8c6a34",
    image: "/guitar-sol.png",
  },
  {
    id: "ember",
    name: "Ember Semi",
    type: "Semi-hollow",
    price: 188000,
    description: "空気感のある響きと艶やかなルックス。",
    color: "#ead4cf",
    accent: "#8e4035",
    badge: "LIMITED",
    image: "/guitar-ember.png",
    oldPrice: 218000,
  },
  {
    id: "atlas",
    name: "Atlas Bass",
    type: "Bass",
    price: 142000,
    description: "芯のある低音と安定したバランス。",
    color: "#d7d8d3",
    accent: "#41443c",
    image: "/guitar-atlas.png",
  },
  {
    id: "scarlet",
    name: "Scarlet 335",
    type: "Semi-hollow",
    price: 178000,
    description: "艶やかなコードと甘いリード。ステージで映えるチェリーレッド。",
    color: "#ead4cf",
    accent: "#8e4035",
    badge: "NEW",
    image: "/guitar-cherry.png",
    recommended: true,
  },
  {
    id: "groove",
    name: "Groove PB",
    type: "Bass",
    price: 118000,
    description: "骨太な低音とシンプルな操作性。バンドサウンドの土台に。",
    color: "#d8ddd6",
    accent: "#465047",
    badge: "SALE",
    image: "/guitar-bass.png",
    oldPrice: 139000,
  },
  {
    id: "luna",
    name: "Luna Nylon",
    type: "Classical",
    price: 89000,
    description: "繊細なタッチに応える、上品で奥行きのあるナイロンサウンド。",
    color: "#eee5d7",
    accent: "#8a6b3f",
    image: "/guitar-classical.png",
  },
  {
    id: "horizon",
    name: "Horizon JM",
    type: "Electric",
    price: 149000,
    description: "広がりのある響きと個性的なルックス。オルタナティブな一本。",
    color: "#d7e5df",
    accent: "#476459",
    image: "/guitar-horizon.png",
  },
  {
    id: "heritage",
    name: "Heritage D",
    type: "Acoustic",
    price: 112000,
    description: "力強いストロークと豊かな低音。ライブにもレコーディングにも。",
    color: "#eadcc9",
    accent: "#866144",
    badge: "SALE",
    image: "/guitar-heritage.png",
    oldPrice: 132000,
  },
  {
    id: "velvet",
    name: "Velvet Hollow",
    type: "Semi-hollow",
    price: 198000,
    description: "ジャズからロックまで、温かく立体的な響きを届けます。",
    color: "#ead0ca",
    accent: "#7c382f",
    image: "/guitar-velvet.png",
  },
  {
    id: "rivera",
    name: "Rivera TL",
    type: "Electric",
    price: 136000,
    description: "歯切れのよいサウンドと素早いレスポンス。歌を支える一本。",
    color: "#dce8e2",
    accent: "#3f6356",
    image: "/guitar-rivera.png",
  },
  {
    id: "forest-jumbo",
    name: "Forest Jumbo",
    type: "Acoustic",
    price: 128000,
    description: "大きなボディから生まれる、広がりのある豊かな低音。",
    color: "#eadbc7",
    accent: "#815a3b",
    image: "/guitar-forest.png",
  },
  {
    id: "meadow-folk",
    name: "Meadow Folk",
    type: "Acoustic",
    price: 82000,
    description: "小ぶりで抱えやすく、初めての一本にも最適です。",
    color: "#efe3d3",
    accent: "#92704c",
    image: "/guitar-meadow.png",
  },
  {
    id: "andalucia",
    name: "Andalucía",
    type: "Classical",
    price: 105000,
    description: "温かな木の響きと繊細な余韻を楽しめる本格モデル。",
    color: "#f0e7da",
    accent: "#81623e",
    image: "/commons-classical.png",
  },
  {
    id: "estudio",
    name: "Estudio 45",
    type: "Classical",
    price: 59000,
    description: "やさしい弾き心地で、基礎練習から演奏会まで。",
    color: "#eee4d5",
    accent: "#8c6d45",
    image: "/guitar-estudio.png",
  },
  {
    id: "verdant-bass",
    name: "Verdant Bass",
    type: "Bass",
    price: 154000,
    description: "深いグリーンが映える、芯の強い4弦ベース。",
    color: "#d9e1d8",
    accent: "#3d5545",
    image: "/commons-green-bass.jpg",
  },
  {
    id: "pulse-jb",
    name: "Pulse JB",
    type: "Bass",
    price: 126000,
    description: "輪郭のある低音と幅広い音作り。現場で頼れる一本。",
    color: "#d8dbd5",
    accent: "#454b42",
    image: "/guitar-pulse.png",
  },
  {
    id: "ruby-hollow",
    name: "Ruby Hollow",
    type: "Semi-hollow",
    price: 225000,
    description: "豊かな箱鳴りと上質な仕上げを備えた上位モデル。",
    color: "#ead0c8",
    accent: "#85382e",
    image: "/guitar-ruby.png",
  },
];

const accessories: Guitar[] = [
  { id:"strings", name:"Premium Strings", type:"弦", price:2400, description:"明るい音と長い寿命を両立した交換弦。", color:"#e8e3d8", accent:"#4b5e55", image:"/accessory-strings.png", category:"accessory" },
  { id:"case", name:"Touring Gig Bag", type:"ケース", price:14800, description:"厚手クッションと撥水生地の軽量ケース。", color:"#dce4df", accent:"#334c40", image:"/accessory-case.png", category:"accessory" },
  { id:"strap", name:"Leather Strap", type:"ストラップ", price:6800, description:"肩にやさしい本革製のワイドストラップ。", color:"#ebddd1", accent:"#814e38", image:"/accessory-strap.png", category:"accessory" },
  { id:"tuner", name:"Clip Tuner", type:"チューナー", price:3200, description:"暗いステージでも見やすいカラー表示。", color:"#dfe3e5", accent:"#3d4c52", image:"/accessory-tuner.png", category:"accessory" },
  { id:"amp", name:"Room Amp 20", type:"アンプ", price:29800, description:"自宅練習にちょうどよい20W小型アンプ。", color:"#ddd9d2", accent:"#373a37", image:"/accessory-amp.png", category:"accessory" },
  { id:"cable", name:"Studio Cable 3m", type:"ケーブル", price:4200, description:"ノイズを抑えた丈夫な楽器用ケーブル。", color:"#e2ded9", accent:"#49443f", image:"/accessory-cable.png", category:"accessory" },
  { id:"stand", name:"Safe Guitar Stand", type:"スタンド", price:5600, description:"楽器をしっかり支える折りたたみスタンド。", color:"#dde3de", accent:"#435149", image:"/accessory-stand.png", category:"accessory" },
  { id:"care", name:"Wood Care Set", type:"お手入れ", price:3800, description:"クロス、ポリッシュ、指板オイルのセット。", color:"#eee1d3", accent:"#805d3d", image:"/accessory-care.png", category:"accessory" },
];
const allProducts = [...guitars, ...accessories];
const optimizedImage = (path:string) => path.replace(/\.(png|jpe?g)$/i,".webp");
const yen = (v: number) => `¥${v.toLocaleString("ja-JP")}`;
const warrantyFor = (type: string) => {
  if (type === "Electric" || type === "Bass") return "3年間品質保証";
  if (type === "Acoustic" || type === "Semi-hollow") return "2年間品質保証";
  if (type === "Classical") return "1年間品質保証";
  return "6か月品質保証";
};
const englishDescriptions: Record<string,string> = {
  aurora:"Clear, articulate tone with a slim and comfortable neck.", nocturne:"A deep-blue guitar with a thick, warm voice.", cedar:"A gentle, full acoustic sound made for singing.", sol:"Finger-friendly nylon strings with a bright, honest tone.", ember:"Airy resonance with a refined semi-hollow look.", atlas:"Focused low end with reliable balance.", scarlet:"Glossy chords, sweet leads, and a stage-ready cherry finish.", groove:"Powerful lows and straightforward controls for a solid band foundation.", luna:"An elegant nylon-string voice that responds to a delicate touch.", horizon:"Expansive tone and a distinctive offset shape.", heritage:"Strong projection and rich bass for stage or studio.", velvet:"Warm, dimensional resonance from jazz to rock.", rivera:"Fast response and crisp articulation that supports vocals.", "forest-jumbo":"A large body with wide, room-filling bass.", "meadow-folk":"Compact, comfortable, and ideal as a first guitar.", andalucia:"Warm wood tone and a delicate, lingering finish.", estudio:"Comfortable playability from daily practice to recital.", "verdant-bass":"A bold four-string bass in a deep green finish.", "pulse-jb":"Defined lows and versatile tone shaping for working players.", "ruby-hollow":"Premium finishing with rich, open semi-hollow resonance.", strings:"Long-life replacement strings with a bright voice.", case:"A light, water-resistant gig bag with thick padding.", strap:"A wide genuine-leather strap designed for shoulder comfort.", tuner:"A color-display clip tuner that stays visible on dark stages.", amp:"A compact 20-watt amplifier sized for home practice.", cable:"A durable instrument cable designed to reduce noise.", stand:"A folding stand that supports your instrument securely.", care:"Cloth, polish, and fingerboard oil in one care kit."
};
const materialFor = (type:string) => type === "Acoustic" ? "Solid spruce / mahogany" : type === "Classical" ? "Cedar / rosewood" : type === "Bass" ? "Alder / maple" : type === "Semi-hollow" ? "Maple laminate / mahogany" : "Alder / maple";
const specsFor = (g:Guitar) => ({
  weight: g.type === "Bass" ? "4.1 kg" : g.type === "Electric" ? "3.5 kg" : g.type === "Semi-hollow" ? "3.2 kg" : g.type === "Classical" ? "1.7 kg" : "2.0 kg",
  scale: g.type === "Bass" ? "864 mm" : g.type === "Classical" ? "650 mm" : g.type === "Acoustic" ? "645 mm" : "648 mm",
  origin: Number.parseInt(g.id.replace(/\D/g,"") || String(g.id.length),10) % 3 === 0 ? "Japan" : "Indonesia",
});
const reviewFor = (g:Guitar) => ({ rating: (4.5 + (g.id.length % 5) * 0.1).toFixed(1), count: 12 + (g.id.length * 7) % 54 });
const compatibilityFor = (id:string) => id === "amp" || id === "cable" ? "エレキ・ベース対応" : id === "strings" ? "エレキ用（種類を選択）" : id === "case" ? "ギター用（サイズ確認）" : "全ギター対応";
const accessoryTypeEn: Record<string,string> = { strings:"Strings", case:"Case", strap:"Strap", tuner:"Tuner", amp:"Amplifier", cable:"Cable", stand:"Stand", care:"Care" };
const compatibilityForEn = (id:string) => id === "amp" || id === "cable" ? "Electric & bass" : id === "strings" ? "Electric guitar (select gauge)" : id === "case" ? "Guitar (check size)" : "All guitars";
export default function Home() {
  const router = useRouter(),
    [cart, setCart] = useState<CartItem[]>([]),
    [filter, setFilter] = useState("All");
  const [notice, setNotice] = useState("");
  const [lang, setLang] = useState<"ja" | "en">("ja");
  const [lightbox, setLightbox] = useState<Guitar | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "sale">("featured");
  const [favorites,setFavorites] = useState<string[]>([]);
  const [favoritesOnly,setFavoritesOnly] = useState(false);
  const [compare,setCompare] = useState<string[]>([]);
  const noticeTimer = useRef<number>();
  const ui = lang === "ja" ? {
    collection: "コレクション", monthly: "今月のおすすめ", gear: "関連商品", history: "注文履歴",
    hero: "音を選ぶ。自分を奏でる。", view: "ギターを見る", lineup: "あなたの一本を。",
    accessories: "演奏に必要なものを、一緒に。", add: "カートに追加",
    demo: "このサイトはポートフォリオです。実際の注文・決済・本人確認は行われません。",
  } : {
    collection: "Collection", monthly: "Monthly Pick", gear: "Accessories", history: "Order History",
    hero: "Choose your tone. Play your story.", view: "View guitars", lineup: "Find your guitar.",
    accessories: "Everything you need to play.", add: "Add to bag",
    demo: "Portfolio demo only. No real orders, payments, or identity checks are processed.",
  };
  useEffect(() => {
    if (!lightbox) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [lightbox]);
  useEffect(() => {
    const savedLanguage = localStorage.getItem("guitar-language");
    if (savedLanguage === "en" || savedLanguage === "ja") setLang(savedLanguage);
    const s = localStorage.getItem("guitar-cart");
    if (s) {
      try {
        const saved = JSON.parse(s) as CartItem[];
        setCart(
          saved.flatMap((item) => {
            const product = allProducts.find((g) => g.id === item.id);
            return product ? [{ ...product, quantity: item.quantity }] : [];
          }),
        );
      } catch {
        localStorage.removeItem("guitar-cart");
      }
    }
  }, []);
  useEffect(() => {
    try {
      const savedFavorites = JSON.parse(localStorage.getItem("guitar-favorites") || "[]");
      const savedCompare = JSON.parse(localStorage.getItem("guitar-compare") || "[]");
      setFavorites(Array.isArray(savedFavorites) ? savedFavorites.filter((id):id is string => typeof id === "string") : []);
      setCompare(Array.isArray(savedCompare) ? savedCompare.filter((id):id is string => typeof id === "string").slice(0,3) : []);
    } catch {
      localStorage.removeItem("guitar-favorites");
      localStorage.removeItem("guitar-compare");
    }
  },[]);
  const toggleFavorite = (id:string) => setFavorites((current) => {
    const next=current.includes(id) ? current.filter((item)=>item!==id) : [...current,id];
    localStorage.setItem("guitar-favorites",JSON.stringify(next)); return next;
  });
  const toggleCompare = (id:string) => setCompare((current) => {
    const next=current.includes(id) ? current.filter((item)=>item!==id) : current.length < 3 ? [...current,id] : current;
    localStorage.setItem("guitar-compare",JSON.stringify(next)); return next;
  });
  const add = (g: Guitar) => {
    setCart((current) => {
      const found = current.find((item) => item.id === g.id);
      const next = found ? current.map((item) => item.id === g.id ? {...item,quantity:item.quantity+1} : item) : [...current,{...g,quantity:1}];
      localStorage.setItem("guitar-cart",JSON.stringify(next));
      return next;
    });
    setNotice(lang === "ja" ? `${g.name} をバッグに追加しました` : `${g.name} added to your bag`);
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(""), 2200);
  };
  const change = (id: string, n: number) => setCart((current) => {
    const next=current.map((item)=>item.id===id?{...item,quantity:item.quantity+n}:item).filter((item)=>item.quantity>0);
    localStorage.setItem("guitar-cart",JSON.stringify(next)); return next;
  });
  const changeLanguage = () => {
    const next = lang === "ja" ? "en" : "ja";
    setLang(next);
    localStorage.setItem("guitar-language",next);
  };
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const shown = guitars
      .filter((g) => filter === "All" || g.type === filter)
      .filter((g) => `${g.name} ${g.type} ${g.description}`.toLowerCase().includes(query.trim().toLowerCase()))
      .filter((g) => sort !== "sale" || Boolean(g.oldPrice))
      .filter((g) => !favoritesOnly || favorites.includes(g.id))
      .sort((a,b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : 0),
    count = cart.reduce((s, i) => s + i.quantity, 0),
    total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const guitarCount = cart
    .filter((item) => item.category !== "accessory")
    .reduce((sum, item) => sum + item.quantity, 0);
  const giftQualified = total >= 250000 || guitarCount >= 2;
  const giftRemaining = Math.max(0, 250000 - total);
  return (
    <div className={styles.site}>
      <div className={styles.demoBanner}>{ui.demo}</div>
      <header className={styles.header}>
        <a className={styles.brand} href="#top">
          <span className={styles.mark}>T</span>
          <span>
            A&amp;A<small>GUITAR STORE</small>
          </span>
        </a>
        <nav className={styles.nav} aria-label="メインメニュー">
          <a href="#collection">{ui.collection}</a>
          <a href="#recommend">{ui.monthly}</a>
          <a href="#sale">Sale</a>
          <a href="#accessories">{ui.gear}</a>
          <a href="#story">Our Story</a>
          <a href="#support">Support</a>
        </nav>
        <div className={styles.headerActions}>
          <button onClick={changeLanguage}>{lang === "ja" ? "EN" : "日本語"}</button>
          <button onClick={() => router.push(`/history?lang=${lang}`)}>{ui.history}</button>
        </div>
        <a className={styles.cartLink} href="#cart">
          Bag <b>{count}</b>
        </a>
      </header>
      <main id="top">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>CRAFTED FOR YOUR SOUND</p>
            <h1>{ui.hero}</h1>
            <p className={styles.lead}>
              {lang === "ja" ? "弾きやすさと響きにこだわった、長く付き合えるギターを。あなたの音楽が始まる一本を見つけてください。" : "Discover a guitar built for comfort, resonance, and years of music."}
            </p>
            <a className={styles.primaryButton} href="#collection">
              {ui.view} <span>→</span>
            </a>
            <div className={styles.heroFacts}>
              <span>
                <b>{lang === "ja" ? "種類別" : "By type"}</b>{lang === "ja" ? "1〜3年間品質保証" : "1–3 year warranty"}
              </span>
              <span>
                <b>{lang === "ja" ? "送料無料" : "Free shipping"}</b>{lang === "ja" ? "全国お届け" : "Across Japan"}
              </span>
              <span>
                <b>{lang === "ja" ? "調整済み" : "Setup included"}</b>{lang === "ja" ? "すぐ弾ける状態で発送" : "Ready to play"}
              </span>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <span className={styles.sun} />
            <Image
              src="/guitar-seafoam.webp"
              alt="淡いグリーンのエレキギター"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
              className={styles.heroImage}
            />
            <p>
              THE
              <br />
              PERFECT
              <br />
              TONE
            </p>
          </div>
        </section>
        <section className={styles.recommend} id="recommend">
          <div className={styles.recommendImage}>
            <Image
              src="/guitar-cherry.webp"
              alt="今月のおすすめ Scarlet 335"
              fill
              sizes="(max-width: 800px) 100vw, 55vw"
            />
            <span>STAFF PICK</span>
          </div>
          <div className={styles.recommendCopy}>
            <p className={styles.eyebrow}>MONTHLY RECOMMENDATION</p>
            <h2>{ui.monthly}</h2>
            <p className={styles.recommendName}>Scarlet 335</p>
            <p>
              {lang === "ja" ? "甘く豊かな響きと、弾き手のニュアンスを素直に表現するセミホロウ。ジャズにもロックにも馴染む、スタッフ一押しの一本です。" : "A warm, expressive semi-hollow that responds naturally to every touch—our staff pick for jazz and rock."}
            </p>
            <div className={styles.recommendPrice}>
              <strong>{yen(178000)}</strong>
              <span>{lang === "ja" ? "送料無料・2年間保証" : "Free shipping · 2-year warranty"}</span>
            </div>
            <button
              onClick={() => add(guitars.find((g) => g.id === "scarlet")!)}
            >
              {lang === "ja" ? "おすすめをバッグに追加" : "Add monthly pick"} <span>→</span>
            </button>
          </div>
        </section>
        <section className={styles.saleSection} id="sale">
          <div className={styles.saleHeading}>
            <div>
              <p className={styles.eyebrow}>SPECIAL PRICE</p>
              <h2>{lang === "ja" ? "期間限定セール" : "Limited-time sale"}</h2>
            </div>
            <p>{lang === "ja" ? "数量限定。気になっていた一本を、特別価格で。" : "Limited quantities at special prices."}</p>
          </div>
          <div className={styles.saleGrid}>
            {guitars
              .filter((g) => g.oldPrice)
              .map((g) => (
                <article key={g.id} className={styles.saleCard}>
                  <div className={styles.saleImage}>
                    <Image
                      src={optimizedImage(g.image!)}
                      alt={g.name}
                      fill
                      sizes="(max-width: 700px) 100vw, 25vw"
                    />
                    <span>
                      {Math.round((1 - g.price / g.oldPrice!) * 100)}% OFF
                    </span>
                  </div>
                  <div>
                    <small>{g.type}</small>
                    <h3>{g.name}</h3>
                    <p>
                      <del>{yen(g.oldPrice!)}</del>
                      <strong>{yen(g.price)}</strong>
                    </p>
                    <button onClick={() => add(g)}>{lang === "ja" ? "バッグに追加" : "Add to bag"} ＋</button>
                  </div>
                </article>
              ))}
          </div>
        </section>
        <section className={styles.collection} id="collection">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>THE COLLECTION</p>
              <h2>{ui.lineup}</h2>
            </div>
            <p>{lang === "ja" ? "それぞれ異なる個性を持つ、厳選したラインナップ。" : "A carefully selected lineup, each with its own character."}</p>
          </div>
          <div className={styles.filters}>
            {[
              "All",
              "Electric",
              "Acoustic",
              "Classical",
              "Semi-hollow",
              "Bass",
            ].map((t) => (
              <button
                key={t}
                className={filter === t ? styles.activeFilter : ""}
                onClick={() => setFilter(t)}
              >
                {t === "All" ? (lang === "ja" ? "すべて" : "All") : t}
              </button>
            ))}
            <button className={favoritesOnly ? styles.activeFilter : ""} onClick={() => setFavoritesOnly((current) => !current)}>♡ {lang === "ja" ? `お気に入りのみ (${favorites.length})` : `Favorites (${favorites.length})`}</button>
          </div>
          <div className={styles.catalogTools}>
            <label>
              <span>{lang === "ja" ? "商品を検索" : "Search products"}</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={lang === "ja" ? "名前・種類・特徴から検索" : "Search by name, type, or feature"} />
            </label>
            <label>
              <span>{lang === "ja" ? "並べ替え" : "Sort"}</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}>
                <option value="featured">{lang === "ja" ? "おすすめ順" : "Featured"}</option>
                <option value="price-asc">{lang === "ja" ? "価格が安い順" : "Price: low to high"}</option>
                <option value="price-desc">{lang === "ja" ? "価格が高い順" : "Price: high to low"}</option>
                <option value="sale">{lang === "ja" ? "セール商品のみ" : "Sale only"}</option>
              </select>
            </label>
            <p>{shown.length}{lang === "ja" ? "商品" : " items"}</p>
          </div>
          {favoritesOnly && shown.length === 0 && <div className={styles.favoriteEmpty}>{lang === "ja" ? "お気に入りの商品はまだありません。商品カードの♡から追加できます。" : "No favorites yet. Add one with the ♡ button on a product card."}</div>}
          <div className={styles.grid}>
            {shown.map((g) => (
              <article className={styles.card} key={g.id}>
                <div
                  className={styles.productVisual}
                  style={
                    {
                      "--card-color": g.color,
                      "--accent": g.accent,
                    } as React.CSSProperties
                  }
                >
                  {g.badge && <span className={styles.badge}>{g.badge}</span>}
                  <button type="button" className={styles.imageButton} onClick={() => setLightbox(g)} aria-label={lang === "ja" ? `${g.name}の写真を拡大` : `Enlarge ${g.name} photo`}>
                    <Image src={optimizedImage(g.image!)} alt={g.name} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" className={styles.productImage} />
                  </button>
                  <button
                    type="button"
                    className={styles.quickAdd}
                    onClick={() => add(g)}
                    aria-label={`${g.name}をカートに追加`}
                  >
                    ＋
                  </button>
                </div>
                <div className={styles.cardMeta}>
                  <div>
                    <p>{g.type}</p>
                    <h3>{g.name}</h3>
                  </div>
                  <div className={styles.priceBlock}>
                    {g.oldPrice && <del>{yen(g.oldPrice)}</del>}
                    <strong className={g.oldPrice ? styles.salePrice : ""}>
                      {yen(g.price)}
                    </strong>
                  </div>
                </div>
                <p className={styles.description}>{lang === "ja" ? g.description : englishDescriptions[g.id]}</p>
                <p className={styles.rating} aria-label={lang === "ja" ? `評価${reviewFor(g).rating}、${reviewFor(g).count}件` : `Rated ${reviewFor(g).rating} from ${reviewFor(g).count} reviews`}>★★★★★ <span>{reviewFor(g).rating} ({reviewFor(g).count})</span></p>
                <p className={styles.warranty}>✓ {lang === "ja" ? warrantyFor(g.type) : `${g.type === "Classical" ? 1 : g.type === "Electric" || g.type === "Bass" ? 3 : 2}-year quality warranty`}</p>
                <div className={styles.cardActions}>
                  <button type="button" className={favorites.includes(g.id) ? styles.selectedAction : ""} onClick={() => toggleFavorite(g.id)} aria-pressed={favorites.includes(g.id)}>♡ {lang === "ja" ? "お気に入り" : "Favorite"}</button>
                  <button type="button" className={compare.includes(g.id) ? styles.selectedAction : ""} onClick={() => toggleCompare(g.id)} aria-pressed={compare.includes(g.id)}>⇄ {lang === "ja" ? "比較" : "Compare"}</button>
                </div>
                <button className={styles.addButton} onClick={() => add(g)}>
                  {ui.add} <span>→</span>
                </button>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.accessories} id="accessories">
          <div className={styles.accessoryHeading}>
            <div><p className={styles.eyebrow}>GEAR &amp; ACCESSORIES</p><h2>{ui.accessories}</h2></div>
            <p>{lang === "ja" ? "弦交換から保管、練習まで。ギターとの毎日を快適にするアイテムです。" : "Everything from restringing and storage to comfortable daily practice."}</p>
          </div>
          <div className={styles.accessoryGrid}>
            {accessories.map((item) => (
              <article className={styles.accessoryCard} key={item.id}>
                <button type="button" className={styles.accessoryImage} onClick={() => setLightbox(item)} aria-label={lang === "ja" ? `${item.name}の写真を拡大` : `Enlarge ${item.name} photo`}>
                  <Image src={optimizedImage(item.image!)} alt={item.name} fill sizes="(max-width: 600px) 100vw, 25vw" />
                  <small>{lang === "ja" ? item.type : accessoryTypeEn[item.id]}</small>
                </button>
                <h3>{item.name}</h3><p>{lang === "ja" ? item.description : englishDescriptions[item.id]}</p>
                <small className={styles.compatibility}>✓ {lang === "ja" ? compatibilityFor(item.id) : compatibilityForEn(item.id)}</small>
                <div><strong>{yen(item.price)}</strong><button onClick={() => add(item)}>{lang === "ja" ? "バッグに追加" : "Add to bag"} ＋</button></div>
              </article>
            ))}
          </div>
        </section>
        {compare.length > 0 && <section className={styles.compareSection} aria-label={lang === "ja" ? "商品比較" : "Product comparison"}>
          <div className={styles.compareHeading}><div><p className={styles.eyebrow}>COMPARE</p><h2>{lang === "ja" ? "選んだギターを比較" : "Compare selected guitars"}</h2></div><button type="button" onClick={() => {setCompare([]);localStorage.removeItem("guitar-compare");}}>{lang === "ja" ? "すべて解除" : "Clear all"}</button></div>
          <div className={styles.compareGrid}>{compare.map((id) => guitars.find((g)=>g.id===id)).filter(Boolean).map((g) => <article key={g!.id}><button type="button" onClick={()=>toggleCompare(g!.id)} aria-label={lang === "ja" ? `${g!.name}を比較から外す` : `Remove ${g!.name} from comparison`}>×</button><h3>{g!.name}</h3><strong>{yen(g!.price)}</strong><dl><div><dt>{lang === "ja" ? "種類" : "Type"}</dt><dd>{g!.type}</dd></div><div><dt>{lang === "ja" ? "素材" : "Materials"}</dt><dd>{materialFor(g!.type)}</dd></div><div><dt>{lang === "ja" ? "保証" : "Warranty"}</dt><dd>{lang === "ja" ? warrantyFor(g!.type) : `${g!.type === "Electric" || g!.type === "Bass" ? 3 : g!.type === "Classical" ? 1 : 2}-year quality warranty`}</dd></div></dl></article>)}</div>
        </section>}
        <section className={styles.cartSection} id="cart">
          <div className={styles.cartIntro}>
            <p className={styles.eyebrow}>YOUR SELECTION</p>
            <h2>{lang === "ja" ? "ショッピングバッグ" : "Shopping bag"}</h2>
            <p>{lang === "ja" ? "ご注文前に、商品と数量をご確認ください。" : "Review your items and quantities before checkout."}</p>
          </div>
          <div className={styles.cartPanel}>
            <div className={giftQualified ? styles.giftQualified : styles.giftProgress}>
              <span>{giftQualified ? (lang === "ja" ? "🎁 プレゼント対象です" : "🎁 Gift unlocked") : (lang === "ja" ? "🎁 あと少しでプレゼント" : "🎁 Almost there")}</span>
              <p>{giftQualified ? (lang === "ja" ? "メンテナンスセットを無料でお付けします。" : "A maintenance kit will be included free.") : (lang === "ja" ? `あと${yen(giftRemaining)}、またはギターをもう${Math.max(0,2-guitarCount)}本追加するとメンテナンスセットをプレゼント。` : `Spend ${yen(giftRemaining)} more, or add ${Math.max(0,2-guitarCount)} more guitar(s), to receive a maintenance kit.`)}</p>
            </div>
            {!cart.length ? (
              <div className={styles.empty}>
                <span>♩</span>
                <h3>{lang === "ja" ? "バッグは空です" : "Your bag is empty"}</h3>
                <p>{lang === "ja" ? "お気に入りの一本を追加してみましょう。" : "Add a guitar you love to get started."}</p>
                <a href="#collection">{lang === "ja" ? "コレクションを見る" : "View collection"}</a>
              </div>
            ) : (
              <>
                <div className={styles.cartItems}>
                  {cart.map((i) => (
                    <div className={styles.cartItem} key={i.id}>
                      <div className={styles.thumb}>
                        {i.image ? (
                          <Image src={optimizedImage(i.image)} alt="" width={72} height={72} />
                        ) : (
                          <b className={styles.thumbIcon}>{i.icon || "♪"}</b>
                        )}
                      </div>
                      <div className={styles.itemName}>
                        <small>{i.type}</small>
                        <b>{i.name}</b>
                        <button onClick={() => change(i.id, -i.quantity)}>
                          {lang === "ja" ? "削除" : "Remove"}
                        </button>
                      </div>
                      <div className={styles.quantity}>
                        <button onClick={() => change(i.id, -1)}>−</button>
                        <span>{i.quantity}</span>
                        <button onClick={() => change(i.id, 1)}>＋</button>
                      </div>
                      <strong>{yen(i.price * i.quantity)}</strong>
                    </div>
                  ))}
                </div>
                <div className={styles.summary}>
                  <div>
                    <span>{lang === "ja" ? "小計" : "Subtotal"}</span>
                    <b>{yen(total)}</b>
                  </div>
                  <div>
                    <span>{lang === "ja" ? "送料" : "Shipping"}</span>
                    <b>{lang === "ja" ? "無料" : "Free"}</b>
                  </div>
                  <div className={styles.grandTotal}>
                    <span>{lang === "ja" ? "合計（税込）" : "Total (tax included)"}</span>
                    <b>{yen(total)}</b>
                  </div>
                  <button onClick={() => { localStorage.setItem("guitar-language",lang); router.push(`/checkout?lang=${lang}`); }}>
                    {lang === "ja" ? "購入手続きへ進む" : "Continue to checkout"} <span>→</span>
                  </button>
                  <p>🔒 {lang === "ja" ? "デモ決済・種類別1〜3年間品質保証" : "Demo checkout · 1–3 year warranty by type"}</p>
                </div>
              </>
            )}
          </div>
        </section>
        <section className={styles.story} id="story">
          <div>
            <p className={styles.eyebrow}>OUR PROMISE</p>
            <h2>
              {lang === "ja" ? "一本ずつ、" : "Every instrument,"}
              <br />
              {lang === "ja" ? "丁寧に仕上げて。" : "carefully prepared."}
            </h2>
          </div>
          <div className={styles.promises}>
            {(lang === "ja" ? [
              [
                "01",
                "プロによる調整",
                "専門スタッフが一本ずつ確認してから発送します。",
              ],
              [
                "02",
                "安心のサポート",
                "選び方からメンテナンスまでご相談ください。",
              ],
              [
                "03",
                "30日間お試し",
                "ご自宅で音と弾き心地をお確かめいただけます。",
              ],
            ] : [["01","Professional setup","Every instrument is inspected before dispatch."],["02","Friendly support","Guidance from choosing a guitar to daily care."],["03","30-day trial","Evaluate the tone and feel at home in this demo policy."]]).map((x) => (
              <article key={x[0]}>
                <b>{x[0]}</b>
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.guideSection} id="guide">
          <div className={styles.guideHeading}><p className={styles.eyebrow}>SHOPPING GUIDE</p><h2>{lang === "ja" ? "購入前に知っておきたいこと" : "Good to know before choosing"}</h2></div>
          <div className={styles.guideGrid}>
            <article><span>↩</span><h3>{lang === "ja" ? "30日間お試し" : "30-day trial"}</h3><p>{lang === "ja" ? "デモ上の制度です。実店舗を想定した場合は、到着から30日以内・未改造・付属品完備を返品条件とします。" : "Demo policy: returns within 30 days, with no modifications and all accessories included."}</p></article>
            <article><span>♢</span><h3>{lang === "ja" ? "種類別品質保証" : "Warranty by type"}</h3><p>{lang === "ja" ? "エレキ・ベース3年、アコースティック・セミホロウ2年、クラシック1年。消耗品と故意の破損は対象外です。" : "Electric and bass: 3 years; acoustic and semi-hollow: 2 years; classical: 1 year. Consumables and accidental damage are excluded."}</p></article>
            <article><span>▣</span><h3>{lang === "ja" ? "配送と個人情報" : "Shipping & privacy"}</h3><p>{lang === "ja" ? "通常2〜4日で発送する想定です。このポートフォリオでは住所・決済情報・証明書を入力または送信しません。" : "Estimated dispatch is 2–4 days. This portfolio never collects or sends addresses, payment data, or identity documents."}</p></article>
          </div>
        </section>
        <section className={styles.portfolioSection}>
          <div><p className={styles.eyebrow}>ABOUT THIS PROJECT</p><h2>{lang === "ja" ? "ショップ体験を、設計から実装まで。" : "A complete store experience, designed and built."}</h2></div>
          <div><p>{lang === "ja" ? "A&A GUITAR STOREは、ECサイトの設計力とフロントエンド実装力を紹介するためのポートフォリオ作品です。商品検索、比較、カート、デモ決済、注文履歴、レスポンシブ表示まで一貫して制作しています。" : "A&A GUITAR STORE is a portfolio project demonstrating ecommerce UX and frontend implementation—from search and comparison to cart, demo checkout, order history, and responsive design."}</p><ul><li>Next.js / React / TypeScript</li><li>CSS Modules / Responsive UI</li><li>Local demo data / No real payment</li></ul></div>
        </section>
        <section className={styles.faqSection} id="faq">
          <div><p className={styles.eyebrow}>FAQ &amp; CONTACT</p><h2>{lang === "ja" ? "よくある質問・ご案内" : "Questions & information"}</h2><p>{lang === "ja" ? "安心して作品をご覧いただくためのご案内です。" : "Information to help you explore this portfolio with confidence."}</p></div>
          <div className={styles.faqList}>
            <details open><summary>{lang === "ja" ? "実際に注文できますか？" : "Can I place a real order?"}</summary><p>{lang === "ja" ? "いいえ。このサイトはポートフォリオ作品です。注文、決済、本人確認、発送は行われません。" : "No. This is a portfolio project; no order, payment, identity check, or delivery is processed."}</p></details>
            <details><summary>{lang === "ja" ? "保証期間はどのように決まりますか？" : "How is the warranty period determined?"}</summary><p>{lang === "ja" ? "デモ上では、エレキ・ベース3年、アコースティック・セミホロウ2年、クラシック1年です。" : "In this demo: electric and bass 3 years, acoustic and semi-hollow 2 years, classical 1 year."}</p></details>
            <details><summary>{lang === "ja" ? "問い合わせ先はありますか？" : "How can I contact the creator?"}</summary><p>{lang === "ja" ? "ポートフォリオ閲覧者向けの表示例です。実際の問い合わせフォームや個人情報の送信機能はありません。" : "This is a portfolio contact example. There is no live form and no personal information is transmitted."}</p></details>
          </div>
        </section>
      </main>
      {lightbox?.image && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={lightbox.name}>
          <button type="button" onClick={() => setLightbox(null)} aria-label={lang === "ja" ? "拡大写真を閉じる" : "Close enlarged photo"}>×</button>
          <div className={styles.productDetail}>
            <div className={styles.detailImage}><Image src={optimizedImage(lightbox.image)} alt={lightbox.name} fill sizes="(max-width: 700px) 90vw, 55vw" priority /></div>
            <div className={styles.detailInfo}>
              <small>{lightbox.type}</small>
              <h2>{lightbox.name}</h2>
              <strong>{yen(lightbox.price)}</strong>
              <p>{lang === "ja" ? lightbox.description : englishDescriptions[lightbox.id]}</p>
              <div className={styles.detailRating}>★★★★★ <b>{reviewFor(lightbox).rating}</b> <span>({reviewFor(lightbox).count}{lang === "ja" ? "件のデモレビュー" : " demo reviews"})</span></div>
              <dl>
                <div><dt>{lang === "ja" ? "在庫" : "Stock"}</dt><dd>{lang === "ja" ? `在庫あり・残り${(lightbox.id.length % 4) + 2}点` : `${(lightbox.id.length % 4) + 2} available`}</dd></div>
                <div><dt>{lang === "ja" ? "発送" : "Shipping"}</dt><dd>{lang === "ja" ? "通常2〜4日で発送" : "Ships in 2–4 days"}</dd></div>
                <div><dt>{lang === "ja" ? "保証" : "Warranty"}</dt><dd>{lang === "ja" ? warrantyFor(lightbox.type) : `${lightbox.type === "Classical" ? 1 : lightbox.type === "Electric" || lightbox.type === "Bass" ? 3 : lightbox.category === "accessory" ? "0.5" : 2}-year quality warranty`}</dd></div>
                <div><dt>{lang === "ja" ? "主な素材" : "Materials"}</dt><dd>{lightbox.category === "accessory" ? (lang === "ja" ? "商品により異なります" : "Varies by product") : materialFor(lightbox.type)}</dd></div>
                {lightbox.category !== "accessory" && <><div><dt>{lang === "ja" ? "重量" : "Weight"}</dt><dd>{specsFor(lightbox).weight}</dd></div><div><dt>{lang === "ja" ? "スケール" : "Scale"}</dt><dd>{specsFor(lightbox).scale}</dd></div><div><dt>{lang === "ja" ? "製造国" : "Made in"}</dt><dd>{specsFor(lightbox).origin}</dd></div></>}
                <div><dt>{lang === "ja" ? "対応" : "Compatibility"}</dt><dd>{lightbox.category === "accessory" ? (lang === "ja" ? compatibilityFor(lightbox.id) : compatibilityForEn(lightbox.id)) : (lang === "ja" ? "初心者〜経験者" : "Beginner to experienced")}</dd></div>
                <div><dt>{lang === "ja" ? "付属品" : "Included"}</dt><dd>{lightbox.category === "accessory" ? (lang === "ja" ? "取扱説明書" : "User guide") : (lang === "ja" ? "調整・検品証明書" : "Setup inspection card")}</dd></div>
              </dl>
              <button type="button" onClick={() => { add(lightbox); setLightbox(null); }}>{lang === "ja" ? "バッグに追加" : "Add to bag"} →</button>
              <small>{lang === "ja" ? "ポートフォリオ用のデモ商品です。実際の注文は行われません。" : "Demo product for this portfolio. No real order is placed."}</small>
            </div>
          </div>
        </div>
      )}
      <div
        className={`${styles.notice} ${notice ? styles.noticeVisible : ""}`}
        role="status"
        aria-live="polite"
      >
        <span>✓</span> {notice}
      </div>
      <footer className={styles.footer} id="support">
        <div className={styles.brand}>
          <span className={styles.mark}>T</span>
          <span>
            A&amp;A<small>GUITAR STORE</small>
          </span>
        </div>
        <p>{lang === "ja" ? "あなたの音楽に、長く寄り添う一本を。" : "An instrument that stays with your music."}</p>
        <nav aria-label={lang === "ja" ? "フッター案内" : "Footer links"}><a href="#faq">FAQ</a><a href="#guide">{lang === "ja" ? "ご利用案内" : "Shopping guide"}</a><a href="#faq">{lang === "ja" ? "お問い合わせ" : "Contact"}</a><a href="#guide">{lang === "ja" ? "利用規約" : "Terms"}</a></nav>
        <small>© 2026 A&amp;A Guitar Store</small>
      </footer>
      <div className={styles.credits}>
        Images: “Bass guitar (instrument)” by Ziongarage, CC0; “GuitareClassique5” by Martin Möller / Mouh2jijel, CC BY-SA 2.0 DE. Other product images are original AI-generated assets.
      </div>
    </div>
  );
}
