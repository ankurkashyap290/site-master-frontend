import React from 'react';
import { Paper, Button, Typography } from '@material-ui/core';

const PrivacyPolicy = () => (
  <Paper className="standalone-info">
    <Typography variant="headline">
      Privacy Policy
    </Typography>
    <Typography paragraph>
      This page is used to inform visitors regarding my policies with the collection,
      use, and disclosure of Personal Information if anyone decided to use my Service.
    </Typography>
    <Typography paragraph>
      If you choose to use my Service, then you agree to the collection and use of information
      in relation to this policy. The Personal Information that I collect is used for providing
      and improving the Service. I will not use or share your information with anyone except as
      described in this Privacy Policy.
    </Typography>
    <Typography paragraph>
      The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions,
      which is accessible at Journeyapp.com unless otherwise defined in this Privacy Policy.
    </Typography>
    <Typography variant="subheading">
      Information Collection and Use
    </Typography>
    <Typography paragraph>
      For a better experience, while using our Service, I may require you to provide us with certain
      personally identifiable information. The information that I request is retained on your device
      and is not collected by me in any way.
    </Typography>
    <Typography paragraph>
      The app does use third party services that may collect information used to identify you.
    </Typography>
    <Typography variant="subheading">
      Log Data
    </Typography>
    <Typography paragraph>
      I want to inform you that whenever you use my Service, in a case of an error in the app I
      collect data and information (through third party products) on your phone called Log Data.
      This Log Data may include information such as your device Internet Protocol (“IP”) address,
      device name, operating system version, the configuration of the app when utilizing my Service,
      the time and date of your use of the Service, and other statistics.
    </Typography>
    <Typography variant="subheading">
      Cookies
    </Typography>
    <Typography paragraph>
      Cookies are files with small amount of data that is commonly used an anonymous unique
      identifier. These are sent to your browser from the website that you visit and are stored on
      your device internal memory.
    </Typography>
    <Typography paragraph>
      This Service does not use these “cookies” explicitly. However, the app may use third party
      code and libraries that use “cookies” to collection information and to improve their services.
      You have the option to either accept or refuse these cookies and know when a cookie is being
      sent to your device. If you choose to refuse our cookies, you may not be able to use some
      portions of this Service.
    </Typography>
    <Typography variant="subheading">
      Service Providers
    </Typography>
    <Typography paragraph>
      I may employ third-party companies and individuals due to the following reasons:
      <ul>
        <li>To facilitate our Service;</li>
        <li>To provide the Service on our behalf;</li>
        <li>To perform Service-related services; or</li>
        <li>To assist us in analyzing how our Service is used.</li>
      </ul>
      I want to inform users of this Service that these third parties have access to your Personal
      Information. The reason is to perform the tasks assigned to them on our behalf. However, they
      are obligated not to disclose or use the information for any other purpose.
    </Typography>
    <Typography variant="subheading">
      Security
    </Typography>
    <Typography paragraph>
      I value your trust in providing us your Personal Information, thus we are striving to use
      commercially acceptable means of protecting it. But remember that no method of transmission
      over the internet, or method of electronic storage is 100% secure and reliable, and I cannot
      guarantee its absolute security.
    </Typography>
    <Typography variant="subheading">
      Links to Other Sites
    </Typography>
    <Typography paragraph>
      This Service may contain links to other sites. If you click on a third-party link, you will be
      directed to that site. Note that these external sites are not operated by me. Therefore, I
      strongly advise you to review the Privacy Policy of these websites. I have no control over and
      assume no responsibility for the content, privacy policies, or practices of any third-party
      sites or services.
    </Typography>
    <Typography variant="subheading">
      Children’s Privacy
    </Typography>
    <Typography paragraph>
      You are not allowed to use this service if you are under the age of 13.
    </Typography>
    <Typography variant="subheading">
      Changes to This Privacy Policy
    </Typography>
    <Typography paragraph>
      I may update our Privacy Policy from time to time. Thus, you are advised to review this page
      periodically for any changes. I will notify you of any changes by posting the new Privacy
      Policy on this page. These changes are effective immediately after they are posted on this
      page.
    </Typography>
    <Typography variant="subheading">
      Contact Us
    </Typography>
    <Typography paragraph>
      If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact
      us.
    </Typography>
    <Typography align="center">
      <Button
        color="primary"
        onClick={() => window.history.back(1)}
      >
        Close
      </Button>
    </Typography>
  </Paper>
);

export default PrivacyPolicy;
