const { Product, sequelize } = require('../models');

const products = [
  // Electronics
  {
    name: 'iPhone 14 Pro',
    description: 'Latest Apple flagship with A16 Bionic chip, 48MP camera, Dynamic Island. Features stunning ProMotion display, advanced camera system with macro mode, and all-day battery life.',
    price: 129900,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/iphone14/300/300',
    images: [
      'https://picsum.photos/seed/iphone14/300/300',
      'https://picsum.photos/seed/iphone14pro/300/300',
      'https://picsum.photos/seed/iphone14cam/300/300',
      'https://picsum.photos/seed/iphone14color/300/300',
      'https://picsum.photos/seed/iphone14display/300/300'
    ],
    stock: 25,
    rating: 4.7,
    specifications: { 
      brand: 'Apple', 
      ram: '6GB', 
      storage: '128GB',
      display: '6.1" Super Retina XDR',
      camera: '48MP Main',
      battery: 'Up to 26 hours'
    }
  },
  {
    name: 'Samsung Galaxy S23',
    description: 'Flagship Android with Snapdragon 8 Gen 2, 50MP camera, 120Hz display. Exceptional performance with 4nm processor, all-day intelligent battery, and AI-powered features.',
    price: 89999,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/galaxys23/300/300',
    images: [
      'https://picsum.photos/seed/galaxys23/300/300',
      'https://picsum.photos/seed/galaxydesign/300/300',
      'https://picsum.photos/seed/galaxycam/300/300',
      'https://picsum.photos/seed/galaxyai/300/300',
      'https://picsum.photos/seed/galaxyscreen/300/300'
    ],
    stock: 30,
    rating: 4.6,
    specifications: { 
      brand: 'Samsung', 
      ram: '8GB', 
      storage: '256GB',
      processor: 'Snapdragon 8 Gen 2',
      display: '6.1" Dynamic AMOLED',
      camera: 'Triple 50MP'
    }
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Premium noise cancelling headphones with 30-hour battery life. Industry-leading ANC, Multipoint connection, and premium sound quality for immersive listening.',
    price: 29990,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/sonyheadphones/300/300',
    images: [
      'https://picsum.photos/seed/sonyheadphones/300/300',
      'https://picsum.photos/seed/sonydetail/300/300',
      'https://picsum.photos/seed/sonycomfort/300/300',
      'https://picsum.photos/seed/sonysonics/300/300',
      'https://picsum.photos/seed/sonycase/300/300'
    ],
    stock: 50,
    rating: 4.8,
    specifications: { 
      brand: 'Sony', 
      type: 'Over-ear', 
      wireless: 'Yes',
      noise_cancellation: 'Yes',
      battery_life: '30 hours',
      frequency_response: '4Hz - 40kHz'
    }
  },
  {
    name: 'HP Pavilion Laptop',
    description: 'Intel i5 11th Gen, 8GB RAM, 512GB SSD, 15.6" FHD Display. Powerful performance for work and entertainment with sleek design and all-day battery.',
    price: 54990,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/hplaptop/300/300',
    images: [
      'https://picsum.photos/seed/hplaptop/300/300',
      'https://picsum.photos/seed/hpdesign/300/300',
      'https://picsum.photos/seed/hpkeyboard/300/300',
      'https://picsum.photos/seed/hpperformance/300/300',
      'https://picsum.photos/seed/hpdisplay/300/300'
    ],
    stock: 15,
    rating: 4.3,
    specifications: { 
      brand: 'HP', 
      processor: 'Intel i5 11th Gen', 
      ram: '8GB',
      storage: '512GB SSD',
      display: '15.6" FHD',
      graphics: 'Intel Iris Xe'
    }
  },
  {
    name: 'Apple AirPods Pro 2',
    description: 'Active noise cancellation, Spatial audio, MagSafe charging. Premium true wireless earbuds with adaptive transparency and personalized sound.',
    price: 24900,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/airpodspro/300/300',
    images: [
      'https://picsum.photos/seed/airpodspro/300/300',
      'https://picsum.photos/seed/airpodsfit/300/300',
      'https://picsum.photos/seed/airpodscase/300/300',
      'https://picsum.photos/seed/airpodsnc/300/300',
      'https://picsum.photos/seed/airpodssound/300/300'
    ],
    stock: 60,
    rating: 4.9,
    specifications: { 
      brand: 'Apple', 
      type: 'In-ear', 
      wireless: 'Yes',
      noise_cancellation: 'Active',
      battery_per_charge: '6 hours',
      total_battery: '30 hours with case'
    }
  },
  {
    name: 'Dell 27 Gaming Monitor',
    description: '27" QHD 165Hz, 1ms response time, G-Sync compatible. Perfect for gaming and professional work with stunning visuals and smooth performance.',
    price: 32990,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/dellmonitor/300/300',
    images: [
      'https://picsum.photos/seed/dellmonitor/300/300',
      'https://picsum.photos/seed/dellgaming/300/300',
      'https://picsum.photos/seed/dellstand/300/300',
      'https://picsum.photos/seed/dellcolor/300/300',
      'https://picsum.photos/seed/dellconnectivity/300/300'
    ],
    stock: 20,
    rating: 4.5,
    specifications: { 
      brand: 'Dell', 
      size: '27 inch', 
      resolution: 'QHD (2560x1440)',
      refresh_rate: '165Hz',
      response_time: '1ms',
      panel: 'IPS'
    }
  },
  {
    name: 'Logitech MX Master 3S',
    description: 'Wireless mouse with ultra-fast scrolling and ergonomic design. Professional-grade precision with customizable buttons and long battery life.',
    price: 8995,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/logitechmouse/300/300',
    images: [
      'https://picsum.photos/seed/logitechmouse/300/300',
      'https://picsum.photos/seed/logidesign/300/300',
      'https://picsum.photos/seed/logibuttons/300/300',
      'https://picsum.photos/seed/logiergo/300/300',
      'https://picsum.photos/seed/logifeatures/300/300'
    ],
    stock: 45,
    rating: 4.7,
    specifications: { 
      brand: 'Logitech', 
      type: 'Wireless', 
      connectivity: 'Bluetooth & USB',
      dpi: 'Up to 8000',
      battery_life: '70 days',
      buttons: 'Customizable'
    }
  },
  {
    name: 'iPad Air 5th Gen',
    description: '10.9" Liquid Retina display, M1 chip, 256GB. Powerful tablet with stunning screen and performance for creative professionals and everyday users.',
    price: 64900,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/ipadair/300/300',
    images: [
      'https://picsum.photos/seed/ipadair/300/300',
      'https://picsum.photos/seed/ipaddesign/300/300',
      'https://picsum.photos/seed/ipadcamera/300/300',
      'https://picsum.photos/seed/ipadcolors/300/300',
      'https://picsum.photos/seed/ipadscreen/300/300'
    ],
    stock: 22,
    rating: 4.8,
    specifications: { 
      brand: 'Apple', 
      storage: '256GB', 
      screen: '10.9" Liquid Retina',
      chip: 'Apple M1',
      camera: '12MP Front & 12MP Rear',
      battery: 'Up to 10 hours'
    }
  },
  
  // Books
  {
    name: 'The Psychology of Money',
    description: 'Bestselling book on personal finance by Morgan Housel. Learn timeless lessons about managing money, investing wisely, and building long-term wealth.',
    price: 299,
    category: 'Books',
    image: 'https://picsum.photos/seed/psychmoney/300/400',
    images: [
      'https://picsum.photos/seed/psychmoney/300/400',
      'https://picsum.photos/seed/moneycover/300/400',
      'https://picsum.photos/seed/moneyspread/300/400',
      'https://picsum.photos/seed/moneybinding/300/400',
      'https://picsum.photos/seed/moneyback/300/400'
    ],
    stock: 100,
    rating: 4.9,
    specifications: { 
      author: 'Morgan Housel', 
      pages: '256', 
      language: 'English',
      publication: '2020',
      format: 'Hardcover'
    }
  },
  {
    name: 'Atomic Habits',
    description: 'James Clear - Tiny changes, remarkable results. Transform your life through small daily habits that compound over time.',
    price: 399,
    category: 'Books',
    image: 'https://picsum.photos/seed/atomichabits/300/400',
    images: [
      'https://picsum.photos/seed/atomichabits/300/400',
      'https://picsum.photos/seed/habitscover/300/400',
      'https://picsum.photos/seed/habitsinside/300/400',
      'https://picsum.photos/seed/habitsquotes/300/400',
      'https://picsum.photos/seed/habitsframework/300/400'
    ],
    stock: 80,
    rating: 4.8,
    specifications: { 
      author: 'James Clear', 
      pages: '320', 
      language: 'English',
      publication: '2018',
      format: 'Paperback'
    }
  },
  {
    name: 'Rich Dad Poor Dad',
    description: 'Robert Kiyosaki - What the rich teach their kids about money. Essential reading for financial literacy and wealth building.',
    price: 349,
    category: 'Books',
    image: 'https://picsum.photos/seed/richdad/300/400',
    images: [
      'https://picsum.photos/seed/richdad/300/400',
      'https://picsum.photos/seed/richcover/300/400',
      'https://picsum.photos/seed/richlessons/300/400',
      'https://picsum.photos/seed/richinvest/300/400',
      'https://picsum.photos/seed/richback/300/400'
    ],
    stock: 120,
    rating: 4.7,
    specifications: { 
      author: 'Robert Kiyosaki', 
      pages: '336', 
      language: 'English',
      publication: '1997',
      format: 'Hardcover'
    }
  },
  {
    name: 'Think and Grow Rich',
    description: 'Napoleon Hill - Classic on wealth building and success. The legendary principles used by successful people worldwide.',
    price: 199,
    category: 'Books',
    image: 'https://picsum.photos/seed/thinkgrow/300/400',
    images: [
      'https://picsum.photos/seed/thinkgrow/300/400',
      'https://picsum.photos/seed/thinkcover/300/400',
      'https://picsum.photos/seed/thinkprinciples/300/400',
      'https://picsum.photos/seed/thinkwisdom/300/400',
      'https://picsum.photos/seed/thinkback/300/400'
    ],
    stock: 90,
    rating: 4.6,
    specifications: { 
      author: 'Napoleon Hill', 
      pages: '238', 
      language: 'English',
      publication: '1937',
      format: 'Paperback'
    }
  },
  {
    name: 'The Alchemist',
    description: 'Paulo Coelho - International bestseller about following your dreams. A philosophical novel about the power of listening to your heart.',
    price: 250,
    category: 'Books',
    image: 'https://picsum.photos/seed/alchemist/300/400',
    images: [
      'https://picsum.photos/seed/alchemist/300/400',
      'https://picsum.photos/seed/alchemycover/300/400',
      'https://picsum.photos/seed/alchemyjourney/300/400',
      'https://picsum.photos/seed/alchemydream/300/400',
      'https://picsum.photos/seed/alchemyback/300/400'
    ],
    stock: 110,
    rating: 4.8,
    specifications: { 
      author: 'Paulo Coelho', 
      pages: '197', 
      language: 'English',
      publication: '1988',
      format: 'Hardcover'
    }
  },
  {
    name: 'The 5 AM Club',
    description: 'Robin Sharma - Own your morning, elevate your life. A transformation guide using the 5am morning ritual.',
    price: 450,
    category: 'Books',
    image: 'https://picsum.photos/seed/5amclub/300/400',
    images: [
      'https://picsum.photos/seed/5amclub/300/400',
      'https://picsum.photos/seed/5amcover/300/400',
      'https://picsum.photos/seed/5ammorning/300/400',
      'https://picsum.photos/seed/5amroutine/300/400',
      'https://picsum.photos/seed/5amback/300/400'
    ],
    stock: 65,
    rating: 4.5,
    specifications: { 
      author: 'Robin Sharma', 
      pages: '352', 
      language: 'English',
      publication: '2018',
      format: 'Hardcover'
    }
  },
  
  // Fashion
  {
    name: 'Nike Air Max 270',
    description: 'Premium running shoes with Max Air cushioning. Perfect for sports and casual wear with superior comfort and style.',
    price: 8995,
    category: 'Fashion',
    image: 'https://picsum.photos/seed/nikeairmax/300/300',
    images: [
      'https://picsum.photos/seed/nikeairmax/300/300',
      'https://picsum.photos/seed/nikeside/300/300',
      'https://picsum.photos/seed/niketop/300/300',
      'https://picsum.photos/seed/nikecolor/300/300',
      'https://picsum.photos/seed/nikedetail/300/300'
    ],
    stock: 40,
    rating: 4.5,
    specifications: { 
      brand: 'Nike', 
      size: '8-12', 
      type: 'Running',
      material: 'Mesh & Synthetic',
      color: 'Black/Red'
    }
  },
  {
    name: "Levi's 501 Original Jeans",
    description: 'Classic straight fit jeans, iconic style. Timeless denim that never goes out of fashion.',
    price: 3499,
    category: 'Fashion',
    image: 'https://picsum.photos/seed/levisjeans/300/300',
    images: [
      'https://picsum.photos/seed/levisjeans/300/300',
      'https://picsum.photos/seed/levifront/300/300',
      'https://picsum.photos/seed/leviback/300/300',
      'https://picsum.photos/seed/levidetail/300/300',
      'https://picsum.photos/seed/levifit/300/300'
    ],
    stock: 60,
    rating: 4.4,
    specifications: { 
      brand: 'Levis', 
      fit: 'Straight', 
      material: 'Denim',
      color: 'Classic Blue',
      sizes: '28-38'
    }
  },
  {
    name: 'Adidas Ultraboost 22',
    description: 'Energy-returning running shoes with BOOST cushioning. Advanced comfort technology for serious athletes.',
    price: 12999,
    category: 'Fashion',
    image: 'https://picsum.photos/seed/adidasboost/300/300',
    images: [
      'https://picsum.photos/seed/adidasboost/300/300',
      'https://picsum.photos/seed/adidasprofile/300/300',
      'https://picsum.photos/seed/adidassole/300/300',
      'https://picsum.photos/seed/adidastech/300/300',
      'https://picsum.photos/seed/adidasperform/300/300'
    ],
    stock: 35,
    rating: 4.6,
    specifications: { 
      brand: 'Adidas', 
      size: '7-13', 
      type: 'Running',
      technology: 'BOOST Cushioning',
      color: 'White/Black'
    }
  },
  {
    name: 'Ray-Ban Aviator Sunglasses',
    description: 'Classic metal frame sunglasses with UV protection. Timeless style worn by celebrities and professionals.',
    price: 6999,
    category: 'Fashion',
    image: 'https://picsum.photos/seed/rayban/300/300',
    images: [
      'https://picsum.photos/seed/rayban/300/300',
      'https://picsum.photos/seed/raybandirect/300/300',
      'https://picsum.photos/seed/raybanlens/300/300',
      'https://picsum.photos/seed/raybanframe/300/300',
      'https://picsum.photos/seed/raybancase/300/300'
    ],
    stock: 75,
    rating: 4.7,
    specifications: { 
      brand: 'Ray-Ban', 
      type: 'Aviator', 
      uvProtection: 'Yes',
      lens: 'Polarized',
      material: 'Metal Frame'
    }
  },
  {
    name: 'Tommy Hilfiger Polo T-Shirt',
    description: 'Classic fit polo with embroidered logo. Premium quality for casual or semi-formal occasions.',
    price: 2499,
    category: 'Fashion',
    image: 'https://picsum.photos/seed/tommypolo/300/300',
    images: [
      'https://picsum.photos/seed/tommypolo/300/300',
      'https://picsum.photos/seed/tommyfront/300/300',
      'https://picsum.photos/seed/tommyback/300/300',
      'https://picsum.photos/seed/tommylogo/300/300',
      'https://picsum.photos/seed/tommyfit/300/300'
    ],
    stock: 85,
    rating: 4.3,
    specifications: { 
      brand: 'Tommy Hilfiger', 
      fit: 'Classic', 
      material: 'Cotton',
      color: 'Navy Blue',
      sizes: 'XS-XXL'
    }
  },
  {
    name: 'Puma Sneakers',
    description: 'Casual lifestyle sneakers with cushioned sole. Comfortable for everyday wear and light sports.',
    price: 4999,
    category: 'Fashion',
    image: 'https://picsum.photos/seed/pumasneakers/300/300',
    images: [
      'https://picsum.photos/seed/pumasneakers/300/300',
      'https://picsum.photos/seed/pumaside/300/300',
      'https://picsum.photos/seed/pumahigh/300/300',
      'https://picsum.photos/seed/pumabottom/300/300',
      'https://picsum.photos/seed/pumacomfort/300/300'
    ],
    stock: 55,
    rating: 4.4,
    specifications: { 
      brand: 'Puma', 
      size: '7-12', 
      type: 'Casual',
      material: 'Synthetic',
      color: 'White/Black'
    }
  },
  
  // Home
  {
    name: 'Amazon Echo Dot 5th Gen',
    description: 'Smart speaker with Alexa voice control. Control smart devices, play music, get news and weather updates.',
    price: 4499,
    category: 'Home',
    image: 'https://picsum.photos/seed/echodot/300/300',
    images: [
      'https://picsum.photos/seed/echodot/300/300',
      'https://picsum.photos/seed/echodesign/300/300',
      'https://picsum.photos/seed/echospeaker/300/300',
      'https://picsum.photos/seed/echodisplay/300/300',
      'https://picsum.photos/seed/echodemonstration/300/300'
    ],
    stock: 100,
    rating: 4.6,
    specifications: { 
      brand: 'Amazon', 
      voice: 'Alexa', 
      connectivity: 'WiFi',
      speaker: 'Built-in',
      color: 'Charcoal Black'
    }
  },
  {
    name: 'Philips Air Fryer',
    description: '4.1L digital air fryer with rapid air technology. Cook healthier meals with 80% less fat.',
    price: 9999,
    category: 'Home',
    image: 'https://picsum.photos/seed/airfryer/300/300',
    images: [
      'https://picsum.photos/seed/airfryer/300/300',
      'https://picsum.photos/seed/airfryerfront/300/300',
      'https://picsum.photos/seed/airfryer basket/300/300',
      'https://picsum.photos/seed/airfryer display/300/300',
      'https://picsum.photos/seed/airfryer food/300/300'
    ],
    stock: 30,
    rating: 4.5,
    specifications: { 
      brand: 'Philips', 
      capacity: '4.1L', 
      power: '1400W',
      features: 'Digital Display',
      color: 'Black'
    }
  },
  {
    name: 'Dyson V11 Vacuum Cleaner',
    description: 'Cordless vacuum with powerful suction and LCD screen. Intelligent cleaning with up to 60 minutes runtime.',
    price: 42990,
    category: 'Home',
    image: 'https://picsum.photos/seed/dysonvacuum/300/300',
    images: [
      'https://picsum.photos/seed/dysonvacuum/300/300',
      'https://picsum.photos/seed/dysonatts/300/300',
      'https://picsum.photos/seed/dysonbattery/300/300',
      'https://picsum.photos/seed/dysonfilter/300/300',
      'https://picsum.photos/seed/dysontech/300/300'
    ],
    stock: 18,
    rating: 4.8,
    specifications: { 
      brand: 'Dyson', 
      type: 'Cordless', 
      battery: '60min',
      weight: '2.45kg',
      color: 'Nickel'
    }
  },
  {
    name: 'Instant Pot Duo Plus',
    description: '6L 9-in-1 electric pressure cooker. Pressure cook, slow cook, sauté, sterilize and more.',
    price: 7999,
    category: 'Home',
    image: 'https://picsum.photos/seed/instantpot/300/300',
    images: [
      'https://picsum.photos/seed/instantpot/300/300',
      'https://picsum.photos/seed/instantpotfront/300/300',
      'https://picsum.photos/seed/instantpotdisplay/300/300',
      'https://picsum.photos/seed/instantpotinside/300/300',
      'https://picsum.photos/seed/instantpotmeals/300/300'
    ],
    stock: 40,
    rating: 4.7,
    specifications: { 
      brand: 'Instant Pot', 
      capacity: '6L', 
      functions: '9',
      pressure: '10-11 PSI',
      color: 'Stainless Steel'
    }
  },
  {
    name: 'IKEA Study Desk',
    description: 'Modern minimalist desk with cable management. Perfect workspace solution for home or office.',
    price: 5999,
    category: 'Home',
    image: 'https://picsum.photos/seed/ikeadesk/300/300',
    images: [
      'https://picsum.photos/seed/ikeadesk/300/300',
      'https://picsum.photos/seed/ikeafront/300/300',
      'https://picsum.photos/seed/ikeadetail/300/300',
      'https://picsum.photos/seed/ikeaassembly/300/300',
      'https://picsum.photos/seed/ikeacompletev/300/300'
    ],
    stock: 25,
    rating: 4.4,
    specifications: { 
      brand: 'IKEA', 
      material: 'Wood', 
      size: '120x60cm',
      color: 'Natural',
      assembly_time: '30 mins'
    }
  },
  
  // Beauty
  {
    name: 'Lakme Absolute Gel Eye Liner',
    description: 'Long-lasting gel eyeliner with precision tip. Waterproof formula for all-day wear.',
    price: 449,
    category: 'Beauty',
    image: 'https://picsum.photos/seed/lakmeeyeliner/300/300',
    images: [
      'https://picsum.photos/seed/lakmeeyeliner/300/300',
      'https://picsum.photos/seed/lakmebottle/300/300',
      'https://picsum.photos/seed/lakmebrush/300/300',
      'https://picsum.photos/seed/lakmeswatch/300/300',
      'https://picsum.photos/seed/lakmeapplication/300/300'
    ],
    stock: 150,
    rating: 4.5,
    specifications: { 
      brand: 'Lakme', 
      type: 'Gel', 
      shade: 'Black',
      size: '4g',
      waterproof: 'Yes'
    }
  },
  {
    name: 'MAC Fix+',
    description: 'Essential makeup setting spray for all day wear. Professional makeup artists choice.',
    price: 2499,
    category: 'Beauty',
    image: 'https://picsum.photos/seed/macfix/300/300',
    images: [
      'https://picsum.photos/seed/macfix/300/300',
      'https://picsum.photos/seed/macbottle/300/300',
      'https://picsum.photos/seed/macspray/300/300',
      'https://picsum.photos/seed/macbefore/300/300',
      'https://picsum.photos/seed/macafter/300/300'
    ],
    stock: 80,
    rating: 4.7,
    specifications: { 
      brand: 'MAC', 
      size: '100ml', 
      type: 'Setting Spray',
      formula: 'Oil-free',
      benefits: 'All-day wear'
    }
  },
  {
    name: 'Maybelline SuperStay Lip Color',
    description: '24H wear lipstick with matte finish. Long-wearing formula that doesnt dry lips.',
    price: 399,
    category: 'Beauty',
    image: 'https://picsum.photos/seed/maybelline/300/300',
    images: [
      'https://picsum.photos/seed/maybelline/300/300',
      'https://picsum.photos/seed/maybellinelip/300/300',
      'https://picsum.photos/seed/maybellinecolor/300/300',
      'https://picsum.photos/seed/maybellinefinish/300/300',
      'https://picsum.photos/seed/maybellineapply/300/300'
    ],
    stock: 120,
    rating: 4.4,
    specifications: { 
      brand: 'Maybelline', 
      shade: 'Red', 
      finish: 'Matte',
      size: '3.9g',
      wear_time: '24H'
    }
  },
  {
    name: 'Neutrogena Face Moisturizer',
    description: 'Oil-free moisturizer for sensitive skin. Lightweight formula that absorbs quickly.',
    price: 599,
    category: 'Beauty',
    image: 'https://picsum.photos/seed/neutrogena/300/300',
    images: [
      'https://picsum.photos/seed/neutrogena/300/300',
      'https://picsum.photos/seed/neutrogenajar/300/300',
      'https://picsum.photos/seed/neutrogenatext/300/300',
      'https://picsum.photos/seed/neutrogenetexture/300/300',
      'https://picsum.photos/seed/neutrogeneresults/300/300'
    ],
    stock: 200,
    rating: 4.6,
    specifications: { 
      brand: 'Neutrogena', 
      size: '88ml', 
      type: 'Moisturizer',
      skin_type: 'Sensitive',
      spf: 'None'
    }
  },
  {
    name: 'L\'Oreal Paris Hair Serum',
    description: 'Keratin enriched hair serum for smooth shiny hair. Professional salon quality at home.',
    price: 649,
    category: 'Beauty',
    image: 'https://picsum.photos/seed/lorealhairserum/300/300',
    images: [
      'https://picsum.photos/seed/lorealhairserum/300/300',
      'https://picsum.photos/seed/lorealebottle/300/300',
      'https://picsum.photos/seed/lorealhair/300/300',
      'https://picsum.photos/seed/lorealtexture/300/300',
      'https://picsum.photos/seed/lorealbefore/300/300'
    ],
    stock: 110,
    rating: 4.5,
    specifications: { 
      brand: 'LOreal', 
      size: '100ml', 
      type: 'Hair Serum',
      key_ingredient: 'Keratin',
      benefits: 'Shine & Smoothness'
    }
  },
  
  // Toys
  {
    name: 'LEGO Classic Creative Box',
    description: '900 piece LEGO bricks set with creative ideas. Endless building possibilities for all ages.',
    price: 2999,
    category: 'Toys',
    image: 'https://picsum.photos/seed/legoclassic/300/300',
    images: [
      'https://picsum.photos/seed/legoclassic/300/300',
      'https://picsum.photos/seed/legobox/300/300',
      'https://picsum.photos/seed/legobricks/300/300',
      'https://picsum.photos/seed/legoideas/300/300',
      'https://picsum.photos/seed/legobuild/300/300'
    ],
    stock: 50,
    rating: 4.8,
    specifications: { 
      brand: 'LEGO', 
      pieces: '900', 
      age: '4+',
      included: 'Ideas Guide',
      material: 'Plastic'
    }
  },
  {
    name: 'Hot Wheels Car Collection Set',
    description: '20 piece assorted car collection with track. Perfect for racing and endless fun.',
    price: 1999,
    category: 'Toys',
    image: 'https://picsum.photos/seed/hotwheels/300/300',
    images: [
      'https://picsum.photos/seed/hotwheels/300/300',
      'https://picsum.photos/seed/hotwheelstrack/300/300',
      'https://picsum.photos/seed/hotwheelscars/300/300',
      'https://picsum.photos/seed/hotwheelsset/300/300',
      'https://picsum.photos/seed/hotwheelsrace/300/300'
    ],
    stock: 80,
    rating: 4.4,
    specifications: { 
      brand: 'Hot Wheels', 
      cars: '20', 
      age: '3+',
      includes: 'Track',
      material: 'Diecast Metal'
    }
  },
  {
    name: 'Barbie Fashion Doll',
    description: 'Classic Barbie doll with fashionable outfit and accessories. Iconic fashion doll.',
    price: 1499,
    category: 'Toys',
    image: 'https://picsum.photos/seed/barbie/300/300',
    images: [
      'https://picsum.photos/seed/barbie/300/300',
      'https://picsum.photos/seed/barbiefull/300/300',
      'https://picsum.photos/seed/barbiedress/300/300',
      'https://picsum.photos/seed/barbiedetail/300/300',
      'https://picsum.photos/seed/barbieaccessories/300/300'
    ],
    stock: 60,
    rating: 4.6,
    specifications: { 
      brand: 'Barbie', 
      doll: 'Fashion', 
      age: '3+',
      height: '11.5 inches',
      includes: 'Outfit & Accessories'
    }
  },
  {
    name: 'Nerf Ultra One Blaster',
    description: 'Elite foam blaster with motorized action. Safe and fun for indoor outdoor play.',
    price: 2499,
    category: 'Toys',
    image: 'https://picsum.photos/seed/nerfblaster/300/300',
    images: [
      'https://picsum.photos/seed/nerfblaster/300/300',
      'https://picsum.photos/seed/nerfdesign/300/300',
      'https://picsum.photos/seed/nerfaction/300/300',
      'https://picsum.photos/seed/nerfammo/300/300',
      'https://picsum.photos/seed/nerfplay/300/300'
    ],
    stock: 45,
    rating: 4.7,
    specifications: { 
      brand: 'Nerf', 
      type: 'Blaster', 
      age: '8+',
      motor: 'Motorized',
      includes: 'Foam Darts'
    }
  },
  {
    name: 'Rubik\'s Cube Speed',
    description: '3x3 professional speed cube with smooth rotation. Perfect for speed cubing enthusiasts.',
    price: 799,
    category: 'Toys',
    image: 'https://picsum.photos/seed/rubikscube/300/300',
    images: [
      'https://picsum.photos/seed/rubikscube/300/300',
      'https://picsum.photos/seed/rubikscubed/300/300',
      'https://picsum.photos/seed/rubiksmove/300/300',
      'https://picsum.photos/seed/rubikssolve/300/300',
      'https://picsum.photos/seed/rubikssticker/300/300'
    ],
    stock: 100,
    rating: 4.5,
    specifications: { 
      brand: 'Rubiks', 
      size: '3x3', 
      type: 'Speed Cube',
      material: 'Plastic',
      age: '8+'
    }
  }
];

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced - All tables created');
    
    await Product.bulkCreate(products);
    console.log(`✅ ${products.length} products seeded successfully`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
