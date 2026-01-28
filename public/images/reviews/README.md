# Customer Review Screenshots

This folder should contain mobile screenshots of customer reviews from WhatsApp, Instagram, Facebook, and other platforms.

## How to Add Screenshots

1. **Name your files:** `screenshot1.jpg`, `screenshot2.jpg`, `screenshot3.jpg`, etc.
2. **Recommended format:** JPG or PNG
3. **Recommended size:** Mobile phone screenshot dimensions (e.g., 1080x1920 pixels)
4. **Optimize images:** Use tools like TinyPNG or ImageOptim to reduce file sizes while maintaining quality

## Screenshot Guidelines

### What to Include
- Customer messages/reviews from WhatsApp
- Instagram story screenshots with reviews
- Facebook review screenshots
- Direct messages praising your products
- Before/after photos shared by customers (with permission)
- Unboxing videos screenshots
- Video testimonial screenshots

### Best Practices
- Always get customer permission before using their images
- Blur or hide sensitive information (phone numbers, addresses)
- Use high-quality, clear screenshots
- Ensure text is readable
- Show genuine, authentic reviews
- Include diverse customer feedback

### Image Specifications
- **Format:** JPG or PNG
- **Dimensions:** 1080x1920px (mobile portrait) or similar
- **File size:** Keep under 500KB per image for optimal loading
- **Quality:** High enough to read text clearly

## Current Placeholder Images

The current implementation uses placeholder images that will display:
- Review number (e.g., "Review #1")
- Customer name
- Product information

Replace these with actual customer screenshots for production.

## Example File Structure

```
/public/images/reviews/
├── screenshot1.jpg   (WhatsApp review from Priya Sharma)
├── screenshot2.jpg   (WhatsApp review from Rajesh Kumar)
├── screenshot3.jpg   (Instagram review from Anjali Mehta)
├── screenshot4.jpg   (WhatsApp review from Vikram Singh)
├── screenshot5.jpg   (Facebook review from Neha Gupta)
├── screenshot6.jpg   (WhatsApp review from Amit Patel)
├── screenshot7.jpg   (Instagram review from Kavita Reddy)
├── screenshot8.jpg   (WhatsApp review from Sanjay Verma)
├── screenshot9.jpg   (Facebook review from Pooja Joshi)
├── screenshot10.jpg  (WhatsApp review from Rahul Desai)
├── screenshot11.jpg  (Instagram review from Sneha Kapoor)
├── screenshot12.jpg  (WhatsApp review from Arjun Nair)
└── README.md
```

## Updating Review Data

To update customer names, ratings, and other metadata, edit the `reviewScreenshots` array in:
```
src/pages/ReviewsPage.js
```

Each review object contains:
- `id`: Unique identifier
- `image`: Path to screenshot image
- `customer`: Customer name
- `rating`: Star rating (1-5)
- `product`: Product name
- `category`: Platform type (whatsapp, instagram, facebook)
- `date`: Review date

## Privacy Note

Always respect customer privacy. Never share:
- Personal phone numbers
- Full addresses
- Email addresses
- Payment information
- Any sensitive personal data

Get written consent from customers before featuring their reviews publicly.




This folder should contain mobile screenshots of customer reviews from WhatsApp, Instagram, Facebook, and other platforms.

## How to Add Screenshots

1. **Name your files:** `screenshot1.jpg`, `screenshot2.jpg`, `screenshot3.jpg`, etc.
2. **Recommended format:** JPG or PNG
3. **Recommended size:** Mobile phone screenshot dimensions (e.g., 1080x1920 pixels)
4. **Optimize images:** Use tools like TinyPNG or ImageOptim to reduce file sizes while maintaining quality

## Screenshot Guidelines

### What to Include
- Customer messages/reviews from WhatsApp
- Instagram story screenshots with reviews
- Facebook review screenshots
- Direct messages praising your products
- Before/after photos shared by customers (with permission)
- Unboxing videos screenshots
- Video testimonial screenshots

### Best Practices
- Always get customer permission before using their images
- Blur or hide sensitive information (phone numbers, addresses)
- Use high-quality, clear screenshots
- Ensure text is readable
- Show genuine, authentic reviews
- Include diverse customer feedback

### Image Specifications
- **Format:** JPG or PNG
- **Dimensions:** 1080x1920px (mobile portrait) or similar
- **File size:** Keep under 500KB per image for optimal loading
- **Quality:** High enough to read text clearly

## Current Placeholder Images

The current implementation uses placeholder images that will display:
- Review number (e.g., "Review #1")
- Customer name
- Product information

Replace these with actual customer screenshots for production.

## Example File Structure

```
/public/images/reviews/
├── screenshot1.jpg   (WhatsApp review from Priya Sharma)
├── screenshot2.jpg   (WhatsApp review from Rajesh Kumar)
├── screenshot3.jpg   (Instagram review from Anjali Mehta)
├── screenshot4.jpg   (WhatsApp review from Vikram Singh)
├── screenshot5.jpg   (Facebook review from Neha Gupta)
├── screenshot6.jpg   (WhatsApp review from Amit Patel)
├── screenshot7.jpg   (Instagram review from Kavita Reddy)
├── screenshot8.jpg   (WhatsApp review from Sanjay Verma)
├── screenshot9.jpg   (Facebook review from Pooja Joshi)
├── screenshot10.jpg  (WhatsApp review from Rahul Desai)
├── screenshot11.jpg  (Instagram review from Sneha Kapoor)
├── screenshot12.jpg  (WhatsApp review from Arjun Nair)
└── README.md
```

## Updating Review Data

To update customer names, ratings, and other metadata, edit the `reviewScreenshots` array in:
```
src/pages/ReviewsPage.js
```

Each review object contains:
- `id`: Unique identifier
- `image`: Path to screenshot image
- `customer`: Customer name
- `rating`: Star rating (1-5)
- `product`: Product name
- `category`: Platform type (whatsapp, instagram, facebook)
- `date`: Review date

## Privacy Note

Always respect customer privacy. Never share:
- Personal phone numbers
- Full addresses
- Email addresses
- Payment information
- Any sensitive personal data

Get written consent from customers before featuring their reviews publicly.



