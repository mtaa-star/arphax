export const products = [
  { id: 1, name: 'HP EliteBook 840 G8', category: 'Laptops', brand: 'HP', price: 85000, specs: 'Core i7 · 16GB RAM · 512GB SSD', status: 'In Stock', featured: true, description: 'Business-grade laptop with military-grade durability, stunning display, and all-day battery life. Perfect for professionals.' },
  { id: 2, name: 'Dell Latitude 5420', category: 'Laptops', brand: 'Dell', price: 62000, specs: 'Core i5 · 8GB RAM · 256GB SSD', status: 'In Stock', featured: true, description: 'Reliable workhorse with enterprise security features and comfortable keyboard for long work sessions.' },
  { id: 3, name: 'Lenovo ThinkPad X1 Carbon', category: 'Laptops', brand: 'Lenovo', price: 110000, specs: 'Core i7 · 16GB RAM · 1TB SSD', status: 'In Stock', featured: true, description: 'Ultralight carbon-fiber chassis with legendary ThinkPad keyboard and exceptional performance.' },
  { id: 4, name: 'Asus VivoBook 15', category: 'Laptops', brand: 'Asus', price: 48000, specs: 'Ryzen 5 · 8GB RAM · 512GB SSD', status: 'In Stock', featured: false, description: 'Slim and stylish everyday laptop with vibrant display and fast AMD processor.' },
  { id: 5, name: 'Acer Aspire 7', category: 'Laptops', brand: 'Acer', price: 55000, specs: 'Core i5 · 8GB RAM · 512GB SSD', status: 'Limited', featured: false, description: 'Gaming-capable laptop with dedicated GPU and fast refresh rate display.' },
  { id: 6, name: 'Apple MacBook Air M2', category: 'Laptops', brand: 'Apple', price: 145000, specs: 'M2 Chip · 8GB · 256GB SSD', status: 'In Stock', featured: true, description: 'Fanless design with incredible M2 performance and 18-hour battery life.' },
  { id: 7, name: 'Samsung Galaxy A55', category: 'Mobile Devices', brand: 'Samsung', price: 42000, specs: '8GB RAM · 256GB · 50MP Camera', status: 'In Stock', featured: true, description: 'Premium mid-range phone with IP67 rating, bright AMOLED display and versatile camera system.' },
  { id: 8, name: 'iPhone 14', category: 'Mobile Devices', brand: 'Apple', price: 115000, specs: '6GB RAM · 128GB · A15 Bionic', status: 'In Stock', featured: true, description: 'Powerful iPhone with Ceramic Shield, cinematic video mode, and all-day battery.' },
  { id: 9, name: 'Xiaomi Redmi Note 13 Pro', category: 'Mobile Devices', brand: 'Xiaomi', price: 32000, specs: '12GB RAM · 256GB · 200MP', status: 'In Stock', featured: false, description: 'Budget powerhouse with 200MP camera and 67W turbo charging.' },
  { id: 10, name: 'Tecno Camon 30 Pro', category: 'Mobile Devices', brand: 'Tecno', price: 25000, specs: '8GB RAM · 256GB · 50MP', status: 'In Stock', featured: false, description: 'Africa-first smartphone designed for local conditions with great camera performance.' },
  { id: 11, name: 'Infinix Note 40 Pro', category: 'Mobile Devices', brand: 'Infinix', price: 28500, specs: '8GB RAM · 256GB · 108MP', status: 'In Stock', featured: true, description: 'Feature-packed device with 100W all-round fast charging and MagSafe support.' },
  { id: 12, name: 'Oppo Reno 11 F', category: 'Mobile Devices', brand: 'Oppo', price: 38000, specs: '8GB RAM · 256GB · AMOLED', status: 'Limited', featured: false, description: 'Sleek design with ColorOS 14, great portrait photography and fast charging.' },
  { id: 13, name: 'Laptop Charger Universal', category: 'Accessories', brand: 'Generic', price: 1500, specs: '65W · USB-C · Multi-tip', status: 'In Stock', featured: false, description: 'Universal laptop charger compatible with most brands.' },
  { id: 14, name: 'Wireless Earbuds', category: 'Accessories', brand: 'Generic', price: 2500, specs: 'Bluetooth 5.3 · 30hr Battery', status: 'In Stock', featured: false, description: 'Crystal clear audio with active noise cancellation.' },
  { id: 15, name: 'Mechanical Keyboard', category: 'Accessories', brand: 'Generic', price: 4500, specs: 'TKL · RGB · Brown Switches', status: 'In Stock', featured: false, description: 'Tactile typing experience with customizable RGB backlighting.' },
  { id: 16, name: 'Power Bank 20000mAh', category: 'Accessories', brand: 'Generic', price: 3500, specs: '20000mAh · 65W PD · 3 ports', status: 'In Stock', featured: false, description: 'Charge your laptop and phone simultaneously at full speed.' },
]

