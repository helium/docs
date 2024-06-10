import { ApplicationServiceClient } from '@chirpstack/chirpstack-api-grpc-web/api/application_grpc_web_pb'
import { ListApplicationsRequest } from '@chirpstack/chirpstack-api-grpc-web/api/application_pb'
import { DeviceServiceClient } from '@chirpstack/chirpstack-api-grpc-web/api/device_grpc_web_pb'
import {
  CreateDeviceKeysRequest,
  CreateDeviceRequest,
  Device,
  DeviceKeys,
} from '@chirpstack/chirpstack-api-grpc-web/api/device_pb'
import { DeviceProfileServiceClient } from '@chirpstack/chirpstack-api-grpc-web/api/device_profile_grpc_web_pb'
import { ListDeviceProfilesRequest } from '@chirpstack/chirpstack-api-grpc-web/api/device_profile_pb'
import { InternalServiceClient } from '@chirpstack/chirpstack-api-grpc-web/api/internal_grpc_web_pb'
import {
  LogItem,
  LoginRequest,
  StreamDeviceEventsRequest,
} from '@chirpstack/chirpstack-api-grpc-web/api/internal_pb'
import { Region } from '@chirpstack/chirpstack-api-grpc-web/common/common_pb'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { EventEmitter } from 'events'
import google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb'
import * as grpcWeb from 'grpc-web'
import React, { useCallback, useEffect, useState } from 'react'

const deviceEmitter = new EventEmitter()

const generateRandomKey = () => {
  let cryptoObj = window.crypto || window.Crypto
  let b = new Uint8Array(8)
  cryptoObj.getRandomValues(b)
  let hexString = ''
  b.forEach((num, index) => {
    let hexVal = num.toString(16)
    if (hexVal.length === 1) hexVal = '0' + hexVal
    hexString += hexVal
  })

  return hexString
}

const getHexArray = (key: string = '') => {
  return key
    .match(/[A-Fa-f0-9]{2}/g)!
    .join(', ')
    .toUpperCase()
    .replace(/[A-Fa-f0-9]{2}/g, '0x$&')
}

const DeviceInfoRow = ({ label, value }) => {
  if (!value) return <p>{label}: Pending - Hex Value: Pending</p>
  return (
    <p>
      {label}: {value} - {getHexArray(value)}
    </p>
  )
}

const useLogin = () => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext()
  const interalServiceClient = new InternalServiceClient(customFields.EDU_API_URL)

  return () =>
    new Promise((resolve, reject) => {
      let req = new LoginRequest()
      req.setEmail(customFields.EDU_EMAIL)
      req.setPassword(customFields.EDU_PW)
      interalServiceClient.login(req, {}, (error, resp) => {
        if (error !== null) {
          return reject(error)
        }
        return resolve(resp.getJwt())
      })
    })
}

const getRequestMeta = (jwt: string) => {
  return { authorization: `Bearer ${jwt}` }
}

