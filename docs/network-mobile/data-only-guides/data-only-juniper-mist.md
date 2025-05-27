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
* Some compute capacity in your network to run a [RadSecProxy](https://github.com/novalabsxyz/radsec-proxy) container.
* Docker software installed.
* The RadSecProxy container has a private IP reachable from your Juniper Mist APs.
* ACLs or firewalls allow Juniper Mist APs and the Docker container to communicate over UDP ports **1812** (RADIUS authentication) and **1813** (RADIUS accounting).
* Access to the cloud‑hosted Juniper Mist Dashboard.

## High‑Level Steps

1. Deploy the RadSecProxy container and record the host’s IP address.
2. Build a Helium Passpoint SSID on Juniper Mist.

   1. Create a new SSID.
   2. Configure Passpoint settings.
   3. Add RADIUS servers.
3. Apply the configuration to your sites and access points.
4. Verify operation and troubleshoot as needed.

# Deploy RadSecProxy Container

RADIUS messages used to authenticate users and to perform session accounting are transmitted unsecured over UDP by default. By directing these messages internally in your secure network to a RadSecProxy, the UDP traffic is converted into a TLS‑protected TCP connection to the Helium Network core AAA servers.

## Container Deployment

1. Un‑zip and untar the `Helium_RadSec_Docker.tar.gz` file into the directory of your choice on the host machine. This will unpack:

   * `Dockerfile` – Build instructions for the container
   * `Radsecproxy.conf` – Pre‑populated configuration to connect to Helium AAA servers
   * `docker-compose.yml` – Used to start or stop the container as a daemon

   ```bash
   tar -xvzf Helium_RadSec_Docker.tar.gz
   ```

2. Copy the three certificates obtained from the Helium Network into the same directory:

   * `ca.pem` – Root CA certificate
   * `cert.pem` – User certificate
   * `key.pem` – Private key matching **cert.pem**

   The keys may have different file names depending on their source. Rename the keys or edit `radsecproxy.conf`

3. Start the container:

   ```bash
   sudo docker compose up -d
   ```

4. Stop the container when necessary:

   ```bash
   sudo docker compose down
   ```

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

* **Domain Name**: `freedomfi.com`

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


## Add RADIUS Servers

1. Navigate to **Organization → Wireless → RADIUS**.

2. Click **Add RADIUS Server** under **Authentication Servers** and enter:

   | Field          | Value                      |
   | -------------- | -------------------------- |
   | **IP Address** | IP of the RadSecProxy host |
   | **Port**       | `1812`                     |
   | **Secret**     | `mysecret`                 |

3. Repeat the process under **Accounting Servers** with **Port** set to `1813`.

4. Set the interim accounting interval to `300`.

5. **NAS Identifier**: use either a static MAC address (e.g. `a8:53:7d:0b:fb:d0`) or the token `{{DEVICE_MAC}}` to insert the AP’s MAC address.  
This NAS Identifier must match the identifier used during onboarding through self-serve or Helium Plus.

<figure className="screensnippet-wrapper">
  <img
    src={useBaseUrl('img/mobile-data-only/juniper-mist/juniper-mist-radius-auth.png')}
    style={{ maxHeight: '500px' }}
    className="add-shadow add-shadow-margin"
  />
</figure>

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
| **Authentication failures** | Ensure the RadSecProxy container is running and reachable; verify UDP ports 1812/1813; capture packets on the container; increase `LogLevel` in `radsecproxy.conf`. |
| **Certificate errors**      | Confirm the AP trusts the RADIUS certificate and the AAA trusts the RadSec client certificate.                                                                      |
| **Clients fail to connect** | Check Passpoint parameters; verify device support for Passpoint; confirm Helium AAA approves the request.                                                           |

## Notes

* Juniper Mist may introduce native RadSec support in future releases. Until that implementation scales appropriately for Helium, this guide relies on RadSecProxy and plain RADIUS.
* Juniper Mist does not list Helium as a Passpoint Operator. Use preset Passpoint Operator configurations only after receiving approval from the Helium Plus team.
