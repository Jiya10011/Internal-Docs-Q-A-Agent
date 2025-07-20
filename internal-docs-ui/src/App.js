import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch("http://localhost:5000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: query })
      });

      const data = await res.json();
      if (res.ok) {
        const answer = data.answer;
        setResponse(answer);
        setHistory([{ question: query, answer }, ...history]);
      } else {
        setError(data.answer || 'Something went wrong.');
      }
    } catch (err) {
      setError('Error: Unable to reach the backend.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ File uploaded and processed.");
      } else {
        alert("❌ Upload failed: " + data.message);
      }
    } catch (err) {
      alert("❌ Error uploading file.");
      console.error(err);
    }

    setShowModal(false);
  };

  const themeClass = darkMode ? 'bg-dark text-light' : 'bg-light text-dark';

  return (
    <div className={`min-vh-100 ${themeClass}`}>
      {/* Navbar */}
      <nav className={`navbar ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <div className="container-fluid">
          <span className="navbar-brand">🧠 Internal Docs Q&A</span>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-outline-secondary" onClick={() => setShowModal(true)}>
              📤 Upload Docs
            </button>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="darkSwitch"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <label className="form-check-label" htmlFor="darkSwitch">
                {darkMode ? 'Dark' : 'Light'}
              </label>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="container py-5">
        <h2 className="mb-4">Ask Anything About Your Docs</h2>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type your question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAsk} disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Ask'
            )}
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {response && !loading && (
          <div className="alert alert-info mt-3" role="alert">
            {response}
          </div>
        )}

        {/* Accordion for Past Q&A */}
        {history.length > 0 && (
          <div className="mt-5">
            <h4>Previous Questions</h4>
            <div className="accordion" id="historyAccordion">
              {history.map((item, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`collapse${index}`}
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#historyAccordion"
                  >
                    <div className="accordion-body">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" onClick={() => setShowModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Document</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input type="file" className="form-control" onChange={handleFileUpload} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
