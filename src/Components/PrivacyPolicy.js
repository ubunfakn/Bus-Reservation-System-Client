import React from "react";

export default function PrivacyPolicy() {
  return (
    <div>
      <div className="col-md-8 offset-md-2">
        <div className="card footer-link-card">
          <div className="card-title mt-3">
            <h1 className="font-weight-bold">Privacy Policy</h1>
            <div className="card-body">
              <p className="about-text">
                At Chalo Yatri, we value the privacy and security of our users'
                personal information. This Privacy Policy outlines how we
                collect, use, disclose, and protect the information gathered
                through our bus reservation system, Chalo Yatri. By using our
                services, you agree to the practices described in this policy.
              </p>
              <ol>
                <li>
                  <p className="about-text">
                    <strong>Information We Collect:</strong>
                  </p>
                  <p className="ml-4 about-text">
                    Personal Information: We may collect personal information
                    from users, such as their name, contact details (e.g., email
                    address, phone number), and payment information (e.g.,
                    credit card details) when they make a reservation through
                    Chalo Yatri.
                  </p>
                  <p className="about-text ml-4">
                    Usage Information: We gather non-personal information
                    automatically, including IP addresses, device information,
                    browser type, and usage patterns. This information helps us
                    improve our services and enhance user experience.
                  </p>
                </li>
                <li>
                  <p className="about-text">
                    <strong>Use of Collected Information:</strong>
                  </p>
                  <p className="about-text ml-4">
                    Reservation Processing: We utilize the personal information
                    collected to process and manage bus reservations, including
                    confirming bookings, communicating important updates, and
                    providing customer support.
                  </p>
                  <p className="about-text ml-4">
                    Communication: We may use users' contact information to send
                    them relevant updates, promotional offers, newsletters, or
                    other communications related to Chalo Yatri. Users can
                    opt-out of receiving such communications at any time.
                  </p>
                </li>
                <li>
                  <p className="about-text">
                    <strong>Data Security:</strong>
                  </p>
                  <p className="about-text ml-4">
                    We employ industry-standard security measures to protect
                    users' personal information from unauthorized access,
                    disclosure, alteration, or destruction. However, please note
                    that no method of transmission over the internet or
                    electronic storage is completely secure. While we strive to
                    use commercially acceptable means to protect users'
                    information, we cannot guarantee its absolute security.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
