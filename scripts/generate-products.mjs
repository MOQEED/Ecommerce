import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const cats = {
  electronics: [
    ['Premium Wireless Headphones', 89, 'photo-1505740420928-5e560c06d30e'],
    ['Smart Watch Pro', 199, 'photo-1523275335684-37898b6baf30'],
    ['DSLR Camera Kit', 749, 'photo-1516035069371-29a1b244cc32'],
    ['Portable Bluetooth Speaker', 59, 'photo-1608043152269-423dbba4e7e2'],
    ['Mechanical Keyboard RGB', 129, 'photo-1587829741301-dc798b83add3'],
    ['Wireless Gaming Mouse', 49, 'photo-1527814050087-3793815479db'],
    ['4K Smart TV 55 inch', 699, 'photo-1593359677879-a4bb92f829d1'],
    ['Tablet 10 inch', 329, 'photo-1544244015-0df4b3ffc6b0']
  ],
  jewelery: [
    ['Gold Plated Necklace', 79, 'photo-1515562141207-7a88fb7ce338'],
    ['Silver Hoop Earrings', 45, 'photo-1535632066927-ab7c9ab60908'],
    ['Classic Leather Watch', 159, 'photo-1524592094714-0f0654ae203c'],
    ['Diamond Stud Earrings', 299, 'photo-1617038260897-41a1f14a8de0'],
    ['Rose Gold Bracelet', 89, 'photo-1611591437281-460bfbe1220a'],
    ['Pearl Strand Necklace', 120, 'photo-1599643478518-a784e5dc1c46'],
    ['Minimalist Ring Set', 65, 'photo-1605100804763-247f67b3557e'],
    ['Charm Bracelet Silver', 55, 'photo-1611652022419-a9419f74343d']
  ],
  "men's clothing": [
    ['Classic Fit Oxford Shirt', 42, 'photo-1602810318383-e386cc2a3ccf'],
    ['Slim Fit Denim Jeans', 58, 'photo-1542272604-787c3835535d'],
    ['Wool Winter Coat', 145, 'photo-1539533018447-63fcce2678e3'],
    ['Casual Polo Shirt', 35, 'photo-1586363104872-f3e5e31e9e3a'],
    ['Chino Shorts', 38, 'photo-1591195853828-11db59a44f6b'],
    ['Leather Bomber Jacket', 189, 'photo-1551028719-00167b16eac5'],
    ['Crew Neck Sweater', 62, 'photo-1620799140408-ed534f2b3b3b'],
    ['Formal Dress Shirt', 48, 'photo-1593030761757-71fae45fa0e7']
  ],
  "women's clothing": [
    ['Floral Summer Dress', 72, 'photo-1595777457583-95e059d581b8'],
    ['High Waist Wide Leg Pants', 64, 'photo-1594633312681-425c7b97ccd1'],
    ['Cashmere Knit Cardigan', 98, 'photo-1434389677669-e08b4cac3105'],
    ['Silk Blouse', 56, 'photo-1564257631407-4deb1f99d992'],
    ['Midi Pleated Skirt', 52, 'photo-1583496661160-fb5886a0aaaa'],
    ['Athletic Leggings', 44, 'photo-1541099649105-f69ad21f3246'],
    ['Evening Gown', 210, 'photo-1566177211669-33c7ac2e9836'],
    ['Denim Jacket Women', 78, 'photo-1548624313-0396c7e4f1d6']
  ]
}

let id = 1
const out = []
for (const [cat, items] of Object.entries(cats)) {
  for (const [title, price, photo] of items) {
    const rate = Math.round((3.5 + Math.random() * 1.4) * 10) / 10
    const count = 20 + Math.floor(Math.random() * 200)
    out.push({
      id: id++,
      title,
      price,
      description: `Quality ${title.toLowerCase()} — inspired by the Anon storefront. Comfortable fit and durable materials for everyday use.`,
      category: cat,
      image: `https://images.unsplash.com/${photo}?w=600&q=80&auto=format&fit=crop`,
      rating: { rate, count }
    })
  }
}

const dir = path.join(root, 'public', 'data')
fs.mkdirSync(dir, { recursive: true })
fs.writeFileSync(path.join(dir, 'products.json'), JSON.stringify(out, null, 2))
console.log('Wrote', out.length, 'products to public/data/products.json')
