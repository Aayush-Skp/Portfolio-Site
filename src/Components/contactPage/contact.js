import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        topic: '',
        email: '',
        message: ''
    });

    const [showDialog, setShowDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    const validate = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.topic.trim()) errors.topic = "Topic is required";
        if (!formData.message.trim()) errors.message = "Message is required";
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ''
            });
        }
        if (submitError) {
            setSubmitError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');

        if (validate()) {
            setIsSubmitting(true);

            const scriptURL = 'https://script.google.com/macros/s/AKfycbxddDQ1Le9fpiWlnXZRtLYJW_0tAVFZLSeK1oDA9F_f45Tgk0Coz_efWHreCzdWhunB/exec';

            try {
                const urlEncodedData = new URLSearchParams();
                Object.entries(formData).forEach(([key, value]) => {
                    urlEncodedData.append(key, value);
                });
                urlEncodedData.append('timestamp', new Date().toISOString());

                const response = await fetch(scriptURL, {
                    method: 'POST',
                    body: urlEncodedData,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Network response error: ${response.status} ${response.statusText}`);
                }
                const responseText = await response.text();
                let data;

                try {
                    data = JSON.parse(responseText);
                } catch (parseError) {
                    console.error("JSON parse error:", parseError);
                    console.log("Raw response:", responseText);

                    data = { result: 'success' };
                }

                if (data.result === 'success' || response.ok) {
                    setShowDialog(true);
                    setFormData({ name: '', topic: '', email: '', message: '' });
                } else {
                    setSubmitError(data.error || 'Failed to submit form. Please try again.');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setSubmitError('Network error. Please check your connection and try again.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const closeDialog = () => {
        setShowDialog(false);
    };

    return (
        <section className="contact" id="contact">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="contact-bx">
                            <h2>Get In Touch</h2>
                            <p>Have a question or want to work together? Send me a message!</p>

                            {submitError && (
                                <div className="error-banner">
                                    <p>{submitError}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name">Name <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={formErrors.name ? "error" : ""}
                                        aria-required="true"
                                        aria-invalid={!!formErrors.name}
                                    />
                                    {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="topic">Topic <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        id="topic"
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        className={formErrors.topic ? "error" : ""}
                                        aria-required="true"
                                        aria-invalid={!!formErrors.topic}
                                    />
                                    {formErrors.topic && <span className="error-text">{formErrors.topic}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email (Optional)</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={formErrors.email ? "error" : ""}
                                        aria-invalid={!!formErrors.email}
                                    />
                                    {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message <span className="required">*</span></label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={formErrors.message ? "error" : ""}
                                        aria-required="true"
                                        aria-invalid={!!formErrors.message}
                                    ></textarea>
                                    {formErrors.message && <span className="error-text">{formErrors.message}</span>}
                                </div>

                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={isSubmitting}
                                    aria-busy={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {showDialog && (
                <div className="dialog-overlay" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
                    <div className="dialog">
                        <div className="dialog-content">
                            <h3 id="dialog-title">Message Sent!</h3>
                            <p>Thank you for reaching out. I'll get back to you soon.</p>
                            <button onClick={closeDialog} className="dialog-btn">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Contact;