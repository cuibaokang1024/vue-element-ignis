
import mqtt from 'mqtt'

const MQTT_SERVICE = 'ws://49.4.69.222:61623'
const MQTT_USERNAME = ''
const MQTT_PASSWORD = ''
const options = {
  connectTimeout: 40000,
  clientId: 'jsclient1111',
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
  clean: true
}
export const mqttClient = mqtt.connect(MQTT_SERVICE, options)
