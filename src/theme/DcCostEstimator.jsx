import React, { useState } from 'react';

const OperationCostEstimator = () => {
  const [numberOfDevices, setNumberOfDevices] = useState(1);
  const [uplinkFrequency, setUplinkFrequency] = useState(12);
  const [frequencyUnit, setFrequencyUnit] = useState('timesPerHour');
  const dataTransferCost = 0.00001;

  const handleNumberOfDevicesChange = (event) => {
    setNumberOfDevices(parseInt(event.target.value, 10));
  };

  const handleUplinkFrequencyChange = (event) => {
    setUplinkFrequency(parseFloat(event.target.value));
  };

  const handleFrequencyUnitChange = (event) => {
    setFrequencyUnit(event.target.value);
  };

  const calculateCost = () => {
    let uplinksPerDay;
    switch (frequencyUnit) {
      case 'timesPerMinute':
        uplinksPerDay = uplinkFrequency * 60 * 24;
        break;
      case 'timesPerHour':
        uplinksPerDay = uplinkFrequency * 24;
        break;
      case 'timesPerDay':
      default:
        uplinksPerDay = uplinkFrequency;
        break;
    }

    const dailyCost = numberOfDevices * uplinksPerDay * dataTransferCost;

    if (isNaN(dailyCost)) {
      return {
        day:    ' —',
        month:  ' —',
        year:   ' —',
      }
    } else {
      return {
        day:    dailyCost.toFixed(5),
        month:  (dailyCost * 30).toFixed(2),
        year:   (dailyCost * 365).toFixed(2),
      };
    }
  };

  const cost = calculateCost();

  return (
    <div className='dc-calc'>
      <div className='dc-calc-input-group'>
        <label htmlFor="numberOfDevices">Number of Devices:</label>
        <input
          type="number"
          pattern="[0-9]*"
          id="numberOfDevices"
          value={numberOfDevices}
          onChange={handleNumberOfDevicesChange}
          min={0}
        />
      </div>
      <div className='dc-calc-input-group'>
        <label htmlFor="uplinkFrequency">Message Frequency:</label>
        <div className='dc-calc-frequency-wrapper'>
            <input
            type="number"
            pattern="[0-9]*"
            id="uplinkFrequency"
            value={uplinkFrequency}
            onChange={handleUplinkFrequencyChange}
            min={0}
            />
            <select id="frequencyUnit" value={frequencyUnit} onChange={handleFrequencyUnitChange}>
            <option value="timesPerMinute">Times per Minute</option>
            <option value="timesPerHour">Times per Hour</option>
            <option value="timesPerDay">Times per Day</option>
            </select>
        </div>
      </div>
      <div>
        <span className='dc-calc-table-title'>Data Cost Estimate:</span>
        <table className='dc-calc-table'>
          <thead>
            <tr>
              <th>Per Day</th>
              <th>Per Month</th>
              <th>Per Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${cost.day}</td>
              <td>${cost.month}</td>
              <td>${cost.year}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OperationCostEstimator;
