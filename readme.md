Here's a concise **Project Workflow Explanation** for your README, focusing purely on how the system operates:

---

# **Apple Quality Classifier: Workflow** 🔄

## **1. Seller Uploads Product** 📤
- **Frontend** sends:
  ```http
  POST /api/seller/product
  Content-Type: multipart/form-data

  Fields:
  - sellerName, productName, productId
  - price, description, quantity
  - productImage (JPEG/PNG)
  ```

## **2. Node.js Backend Processing** ⚙️
1. **Stores image** locally (`/uploads/`)
2. **Forwards image** to Kaggle API:
   ```javascript
   axios.post('NGROK_URL/classify', formData)
   ```
3. **Awaits classification** response:
   ```json
   {
     "prediction": "good|bad|mixed",
     "confidence": 0.92,
     "status": "success"
   }
   ```

## **3. Kaggle AI Classification** 🤖
- **Flask API** (`app.py`):
  1. Receives image via Ngrok tunnel
  2. Preprocesses image (resize to 240x240, RGB conversion)
  3. Runs TensorFlow model prediction
  4. Returns quality verdict

## **4. MongoDB Storage** 💾
Node.js creates a document:
```javascript
{
  sellerName: "Organic Farms",
  productName: "Honeycrisp Apples",
  productImage: "/uploads/apple_123.jpg",
  quality: {
    prediction: "good",  // From Kaggle API
    confidence: 0.92    // 92% confidence
  }
}
```

## **5. Response to Seller** 📩
Final API response:
```json
{
  "message": "Product added",
  "quality": {
    "prediction": "good",
    "confidence": 0.92
  }
}
```

---

## **Key Data Flow** →  
**Frontend** → **Node.js** → **Kaggle (Python+TF)** → **MongoDB** → **Frontend**

---

## **Error Handling** ❌
| Scenario | Action |
|----------|--------|
| Invalid image | Returns `400 Bad Request` |
| Kaggle API down | Retries ×3 then `503 Service Unavailable` |
| DB write failure | Rolls back image upload |

---

## **Critical Dependencies** ⛓️
1. **Ngrok Tunnel**: Must stay active for Kaggle-Python API access
2. **Model Consistency**: Same preprocessing (`240x240 RGB`) in training and inference
3. **File Cleanup**: Temporary images deleted after classification

---

