import React, { useState } from "react";
import { Modal } from "antd";

function PrivacyPolicy() {
  const [showModal, setModal] = useState(false);

  return (
    <div className="p-5 overflow-auto" style={{height: '100vh'}}>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n@page {\n    margin-bottom: 5pt;\n    margin-top: 5pt\n    }\n\n.block_ {\n    display: block;\n    font-weight: bold;\n    line-height: 1.2;\n    margin-bottom: 0;\n    margin-left: 0;\n    margin-right: 0;\n    margin-top: 0;\n    padding-bottom: 0;\n    padding-left: 0;\n    padding-right: 0;\n    padding-top: 0\n    }\n.block_1 {\n    display: block;\n    font-family: serif;\n    font-size: 0.75em;\n    line-height: 1.15;\n    margin-bottom: 0;\n    margin-left: 0;\n    margin-right: 0;\n    margin-top: 0;\n    padding-bottom: 0;\n    padding-left: 0;\n    padding-right: 0;\n    padding-top: 0;\n    text-align: center\n    }\n.block_2 {\n    display: block;\n    line-height: 1.2;\n    margin-bottom: 0;\n    margin-left: 0;\n    margin-right: 0;\n    margin-top: 0;\n    padding-bottom: 0;\n    padding-left: 0;\n    padding-right: 0;\n    padding-top: 0;\n    text-align: justify\n    }\n.block_3 {\n    display: block;\n    font-family: serif;\n    font-size: 0.75em;\n    line-height: 1.15;\n    margin-bottom: 0;\n    margin-left: 0;\n    margin-right: 0;\n    margin-top: 0;\n    padding-bottom: 0;\n    padding-left: 0;\n    padding-right: 0;\n    padding-top: 0;\n    text-align: justify\n    }\n.block_4 {\n    display: block;\n    font-weight: bold;\n    line-height: 1.2;\n    margin-bottom: 0;\n    margin-left: 0;\n    margin-right: 0;\n    margin-top: 0;\n    padding-bottom: 0;\n    padding-left: 0;\n    padding-right: 0;\n    padding-top: 0;\n    text-align: justify\n    }\n.block_5 {\n    display: list-item;\n    line-height: 1.2;\n    margin-bottom: 0;\n    margin-left: 36pt;\n    padding-bottom: 0;\n    padding-top: 0;\n    text-align: justify\n    }\n.block_6 {\n    display: list-item;\n    line-height: 1.2;\n    margin-bottom: 0;\n    margin-left: 36pt;\n    margin-top: 0;\n    padding-bottom: 0;\n    padding-top: 0;\n    text-align: justify\n    }\n.block_7 {\n    display: list-item;\n    line-height: 1.2;\n    margin-bottom: 0;\n    margin-left: 54pt;\n    margin-top: 0;\n    padding-bottom: 0;\n    padding-top: 0;\n    text-align: justify\n    }\n.block_8 {\n    display: block;\n    font-family: serif;\n    font-size: 0.75em;\n    line-height: 1.15;\n    margin-bottom: 0;\n    margin-left: 45pt;\n    margin-right: 0;\n    margin-top: 0;\n    padding-bottom: 0;\n    padding-left: 0;\n    padding-right: 0;\n    padding-top: 0;\n    text-align: justify\n    }\n.block_9 {\n    display: block;\n    line-height: 1.2;\n    margin-bottom: 10pt;\n    margin-left: 0;\n    margin-right: 0;\n    margin-top: 0;\n    padding-bottom: 0;\n    padding-left: 0;\n    padding-right: 0;\n    padding-top: 0;\n    text-align: justify\n    }\n.block_10 {\n    display: block;\n    font-family: serif;\n    line-height: 1.2;\n    margin-bottom: 0;\n    margin-left: 0;\n    margin-right: 0;\n    margin-top: 0;\n    padding-bottom: 0;\n    padding-left: 0;\n    padding-right: 0;\n    padding-top: 0;\n    text-align: justify\n    }\n.block_11 {\n    display: block;\n    font-family: serif;\n    font-size: 0.75em;\n    line-height: 1.15;\n    margin-bottom: 0;\n    margin-left: 22.5pt;\n    margin-right: 0;\n    margin-top: 0;\n    padding-bottom: 0;\n    padding-left: 0;\n    padding-right: 0;\n    padding-top: 0;\n    text-align: justify\n    }\n.block_12 {\n    display: list-item;\n    line-height: 1.2;\n    margin-bottom: 0;\n    margin-left: 36pt;\n    margin-top: 0;\n    padding-bottom: 0;\n    padding-top: 0\n    }\n.calibre {\n    color: #000;\n    display: block;\n    font-family: "Arial", sans-serif;\n    font-size: 1em;\n    margin-bottom: 0;\n    margin-left: 5pt;\n    margin-right: 5pt;\n    margin-top: 0;\n    padding-left: 0;\n    padding-right: 0\n    }\n.calibre1 {\n    display: block;\n    line-height: 1.2\n    }\n.calibre2 {\n    font-weight: bold;\n    line-height: 1.2\n    }\n.calibre3 {\n    font-size: 0.75em;\n    line-height: normal;\n    vertical-align: super\n    }\n.list_ {\n    display: block;\n    list-style-type: disc;\n    margin-bottom: 0;\n    margin-left: 0;\n    margin-right: 0;\n    margin-top: 0;\n    padding-bottom: 0;\n    padding-right: 0;\n    padding-top: 0\n    }\n.list_1 {\n    display: block;\n    list-style-type: decimal;\n    margin-bottom: 0;\n    margin-left: 0;\n    margin-right: 0;\n    margin-top: 0;\n    padding-bottom: 0;\n    padding-right: 0;\n    padding-top: 0\n    }\n.text_ {\n    color: #000;\n    font-family: "Arial", sans-serif;\n    font-size: 1.33333em;\n    line-height: 1.2\n    }\n.text_1 {\n    font-family: "Calibri", sans-serif;\n    font-size: 1em\n    }\n.text_2 {\n    color: #000;\n    font-family: "Arial", sans-serif;\n    line-height: 1.2\n    }\n.text_3 {\n    font-family: "Calibri", sans-serif;\n    line-height: 1.2\n    }\n.text_4 {\n    line-height: 1.2\n    }\n.text_5 {\n    color: #1C1E21;\n    font-family: "Helvetica", sans-serif;\n    line-height: 1.2\n    }\n.text_6 {\n    color: #000;\n    font-family: "Arial", sans-serif;\n    font-weight: bold;\n    line-height: 1.2\n    }\n.text_7 {\n    color: #000;\n    line-height: 1.2\n    }\n.text_8 {\n    color: #000;\n    line-height: 1.2\n    }\n  <style/>\n',
        }}
      />
      <div class="calibre" id="calibre_link-0">
        <p class="block_">PRIVACY POLICY</p>
        <p class="block_1">&nbsp;</p>
        <p class="block_2">
          This Privacy Policy (“Policy”) describes the policies and procedures about collection, use, disclosure,
          security and protection of your information or information provided by you of any beneficiary when you use our
          website located at{" "}
        </p>
        <p class="block_3">
          <span class="text_">“consumerlinks.in”, or the </span>
          <span id="calibre_link-1" class="text_">
            “the platform application” (Collectively, “&shy;&shy;the platform”) offered by “&shy;&shy;Consumer Links
            Marketing Pvt Ltd” (“&shy;&shy;Consumer Links Marketing Pvt Ltd” , the “Company”, “we”, “us” and “our”), a
            private company established under the laws of India with registered office at 001/A, C-Wing
          </span>
          <span class="text_1"></span>
          <span class="text_">
            , Shree Krishna Complex CHS Ltd., Western Express Highway, Near Omkareshwar Mandir, Borivali, East, Mumbai -
            400066
          </span>
          <span class="text_1"></span>
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          The Terms “you” and “your” refer to the user, beneficiary or anyone using the platform. The terms “Services”
          refers to services offered by “Consumer Links Marketing Pvt Ltd” on the platform.
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          Please read this Policy before using the platform or submitting any personal or any third-party beneficiary
          information on &shy;the platform. This Policy is a part of and incorporated within, and is to be read with,
          the Terms of Service.
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          Please read this Policy and the Terms of Service carefully to understand the platform policies and practices
          regarding your information and how &shy;&shy;the platform will treat it. By accessing or using its Services or
          providing information, in any manner, on the and/or registering with the platform, you agree to this Privacy
          Policy, the Terms of Service, and you are consenting to Consumer Links collecting, using, disclosing,
          retaining, sharing, validating, verifying the personal information, including beneficiary information as
          governed by applicable law and described here. If you do not provide the information the platform requires,
          &shy;&shy;&shy;&shy;the platform may not be able to provide all of its Services to you.
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_4">CONSENT</p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          By using the platform and the Services, you agree and consent to the collection, retention, transfer, use,
          storage, disclosure and sharing of your information as described and collected by us in accordance with this
          Policy. If you do not agree with the Policy or the Terms of Service, please do not use, or access the
          platform.
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_4">CHANGES TO THIS PRIVACY POLICY</p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          We may occasionally update this Policy and the Terms of Service and such changes as may be posted on this
          page. If we make any significant changes to this Policy or the Terms of Service, the same shall be displayed
          on the platform, your willingness to continue use of the platform or provide information on the platform will
          be considered as active consent for the same along with any additional consent Forms signed. Your continued
          use of Services after we publish or send a notice about our changes to this Policy shall constitute your
          consent to the updated Policy and this Terms of Service.
        </p>
        <p class="block_4">
          <br class="calibre1" />
          GENERAL
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          This platform/ in Mobile/ websites/ Application is owned by Consumer Links. We are committed to protecting and
          respecting your privacy. Collection of information and processing of the same is in accordance with the
          Information and Technology laws, as applicable, (IT Act, 2000) and other national and state laws which relate
          the processing of personal data.
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          Please read the following carefully to understand our views and practices regarding your personal data.
        </p>
        <p class="block_3">&nbsp;</p>
        <ul class="list_">
          <li class="block_5">
            Downloading, accessing, or otherwise using the App indicates that you have read this Privacy Policy and
            consent to its terms. If you do not consent to the terms of this Privacy Policy, do not proceed to download,
            access, or otherwise use the App.
          </li>
          <li class="block_6">
            We collect your personal information in order to provide and continually improve our products and services.
          </li>
          <li class="block_6">
            Our Privacy Policy is subject to change at any time without notice. To make sure you are aware of any
            changes, please review this policy periodically. The last updated date can be found at the beginning of this
            Policy.
          </li>
          <li class="block_6">
            All partner firms and any third-party working with or for Us, and who have access to personal information,
            will be expected to read and comply with this Policy.
          </li>
        </ul>
        <p class="block_4">
          <br class="calibre1" />
          HOW WE COLLECT THE INFORMATION AND HOW WE USE IT
        </p>
        <p class="block_3">&nbsp;</p>

        <p class="block_3">&nbsp;</p>
        <p class="block_2">We collect this information:</p>
        <p class="block_3">&nbsp;</p>
        <ul class="list_">
          <li class="block_5">directly from you, with your consent when you provide it to us; and/or</li>
          <li class="block_6">
            automatically as you navigate through our Services (information collected automatically may include usage
            details, IP addresses and information collected through cookies, web beacons and other tracking
            technologies).
          </li>
        </ul>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">We will collect and process the following information about you:</p>
        <p class="block_3">&nbsp;</p>
        <ull class="list_">
          <li class="block_5">
            From you directly and through this App: We may collect information through the App when you visit the
            platform. The data we collect depends on the context of your interactions with our App.
          </li>
          <li class="block_6">
            Through business interaction: We may collect information through business interaction with you or your
            employees and beneficiaries.
          </li>
          <li class="block_6">
            From other sources: We may receive information from other sources, such as public databases; API partners;
            social media platforms; or other third parties such as:
          </li>
        </ull>
        <ul class="list_">
          <li class="block_6">
            Updated delivery and address information from our carriers or other third parties, which we use to correct
            our records and deliver your next purchase or communication more easily.
          </li>
          <li class="block_6">
            Information about your interactions with programs, products and services offered by our subsidiaries.
          </li>
        </ul>
        <p class="block_3">&nbsp;</p>
        <p class="block_4">INFORMATION WE COLLECT</p>
        <p class="block_3">&nbsp;</p>
        <p class="block_4">Information you provide to Us:</p>
        <ul class="list_">
          <li class="block_5">We collect information primarily to provide better services to all our customers.</li>
          <li class="block_6">We collect the following information from you when you use or signup on our App:</li>
        </ul>
        <ul class="list_">
          <li class="block_7">
            <b class="calibre2">For Implementation Organization Registration </b> - Name, Email Address, Contact Number.
          </li>
        </ul>
        <ul class="list_">
          <li value="2" class="block_7">
            <b class="calibre2">For Beneficiaries</b> - Name, Age, Number of Family members, Date of Birth, Gender,
            Address, Contact Number, Education Qualification, Ownership of House / Type of Household, Ownership Land,
            Size of Land Holding in Acres (Owned / Leased / Irrigated), Type cattle owned, Current Occupation, Household
            Annual Income (Agriculture and Others), Geo Location, Photo.
          </li>
        </ul>
        <p class="block_3">&nbsp;</p>
        <p class="block_4">Information we collect through Automatic Data Collection Technologies:</p>
        <ul class="list_">
          <li class="block_5">
            When you visit our App, some information is automatically collected. This may include information such as
            the type of mobile device, Operating System (OS) running on your device, Internet Protocol (IP) address,
            unique user ID, access times, device type, and language. We also collect information about how you use Our
            products or services.
          </li>
          <li class="block_6">
            We automatically collect purchase or content use history, which we sometimes aggregate with similar
            information from other customers to create features such as Best Seller, Top Rated, etc.
          </li>
          <li class="block_6">
            The information about your usage of the App, including crash logs and usage statistics.
          </li>
          <li class="block_6">Information about the location of your device, including geolocation information.</li>
          <li class="block_6">
            By using this App, you are agreeing that We may advertise your feedback on the App and other marketing
            materials.
          </li>
          <li class="block_6">
            We will retain your information as long as we require this to provide you with the goods and services and
            for such period as mandated by the applicable laws.
          </li>
          <li class="block_6">
            If you opt to receive marketing correspondence from us, subscribe to our mailing list or newsletters, enter
            into any of our competitions or provide us with your details at networking events, we may use your personal
            data for our legitimate interests in order to provide you with details about our goods, services, business
            updates and events.
          </li>
        </ul>
        <ul class="list_">
          <li class="block_7">
            We use the information we collect primarily to provide, maintain, protect, and improve our current products
            and services.
          </li>
          <li class="block_7">
            We use the information collected through this App as described in this policy and we may use your
            information to:
          </li>
          <ul class="list_">
            <li class="block_7">Improve our services, App and how we operate our businesses.</li>
            <li class="block_7">
              Understand and make efficient your experience using the platform, App, products, and services.
            </li>
            <li class="block_7">Process, manage, complete, and account for transactions.</li>
            <li class="block_7">Provide customer support and respond to your requests, comments, and inquiries.</li>
            <li class="block_7">
              Send you related information, including confirmations, invoices, technical notices, updates, security
              alerts and support and administrative messages.
            </li>
            <li class="block_7">
              Communicate with you about promotions, upcoming events and news about products and services.
            </li>
            <li class="block_7">
              We may process your personal information without your knowledge or consent where required by applicable
              law or regulation for the purposes of verification of identity or for prevention, detection, or
              investigation, including of cyber incidents, prosecution, and punishment of offences.
            </li>
            <li class="block_7">
              Protect, investigate, and deter against fraudulent, unauthorized, or illegal activity.
            </li>
          </ul>
        </ul>
        <p class="block_3">&nbsp;</p>
        <p class="block_4">HOW WE SHARE THE INFORMATION WE COLLECT</p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          Information about the user is an important part of our business and we take due care. We may disclose personal
          information that we collect, or you provide, as described in this Privacy Policy, in the following ways:
        </p>
        <p class="block_3">&nbsp;</p>
        <ul class="list_">
          <li class="block_5">
            <b class="calibre2">General Information Disclosure:</b> We share your data with your consent or to complete
            any transaction or provide any product or service you have requested or authorized. We also share data with
            our affiliates and subsidiaries, with vendors working on our behalf.
          </li>
          <li class="block_6">
            We may employ other companies and individuals to perform functions on our behalf. The functions include
            fulfilling orders for products or services, delivering packages, sending postal mail and e-mail, removing
            repetitive information from customer lists, providing marketing assistance, providing search results and
            links (including paid listings and links), processing payments, transmitting content, scoring credit risk,
            and providing customer service.
          </li>
          <li class="block_6">
            <b class="calibre2">Service Providers:</b> These third-party service providers have access to personal
            information needed to perform their functions but may not use it for other purposes. Further, they must
            process the personal information in accordance with this Privacy Policy and as permitted by applicable data
            protection laws.
          </li>
          <li class="block_6">
            <b class="calibre2">Legal Purposes:</b> We release account and other personal information when we believe is
            appropriate to comply with the law, enforce or apply our conditions of use, and other agreements, protect
            the rights, property, or safety of Us, our users, or others. This includes exchanging information with other
            companies and organizations for fraud protection and credit risk reduction.
          </li>
          <li class="block_6">
            <b class="calibre2">Consent:</b> We may share your information in any other circumstances where we have your
            consent.
          </li>
        </ul>
        <pre />
        <p class="block_2">
          Consumer Links are vested with all the rights to share, transfer, and license all/ or any part of the Data it
          collects, to authorised entities which will receive such data.{" "}
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_4">SECURITY: HOW WE PROTECT YOUR INFORMATION</p>
        <p class="block_3">&nbsp;</p>
        <p class="block_9">
          We take due care to protect all data on the platform. Technical measures are in place to prevent unauthorized
          or unlawful access to data and against accidental loss or destruction of, or damage to the data. The employees
          who are dealing with the data have been trained to protect the data from any illegal or unauthorized usage.
        </p>
        <p class="block_9">
          We have implemented appropriate physical, electronic, and procedural safeguards in connection with the
          collection, storage, and disclosure of personal customer information.
        </p>
        <p class="block_9">
          We take reasonable steps to help protect your personal information in an effort to prevent the loss, misuse,
          and unauthorized access, disclosure alteration and destruction. It is your responsibility to protect your
          usernames and passwords to help prevent anyone from accessing or abusing your accounts and services. You
          should not use or reuse the same passwords you use with other accounts as your password for our services.
        </p>
        <p class="block_9">
          It is important for you to protect against unauthorized access to your password and your devices, and
          applications. Be sure to sign off when you finish using a non-personal device.
        </p>
        <p class="block_10">
          <span class="text_2">
            Information you provide to us is shared on our secure servers. We have implemented appropriate physical,
            technical and organizational measures designed to secure your information against accidental loss and
            unauthorized access, use, alteration, or disclosure. In addition, we limit access to personal data to those
            employees, agents, contractors, and other third parties that have a legitimate business need for such
            access.
          </span>
          <span class="text_3"> </span>
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          Information collected from you will be stored for such period as required to complete the transaction entered
          into, with you or such period as mandated under the applicable laws.
        </p>
        <p class="block_11">&nbsp;</p>
        <p class="block_4">COOKIES</p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          This platform and authorised third parties, may use cookies, pixel tags, web beacons, mobile device IDs, flash
          cookies and similar files or technologies to collect and store information with respect to your use of the
          Services and third-party websites in accordance with the applicable laws.
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          Cookies are small files that are stored on your browser or device by websites, apps, online media, and
          advertisements. We use cookies and similar technologies for purposes such as:
        </p>
        <ul class="list_">
          <li class="block_5">Authenticating users</li>
          <li class="block_6">Remembering user preferences and settings</li>
          <li class="block_6">
            Generally understanding the online behaviours and interest of people who interact with our services.
          </li>
        </ul>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          A pixel tag (also called a web beacon or clear GIF) is a tiny graphic with a unique identifier, embedded
          invisibly on a webpage (or an online ad or email), and is used to count or track things like activity on a
          webpage or ad impressions or clicks, as well as to access cookies stored on users’ computers. We may include
          web beacons in e-mail messages or newsletters to determine whether the message has been opened and for other
          analytics.
        </p>
        <p class="block_2">
          To modify you cookie settings, please visit your browser’s settings. By using our Services with you browser
          settings to accept cookies, you are consenting to our use of cookies in the manner described in this section.
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          We may also allow third parties to provide audience measurement and analytics services for us, to serve
          advertisements on our behalf across the Internet, and to track and report on the performance of those
          advertisements. These entities may use cookies, web beacons, SDKs, and other technologies to identify your
          device when you visit the “the platform” Platform and user our Services, as well as when you visit other
          online sites and services.
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          Please see our{" "}
          <span className="privacy-btn" onClick={() => setModal(true)}>
            Cookie Policy
          </span>{" "}
          for more information regarding the use of cookies and other technologies described in this section, including
          regarding your choices relating to such technologies.
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_3">&nbsp;</p>
        <p class="block_3">&nbsp;</p>
        <p class="block_4">OPT-OUT</p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          When you sign up for an account, you are opting in to receive emails from the platform. You can log in to
          manage your email preferences or you can follow the ‘unsubscribe’ instructions in commercial email messages
          but note that you cannot opt out of receiving certain administrative notices, service notices, or legal
          notices from Consumer Links.
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          If you wish to withdraw your consent for the use and disclosure of your personal information in the manner
          provided in this Privacy Policy, please write to us at <span class="text_4">privacy@consumerlinks.in</span>{" "}
          Please note that we may take time to process such requests, and your request shall take effect no later than
          five (5) business days from the receipt of such requests, after which we will not use your personal data for
          any processing unless required by us to comply with or legal obligations. We may not be able to offer you any
          or all Services upon such withdrawal of your consent.
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_4">SHARING OF PERSONAL INFORMATION</p>
        <p class="block_3">&nbsp;</p>
        <ul class="list_">
          <li class="block_5">
            We do not share your personal data with third parties without your prior consent other than:
          </li>
          <ul class="list_">
            <li class="block_12">
              With third parties who work on our behalf provided such third parties adhere to the data protection
              principles set out in the IT Act, 2000 (21 of 2000) and other applicable legislation, or enter into a
              written agreement with Us requiring that the third party provide at least the same level of privacy
              protection as is required by such principles;
            </li>
            <li class="block_6">To comply with laws or to respond to lawful requests and legal process.</li>
            <li class="block_6">
              To protect the rights and property of Us, our agents, customers, and others including to enforce our
              agreements, policies, and terms of use.
            </li>
            <li class="block_6">In an emergency, including to protect the personal safety of any person; and</li>
            <li class="block_6">
              For the purpose of a business deal (or negotiation of a business deal) involving the sale or transfer of
              all or a part of our business or assets (business deals may include, for example, any merger, financing,
              acquisition, divestiture, or bankruptcy transaction or proceeding).
            </li>
          </ul>
        </ul>
        <p class="block_3">&nbsp;</p>
        <p class="block_4">PERMISSIBLE AGE</p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          The Services are not intended for users under the age of 18, unless permitted under applicable law laws
          (Permissible Age). If you are under the age of 18 or the age of majority in the jurisdiction in which you
          reside, you may only use Our App with the consent of your parent or legal guardian. We do not knowingly
          collect any personal information from users or market to or solicit information from anyone under the
          Permissible Age. If we become aware that a person submitting personal information is under the Permissible
          Age, we will delete the account and any related information from or about a user under the Permissible Age,
          please contact us at <span class="text_4">privacy@consumerlinks.in</span>
        </p>
        <p class="block_4">
          <br class="calibre1" />
          THIRD PARTY LINKS AND SERVICES
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          The Services may contain links to third-party websites. Your use of these features may result in collection,
          processing or sharing of information about you, depending on the feature. Please be aware that we are not
          responsible for the content or privacy practices of other websites or services which may be linked on our
          Services. We do not endorse or make any representations about third-party websites or services. Our Privacy
          Policy does not cover the information you choose to provide to or that is collected by these third parties. We
          strongly encourage you to read such third parties’ privacy policies.
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_4">DATA RETENTION AND ACCOUNT TERMINATION</p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          You can close your account by visiting your profile settings page on our website/ application. We will remove
          your public Programs from view, but we may retain information about you for the purposes authorized under the
          Privacy Policy unless prohibited by law. Thereafter, we will either deleted your personal information or
          de-identify it so that it is anonymous and not attributed to your identify. For example, we may retain
          information to prevent, investigate, or identify possible wrongdoing in connection with the Service or to
          comply with legal obligations.
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_4">YOUR INFORMATION CHOICES AND CHANGES</p>
        <p class="block_3">&nbsp;</p>
        <p class="block_10">
          <span class="text_5">
            We strive to provide you with choices regarding the personal information you provide to us.
          </span>
          <span class="text_2">
            {" "}
            You can also make choices about the collection and processing of your data by Us. You can access your
            personal data and opt-out of certain services provided by the Us.{" "}
          </span>
          <span class="text_5">
            You can set your browser or mobile device to refuse all or some browser cookies, or to alert you when
            cookies are being sent.
          </span>
          <span class="text_2">
            {" "}
            In some cases, your ability to control and access to your data will be subject to applicable laws.
          </span>
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          You may opt-out of receiving promotional emails from Us by following the instructions in those emails. If you
          opt-out, we may still send you non-promotional emails, such as emails about our ongoing business relationship.
          You may also send requests about you got preferences, changes and deletions to your information including
          requests to opt-out of sharing your personal information with third parties by sending an email to the email
          address provided at the bottom of this document.
        </p>
        <p class="block_10">
          <span class="text_3">
            <br class="calibre1" />
          </span>
          <span class="text_6">CONTACT US</span>
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          If you have any queries relating to the processing/ usage of information provided by you or the platform
          Privacy Policy, you may email the Data Protection Officer/ Grievance Officer at{" "}
          <span class="text_7">privacy@consumerlinks.in</span>
          <span class="text_8"> </span>or write to us at the following address.
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">For users residing in India:</p>
        <p class="block_3">&nbsp;</p>
        <p class="block_2">
          <b class="calibre2">Address: </b>001/A, C-Wing, Shree Krishna Complex CHS Ltd., Western Express Highway, Near
          Omkareshwar Mandir, Borivali, East, Mumbai - 400066
        </p>
        <p class="block_3">&nbsp;</p>
        <p class="block_4">Effective Date: October 11, 2021</p>
        <p class="block_3">&nbsp;</p>
        <p class="block_4">Last Updated on: October 11, 2021</p>
      </div>
      <Modal
        title="Cookie Policy"
        visible={showModal}
        centered
        onCancel={() => setModal(false)}
        destroyOnClose
        footer={null}
        width={800}
      >
        <div>
          <p>
            The ‘Platform’ uses cookies to improve the user experience and ensure that it is functioning effectively.
            This Cookie Policy (“Policy”) supplements the ‘Consumer Links’{" "}
            <a className="privacy-btn" href="/privacy-policy">
              ‘Privacy Policy’
            </a>{" "}
             and explains how and why these technologies are used and the choices you as a user have. <pre /> To provide
            you with more accurate, specific and relevant service, the platform remembers and stores information
            relevant about your use of the website. Small text files called cookies are used for this. Cookies contain
            small amounts of information which get downloaded to your computer or other device you use to access the
            platform, by a server for this website. Your web browser then sends these cookies back to this website on
            each subsequent visit so that it can recognize you and remember things specific to your use of the website
            for maintaining information relevant to services you require from us. You can find more detailed information
            about cookies and how they work at https://www.aboutcookies.org.
          </p>
          <p>
            Whenever you use this Platform, information may be collected using cookies and other technologies. By using
            this ‘Platform’ you agree to Consumer Link’s use of cookies as described in this Cookie Policy and also to
            the use of cookies in other authorised/ relevant to the services on this website which you require country,
            region or practice specific websites
          </p>
          <h6>
            <b>AMENDMENT TO THE POLICY</b>
          </h6>
          <p>
            Further, Consumer Links may modify or amend this Cookie Policy from time to time at its discretion and as
            required by you for using the services offered on the website. All updates, change and modifications to this
            policy will be displayed on the website. It is your responsibility to stay aware, informed and updated with
            the policies placed on the website including the Cookie Policy to be informed about manner of usage of
            cookies on the website.
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default PrivacyPolicy;
