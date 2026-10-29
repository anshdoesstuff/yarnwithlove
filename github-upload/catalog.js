window.YWL_DEFAULT_PRODUCTS = [
  { id: 1, name: "Daisy Chick with Flower", category: "Amigurumi", price: 289, image: "images/products/chick-with-flower.jpeg", description: "A tiny handmade chick with a pink bow, rosy cheeks and a little crochet flower." },
  { id: 2, name: "Mini Flower Bouquet", category: "Bouquets", price: 279, image: "images/products/cupcake-bouquet.jpeg", description: "A petite handmade bouquet of crochet flowers in cheerful pastel colours." },
  { id: 3, name: "Crochet Paw Pouch", category: "Pouches", price: 149, image: "images/products/paw-bookmark.jpeg", description: "A soft paw-shaped crochet pouch with a loop detail." },
  { id: 4, name: "Owl Keychain", category: "Keychains", price: 89, image: "images/products/flower-keychains.jpeg", description: "A playful pink crochet owl keychain with big eyes." },
  { id: 5, name: "Butterfly Keychain", category: "Keychains", price: 89, image: "images/products/daisy-keychain.jpeg", description: "A sunny yellow crochet butterfly keychain finished with a pearl detail and gold-tone ring." },
  { id: 6, name: "Sunflower in a Crochet Pot", category: "Home Decor", price: 319, image: "images/products/sunflower-pot.jpeg", description: "A bright handmade sunflower in a textured crochet pot, made to keep blooming." },
  { id: 7, name: "Sea Turtle Plush", category: "Amigurumi", price: 389, image: "images/products/turtle-plush.jpeg", description: "A cuddly teal crochet turtle with a soft plush shell and friendly face." },
  { id: 8, name: "Heart-Holding Bunny Plush", category: "Amigurumi", price: 699, image: "images/products/bunny-plush.jpeg", description: "A sweet handmade bunny with floppy ears and a little pink heart." },
  { id: 9, name: "Lip Balm Holder Bag Charm", category: "Charms", price: 149, image: "images/products/lip-balm-holder.jpeg", description: "A handy crochet sleeve charm for keeping lip balm close at hand." },
  { id: 10, name: "Bee & Sunflower Bag Charm Set", category: "Charms", price: 449, image: "images/products/bee-flower-bag-charm.jpeg", description: "A cheerful pair of crochet bees with a little sunflower accent for your bag." },
  { id: 11, name: "Mini Octopus Keychain Set", category: "Keychains", price: 229, image: "images/products/octopus-keychains.jpeg", description: "Two tiny plush crochet octopus keychains in pink and blue." },
  { id: 12, name: "Peter Parker Star Keychain", category: "Keychains", price: 199, image: "images/products/spider-keychain.jpeg", description: "A handmade Peter Parker-inspired crochet star keychain in red and blue." },
  { id: 13, name: "Rainbow Cloud Keychain", category: "Keychains", price: 149, image: "images/products/rainbow-keychain.jpeg", description: "A colourful crochet rainbow with a soft white cloud edge, finished with a keychain loop." },
  { id: 14, name: "Hanging Tulips Hair Tie", category: "Hair Accessories", price: 259, image: "images/products/cherry-pom-hair-tie.jpeg", description: "A pink crochet hair tie with dangling tulip details." },
  { id: 15, name: "Rose Tail Hair Tie", category: "Hair Accessories", price: 189, image: "images/products/rose-tail-hair-tie.jpeg", description: "A crochet rose hair tie with long soft tails for a romantic finishing touch." },
  { id: 16, name: "Crochet Gajra", category: "Hair Accessories", price: 239, image: "images/products/white-flower-bun-scrunchie.jpeg", description: "A soft white crochet gajra to decorate a bun or ponytail." },
  { id: 17, name: "Red & White Crochet Gajra", category: "Hair Accessories", price: 239, image: "images/products/red-white-bun-garland.jpeg", description: "A handmade red and white crochet floral bun accessory inspired by a gajra." },
  { id: 18, name: "Sunflower Crochet Hair Clip", category: "Hair Accessories", price: 179, image: "images/products/sunflower-hair-clip.jpeg", description: "A bright crochet sunflower clip with leafy green details." },
  { id: 19, name: "Sakura Hair Clip", category: "Hair Accessories", price: 179, image: "images/products/butterfly-hair-clip.jpeg", description: "A sweet pink crochet Sakura flower clip with a leafy green accent." },
  { id: 20, name: "Granny Square Shoulder Bag", category: "Bags", price: 449, image: "images/products/granny-square-sling-bag.jpeg", description: "A handmade blue, white and yellow granny square bag with a long shoulder strap." }
];

