/** ContactForm.js — React component (validation, UX, ready to hook to backend) */
const { useState } = React;

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ ok: null, text: "" });
  const [touched, setTouched] = useState({});

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function markTouched(e) {
    setTouched({ ...touched, [e.target.name]: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus({ ok: null, text: "" });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ ok: false, text: "Please fill all fields." });
      return;
    }
    if (!validateEmail(form.email)) {
      setStatus({ ok: false, text: "Please enter a valid email address." });
      return;
    }

    // Simulate send. Replace this with real API/EmailJS/Netlify integration.
    setStatus({ ok: null, text: "Sending..." });
    setTimeout(() => {
      setStatus({ ok: true, text: "Message sent — thank you!" });
      setForm({ name: "", email: "", message: "" });
      setTouched({});
    }, 900);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={markTouched}
          placeholder="Your name"
          aria-label="Name"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={markTouched}
          placeholder="Email address"
          aria-label="Email"
          type="email"
        />
      </div>

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        onBlur={markTouched}
        placeholder="Your message"
        rows="6"
        aria-label="Message"
      />

      {status.text && (
        <div className={status.ok === true ? "status ok" : status.ok === false ? "status error" : "status"}>
          {status.text}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button className="btn" type="submit">Send Message</button>
        <button type="button" className="btn btn-ghost" onClick={() => { setForm({ name: "", email: "", message: "" }); setStatus({ ok: null, text: "" }); }}>Reset</button>
      </div>
    </form>
  );
}

ReactDOM.createRoot(document.getElementById('contactRoot')).render(<ContactForm />);
