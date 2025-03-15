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

        // Clear error when user types
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ''
            });
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if (validate()) {
    //         setIsSubmitting(true);

    //         // Replace with your actual Google Sheet script URL
    //         const scriptURL = 'https://script.google.com/macros/s/AKfycbxyLsbNTVVXcJCmWG-XxMA0ZlPq7-BqDX7DyPxFZI0AKfycbxyLsbNTVVXcJCmWG-XxMA0ZlPq7-BqDX7DyPxFZI0/exec';

    //         // Format data for Google Sheets
    //         const formDataForSheet = new FormData();
    //         Object.keys(formData).forEach(key => {
    //             formDataForSheet.append(key, formData[key]);
    //         });

    //         // Add timestamp
    //         formDataForSheet.append('timestamp', new Date().toISOString());

    //         // Send to Google Sheets
    //         fetch(scriptURL, {
    //             method: 'POST', headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(formData)
    //         })
    //             .then(response => {
    //                 setIsSubmitting(false);
    //                 if (response.ok) {
    //                     // Show success dialog
    //                     setShowDialog(true);
    //                     // Reset form
    //                     setFormData({
    //                         name: '',
    //                         topic: '',
    //                         email: '',
    //                         message: ''
    //                     });
    //                 } else {
    //                     alert("Something went wrong. Please try again.");
    //                 }
    //             })
    //             .catch(error => {
    //                 setIsSubmitting(false);
    //                 console.error('Error!', error.message);
    //                 // In a real app, handle this error more gracefully
    //                 alert("Failed to submit. Please try again later.");
    //             });
    //     }
    // };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);

            const scriptURL = 'https://script.google.com/macros/s/AKfycbz2NhIvgmQ8y9xfqottVQGcF6yb0jaVYFcnJaMs8eNn-fI09hvhtXH2hNVqq8AeqEY_/exec';

            // Convert data to URL-encoded format
            const urlEncodedData = new URLSearchParams();
            Object.entries(formData).forEach(([key, value]) => {
                urlEncodedData.append(key, value);
            });
            urlEncodedData.append('timestamp', new Date().toISOString());
            console.log("Sending data:", urlEncodedData.toString());
            fetch(scriptURL, {
                method: 'POST',
                body: urlEncodedData
            })
                .then(response => response.json()) // Parse JSON response
                .then(data => {
                    setIsSubmitting(false);
                    if (data.result === 'success') {
                        setShowDialog(true);
                        setFormData({ name: '', topic: '', email: '', message: '' });
                    } else {
                        alert("Error: " + (data.error || 'Unknown error'));
                    }
                })
                .catch(error => {
                    setIsSubmitting(false);
                    alert("Network error. Please check your connection.");
                });
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

                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={formErrors.name ? "error" : ""}
                                    />
                                    {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="topic">Topic</label>
                                    <input
                                        type="text"
                                        id="topic"
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        className={formErrors.topic ? "error" : ""}
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
                                    />
                                    {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={formErrors.message ? "error" : ""}
                                    ></textarea>
                                    {formErrors.message && <span className="error-text">{formErrors.message}</span>}
                                </div>

                                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Dialog */}
            {showDialog && (
                <div className="dialog-overlay">
                    <div className="dialog">
                        <div className="dialog-content">
                            <h3>Message Sent!</h3>
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