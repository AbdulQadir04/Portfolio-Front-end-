/** ContactForm.js — Professional Contact Form (accessible, validated, UX-polished) */
const { useState } = React;

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success

  const validateEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function validate() {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    else if (!validateEmail(form.email)) nextErrors.email = "Enter a valid email.";
    if (!form.message.trim()) nextErrors.message = "Message is required.";
    return nextErrors;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setStatus("sending");

    // Simulated send — replace with API
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    }, 900);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            aria-invalid={!!errors.name}
            required
          />
          {errors.name && <small className="status error">{errors.name}</small>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            aria-invalid={!!errors.email}
            required
          />
          {errors.email && <small className="status error">{errors.email}</small>}
        </div>
      </div>

      <div>
        <textarea
          name="message"
          rows="6"
          value={form.message}
          onChange={handleChange}
          placeholder="Your message"
          aria-invalid={!!errors.message}
          required
        />
        {errors.message && <small className="status error">{errors.message}</small>}
      </div>

      {status === "success" && (
        <div className="status ok">Message sent successfully.</div>
      )}

      <button className="btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

ReactDOM.createRoot(document.getElementById("contactRoot")).render(<ContactForm />);
