"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
type Item = { id:string; name:string; price:number; quantity:number; color:string; accent:string; image?:string; icon?:string; category?:"guitar"|"accessory" };
type Payment = "prepaid" | "cod" | "later";
type Order = { id:string; date:string; items:Item[]; subtotal:number; fee:number; total:number; payment:string; status:string };
const yen = (v:number) => `¥${v.toLocaleString("ja-JP")}`;
export default function Checkout() {
  const router = useRouter();
  const [cart,setCart] = useState<Item[]>([]);
  const [payment,setPayment] = useState<Payment>("prepaid");
  const [identityConfirmed,setIdentityConfirmed] = useState(false);
  const [done,setDone] = useState(false);
  const [lang,setLang] = useState<"ja"|"en">("ja");
  const ja = lang === "ja";
  useEffect(() => { try { setCart(JSON.parse(localStorage.getItem("guitar-cart") || "[]")); } catch { setCart([]); } const queryLanguage=new URLSearchParams(window.location.search).get("lang"); const saved=queryLanguage || localStorage.getItem("guitar-language"); if(saved==="ja"||saved==="en") { setLang(saved); localStorage.setItem("guitar-language",saved); } },[]);
  useEffect(() => { document.documentElement.lang=lang; },[lang]);
  const changeLanguage=()=>{const next=ja?"en":"ja";setLang(next);localStorage.setItem("guitar-language",next);};
  const subtotal = cart.reduce((sum,item) => sum + item.price * item.quantity,0);
  const fee = payment === "later" ? 880 : payment === "cod" ? 550 : 0;
  const total = subtotal + fee;
  const guitarCount = cart.filter((item) => item.category !== "accessory").reduce((sum,item) => sum + item.quantity,0);
  const giftQualified = subtotal >= 250000 || guitarCount >= 2;
  const submit = (event:React.FormEvent) => {
    event.preventDefault();
    if (payment === "later" && !identityConfirmed) return;
    const order:Order = { id:`DEMO-${crypto.randomUUID().slice(0,8).toUpperCase()}`, date:new Date().toLocaleString("ja-JP"), items:cart, subtotal, fee, total, payment:payment === "prepaid" ? "事前決済（デモ）" : payment === "cod" ? "代金引換" : "後払い", status:"デモ注文・未処理" };
    let previous:Order[] = [];
    try {
      const saved = JSON.parse(localStorage.getItem("guitar-order-history") || "[]");
      previous = Array.isArray(saved) ? saved : [];
    } catch {
      localStorage.removeItem("guitar-order-history");
    }
    localStorage.setItem("guitar-order-history",JSON.stringify([order,...previous].slice(0,20)));
    localStorage.removeItem("guitar-cart"); setDone(true); scrollTo(0,0);
  };
  if (done) return <main className={styles.done}><div>✓</div><p>DEMO ORDER SAVED</p><h1>{ja?"デモ注文を履歴に保存しました。":"Demo order saved to history."}</h1><p>{ja?"実際の注文・決済・発送は行われません。":"No real order, payment, or delivery is processed."}</p><button onClick={() => router.push(`/history?lang=${lang}`)}>{ja?"注文履歴を見る":"View order history"} →</button></main>;
  return <div className={styles.page}>
    <div className={styles.demoNotice}>PORTFOLIO DEMO — {ja?"実際の注文・決済・本人確認は行われません":"No real orders, payments, or identity checks are processed"}</div>
    <header><button onClick={() => router.push(`/?lang=${lang}`)}>← {ja?"ショップに戻る":"Back to shop"}</button><b>A&amp;A<small>GUITAR STORE</small></b><span><button onClick={changeLanguage}>{ja?"EN":"日本語"}</button><button onClick={() => router.push(`/history?lang=${lang}`)}>{ja?"注文履歴":"History"}</button></span></header>
    <main><section><p className={styles.eyebrow}>DEMO CHECKOUT</p><h1>{ja?"配送・支払い方法":"Delivery & payment"}</h1>
      {!cart.length ? <div className={styles.emptyCart}><span>{ja?"バッグは空です":"Your bag is empty"}</span><p>{ja?"商品を選んでからお進みください。":"Choose a product before continuing."}</p><button onClick={() => router.push("/")}>{ja?"商品を見る":"View products"} →</button></div> :
      <form onSubmit={submit}>
        <fieldset><legend><i>1</i> {ja?"お届け先（デモ）":"Delivery address (demo)"}</legend><p className={styles.safeNote}>{ja?"個人情報保護のため、このポートフォリオでは氏名・住所を入力しません。":"This portfolio does not collect names or addresses."}</p><div className={styles.mockAddress}>{ja?<>デモ利用者<br/>東京都 デモ市 サンプル1-2-3</>:<>Demo customer<br/>Sample address, Tokyo</>}</div></fieldset>
        <fieldset><legend><i>2</i> {ja?"お支払い方法":"Payment method"}</legend>
          <label className={styles.paymentChoice}><input type="radio" name="payment" checked={payment === "prepaid"} onChange={() => setPayment("prepaid")}/><span><b>{ja?"事前決済（デモ）":"Prepayment (demo)"}</b><small>{ja?"カード番号などは入力できません。追加料金なし。":"No card details can be entered. No additional fee."}</small></span></label>
          <label className={styles.paymentChoice}><input type="radio" name="payment" checked={payment === "cod"} onChange={() => setPayment("cod")}/><span><b>{ja?"商品受取時に支払い（代金引換）":"Pay on delivery (cash on delivery)"}</b><small>{ja?"商品を受け取る際に配達員へ支払う想定です。代引手数料 ¥550。":"Pay the courier when the product arrives. Fee: ¥550."}</small></span></label>
          <label className={styles.paymentChoice}><input type="radio" name="payment" checked={payment === "later"} onChange={() => setPayment("later")}/><span><b>{ja?"請求書で後日支払い（後払い）":"Pay later by invoice"}</b><small>{ja?"商品受取後、後日届く請求書で支払う想定です。後払い手数料 ¥880。":"Pay a later invoice after delivery. Fee: ¥880."}</small></span></label>
          {payment === "later" ? <div className={styles.identity}><b>{ja?"後払いの本人確認（デモ）":"Pay-later identity check (demo)"}</b><p>{ja?"後払いには本人確認と審査が必要です。このポートフォリオでは身分証明書をアップロードせず、実際の審査も行いません。":"Pay later requires identity verification and screening. This portfolio uploads no ID and performs no real screening."}</p><label><input type="checkbox" checked={identityConfirmed} onChange={(e) => setIdentityConfirmed(e.target.checked)}/> {ja?"後払いに本人確認が必要なことを確認しました":"I understand that pay later requires identity verification"}</label></div> : null}
        </fieldset>
        <button className={styles.order} disabled={payment === "later" && !identityConfirmed}>{ja?"デモ注文を履歴に保存":"Save demo order"} <span>{yen(total)} →</span></button>
      </form>}
    </section><aside><p className={styles.eyebrow}>ORDER SUMMARY</p><h2>{ja?"ご注文内容":"Order summary"}</h2>{giftQualified ? <div className={styles.giftNotice}><b>🎁 {ja?"購入特典":"Purchase gift"}</b><span>{ja?"メンテナンスセットを無料でお付けします。":"A maintenance kit is included free."}</span></div> : null}
      {cart.map((item) => <div className={styles.item} key={item.id}><span className={styles.itemImage}>{item.image ? <Image src={item.image} alt="" fill sizes="64px"/> : <b>{item.icon || "♪"}</b>}</span><div><b>{item.name}</b><small>{ja?"数量":"Qty"} {item.quantity}</small></div><strong>{yen(item.price * item.quantity)}</strong></div>)}
      <div className={styles.total}><p><span>{ja?"商品小計":"Subtotal"}</span><b>{yen(subtotal)}</b></p>{fee ? <p><span>{payment === "later" ? (ja?"後払い手数料":"Deferred payment fee") : (ja?"代引手数料":"Cash-on-delivery fee")}</span><b>{yen(fee)}</b></p> : null}<p><span>{ja?"合計（税込）":"Total (tax included)"}</span><strong>{yen(total)}</strong></p></div>
    </aside></main>
  </div>;
}
