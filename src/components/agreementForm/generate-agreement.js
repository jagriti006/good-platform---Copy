import { Document, Page, Text, Image, pdf, View, StyleSheet } from "@react-pdf/renderer";

const generatePDFDocument = async (sig) => {
  const blobPdf = pdf(PdfDoc(sig));
  blobPdf.updateContainer(PdfDoc(sig));
  const blob = await blobPdf.toBlob();
  const newBlob = new Blob([blob], { type: "application/pdf" });
  const fileOfBlob = new File([newBlob], "agreement.pdf");
  return fileOfBlob;
};

const PdfDoc = (sig) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.title}>TERMS OF SERVICE</Text>
      <Text style={styles.subtitle}>ACCEPTANCE OF THE TERMS OF USE</Text>
      <Text style={styles.text}>
        These Terms of Service (“Terms of Service”) are by and between you/ user (“you”/ “User”) and “Consumer Links
        Marketing Pvt Ltd” (“Company”). (“consumerlinks.in”, or the “the platform application) (“Platform”/ “Website”/
        “Application”). By accessing and continuing to use the Platform. You agree to be governed by the Terms of
        Service and the Policies including the Privacy Policy of the Platform/Website while interacting and using the
        platform in the manner iterated here.
      </Text>
      <Text style={styles.text}>
        The Terms of Service apply to all first-time users, multiple time user, registered users and user who are not
        registered with the Platform/ Website/ Application. Please read these Terms of Service carefully before
        proceeding.{" "}
        <Text style={{ fontSize: "16" }}>
          If you do not agree to these Terms of Use or the Privacy Policy, you must not access or use the Platform.
        </Text>
      </Text>
      <Text style={styles.text}>
        The principal category of a ‘registered user’ of the services, offered by this Platform is an Implementation
        Organisation. An Implementation Organisation is the one who launches, implements and/ or runs, a program for
        grant, donations and/or a CSR allotment called by any name (‘Program’). The Terms of Service apply to all the
        users, who access, engage, interact with this Platform, including but not limited to, an Implementation
        Organisation.
      </Text>
      <Text style={styles.text}>
        The Platform/ Website does not collect, store, retain or share any personal information of Yours with any
        unauthorized entities unless authorized under applicable laws. All information provided by You on the Platform,
        is received and collected in encrypted format and in accordance with your consent, declaration, and
        representations. For purposes of completing the authentication of beneficiary required for providing the
        Services on the platform, the Platform partners with authorised third parties with authorised and applicable
        legal API authentication tools including Government and non-government bodies. Company shall have full right to
        enter into necessary arrangements, contracts, assign, transfer, share, sell to it’s affiliates, authorised
        representatives, channel partners, body corporates information that you provide to the platform for giving full
        effect to the purpose of the services on the Portal at any time during your engagement with us or use of the
        platform. No such transfer, share, assignment, sale, arrangements etc. will require any additional or fresh
        consent of the user or the beneficiary information provided by the User on the Platform.
      </Text>
      <Text style={styles.text}>
        The Platform is for implementation of the Program. For the purposes of the Platform, any user involved in
        deployment, implementation, execution, management of a Program in any part of India is an Implementation
        Organisation which has to register (here). Any user, who offers the grant, donation or CSR Allotment for the
        Program, is a Donor and has to register (here). The Implementation Organisation offering the Program must be a
        body corporate, which can be both, a not-for-profit organization or a for profit organization authorized to
        undertake the implementation, execution, deployment etc. of the Program.
      </Text>
      <Text style={styles.text}>
        For the purpose of this Terms of Service, CSR means the activities undertaken in pursuance of a corporates’
        statutory obligation laid down in section 135 of the Companies Act, 2013 in accordance with the provisions
        contained in these rules (Companies (Corporate Social Responsibility Policy) Rules, 2014.)
      </Text>
      <Text style={styles.text}>
        Use of the Platform, is not available to persons who cannot form legally binding contracts under the Indian
        Contract Act, 1872 i.e., minors, undischarged insolvents, etc. The Company or the Platform shall not be liable
        for the consequences of use of the Platform by any such person not competent to contract under the Contract Act.
      </Text>
      <Text style={styles.subtitle}>AMENDMENTS AND ACCESSING THE PLATFORM</Text>
      <Text style={styles.text}>
        Updated version of the Terms of Services shall be displayed on the Platform/ Website / App at all given times
        Your continued use, interaction, visits to the Platform implies your agreement with the revised Terms of Service
        at all times. The Company and the Platform shall not be liable for individual notification every time for
        changes to the Terms of Service.
      </Text>
      <Text style={styles.subtitle}>ACCOUNT SECURITY</Text>
      <Text style={styles.text}>
        The Services offered through the Platform may be amended at the discretion of the Company in accordance with
        applicable laws and without obligation to notice. The Company or the Platform shall not be liable for any reason
        if all or any part of the Platform is unavailable at any time or for any duration. Restriction of access to
        parts or whole of the Platform is governed as per applicable laws and Our policies.
      </Text>
      <Text style={styles.text}>
        To access the Platform or some of its resources, You may be asked to provide certain registration details or
        other information. It is a condition of Your use of the Platform that all the information You provide on the
        Platform is correct, current, and complete and collected and uploaded as per applicable laws. You agree that all
        information you provide to register with this Platform or otherwise, including, but not limited to, using any
        interactive features on the Platform, or any agreement entered into digitally, is governed by our Privacy Policy
        and as per the respective information field arises, and You consent to all actions we take with respect to your
        information consistent with our Privacy Policy.
      </Text>
      <Text style={styles.text}>
        Username, password, or any other piece of information as part of our security procedures, must be treated as
        confidential and a subject matter of the privacy and data security policy. You must not disclose it to any other
        person or entity. You also acknowledge that Your account is personal to You and agree not to provide any other
        person with access to this Platform or portions of it using Your username, password, or other security
        information, protocols, and verification requirements.
      </Text>
      <Text style={styles.text}>
        You agree to notify Us immediately (Contact Us) of any breach or suspected breach like unauthorized access to or
        use of Your username or password or Account or any other breach of security. As a part of security protocol, You
        agree to ensure that You exit from Your account at the end of each session. You should use particular caution
        when accessing Your account from a public or shared computer.
      </Text>
      <Text style={styles.text}>
        We have the right to disable any username, password, or other identifier, whether chosen by You or provided by
        us, at any time in our sole discretion for any or no reason, including if, in our opinion, violative or
        suspected to be violative of these Terms of Service.
      </Text>
      <Text style={styles.subtitle}>PRIVACY POLICY</Text>
      <Text style={styles.text}>
        The Platform is governed under and You represent that You have read, understood, and agreed to the same. The
        following are the only exception to the Privacy Policy, under a government directive, court order or appropriate
        authority:
      </Text>
      <View style={{ flexDirection: "column", lineHeight: 2 }}>
        <Text style={styles.list}>&bull; Take action regarding suspected illegal activities.</Text>
        <Text style={styles.list}>&bull; Enforce or apply Terms of Service and Privacy Policy.</Text>
        <Text style={styles.list}>
          &bull; Comply with legal process or other government inquiry, such as a search warrant, subpoena, statute,
          judicial proceeding, or legal process/ notice served on us.
        </Text>
        <Text style={styles.list}>
          &bull; Protect out rights, reputation, and property, or that of our customer, affiliates, or the general
          public.
        </Text>
      </View>
      <Text style={styles.subtitle}>TERMINATION AND SUSPENSION</Text>
      <Text style={styles.text}>
        Company may terminate this Terms of Service and Your account for any reason by giving you immediate notice via
        email or using any other contact information You have provided for Your account. Company may also terminate the
        Terms of Service immediately and without notice and stop providing you access to the Platform if you breach
        these Terms of Service, you violate our Policies, applicable laws, misrepresented or given any false information
        or we know that the information given in the platform is obtained and provided through illegal means or
        reasonably believe termination is necessary to protect Company, national security and sovereignty, or third
        parties.
      </Text>
      <Text style={styles.subtitle}>Violations</Text>
      <Text style={styles.text}>
        If (i) You breach these Terms of Service, or our Policies. (ii) violate applicable laws, regulations, or
        third-party rights, or (iii) Company believes it is reasonably necessary to protect Company, its members, or
        third parties; Company may with or without prior notice:
      </Text>
      <View style={{ flexDirection: "column", lineHeight: 2 }}>
        <Text style={styles.list}>
          &bull; Suspend or limit your access to or use of the Platform and/ or your account
        </Text>
        <Text style={styles.list}>&bull; Suspend or remove your Programs</Text>
        <Text style={styles.list}>&bull; Cancel any on-going or confirmed Programs; or</Text>
        <Text style={styles.list}>&bull; Suspend or revoke any special status associated with your account.</Text>
      </View>
      <Text style={styles.text}>
        For any grievance, you are directed to follow the Grievance mechanism on the platform. The Company takes
        complaints seriously and will be dealt with the process. Where deemed appropriate as Company in its sole
        discretion shall take the necessary steps in accordance with law. You will be given notice of any intended
        measure by Company and an opportunity to resolve the issue.
      </Text>
      <Text style={styles.subtitle}>INTELLECTUAL PROPERTY RIGHTS</Text>
      <Text style={styles.text}>
        The Platform and its entire contents, features, and functionality (including but not limited to all information,
        software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are
        properties of the Company and owned by the Company, its authorised licensors, authorised channel and service
        providers of such material and are protected by Indian and international copyright, trademark, patent, trade
        secret, and other intellectual property or proprietary rights laws.
      </Text>
      <Text style={styles.text}>
        These Terms of Service permit You to use the Platform for your personal, non-commercial use only. You must not
        use the Platform for any personal gains. You must not reproduce, distribute, modify, create derivative works of,
        publicly display, publicly perform, republish, download, store, or transmit any of the material on our Platform,
        for any commercial or personal use for gain other than for the purposes of the Program.
      </Text>
      <Text style={styles.text}>You must not:</Text>
      <View style={{ flexDirection: "column", lineHeight: 2 }}>
        <Text style={styles.list}>&bull; Modify copies of any materials from this Platform;</Text>
        <Text style={styles.list}>
          &bull; Use any illustrations, photographs, video or audio sequences, or any graphics separately from the
          accompanying text;{" "}
        </Text>
        <Text style={styles.list}>
          &bull; Delete or alter any copyright, trademark, or other proprietary rights notices from copies of materials
          from this site;
        </Text>
        <Text style={styles.list}>
          &bull; Host, display, upload, modify, publish, transmit, store, update or share information of other person
          without right;
        </Text>
        <Text style={styles.list}>
          &bull; Use information defamatory, obscene, pornographic, harmful to any child, invasive of others privacy,
          discriminating on nay ground, encouraging money laundering or gambling or contrary to any existing laws;
        </Text>
        <Text style={styles.list}>
          &bull; Deceives or misleads the origin of the message or knowingly miscommunicates any information;
        </Text>
        <Text style={styles.list}>&bull; Infringes on any intellectual property rights;</Text>
        <Text style={styles.list}>&bull; impersonates any other;</Text>
        <Text style={styles.list}>
          &bull; threatens the integrity, defence, security or public order or causes incitement to commit a cognizable
          offence or prevents an investigation;
        </Text>
        <Text style={styles.list}>
          &bull; contains software virus or any other computer code, file or program designed to interrupt, destroy or
          limit the functionality of the computer resource;
        </Text>
        <Text style={styles.list}>
          &bull; If patently false and untrue and is used in a manner to harass a person or an entity for financial
          gain.
        </Text>
      </View>
      <Text style={styles.text}>
        You must not access or use for any commercial purposes any part of the Platform or any services or materials
        available through the Platform.
      </Text>
      <Text style={styles.text}>
        Any use of the Platform not expressly permitted by these Terms of Service is a breach of these Terms of Service
        and may violate copyright, trademark, and other laws.
      </Text>
      <Text style={styles.subtitle}>TRADEMARKS</Text>
      <Text style={styles.text}>
        The Company’s name, logo, and all related names, logos, product and service names, designs, and slogans are
        trademarks of the Company or its affiliates or licensors. You must not use such marks without the prior written
        permission of the Company. All other names, logos, product and service names, designs, and slogans on this
        Platform are the trademarks of their respective owners.
      </Text>
      <Text style={styles.subtitle}>DATA RETENTION AND DESTRUCTION POLICY</Text>
      <Text style={styles.text}>
        Data Retention and Destruction Policy is to ensure that the Company maintains its official records in accordance
        with the requirements of all applicable laws and that official records no longer required by Company are
        disposed of in a timely manner.
      </Text>
      <Text style={styles.text}>
        Files that have been retained for the period of 180 days or as specified in the Data Retention and Destruction
        Policy, as required by law shall be destroyed promptly at the end of that period.
      </Text>
      <Text style={styles.text}>
        You have understood and agreed to the Company having vested with all the rights to share, transfer and license
        all/ or any part of the information on the Portal with authorised representatives. You represent that you have
        read, understood, and agreed to our Data Retention and Destruction Policy.
      </Text>
      <Text style={styles.subtitle}>CONTENT</Text>
      <Text style={styles.subtitle}>User Contribution</Text>
      <Text style={styles.text}>
        The Platform may contain message boards, chat bot, personal web profiles, forum, bulletin board, and other
        interactive features (Collectively, “Interactive Services”) that could allow You to post, submit, publish,
        display, or transmit to other users or other persons (hereinafter, “post”) content and materials (collectively,
        “Users Contributions”) on or through the Platform. All User Contributions must comply with the Content Standards
        set out below in these Terms of Service.
      </Text>
      <Text style={styles.text}>
        Any User Contribution You post to the Platform will be considered non-confidential and non-proprietary. By
        providing any User Contribution on the Platform, You grant us and our affiliates and service providers, and each
        of their and our respective licensees, successors, and assigns the right to use, reproduce, modify, perform,
        display, distribute, and otherwise disclose to third parties any such material for any purpose/according to your
        account settings.
      </Text>
      <Text style={styles.text}>You represent and warrant that:</Text>
      <View style={{ flexDirection: "column", lineHeight: 2 }}>
        <Text style={styles.list}>
          &bull; You own or control all rights in and to the User Contributions and have the right to grant the license
          granted above to us and our affiliates and service providers, and each of their and our respective licensees,
          successors, and assigns; and
        </Text>
        <Text style={styles.list}>
          &bull; All of your User Contributions do and will comply with these Terms of Service.
        </Text>
      </View>
      <Text style={styles.text}>
        You understand and acknowledge that You are responsible for any User Contributions You submit or contribute, and
        You, not the Company, have full liability. Obligation and responsibility for such content, including its
        legality, reliability, accuracy, and appropriateness.
      </Text>
      <Text style={styles.text}>
        The Company and the Website are not responsible or liable to any third party for the content or accuracy of any
        User Contributions posted by You or any other user of the Platform.
      </Text>
      <Text style={styles.subtitle}>MONITORING AND ENFORCEMENT</Text>
      <Text style={styles.text}>The Company has the right to:</Text>
      <View style={{ flexDirection: "column", lineHeight: 2 }}>
        <Text style={styles.list}>
          &bull; Remove or effuse to post any user contributions for any or no reason in its sole discretion;
        </Text>
        <Text style={styles.list}>
          &bull; Take any action with respect to any User contribution that it deems necessary or appropriate in its
          sole discretion, including for violation of the Terms of Service, including the Content Standards, infringing
          any intellectual property rights or other right of any person or entity, threatens the personal safety of
          users of the Platform or the public, or could create liability for the Company;
        </Text>
        <Text style={styles.list}>
          &bull; Disclose your identity or other information about you to any third party who claims that material
          posted by You violates their rights, including their intellectual property rights or their right to privacy.
        </Text>
        <Text style={styles.list}>&bull; Take all steps as required under applicable laws.</Text>
      </View>
      <Text style={styles.text}>
        YOU HEREBY IRREVOCABLY UNCONDITIONALLY WAIVE AND HOLD HARMLESS THE COMPANY AND ITS AFFILIATES, LICENSEES, AND
        SERVICES PROVIDERS FROM ANY AND ALL CLAIMS, DAMAGES, LIABILITIES AND COSTS RESULTING FROM ANY ACTION TAKEN BY
        THE COMPANY OR TAKEN AS A CONSEQUENCE OF INVESTIGATIONS BY EITHER THE COMPANY/ SUCH PARTIES OR LAW ENFORCEMENT
        AUTHORITIES.
      </Text>
      <Text style={styles.text}>
        The Company or the Website does not undertake to review any material before it is posted on the Platform and
        cannot ensure prompt removal of objectionable material after it has been posted. The Company assumes no
        liability for any action or inaction regarding transmissions, communications, or content provided by any user or
        third party. We have no liability or responsibility to anyone for performance or nonperformance of the
        activities described in this section.
      </Text>
      <Text style={styles.subtitle}>CONTENT GUIDELINES</Text>
      <Text style={styles.text}>
        You represent that You have read, understood, and agreed to our Guidelines and Polices related to Content
        applicable to the Platform for User Contributions.
      </Text>
      <Text style={styles.subtitle}>PROHIBITED USES</Text>
      <Text style={styles.text}>
        Use of the Platform is allowed only for lawful purposes and in accordance with these Terms of Service and any
        agreement that You have entered into with the Company. You agree not to use the Platform:
      </Text>
      <View style={{ flexDirection: "column", lineHeight: 2 }}>
        <Text style={styles.list}>
          &bull; In any way that violates any applicable laws and rules under federal, state, local, or international
          law or regulation (including, without limitation, any laws regarding the export of data or software to and
          from India or other countries from where this Platform may be accessed);
        </Text>
        <Text style={styles.list}>
          &bull; For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing
          them to inappropriate content, asking for personally identifiable information, or otherwise;
        </Text>
        <Text style={styles.list}>
          &bull; To transmit, or procure the sending of, any advertising or promotional material, including any “junk
          mail,” “chain letter,” “spam,” or any other similar solicitation;
        </Text>
        <Text style={styles.list}>
          &bull; To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other
          person or entity (including, without limitation, by using email addresses associated with any of the
          foregoing); or
        </Text>
        <Text style={styles.list}>
          &bull; To engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of the Platform, or
          which, as determined by us, may harm the Company or users of the Platform, or expose them to liability.
        </Text>
        <Text style={styles.list}>
          &bull; You shall not host, display, upload, download, modify, publish, transmit, update, or share any
          information which:
        </Text>
        <View style={{ paddingLeft: 12 }}>
          <Text style={styles.list}>&bull; Belongs to another person and which you do not have any rights to;</Text>
          <Text style={styles.list}>
            &bull; Is harmful, harassing or encourages money laundering, or unlawfully threatening or unlawfully
            harassing including but not limited to “indecent representation of women’ within the Indecent Representation
            of Women (Prohibition) Act, 1986 or The Sexual Harassment of Women at Workplace (Prevention, Prohibition and
            Redressal) Act, 2013.
          </Text>
          <Text style={styles.list}>&bull; Is misleading or misrepresentative in any way;</Text>
          <Text style={styles.list}>
            &bull; Promotes illegal activities or conduct that is abusive, threatening, obscene, defamatory, or
            libelous.
          </Text>
          <Text style={styles.list}>&bull; Has been obtained through illegal means and </Text>
          <Text style={styles.list}>
            &bull; Is in violation of the Indian anti- corruption and money laundering laws embodied in the Prevention
            of Corruption Act, 1988, Lokpals and Lokayuktas Act, 2013. Prevention of Money Laundering Act, 2002, UK
            Bribery Act, Foreign Corrupt Practices Act, Foreign Contribution Regulation Act, 2010.
          </Text>
        </View>
      </View>
      <Text style={styles.subtitle}>Additionally, You agree not to:</Text>
      <View style={{ flexDirection: "column", lineHeight: 2 }}>
        <Text style={styles.list}>
          &bull; Use the Platform in any manner that could disable, overburden, damage, or impair the site or interfere
          with any other party’s use of the Platform, including their ability to engage in real time activities through
          the Platform;
        </Text>
        <Text style={styles.list}>
          &bull; Use any robot, spider, or other automatic device, process, or means to access the Platform for any
          purpose, including monitoring or copying any of the material on the Platform;
        </Text>
        <Text style={styles.list}>
          &bull; Use any manual process to monitor or copy any of the material on the Platform, or for any other purpose
          not expressly authorized in these Terms of Service, without our prior written consent;
        </Text>
        <Text style={styles.list}>
          &bull; Use any device, software, or routine that interferes with the proper working of the Platform;
        </Text>
        <Text style={styles.list}>
          &bull; Introduce any viruses, Trojan horses, worms, logic bombs, or other material that is malicious or
          technologically harmful;
        </Text>
        <Text style={styles.list}>
          &bull; Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Platform,
          the server on which the Platform is stored, or any server, computer, or database connected to the Platform;
        </Text>
        <Text style={styles.list}>
          &bull; Attack the Platform via a denial-of-service attack or a distributed denial-of-service attack; or
          Otherwise attempt to interfere with the proper working of the Platform.
        </Text>
      </View>
      <Text style={styles.subtitle}>RELIANCE ON INFORMATION POSTED</Text>
      <Text style={styles.text}>
        THE INFORMATION PRESENTED ON THE PLATFORM IS REPRESENTED TO US AS BEING MATERIALLY TRUE, CORRECT AND COMPLETE.
        WHILE WE CONTINUALLY ENDEAVOR TO PROVIDE REASONABLY AND MATERIALLY CORRECT INFORMATION REGARDING PROGRAMS,
        IMPLEMENTATION ORGANISATION AND BENEFICIARIES OF PROGRAM, WE DO NOT WARRANT THAT THE INFORMATION PRESENT IS
        TRUE, CORRECT OR COMPLETE. ANY RELIANCE YOU PLACE ON SUCH INFORMATION INVOLVES CERTAIN RISK. WE DISCLAIM ALL
        LIABILITY AND RESPONSIBILITY ARISING FROM ANY RELIANCE PLACED ON SUCH MATERIALS BY YOU OR ANY OTHER VISITOR TO
        THE PLATFORM, OR BY ANYONE WHO MAY BE INFORMED OF ANY OF ITS CONTENTS.
      </Text>
      <Text style={styles.text}>
        THIS PLATFORM CONTAINS IN LARGE MEASURE CONTENT PROVIDED BY THIRD PARTIES, INCLUDING MATERIALS PROVIDED BY
        IMPLEMENTATION ORGANISATION AND BENEFICIARIES OF PROGRAM, OTHER USERS, AND THIRD-PARTY LICENSORS, SYNDICATORS,
        AGGREGATORS, AND/OR REPORTING SERVICES. ALL STATEMENTS AND/OR OPINIONS EXPRESSED IN THESE MATERIALS, AND ALL
        ARTICLES AND RESPONSES TO QUESTIONS AND OTHER CONTENT, OTHER THAN THE CONTENT PROVIDED BY THE COMPANY, ARE
        SOLELY THE OPINIONS AND THE RESPONSIBILITY OF THE PERSON OR ENTITY PROVIDING THOSE MATERIALS. THESE MATERIALS DO
        NOT NECESSARILY REFLECT THE OPINION OF THE COMPANY. WE ARE NOT RESPONSIBLE, OR LIABLE TO YOU OR ANY THIRD PARTY,
        FOR THE CONTENT OR ACCURACY OF ANY MATERIALS PROVIDED BY ANY THIRD PARTY.
      </Text>
      <Text style={styles.subtitle}>INFORMATION ABOUT YOU AND YOUR VISITS TO THE PLATFORM</Text>
      <Text style={styles.text}>
        All information we collect on this Platform is subject to our Privacy Policy. By using the Platform, you consent
        to all actions taken by us with respect to your information in compliance with the Privacy Policy.
      </Text>
      <Text style={styles.subtitle}>API INTEGRATION AND LINKS FROM THE PLATFORM</Text>
      <Text style={styles.text}>
        If the Platform contains links to other sites and resources provided by third parties, these links are provided
        for your convenience only. This includes links contained in advertisements, including banner advertisements and
        sponsored links. We have no control over the contents of those sites or resources and accept no responsibility
        for them or for any loss or damage that may arise from your use of them. If You decide to access any of the
        third-party Platforms linked to this Platform, You do so entirely at your own risk and subject to the terms and
        conditions of use for such Platforms.{" "}
      </Text>
      <Text style={styles.subtitle}>GEOGRAPHIC RESTRICTIONS</Text>
      <Text style={styles.text}>
        The owner of the Platform is based in India. While we endeavor to provide this Platform for use by persons in
        India and outside it, we make no claims that the Platform or any of its content is accessible or appropriate
        outside India. Access to the Platform may not be legal by certain persons or in certain countries. If you access
        the Platform from outside India, you do so on your own initiative and are responsible for compliance with local
        laws.
      </Text>
      <Text style={styles.subtitle}>DISCLAIMER OF WARRANTIES</Text>
      <Text style={styles.text}>
        You understand that we cannot and do not guarantee or warrant that file available for downloading from the
        internet or the Platform will be free of viruses or other destructive code. You are responsible for implementing
        sufficient procedures and checkpoints to satisfy your requirements for anti-virus protection and accuracy of
        data input and output, and for maintaining a means external to our site for any reconstruction of any lost data.{" "}
      </Text>
      <Text style={styles.text}>
        TO THE FULLEST EXTENT PROVIDED BY LAW, WE WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE CAUSED BY A DISTRIBUTED
        DENIAL-OF-SERVICE ATTACK, VIRUSES, OR OTHER TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT YOUR COMPUTER
        EQUIPMENT, COMPUTER PROGRAMS, DATA, OR OTHER PROPRIETARY MATERIAL DUE TO YOUR USE OF THE PLATFORM OR ANY
        SERVICES OR ITEMS OBTAINED THROUGH THE PLATFORM OR TO YOUR DOWNLOADING OF ANY MATERIAL POSTED ON IT, OR ON ANY
        PLATFORM LINKED TO IT.
      </Text>
      <Text style={styles.text}>
        YOUR USE OF THE INTERNET, THE PLATFORM, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE PLATFORM IS
        AT YOUR OWN RISK. THE PLATFORM, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE PLATFORM ARE
        PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
        NEITHER THE COMPANY NOR ANY PERSON ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT
        TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE PLATFORM. WITHOUT LIMITING
        THE FOREGOING, NEITHER THE COMPANY NOR ANYONE ASSOCIATED WITH THE COMPANY REPRESENTS OR WARRANTS THAT THE
        PLATFORM, ITS CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE PLATFORM WILL BE ACCURATE, RELIABLE,
        ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT OUR SITE OR THE SERVER THAT MAKES IT
        AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT THE PLATFORM OR ANY SERVICES OR ITEMS
        OBTAINED THROUGH THE PLATFORM WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.
      </Text>
      <Text style={styles.text}>
        TO THE FULLEST EXTENT PROVIDED BY LAW, THE COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS
        OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY,
        NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.
      </Text>
      <Text style={styles.text}>
        THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
      </Text>
      <Text style={styles.subtitle}>LIMITATION ON LIABILITY</Text>
      <Text style={styles.text}>
        TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE
        PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL OR
        EQUITABLE THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE PLATFORM, ANY
        PLATFORMS LINKED TO IT, ANY CONTENT ON THE PLATFORM OR SUCH OTHER PLATFORMS, INCLUDING ANY DIRECT, INDIRECT,
        SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND
        SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS
        OF PROFIT, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE),
        BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE.
      </Text>
      <Text style={styles.text}>
        The limitation of liability set out above does not apply to liability resulting from our gross negligence or
        willful misconduct.
      </Text>
      <Text style={styles.text}>
        THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
      </Text>
      <Text style={styles.subtitle}>INDEMNIFICATION</Text>
      <Text style={styles.text}>
        YOU AGREE TO DEFEND, INDEMNIFY, AND HOLD HARMLESS THE COMPANY, ITS AFFILIATES, LICENSORS, AND SERVICE PROVIDERS,
        AND ITS AND THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, AGENTS, LICENSORS, SUPPLIERS,
        SUCCESSORS, AND ASSIGNS FROM AND AGAINST ANY CLAIMS, LIABILITIES, DAMAGES, JUDGMENTS, AWARDS, LOSSES, COSTS,
        EXPENSES, OR FEES (INCLUDING REASONABLE ATTORNEYS’ FEES) ARISING OUT OF OR RELATING TO YOUR VIOLATION OF THESE
        TERMS OF SERVICE OR YOUR USE OF THE PLATFORM, INCLUDING, BUT NOT LIMITED TO, YOUR USER CONTRIBUTIONS, ANY USE OF
        THE PLATFORM’S CONTENT, SERVICES, AND PRODUCTS OTHER THAN AS EXPRESSLY AUTHORIZED IN THESE TERMS OF USE, OR YOUR
        USE OF ANY INFORMATION OBTAINED FROM THE PLATFORM.
      </Text>
      <Text style={styles.text}>
        The Implementation Organisation shall fully indemnify, defend and hold harmless the Company, its affiliates,
        licensors, service providers and their respective employees from and against any and all claims, liabilities and
        damages, arising out of, involving or in connection with the means, manner and method by which the
        Implementation Organisation collects the data. The Company shall not have first paid any such claim in order to
        be indemnified.
      </Text>
      <Text style={styles.subtitle}>GOVERNING LAW AND JURISDICTION</Text>
      <Text style={styles.text}>
        These Terms of Service and the Platform/ Website are made and published in accordance with India’s Information
        Technology Act, 2000 and the rules made thereunder (“IT Act”), as amended, and other applicable laws of India.
        This document is an electronic record and all amended provisions pertaining to electronic records in various
        statutes, as amended by the IT Act, will be applicable. This electronic record is generated by a computer system
        and does not require physical or digital signatures.
      </Text>
      <Text style={styles.text}>
        All matters relating to the Platform and these Terms of Service, and any dispute or claim arising therefrom or
        related thereto (in each case, including non-contractual disputes or claims), shall be governed by and construed
        in accordance with the laws of India without regard to any conflict of law principles.
      </Text>
      <Text style={styles.text}>
        Any legal suit, action, or proceeding arising out of, or related to, these Terms of Service or the Platform or
        Campaigns launched, or donations made through use of the Platform may be instituted exclusively in the courts
        located in “Mumbai”, India. Notwithstanding the foregoing, the Company hereby retains the right to bring any
        suit, action, or proceeding against you for breach of these Terms of Service in your country of residence if
        other than India. You hereby waive any and all objections to the exercise of jurisdiction over you by such
        courts and to venue in such courts in such cities.
      </Text>
      <Text style={styles.text}>
        At Company’s sole discretion, it may require you to submit any disputes arising from these Terms of Service or
        use of the Platform, including disputes arising from or concerning their interpretation, violation, invalidity,
        non-performance, or termination, to final and binding arbitration under the Indian Arbitration Act of 1996, as
        amended, and the rules made thereunder. The venue of the arbitration shall be “Mumbai”, India.
      </Text>
      <Text style={styles.subtitle}>IMPLEMENTATION ORGANISATION DECLARATION</Text>
      <Text style={styles.text}>
        ANY PROGRAM UNDERTAKEN AND RUN BY THE IMPLEMENTATION ORAGNISATION(S) ON THE PLATFORM FOR FOREIGN CONTRIBUTION,
        THE IMPLEMENTATION ORGANISATION(S) MUST BE FULLY COMPLIANT WITH FOREIGN CONTRIBUTION (REGULATIONS) ACT, 2010.
        FOREIGN CORRUPT PRACTICES ACT, 1977. THE IMPLEMENTATION ORGANISATION HEREBY AGREES TO TAKE FULL RESPONSIBILITY
        OF ANY CAUSE OF ACTION OR CLAIM THAT HAVE ARISING OUT OF OR RELATING TO THE PROGRAM/TRANSACTION PERFORMED BY THE
        USE THE PLATFORM AND INDEMNIFY THE COMPANY AND THE PLATFORM.
      </Text>
      <Text style={styles.subtitle}>LIMITATION ON TIME TO FILE CLAIMS</Text>
      <Text style={styles.text}>
        ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING TO THESE TERMS OF SERVICE, THE PLATFORM, OR
        THE TRANSACTIONS PERFORMED BY USE OF THE PLATFORM MUST BE COMMENCED AT THE EARLIEST OF THE CAUSE OF ACTION
        ARISING OTHERWISE, SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED.
      </Text>
      <Text style={styles.subtitle}>WAIVER AND SEVERABILITY</Text>
      <Text style={styles.text}>
        No waiver by the Company of any term or condition set out in these Terms of Service shall be deemed a further or
        continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of the
        Company to assert a right or provision under these Terms of Service shall not constitute a waiver of such right
        or provision.
      </Text>
      <Text style={styles.subtitle}>GRIEVANCE REDRESSAL MECHANISM</Text>
      <Text style={styles.text}>
        Grievance Redressal Mechanism, including the contact details of the Grievance Officer is given herein below:
      </Text>
      <Text style={styles.text}>Customer case channel</Text>
      <View style={{ flexDirection: "column", lineHeight: 2 }}>
        <Text style={styles.list}>
          &bull; You may write to us at ‘privacy@consumerlinks.in’ and we will strive to resolve your complaint related
          grievance within the timelines prescribed under applicable laws.
        </Text>
        <Text style={styles.list}>
          &bull; For a complaint raised on ‘privacy@consumerlinks.in’, you will receive a unique ticket number to track
          the status of your complaint.
        </Text>
        <Text style={styles.list}>
          &bull; In case you do not receive a satisfactory response from ‘privacy@consumerlinks.in’ as the case maybe,
          you can escalate the matter to our Grievance officer by giving reference of the ticket number generated from
          the ‘privacy@consumerlinks.in’ and we shall address your concern within an estimated time of forty-eight (48)
          hours.
        </Text>
      </View>
      <Text style={styles.text}>Details of the Grievance Officer </Text>
      <View style={{ flexDirection: "column", lineHeight: 2 }}>
        <Text style={styles.list}>&bull; Name: Sandeep Ramakrishnan</Text>
        <Text style={styles.list}>&bull; Designation: Director</Text>
        <Text style={styles.list}>
          &bull; Address of the company: CONSUMER LINKS MARKETING PRIVATE LIMITED, 001/A, C Wing, Shree Krishna Complex
          CHS Ltd, Western Express Highway, Near Omkareshwar Mandir, Borivali East, Mumbai - 400066
        </Text>
        <Text style={styles.list}>&bull; Email address: sandeep@consumerlinks.co.in</Text>
        <Text style={styles.list}>&bull; Contact Number: 9821148844</Text>
      </View>

      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      {sig && <Image style={styles.image} src={sig} allowDangerousPaths="true" />}
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  subtitle: {
    fontSize: 14,
    margin: 5,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 12,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 10,
    marginLeft: "50%",
  },
  list: { marginLeft: 30, fontSize: 12 },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default generatePDFDocument;
