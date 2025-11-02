# AI Care Plan Microservice

This folder contains the FastAPI microservice for generating AI-powered fall-prevention care plans using OpenRouter LLMs.

---

## Features

- Receives patient info and assessment data via REST API
- Calls OpenRouter AI model to generate personalized care plans
- Returns actionable recommendations and rationale in JSON format

---

## Setup Instructions

### 1. **Clone the Repository**

If you haven't already, clone the main project repo and navigate to the `AI` folder:

```sh
cd 2025-wellTechThree/AI
```

---

### 2. **Python Environment**

It is recommended to use a virtual environment:

```sh
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```

---

### 3. **Install Dependencies**

Install required Python packages:

```sh
pip install fastapi httpx python-dotenv pydantic uvicorn
```

---

### 4. **Configure Environment Variables**

Copy `.env.example` to `.env` (if not already present) and fill in your OpenRouter API key:

```sh
cp .env.example .env
```

Edit `.env` and set:

```
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MODEL_ID=gpt-5-chat
```

- You can get your API key from [https://openrouter.ai/](https://openrouter.ai/) (sign up and generate a key).
- `MODEL_ID` is optional; defaults to `gpt-5-chat`.

---

### 5. **Run the FastAPI Server**

Start the service with:

```sh
run this:
uvicorn ai_careplan:app --reload --host 0.0.0.0 --port 8000

# uvicorn ai_careplan:app --reload
```

- The API will be available at: [http://localhost:8000/api/ai-careplan](http://localhost:8000/api/ai-careplan)

---

### 6. **CORS Support**

CORS is enabled by default for all origins, so you can call this API from your frontend running on a different port (e.g., React on `localhost:3000`).

---

### 7. **API Usage**

**Endpoint:**  
`POST /api/ai-careplan`

**Payload Example:**

```json
{
  "patient_info": {
    "id": "123456",
    "name": "Jane Doe",
    "birthDate": "1950-01-01",
    "gender": "female",
    "hospital_id": "UR001",
    "medical_history": ["Hypertension"],
    "medications": ["Amlodipine"],
    "observations": ["AMTS: 9/10"],
    "amts_score": 9,
    "immunizations": ["Influenza vaccine on 2025-04-03"]
  },
  "assessment": {
    "part1": { ... },
    "part2": { ... }
  },
  "risk_level": "HIGH",
  "risk_score": 18
}
```

**Response Example:**

```json
{
  "risk_level": "HIGH",
  "care_plan": [
    "Review medications for fall risk.",
    "Increase supervision.",
    "Refer to physiotherapy."
  ],
  "rationale": "Patient has multiple risk factors including recent falls and high-risk medications."
}
```

---

### 8. **Troubleshooting**

- **401 Unauthorized:** Check your API key in `.env` and ensure it is valid.
- **CORS errors:** Make sure the FastAPI server is running and CORS middleware is enabled.
- **Model errors:** Ensure your OpenRouter account has access to the specified model.

---

### 9. **Development Notes**

- You can modify `ai_careplan.py` to change the prompt or response formatting.
- Static files can be served from the `/static` directory if needed.

---

## Questions?

If you have issues, check your `.env` settings, Python dependencies, and FastAPI logs for error details.

---
