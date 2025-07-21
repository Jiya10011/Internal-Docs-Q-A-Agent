# Internal-Docs-Q-A-Agent
Internal Docs Q&amp;A Agent – An AI-powered tool to query your internal documentation using natural language. Built with LangChain, HuggingFace, FAISS, Flask, and React. Upload your PDFs, ask questions, and get instant, intelligent answers.

## ✨ Features

✅ Ask natural language questions about internal docs
<br>
✅ Fetches relevant answers using vector similarity
<br>
✅ Uses HuggingFace’s flan-t5-base for answer generation
<br>
✅ Lightweight and easy to self-host
<br>
✅ Built-in Bootstrap for a clean and responsive UI
<br>
✅ Modular backend with document embedding and FAISS indexing

## ✅ Correct Full Project Structure
<br>
INTERNAL-DOCS-QA/                     ← Root directory
│
├── docs/                             ← Input documents
│   ├── company-instructions.txt
│   └── leave-policy.txt
│
├── faiss_index/                      ← FAISS vector store (auto-generated)
│   ├── index.faiss
│   └── index.pkl
│
├── internal_docs.txt                 ← Merged text file for indexing
│
├── app.py                            ← Flask backend API
├── build_index.py                    ← [Optional] Script to create internal_docs.txt
├── build_vectorstore.py              ← [Optional] FAISS index builder
├── generate_vectorstore.py           ← Final script: build + save vector index
├── index_docs.py                     ← Used by LangChain for document processing
│
├── .env                              ← For any environment variables (optional)
├── .gitignore                        ← Git ignores virtualenv, faiss_index, etc.
│
├── templates/                        ← HTML templates (for Flask UI, optional)
│   └── index.html
│
├── static/                           ← Static files for Flask (optional styling)
│   └── style.css
│
├── requirements.txt                  ← Backend Python dependencies
│
├── venv/                             ← Python virtual environment (ignored in Git)
│
└── README.md                         ← Project documentation
<br>
## 🔧 Setup Instructions
1. Clone the Repository
  git clone https://github.com/yourusername/internal-docs-qa.git
  cd internal-docs-qa
### 🔙 Backend Setup (Flask + FAISS + LangChain)
2. Create & Activate Virtual Environment

python -m venv venv
 source venv/bin/activate    # For Linux/macOS
 venv\Scripts\activate       # For Windows

3. Install Requirements

 pip install -r requirements.txt

4. Add Your Docs

 Place .txt files in the docs/ folder.
5. Generate Vectorstore

 python generate_vectorstore.py

 This creates the FAISS index in faiss_index/.
6. Run the Flask Server

 python app.py

By default, the server will be running at http://127.0.0.1:5000/query

### 🎨 Frontend Setup (React + Bootstrap)
7. Navigate to the React App

cd ../internal-docs-ui

8. Install Dependencies

npm install

9. Start the Development Server

npm start

The UI will open in the browser at: http://localhost:3000

    Ensure Flask is running at port 5000 for the frontend to connect properly.

## 📦 Technologies Used
### 🔙 Backend:

    Python

    Flask

    FAISS

    LangChain

    HuggingFace Transformers

    SentenceTransformers Embeddings

### 🔜 Frontend:

    React

    Bootstrap (CDN or react-bootstrap)

    Axios (for API calls) 

## 🧪 Example Questions

    "What is the company's leave policy?"

    "How are employees expected to report project progress?"
     What should an employee do if they are sick and unable to attend work?
     Are customized services eligible for a refund?
     Which platform should be used for internal communication?
     How should employees request IT assets like laptops?

## 🤖 Future Improvements

    Upload documents via UI

    User Authentication

    PDF & Word document support

    Deployment on cloud (e.g., Render, Vercel, HuggingFace Spaces)

## 🧑‍💻 Author

👩‍💻 Jiya Jain
📧 jainjiya451@gmail.com
🔗 LinkedIn : https://www.linkedin.com/in/jiya-jain-537501324  • GitHub
