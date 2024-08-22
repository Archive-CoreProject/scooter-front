import { useState } from "react";

function Bluetooth() {
  const [device, setDevice] = useState(null);
  const [server, setServer] = useState(null);
  const [char, setChar] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [receivedValue, setReceivedValue] = useState(null);
  const [requestNum, setRequestNum] = useState(false);

  const requestBluetoothDevice = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"] }],
      });
      setDevice(device);
      setReceivedValue("연결 성공");
    } catch (error) {
      console.error("Bluetooth device request error:", error);
    }
  };

  const connectToDeviceAndSendValue = async () => {
    if (!device) return;

    try {
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b");
      const characteristic = await service.getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8");

      // 데이터 수신
      characteristic.startNotifications();

      characteristic.addEventListener("characteristicvaluechanged", (event) => {
        const value = new TextDecoder().decode(event.target.value);
        setReceivedValue(value);
      });
      setServer(server);
      setChar(characteristic);
      setRequestNum(true);
    } catch (error) {
      console.error("Connection or write error:", error);
    }
  };

  const sendNumber = async () => {
    // 데이터 송신
    const encoder = new TextEncoder();
    const data = encoder.encode(inputValue);
    await char.writeValue(data);

    char.startNotifications();

    char.addEventListener("characteristicvaluechanged", (event) => {
      const value = new TextDecoder().decode(event.target.value);
      setReceivedValue(value);
    });
  };

  const disconnectFromService = async () => {
    if (server) {
      try {
        await server.disconnect();
        setServer(null);
        setDevice(null);
        setRequestNum(false);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div>
      <h2>React ESP32 Bluetooth Communication</h2>
      {!device && <button onClick={requestBluetoothDevice}>킥보드 연결</button>}
      {device && <button onClick={connectToDeviceAndSendValue}>인증번호 발급</button>}
      {device && <button onClick={disconnectFromService}>킥보드 연결끊기</button>}
      {requestNum && (
        <div>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => (e.target.value.length <= 4 ? setInputValue(e.target.value) : "")}
            placeholder="Enter value to send"
          />
          <button onClick={sendNumber}>전송</button>
          <p>{receivedValue}</p>
        </div>
      )}
    </div>
  );
}

export default Bluetooth;