export const categories = ['All', 'Laptops', 'Mobile Devices', 'Accessories']
export const brands = { Laptops: ['HP','Dell','Lenovo','Asus','Acer','Apple'], 'Mobile Devices': ['Samsung','Apple','Xiaomi','Tecno','Infinix','Oppo'], Accessories: [] }

export const blogPosts = [
  { id: 1, title: 'Best Laptops for Students Under KES 60,000 in 2025', category: 'Buying Guides', date: 'June 5, 2025', excerpt: 'We tested over 12 laptops to find the best value for Kenyan students. Here are our top picks that balance performance, battery, and build quality.', readTime: '6 min read' },
  { id: 2, title: 'Infinix Note 40 Pro Full Review: MagSafe in Kenya?', category: 'Smartphone Reviews', date: 'May 28, 2025', excerpt: 'Infinix brings wireless charging and 100W wired charging to the budget segment. We put it through its paces over two weeks of daily use.', readTime: '8 min read' },
  { id: 3, title: '5 Signs Your Laptop Battery Needs Replacing Now', category: 'Repair Tips', date: 'May 15, 2025', excerpt: 'Don\'t wait until your laptop dies mid-presentation. These five warning signs tell you it\'s time to visit ArphaxTech for a battery replacement.', readTime: '4 min read' },
  { id: 4, title: 'Samsung Galaxy A55 vs A54: What Actually Changed?', category: 'Product Comparisons', date: 'May 10, 2025', excerpt: 'Samsung\'s mid-range king gets a refresh. We compare both devices to tell you if the upgrade is worth it for Kenyan buyers.', readTime: '7 min read' },
  { id: 5, title: 'How to Protect Your Laptop Screen from Cracking', category: 'Repair Tips', date: 'April 30, 2025', excerpt: 'Screen repairs are our most requested service. Learn the common causes and how a KES 200 sleeve could save you KES 15,000.', readTime: '3 min read' },
  { id: 6, title: 'The Best Tech Accessories Under KES 5,000 in Mombasa', category: 'Buying Guides', date: 'April 20, 2025', excerpt: 'From power banks to keyboards, we round up the best accessories available at ArphaxTech that won\'t break the bank.', readTime: '5 min read' },
]

export const testimonials = [
  { name: 'James Mwangi', role: 'Student, Technical University of Mombasa', text: 'Got my laptop screen replaced in under 3 hours. The technician explained everything clearly and the price was very fair. Highly recommend ArphaxTech!' },
  { name: 'Amina Hassan', role: 'Freelance Graphic Designer', text: 'Bought my Dell laptop here and the after-sales support has been amazing. They even helped me upgrade the RAM months later. True professionals.' },
  { name: 'Peter Odhiambo', role: 'Small Business Owner', text: 'Bought phones for my entire team from ArphaxTech. Great deals, genuine products, and they set everything up for us. Will definitely be back.' },
]

export const repairServices = [
  { name: 'Screen Replacement', devices: 'Phones & Laptops', from: 2500 },
  { name: 'Battery Replacement', devices: 'Phones & Laptops', from: 1800 },
  { name: 'Software & Virus Removal', devices: 'Laptops & PCs', from: 1000 },
  { name: 'Keyboard Replacement', devices: 'Laptops', from: 3500 },
  { name: 'Charging Port Repair', devices: 'Phones', from: 1200 },
  { name: 'Data Recovery', devices: 'All Devices', from: 2000 },
  { name: 'RAM / Storage Upgrade', devices: 'Laptops', from: 500 },
  { name: 'Motherboard Repair', devices: 'Laptops & PCs', from: 4000 },
]
