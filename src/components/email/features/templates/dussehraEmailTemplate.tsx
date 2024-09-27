import React from "react"

const DussehraEmailTemplate = ({ message }: { message?: string }) => {
  return (
    <table
      align="center"
      width="100%"
      style={{
        borderCollapse: "collapse",
        margin: "0 auto",
        maxWidth: "600px",
        backgroundColor: "#ffffff",

        width: "100%",
      }}
    >
      {/* Logo */}
      <tbody className="text-xs">
        <tr>
          <td align="center" style={{ padding: "10px" }}>
            <img
              src="/static/favicon.ico"
              alt="Logo"
              style={{
                display: "block",
                maxWidth: "100%",
                height: "auto",
                width: "4rem",
              }}
            />
          </td>
        </tr>

        {/* Header */}
        <tr>
          <td
            align="center"
            style={{
              paddingBottom: "20px",
              color: "#1ab5ee",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Happy Dussehra!
          </td>
        </tr>

        {/* Image Section */}
        <tr>
          <td
            align="center"
            style={{
              position: "relative",
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
          >
            <img
              src="https://static0.futurepoint.in/14072195430/futuresamachar/images/article-detail-new/11263.webp"
              alt="Dussehra Celebration"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                maxWidth: "100%",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-1rem",
                zIndex: "50",
                width: "100%",
                height: "2rem",
                borderTopLeftRadius: "50%",
                borderTopRightRadius: "50%",
                background: "white",
              }}
            ></div>
          </td>
        </tr>

        {/* Text Content */}
        <tr className="text-xs text-center text-pretty ">
          {message ? (
            <td>
              <p className="text-black py-4">{message}</p>
            </td>
          ) : (
            <td>
              <p style={{ marginBottom: "1.25rem" }}>
                Whether you&apos;re looking for a serene home surrounded by
                nature, a vibrant urban lifestyle, or an investment that secures
                your future, we have the perfect property for you!
              </p>
              <h5 className="my-4 text-sm font-semibold">
                Why Choose EHE Industries?
              </h5>
              <ul className="text-left px-4 text-xs list-disc">
                <li>
                  🌳 Prime Locations: Strategically located properties that
                  offer both convenience and tranquility.
                </li>
                <li>
                  🏢 Modern Amenities: State-of-the-art facilities to enhance
                  your lifestyle.
                </li>
                <li>
                  🏡 Trusted Expertise: A legacy of excellence and trust in the
                  real estate industry.
                </li>
              </ul>
              <h6
                style={{
                  margin: "20px 0 10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Special Dussehra Offers Just for You! 🎁
              </h6>
              <p style={{ marginBottom: "1.25rem" }}>
                Celebrate Dussehra with exclusive festive discounts on select
                properties. Don’t miss this golden opportunity to make your
                dream home a reality!
              </p>
              <p style={{ marginBottom: "1.25rem" }}>
                Celebrate with Us! May the light of Dussehra illuminate your
                life with hope, happiness, and a beautiful new home. We look
                forward to being a part of your journey to new beginnings!
              </p>
              <p>Warm Regards, Team EHE Industries</p>
            </td>
          )}
        </tr>

        {/* Call to Action Button */}
        <tr>
          <td align="center" style={{ padding: "20px 1px" }}>
            <a
              className="text-xs bg-dashboard-primary text-white px-4 py-2 rounded-sm"
              href="#"
            >
              Celebrate with Us
            </a>
          </td>
        </tr>
      </tbody>

      {/* Footer Section */}
      <tfoot
        style={{
          background: "#fef2f2",
          width: "100%",
          padding: "20px",
          borderTop: "1px solid #dddddd",
        }}
      >
        {/* Social Media Links */}
        <tr>
          <td
            style={{
              textAlign: "center",
              padding: "10px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a href="https://www.facebook.com" target="_blank">
              <img
                alt="Facebook"
                src="https://res.cloudinary.com/mailmodo/image/upload/v1631877970/editor/constants/EditorIcons/facebook.png"
                style={{
                  borderRadius: "4px",
                  width: "24px",
                  margin: "0 8px",
                }}
              />
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <img
                alt="Instagram"
                src="https://res.cloudinary.com/mailmodo/image/upload/v1639159478/editor/p/31e7bae9-8e82-4d53-a3d6-532487e2ea1f/dce666bbba5337d041244e3820ade732_zikbug.png"
                style={{
                  borderRadius: "4px",
                  width: "24px",
                  margin: "0 8px",
                }}
              />
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <img
                alt="Twitter"
                src="https://res.cloudinary.com/mailmodo/image/upload/v1631877969/editor/constants/EditorIcons/Twitter.png"
                style={{
                  borderRadius: "4px",
                  width: "24px",
                  margin: "0 8px",
                }}
              />
            </a>
            <a href="https://www.linkedin.com" target="_blank">
              <img
                alt="Linkedin"
                src="https://res.cloudinary.com/mailmodo/image/upload/v1631877969/editor/constants/EditorIcons/Linkedin.png"
                style={{
                  borderRadius: "4px",
                  width: "24px",
                  margin: "0 8px",
                }}
              />
            </a>
          </td>
        </tr>
        {/* Footer Text */}
        <tr>
          <td
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: "12px",
              color: "#1e293b",
              textAlign: "center",
              padding: "10px 0",
            }}
          >
            ⓒ 2023 EHE Industries
            <br />
            <strong>About Us | Terms & Conditions | Privacy Policy</strong>
            <br />
            Sector 61, Gurugram, Haryana RK Hegde Nagar, Bengaluru
            <br />
            This is an auto-generated email. You received this email because you
            are subscribed.
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

export default DussehraEmailTemplate
