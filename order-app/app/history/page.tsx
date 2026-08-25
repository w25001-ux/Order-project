"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type OrderItem = { id?:string; name:string; quantity:number; price?:number; color?:string; accent?:string; image?:string; category?:"guitar"|"accessory" };
type Order = { id:string; date:string; items:OrderItem[]; total:number; payment:string; status:string };
const yen = (value:number) => `¥${value.toLocaleString("ja-JP")}`;

export default function History() {
  const router = useRouter();
  const [orders,setOrders] = useState<Order[]>([]);
  const [lang,setLang] = useState<"ja"|"en">("ja");
  const ja=lang==="ja";

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("guitar-order-history") || "[]");
      setOrders(Array.isArray(saved) ? saved : []);
    } catch {
      localStorage.removeItem("guitar-order-history");
      setOrders([]);
    }
    const queryLanguage=new URLSearchParams(window.location.search).get("lang");
    const savedLanguage=queryLanguage || localStorage.getItem("guitar-language");
    if(savedLanguage==="ja"||savedLanguage==="en") { setLang(savedLanguage); localStorage.setItem("guitar-language",savedLanguage); }
  },[]);

  const changeLanguage=()=>{const next=ja?"en":"ja";setLang(next);localStorage.setItem("guitar-language",next);};
  useEffect(() => { document.documentElement.lang=lang; },[lang]);
  const paymentLabel=(value:string)=>ja?value:value.includes("事前")?"Prepayment (demo)":value.includes("代引")?"Cash on delivery":"Pay later by invoice";
  const statusLabel=(value:string)=>ja?value:"Demo order · not processed";
  const clearHistory = () => {
    if (!window.confirm(ja?"この端末に保存されたデモ注文履歴をすべて削除しますか？":"Delete all demo order history stored on this device?")) return;
    localStorage.removeItem("guitar-order-history");
    setOrders([]);
  };
  const buyAgain = (items:OrderItem[]) => {
    const valid = items.filter((item) => item.id && item.price).map((item) => ({...item,id:item.id!,price:item.price!,color:item.color||"#eee8dc",accent:item.accent||"#254438"}));
    localStorage.setItem("guitar-cart",JSON.stringify(valid));
    router.push("/#cart");
  };

  return <main className={styles.page}>
    <div className={styles.demo}>PORTFOLIO DEMO — {ja?"ここに表示されるのは、この端末内のデモ履歴だけです":"Only demo history stored on this device is shown"}</div>
    <header><button onClick={() => router.push("/")}>← {ja?"ショップに戻る":"Back to shop"}</button><b>A&amp;A GUITAR STORE</b><button onClick={changeLanguage}>{ja?"EN":"日本語"}</button></header>
    <section>
      <div className={styles.heading}><div><p>ORDER HISTORY</p><h1>{ja?"注文履歴":"Order history"}</h1></div>{orders.length?<button className={styles.clear} onClick={clearHistory}>{ja?"履歴を消去":"Clear history"}</button>:null}</div>
      {orders.length===0?<div className={styles.empty}><h2>{ja?"履歴はまだありません":"No orders yet"}</h2><p>{ja?"デモ注文を保存すると、こちらで確認できます。":"Saved demo orders will appear here."}</p><button onClick={()=>router.push("/")}>{ja?"商品を見る":"View products"}</button></div>:<div className={styles.list}>{orders.map((order)=><article key={order.id}><div><b>{order.id}</b><span>{order.date}</span></div><ul>{order.items.map((item,index)=><li key={`${item.name}-${index}`}>{item.name} × {item.quantity}</li>)}</ul><div><button onClick={()=>buyAgain(order.items)}>{ja?"もう一度バッグへ":"Add to bag again"}</button><span>{paymentLabel(order.payment)}</span><em>{statusLabel(order.status)}</em><strong>{yen(order.total)}</strong></div></article>)}</div>}
    </section>
  </main>;
}