// Replace the original sample catalogue once, while preserving any products the shop has edited.
(function migrateSampleCatalog() {
  const legacyNames = ["Crochet Flower Bouquet", "Little Crochet Duck", "Tulip Keychain", "Mini Crochet Teddy", "Cute Phone Charm", "Mirror Charm"];
  try {
    const saved = JSON.parse(localStorage.getItem("ywl_products") || "null");
    if (Array.isArray(saved) && saved.length === legacyNames.length && saved.every((p, i) => p.name === legacyNames[i])) {
      localStorage.setItem("ywl_products", JSON.stringify(window.YWL_DEFAULT_PRODUCTS));
    }
  } catch (_) {}
})();

(function updateCorrectedProductNames() {
  const corrections = {
    2: ["Cupcake Flower Bouquet", "Mini Flower Bouquet", "A petite handmade bouquet of crochet flowers in cheerful pastel colours."],
    3: ["Crochet Paw Bookmark", "Crochet Paw Pouch", "A soft paw-shaped crochet pouch with a loop detail."],
    4: ["Pink Flower Keychain", "Owl Keychain", "A playful pink crochet owl keychain with big eyes."],
    5: ["Crochet Daisy Keychain", "Butterfly Keychain", "A sunny yellow crochet butterfly keychain finished with a pearl detail and gold-tone ring."],
    12: ["Spider Hero Crochet Keychain", "Peter Parker Star Keychain", "A handmade Peter Parker-inspired crochet star keychain in red and blue."]
  };
  try {
    const saved = JSON.parse(localStorage.getItem("ywl_products") || "null");
    if (!Array.isArray(saved)) return;
    let changed = false;
    for (const product of saved) {
      const correction = corrections[product.id];
      if (correction && product.name === correction[0]) {
        product.name = correction[1];
        product.description = correction[2];
        if (product.id === 3) product.category = "Pouches";
        changed = true;
      }
    }
    if (changed) localStorage.setItem("ywl_products", JSON.stringify(saved));
  } catch (_) {}
})();

(function appendNewCatalogProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem("ywl_products") || "null");
    if (!Array.isArray(saved)) return;
    const savedIds = new Set(saved.map(product => String(product.id)));
    const additions = window.YWL_DEFAULT_PRODUCTS.filter(product => product.id >= 14 && !savedIds.has(String(product.id)));
    if (additions.length) localStorage.setItem("ywl_products", JSON.stringify([...saved, ...additions]));
  } catch (_) {}
})();

(function applyLatestCatalogCorrections() {
  const corrections = {
    14: { oldName: "Cherry Pom-Pom Hair Tie", name: "Hanging Tulips Hair Tie", description: "A pink crochet hair tie with dangling tulip details." },
    16: { oldName: "White Flower Bun Scrunchie", name: "Crochet Gajra", price: 399, description: "A soft white crochet gajra to decorate a bun or ponytail." },
    18: { oldName: "Sunflower Crochet Hair Clip", price: 299 }
  };
  try {
    const saved = JSON.parse(localStorage.getItem("ywl_products") || "null");
    if (!Array.isArray(saved)) return;
    let changed = false;
    for (const product of saved) {
      const correction = corrections[product.id];
      if (!correction) continue;
      if (product.name === correction.oldName) product.name = correction.name;
      if (correction.price !== undefined) product.price = correction.price;
      if (correction.description) product.description = correction.description;
      changed = true;
    }
    if (changed) localStorage.setItem("ywl_products", JSON.stringify(saved));
  } catch (_) {}
})();

(function applyCustomerPricingUpdate() {
  const prices = { 1: 289, 2: 279, 3: 149, 4: 89, 5: 89, 6: 319, 7: 389, 8: 699, 9: 149, 10: 449, 11: 229, 12: 199, 13: 149, 14: 259, 15: 189, 16: 239, 17: 239, 18: 179, 19: 179, 20: 449 };
  try {
    const saved = JSON.parse(localStorage.getItem("ywl_products") || "null");
    if (!Array.isArray(saved)) return;
    let changed = false;
    for (const product of saved) {
      if (prices[product.id] !== undefined && product.price !== prices[product.id]) {
        product.price = prices[product.id];
        changed = true;
      }
      if (product.id === 19 && product.name === "Pink Butterfly Hair Clip") {
        product.name = "Sakura Hair Clip";
        product.description = "A sweet pink crochet Sakura flower clip with a leafy green accent.";
        changed = true;
      }
    }
    if (changed) localStorage.setItem("ywl_products", JSON.stringify(saved));
  } catch (_) {}
})();
