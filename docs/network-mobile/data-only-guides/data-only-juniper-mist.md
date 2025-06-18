---
id: data-only-juniper-mist
title: Juniper Mist Conversion Guide
pagination_label: Juniper Mist Conversion Guide
sidebar_label: Juniper Mist Conversion Guide
description: Helium Network Conversion Documentation
image: https://docs.helium.com/img/link-image.png
slug: /mobile/data-only-juniper-mist
---

import useBaseUrl from '@docusaurus/useBaseUrl'

## Prerequisites

* Juniper Mist system running the latest firmware.
* Juniper Mist Access Points (APs) linked to the Mist Dashboard.
* Basic traffic routing working with existing SSID(s).
* ACLs or firewalls allow Juniper Mist APs to communicate over TCP ports **2083** RadSec.
* Access to the cloud‑hosted Juniper Mist Dashboard.

## High‑Level Steps

1. Build a Helium Passpoint SSID on Juniper Mist.

   1. Create a new SSID.
   2. Configure Passpoint settings.
   3. Add RadSec servers.
2. Apply the configuration to your sites and access points.
3. Verify operation and troubleshoot as needed.

# Configure Juniper Mist for Helium Mobile

To begin, sign in to the Juniper Mist Dashboard at [https://manage.mist.com](https://manage.mist.com).

## Create a New SSID

1. Navigate to **Organization → WLAN Templates**.
2. Click **Create WLAN Template** or select an existing template.
3. Click **Add WLAN** to create a new SSID.

**Required settings**

| Field         | Value             |
| ------------- | ----------------- |
| **SSID Name** | `Helium`          |
| **Security**  | `WPA3‑Enterprise` |
| **Passpoint** | **Enable**        |

<figure className="screensnippet-wrapper">
  <img
    src={useBaseUrl('img/mobile-data-only/juniper-mist/juniper-mist-create-wlan.png')}
    style={{ maxHeight: '600px' }}
    className="add-shadow add-shadow-margin"
  />
  <figcaption>Juniper Mist WLAN Settings</figcaption>
</figure>
<br />

## Configure Passpoint Settings

In the WLAN settings locate the **Passpoint** section and set:

* **Venue Name**: *(The Venue name or the name provided by the Helium Plus team)*

### Advanced Settings

* **Domain Name**: `freedomfi.com` & `hellohelium.com`

### NAI Realms

* `freedomfi.com (EAP‑TLS)`
* `hellohelium.com (EAP‑TLS)`


<figure className="screensnippet-wrapper">
  <img
    src={useBaseUrl('img/mobile-data-only/juniper-mist/juniper-mist-create-passport.png')}
    style={{ maxHeight: '500px' }}
    className="add-shadow add-shadow-margin"
  />
</figure>
<br />

## Add RadSec Servers

1. Under **Authentication Servers**, choose RadSec from the dropdown.
2. In the **Server Name** field, enter `radius.stage.wifi.freedomfi.com`
3. Click **Add Server** under **Server Addresses** and enter:

   | Field          | Value                      |
   | -------------- | -------------------------- |
   | **hostname**   | `44.229.62.214`            |
   | **Port**       | `2083`                     |

   Repeat this process for Helium's RadSec servers `52.37.147.195` and `44.241.107.197`

4. **NAS Identifier**: use either a static MAC address (e.g. `a8:53:7d:0b:fb:d0`) or the token `{{DEVICE_MAC}}` to insert the AP’s MAC address.  
This NAS Identifier must match the identifier used during onboarding through self-serve or Helium Plus.

<figure className="screensnippet-wrapper">
  <img
    src={useBaseUrl('img/mobile-data-only/juniper-mist/juniper-mist-radius-auth.png')}
    style={{ maxHeight: '500px' }}
    className="add-shadow add-shadow-margin"
  />
</figure>

## Other WLAN Settings
   These instructions include the minimum steps required to authenticate a client via the Helium network.
   Most venue operators will want to take additional security precautions, such as placing Helium clients into their own VLAN / subnet which is segmented from other WLANs.
   The steps to accomplish this are outside the scope of this document, but should be considered achieve a healthy security posture for both the venue operator and mobile users.

## Upload Certificates
   
   Save the three certificates obtained from the Helium Network into a directory for safekeeping and reference.

   * `ca.pem` – Root CA certificate
   * `cert.pem` – User certificate
   * `key.pem` – Private key matching **cert.pem**

   The keys may have different file names depending on their source.

   Navigate to **Organization** > **Settings**
   Under **RadSec Certificates**, click the **Add a RadSec Certificate** link
      Open the CA file in a text editor; note that it contains three separate CA certs.
      Copy and paste the first CA cert, including the **-----BEGIN CERTIFICATE-----** and **-----END CERTIFICATE-----** header and footer, and click the **Add** button.
      Repeat this process for the other two CA certs in the file.
   Under **AP RadSec Certificate**, click the **View Certificate** link.
      Open the key.pem (or similarly named) file in a text editor, then copy and paste the contents into the **Private Key** field
      Open the cert.pem (or similarly named) file in a text editor, then copy and paste the contents (including the header & footer) into the **Signed Certificate** field
      Apply / Save as applicable
   
## Apply the Configuration

1. Navigate to **Sites** and select the desired site.
2. Assign the updated **WLAN Template** to the site.
3. Click **Apply Changes** to push the configuration to all APs.

# Verify Configuration

* Confirm that the **Helium** SSID is broadcasting on your Juniper Mist APs.
* Connect a Passpoint‑enabled device and verify authentication through RadSecProxy to the Helium Network.
* In the Mist Dashboard under **Clients**, ensure that client sessions are active.

<figure className="screensnippet-wrapper">
  <img
    src={useBaseUrl('img/mobile-data-only/juniper-mist/juniper-mist-verify-connections.png')}
    style={{ maxHeight: '400px' }}
    className="add-border-radius add-shadow add-shadow-margin"
  />
</figure>

## Troubleshooting

| Symptom                     | Checks                                                                                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SSID not broadcasting**   | Verify the WLAN Template is assigned and pushed; confirm AP connectivity to the Mist Dashboard.                                                                     |
| **Certificate errors**      | Confirm the AP trusts the RADIUS certificate and the AAA trusts the RadSec client certificate.                                                                      |
| **Clients fail to connect** | Check Passpoint parameters; verify device support for Passpoint; confirm Helium AAA approves the request.                                                           |

## Notes

* Juniper Mist does not list Helium as a Passpoint Operator. Use preset Passpoint Operator configurations only after receiving approval from the Helium Plus team.
