const DEFAULT_PRODUCTS=[
{id:7,name:"Crochet Lily Stem",category:"Other",price:256,image:"images/lily-stem.jpg",description:"Flower stem",badge:"BESTSELLER"}
];

const WA_NUMBER="919999999999"; // CHANGE THIS to the business WhatsApp number, country code + number without +.
const ADMIN_PASSWORD="admin123"; // CHANGE THIS before publishing.

function readStored(key, fallback){
 try { const raw=localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
 catch(err){ console.warn(`Could not read ${key}; using defaults.`, err); return fallback; }
}
let products=readStored("ywl_products_v2", DEFAULT_PRODUCTS);
let cart=readStored("ywl_cart", []);
if(!Array.isArray(products)) products=DEFAULT_PRODUCTS.map(p=>({...p}));
products=products.filter(p=>p && (typeof p.id==="string"||Number.isFinite(Number(p.id))) && String(p.name||"").trim()).map(p=>({...p,id:p.id, name:String(p.name).trim(), category:String(p.category||"Other"), price:Math.max(0,Number(p.price)||0), image:String(p.image||"images/fallback.svg"), description:String(p.description||""), badge:String(p.badge||"")}));
if(!Array.isArray(cart)) cart=[];
cart=cart.filter(i=>i && products.some(p=>String(p.id)===String(i.id)) && Number.isFinite(Number(i.qty)) && Number(i.qty)>0).map(i=>({...i,qty:Math.floor(Number(i.qty))}));
let activeCategory="All";
let modalProduct=null,modalQty=1;

const money=n=>"₹"+Number(n).toLocaleString("en-IN");
const save=()=>{
 try {
  localStorage.setItem("ywl_products_v2",JSON.stringify(products));
  localStorage.setItem("ywl_cart",JSON.stringify(cart));
  return true;
 } catch(err) {
  console.error("Could not save store data", err);
  alert("Your browser could not save the changes. Try a smaller product image or open the site through your hosting/local web server.");
  return false;
 }
};


function renderCategoryButtons(){
 const row=document.querySelector(".category-row"); if(!row)return;
 const defaults=["Bouquets","Keychains","Charms","Amigurumi","Phone Charms"];
 const cats=[...new Set([...defaults,...products.map(p=>String(p.category||"Other").trim()).filter(Boolean)])];
 row.innerHTML=`<button onclick="setCategory('All')">✿<span>All Products</span></button>`+cats.map(c=>`<button onclick="setCategory(${JSON.stringify(c).replace(/</g,"\\u003c")})">♡<span>${escapeHtml(c)}</span></button>`).join("");
}

function setCategory(c){activeCategory=c;renderProducts();document.querySelector("#shop").scrollIntoView({behavior:"smooth"});}
function renderProducts(){
 if(!Array.isArray(products)) products=DEFAULT_PRODUCTS.map(p=>({...p}));
 renderCategoryButtons();
 let list=products.filter(p=>activeCategory==="All"||p.category===activeCategory);
 const sort=document.querySelector("#sort")?.value;
 if(sort==="low")list.sort((a,b)=>a.price-b.price);
 if(sort==="high")list.sort((a,b)=>b.price-a.price);
 document.querySelector("#productGrid").innerHTML=list.length ? list.map(p=>`
 <article class="product-card" onclick="openProduct(${p.id})">
  <div class="product-img"><img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.name)}" onerror="this.src='images/fallback.svg'">${p.badge?`<span class="badge">${escapeHtml(p.badge)}</span>`:""}</div>
  <div class="product-info"><small>${escapeHtml(p.category.toUpperCase())}</small><h3>${escapeHtml(p.name)}</h3><strong>${money(p.price)}</strong></div>
 </article>`).join("") : '<p class="empty">No products in this category yet. Check back soon ♡</p>';
}
function openProduct(id){modalProduct=products.find(p=>String(p.id)===String(id));modalQty=1;if(!modalProduct)return;document.querySelector("#modalImg").onerror=()=>{document.querySelector("#modalImg").onerror=null;document.querySelector("#modalImg").src="images/fallback.svg";};document.querySelector("#modalImg").src=modalProduct.image;document.querySelector("#modalTitle").textContent=modalProduct.name;document.querySelector("#modalCat").textContent=modalProduct.category;document.querySelector("#modalPrice").textContent=money(modalProduct.price);document.querySelector("#modalDesc").textContent=modalProduct.description;document.querySelector("#modalQty").textContent=modalQty;document.querySelector("#productModal").classList.add("show");}
function closeProduct(){document.querySelector("#productModal").classList.remove("show");}
function changeModalQty(n){modalQty=Math.max(1,modalQty+n);document.querySelector("#modalQty").textContent=modalQty;}
function addModalToCart(){addToCart(modalProduct.id,modalQty);closeProduct();openCart();}
function addToCart(id,qty=1){const p=products.find(x=>String(x.id)===String(id));if(!p)return;const found=cart.find(i=>String(i.id)===String(id));if(found)found.qty+=qty;else cart.push({id:p.id,qty});if(save())renderCart();}
function updateQty(id,n){const i=cart.find(x=>String(x.id)===String(id));if(!i)return;i.qty+=n;if(i.qty<=0)cart=cart.filter(x=>String(x.id)!==String(id));if(save())renderCart();}
function renderCart(){
 const count=cart.reduce((s,i)=>s+i.qty,0);document.querySelector("#cartCount").textContent=count;
 const box=document.querySelector("#cartItems");
 if(!cart.length){box.innerHTML='<div class="empty">Your bag is waiting for something cute ♡</div>';document.querySelector("#cartTotal").textContent="₹0";return;}
 let total=0;
 box.innerHTML=cart.map(i=>{const p=products.find(x=>String(x.id)===String(i.id));if(!p)return"";total+=p.price*i.qty;return `<div class="cart-row"><img src="${escapeAttr(p.image)}" onerror="this.src='images/fallback.svg'"><div><h4>${escapeHtml(p.name)}</h4><div>${money(p.price)}</div><div class="qty"><button onclick="updateQty(${p.id},-1)">−</button><span>${i.qty}</span><button onclick="updateQty(${p.id},1)">+</button></div></div><button class="remove" onclick="updateQty(${p.id},-${i.qty})">remove</button></div>`}).join("");
 document.querySelector("#cartTotal").textContent=money(total);
}
function openCart(){document.querySelector("#cart").classList.add("open");document.querySelector("#drawerBackdrop").classList.add("open");renderCart();}
function closeCart(){document.querySelector("#cart").classList.remove("open");document.querySelector("#drawerBackdrop").classList.remove("open");}
function openCheckout(){
 cart=cart.filter(i=>products.some(p=>String(p.id)===String(i.id)));if(!cart.length){save();renderCart();alert("Your bag is empty. Please add a product first.");return;}
 closeCart();renderCheckoutSummary();document.querySelector("#checkoutModal").classList.add("show");
}
function closeCheckout(){document.querySelector("#checkoutModal").classList.remove("show");}
function renderCheckoutSummary(){
 let total=0;let html=cart.map(i=>{const p=products.find(x=>String(x.id)===String(i.id));if(!p)return "";total+=p.price*i.qty;return `${escapeHtml(p.name)} × ${i.qty} — ${money(p.price*i.qty)}`}).join("<br>");
 document.querySelector("#checkoutSummary").innerHTML=`${html}<hr><strong>Total: ${money(total)}</strong>`;
}
function buildOrderMessage(data){
 let total=0;const lines=cart.map(i=>{const p=products.find(x=>String(x.id)===String(i.id));if(!p)return "";total+=p.price*i.qty;return `• ${p.name} x ${i.qty} — ${money(p.price*i.qty)}`}).join("\n");
 return `Hi Yarn With Love! ♡\n\nI'd like to place an order:\n${lines}\n\nTotal: ${money(total)}\n\nCustomer: ${data.name}\nPhone/WhatsApp: ${data.phone}\nAddress: ${data.address}, ${data.city} - ${data.pincode}\nNotes: ${data.notes||"None"}`;
}
document.querySelector("#checkoutForm").addEventListener("submit",e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target));const msg=buildOrderMessage(data);window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank");});
function buyNow(){const p=modalProduct;if(!p)return;const total=p.price*modalQty;const msg=`Hi Yarn With Love! ♡ I'd like to order ${modalQty} x ${p.name} (${money(total)}).`;window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank");}
document.querySelector("#waLink").href=`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Yarn With Love! ♡ I'd like to enquire about your products.")}`;
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function escapeAttr(s){return escapeHtml(s);}
renderProducts();renderCart();
// Update an already-open storefront when the admin changes the catalog in another tab.
window.addEventListener("storage", event => {
 if(event.key === "ywl_products") { products=readStored("ywl_products_v2", DEFAULT_PRODUCTS); renderProducts(); renderCart(); }
});
window.addEventListener("pageshow", () => {
 products=readStored("ywl_products_v2", DEFAULT_PRODUCTS); if(!Array.isArray(products)) products=DEFAULT_PRODUCTS;
 cart=readStored("ywl_cart", []); if(!Array.isArray(cart)) cart=[];
 renderProducts(); renderCart();
});