export const CreateDevice = () => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext()
  const login = useLogin()
  const [deviceInfo, setDeviceInfo] = useState({ devEui: '', joinEui: '', networkKey: '' })

  const createDevice = () => {
    let jwt = ''
    let tenants = []
    let applicationId = ''
    let deviceProfileId = ''
    const interalServiceClient = new InternalServiceClient(customFields.EDU_API_URL)

    const getTenantId = () => {
      return tenants[0].getTenantId()
    }
    const loginWrapper = () =>
      login().then((loginJwt) => {
        jwt = loginJwt as string
      })

    const getTenants = () => {
      return new Promise((resolve, reject) => {
        interalServiceClient.profile(
          new google_protobuf_empty_pb.Empty(),
          getRequestMeta(jwt),
          (error, resp) => {
            if (error !== null) {
              reject(error)
            }
            tenants = resp.getTenantsList()
            resolve(tenants)
          },
        )
      })
    }

    const getDeviceApplications = () =>
      new Promise((resolve, reject) => {
        const client = new ApplicationServiceClient(customFields.EDU_API_URL)
        let req = new ListApplicationsRequest()
        req.setTenantId(getTenantId())
        req.setLimit(10)
        req.setOffset(0)

        client.list(req, getRequestMeta(jwt), (error, resp) => {
          if (error !== null) {
            return reject(error)
          }
          const deviceApplications = resp.toObject()
          const targetApplication = deviceApplications.resultList.find(
            (application) => application.name === 'Mapper 2',
          )
          if (!targetApplication) return reject('Target application not found')
          applicationId = targetApplication.id
          return resolve(applicationId)
        })
      })

    const getDeviceProfilesPage = () =>
      new Promise((resolve, reject) => {
        const client = new DeviceProfileServiceClient(customFields.EDU_API_URL)

        let req = new ListDeviceProfilesRequest()
        req.setTenantId(getTenantId())
        req.setLimit(10)
        req.setOffset(0)

        client.list(req, getRequestMeta(jwt), (error, resp) => {
          if (error !== null) {
            return reject(error)
          }

          const deviceProfiles = resp.toObject()
          const targetProfile = deviceProfiles.resultList.find(
            (deviceProfile) => deviceProfile.region === Region.US915,
          )
          if (!targetProfile) return reject('Target profile not found')

          deviceProfileId = targetProfile.id
          return resolve(deviceProfileId)
        })
      })

    const createDevice = () =>
      new Promise((resolve, reject) => {
        const client = new DeviceServiceClient(customFields.EDU_API_URL)
        let device = new Device()

        const devEui = generateRandomKey()
        const joinEui = generateRandomKey()

        device.setApplicationId(applicationId)
        device.setName(devEui)
        device.setDescription('Randomly generated device')
        device.setDevEui(devEui)
        device.setDeviceProfileId(deviceProfileId)
        device.setIsDisabled(false)
        device.setSkipFcntCheck(false)
        device.setJoinEui(joinEui)

        let req = new CreateDeviceRequest()
        req.setDevice(device)

        client.create(req, getRequestMeta(jwt), (error) => {
          if (error !== null) {
            return reject(error)
          }

          let req = new CreateDeviceKeysRequest()
          let deviceKeys = new DeviceKeys()
          const networkKey = generateRandomKey() + generateRandomKey()
          deviceKeys.setDevEui(devEui)
          deviceKeys.setNwkKey(networkKey)
          req.setDeviceKeys(deviceKeys)

          client.createKeys(req, getRequestMeta(jwt), (error) => {
            if (error !== null) {
              return reject(error)
            }

            setDeviceInfo({
              devEui,
              joinEui,
              networkKey,
            })
            deviceEmitter.emit('deviceInfo', { devEui: devEui, jwt })

            return resolve(device)
          })
        })
      })

    return loginWrapper()
      .then(getTenants)
      .then(() => Promise.all([getDeviceApplications(), getDeviceProfilesPage()]))
      .then(createDevice)
  }

  return (
    <>
      <button onClick={() => createDevice()} disabled={!!deviceInfo.devEui}>
        Trigger Device Creation
      </button>
      <div>
        <p>Device Info</p>
        <DeviceInfoRow label="Device EUI" value={deviceInfo.devEui} />
        <DeviceInfoRow label="Join EUI" value={deviceInfo.joinEui} />
        <DeviceInfoRow label="Network Key" value={deviceInfo.networkKey} />
      </div>
    </>
  )
}

export function DeviceEventLogger() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext()
  const login = useLogin()
  const [jwt, setJwt] = useState('')
  const [devEui, setDevEui] = useState('')
  const [events, setEvents] = useState<LogItem.AsObject[]>([])

  useEffect(() => {
    const setStreamInfo = ({ devEui, jwt }) => {
      setJwt(jwt)
      setDevEui(devEui)
    }
    deviceEmitter.on('deviceInfo', setStreamInfo)
    return () => deviceEmitter.removeListener('deviceInfo', setStreamInfo)
  }, [])

  const onMessage = useCallback((logItem: LogItem) => {
    setEvents((e) => {
      if (
        e.length === 0 ||
        parseInt(logItem.getId().replace('-', '')) > parseInt(e[0].id.replace('-', ''))
      ) {
        return [logItem.toObject(), ...e]
      }
      return e
    })
  }, [])

  // get jwt when manual devEui entry
  useEffect(() => {
    if (devEui.length === 16 && !jwt) {
      login().then(setJwt)
    }
  }, [jwt, devEui])

  useEffect(() => {
    if (devEui.length === 16 && !!jwt) {
      const streamDeviceEvents = (callbackFunc: (resp: LogItem) => void): (() => void) => {
        let req = new StreamDeviceEventsRequest()
        req.setDevEui(devEui)
        var stream: grpcWeb.ClientReadableStream<LogItem> | undefined = undefined

        let setup = () => {
          const client = new InternalServiceClient(customFields.EDU_API_URL)
          stream = client.streamDeviceEvents(req, getRequestMeta(jwt))

          stream = stream.on('data', (resp) => {
            callbackFunc(resp)
          })

          stream = stream.on('end', function () {
            setTimeout(setup, 1000)
          })
        }

        setup()

        return () => {
          if (stream) {
            stream.cancel()
          }
        }
      }

      let cancelFunc = streamDeviceEvents(onMessage)

      return () => {
        cancelFunc()
      }
    }
  }, [jwt, devEui, onMessage])

  return (
    <>
      <p>Device Event Logger</p>
      <p>jwt: {jwt}</p>
      <input
        placeholder="Device EUI"
        value={devEui}
        onChange={(event) => setDevEui(event.target.value)}
      />
      <div>
        <p>EVENTS BELOW HERE vvv</p>
        {events.map((event) => (
          <p key={event.id} className="mb-3">
            {`${new Date(event.time?.seconds! * 1000)} ${event.description} ${event.propertiesMap}`}
          </p>
        ))}
      </div>
    </>
  )
}
