import React from "react"

const DiwaliTemplate = ({ message }: { message?: string }) => {
  return (
    <table align="center" width={"100%"} className="bg-[#F7F8F9]">
      <tbody>
        <tr className="p-6">
          <img
            src="https://assets.unlayer.com/projects/0/1726219239971-logo.png"
            alt=""
            className="w-1/4 mx-auto"
          />
        </tr>
        <tr>
          <td>
            <h1 className="text-[#3aaee0] font-bold text-2xl text-center">
              <span>
                Happy Diwali!
                <br />
              </span>
            </h1>
          </td>
        </tr>
        <tr>
          <td>
            <img
              src="https://cdn.templates.unlayer.com/assets/1666001837906-image.png"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <h2 className="font-semibold text-xl text-center">
              FESTIVAL OF LIGHTS
            </h2>
          </td>
        </tr>
        <tr>
          <td>
            <h1 className="font-bold text-2xl text-center">31 October, 2024</h1>
          </td>
        </tr>
        <tr className="px-6">
          {message ? (
            <td>
              <p>{message}</p>
            </td>
          ) : (
            <td>
              <p>
                Celebrate with Us! May the light of Dussehra illuminate your
                life with hope, happiness, and a beautiful new home. We look
                forward to being a part of your journey to new beginnings! Warm
                Regards, Team EHE Industries
              </p>
            </td>
          )}
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

export default DiwaliTemplate
