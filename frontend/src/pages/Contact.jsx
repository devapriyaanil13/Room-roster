import { useState } from "react";
import "../styles/InfoPages.css";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been sent to the developer.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="info-container">
      <div className="info-box">
        <h1>Contact the Developer</h1>
        <p>Experiencing an issue or have a feature request? Let us know!</p>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input 
            type="text" 
            placeholder="Jane Doe" 
            required 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          
          <label>Your Email</label>
          <input 
            type="email" 
            placeholder="jane@example.com" 
            required 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          
          <label>Message</label>
          <textarea 
            placeholder="How can we help you?" 
            required
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
          
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
